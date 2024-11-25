import { Transaction } from "@prisma/client"
import { TransactionRepository } from "../repositories/transaction.js"
import { TransactionObjectValidator, TransactionObjectType, TransactionObjectReceivedType } from "../_validations/Transaction.js"
import { getPublicTransactionUrl, uploadTransactionFile } from "../_utils/supabase.js"

type TransactionReceivedDTO = Omit<Transaction, 'id'>

type OrderType = {
  id: string
}

abstract class TransactionService {
  static repository = TransactionRepository

  constructor() { }

  static async create(transaction: TransactionObjectReceivedType) {
    const transactionProducts = JSON.parse(transaction.products)

    const formattedTransaction: TransactionObjectReceivedType = {
      ...transaction,
      createdAt: new Date(),
      fileUrl: null,
      productsIds: transactionProducts.map((order: OrderType) => {return order.id}),
      orders: transaction.orders,
      total: Number(transaction.total)
    }
    
    const {products, file, ...cleanFormattedTransaction} = formattedTransaction
    const formattedProducts: string[] = JSON.parse(transaction.orders)

    const savedTransaction = await this.repository.create(cleanFormattedTransaction, formattedProducts)
    const fileName = `${savedTransaction?.id}.pdf`

    await uploadTransactionFile(fileName, file)
    const savedTransactionFileUrl = getPublicTransactionUrl(fileName)

    return await this.repository.update(savedTransaction?.id, {fileUrl: savedTransactionFileUrl})
  }

  static getAll(companyId: string) {
    const result = this.repository.getAll(companyId).then(data => data).catch(error => error)
    
    if("error" in result) {
      return {
        isError: true, 
        ...result
      }
    }

    return result
  }

  static getById(id: string) {
    const result = this.repository.getById(
      id
    ).then(data => data).catch(error => error)
    
    if("error" in result) {
      return {
        isError: true, 
        ...result
      }
    }

    return result
  }

  static async update(id: string, newData: TransactionObjectReceivedType) {
    return null
  }

  static delete(id: string) {
    const result = this.repository.delete(
      id
    ).then(data => data).catch(error => error)
    
    if("error" in result) {
      return {
        isError: true, 
        ...result
      }
    }

    return result
  }
}

export { TransactionService }