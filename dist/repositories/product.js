import { PrismaClient } from "@prisma/client";
class ProductRepository {
    // static prismaClient = new PrismaClient().product
    static prismaClient = new PrismaClient();
    constructor() { }
    static create(product) {
        return ProductRepository.prismaClient.product.create({ data: product });
    }
    static getAll(companyId) {
        return ProductRepository.prismaClient.product.findMany({ where: {
                companyId
            }, include: {
                company: true
            } });
    }
    static getByCode(code, companyId) {
        return ProductRepository.prismaClient.product.findMany({ where: {
                companyId,
                code
            } });
    }
    static getById(id) {
        return ProductRepository.prismaClient.product.findUnique({ where: {
                id
            } });
    }
    static update(id, newData) {
        return ProductRepository.prismaClient.product.update({ where: {
                id
            }, data: newData });
    }
    static delete(id) {
        return ProductRepository.prismaClient.$transaction(async (prisma) => {
            await prisma.transaction.updateMany({
                where: {
                    productsIds: { has: id }
                },
                data: {
                    productsIds: { set: [] }
                }
            });
            return prisma.product.delete({
                where: { id }
            });
        });
    }
}
export { ProductRepository };
