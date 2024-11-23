import { PrismaClient } from "@prisma/client";
class VirtualStockRepository {
    // static prismaClient = new PrismaClient().virtualStock
    static prismaClient = new PrismaClient();
    constructor() { }
    static async create(virtualStock, products) {
        const productsIds = products.map(product => { return { id: product.id }; });
        const savedVirtualStock = await VirtualStockRepository.prismaClient.virtualStock.create({ data: { ...virtualStock, products: {
                    connect: productsIds
                } }, include: {
                products: true
            } });
        return savedVirtualStock;
    }
    static getAll(companyId) {
        return VirtualStockRepository.prismaClient.virtualStock.findMany({ where: {
                companyId
            }, include: {
                products: true
            } });
    }
    static getById(id) {
        return VirtualStockRepository.prismaClient.virtualStock.findUnique({ where: {
                id
            } });
    }
    static async update(id, newData, productsIds) {
        return await VirtualStockRepository.prismaClient.virtualStock.update({ where: {
                id
            }, data: {
                ...newData,
                products: {
                    set: productsIds
                }
            } });
    }
    static delete(id) {
        // return VirtualStockRepository.prismaClient.delete({where: {id}})
        return VirtualStockRepository.prismaClient.$transaction(async (prisma) => {
            await prisma.product.updateMany({
                where: {
                    virtualStocksIds: { has: id }
                },
                data: {
                    virtualStocksIds: { set: [] }
                }
            });
            return prisma.virtualStock.delete({
                where: {
                    id
                }
            });
        });
    }
}
export { VirtualStockRepository };
