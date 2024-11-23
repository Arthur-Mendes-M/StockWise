import { TransactionRepository } from "../repositories/transaction.js";
class TransactionService {
    static repository = TransactionRepository;
    constructor() { }
    static async create(transaction) {
        const formattedTransaction = {
            ...transaction,
            createdAt: new Date(),
            fileUrl: null,
            productsIds: transaction.products.map(order => { return order.product.id; }),
            orders: JSON.stringify(transaction.orders)
        };
        const { products, ...cleanFormattedTransaction } = formattedTransaction;
        return await this.repository.create(cleanFormattedTransaction, products);
    }
    static getAll(companyId) {
        const result = this.repository.getAll(companyId).then(data => data).catch(error => error);
        if ("error" in result) {
            return {
                isError: true,
                ...result
            };
        }
        return result;
    }
    static getById(id) {
        const result = this.repository.getById(id).then(data => data).catch(error => error);
        if ("error" in result) {
            return {
                isError: true,
                ...result
            };
        }
        return result;
    }
    static async update(id, newData) {
        return null;
    }
    static delete(id) {
        const result = this.repository.delete(id).then(data => data).catch(error => error);
        if ("error" in result) {
            return {
                isError: true,
                ...result
            };
        }
        return result;
    }
}
export { TransactionService };
