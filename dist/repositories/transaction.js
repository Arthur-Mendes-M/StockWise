import { PrismaClient } from "@prisma/client";
// type TransactionDTO = Omit<Transaction, 'id'> & InputJsonValue
// type TransactionUpdateDTO = Omit<Transaction, 'id' | 'companyId'>
class TransactionRepository {
    // static prismaClient = new PrismaClient().transaction
    static prismaClient = new PrismaClient();
    static prismaClient_product = new PrismaClient().product;
    constructor() { }
    static async create(transaction, products) {
        const productsIds = products.map(order => { return { id: order.product.id }; });
        const savedTransaction = await TransactionRepository.prismaClient.transaction.create({ data: { ...transaction, products: {
                    connect: productsIds
                } }, include: {
                products: true
            }, });
        products.forEach(async (order) => {
            await TransactionRepository.prismaClient_product.update({ data: {
                    quantityInStock: order.product.quantityInStock - order.quantity,
                    updatedAt: new Date()
                }, where: {
                    id: order.product.id
                } });
        });
        return savedTransaction;
    }
    static getAll(companyId) {
        return TransactionRepository.prismaClient.transaction.findMany({ where: {
                companyId
            }, include: {
                products: true
            } });
    }
    static getById(id) {
        return TransactionRepository.prismaClient.transaction.findUnique({ where: {
                id
            } });
    }
    static update(id, newData) {
        return TransactionRepository.prismaClient.transaction.update({ where: {
                id
            }, data: newData });
    }
    static delete(id) {
        return TransactionRepository.prismaClient.$transaction(async (prisma) => {
            await prisma.product.updateMany({
                where: {
                    transactionsIds: { has: id }
                },
                data: {
                    transactionsIds: { set: [] }
                }
            });
            return prisma.transaction.delete({
                where: { id }
            });
        });
    }
}
export { TransactionRepository };
