import { Client } from "@prisma/client"
import { ClientRepository } from "../repositories/client.js"

type ClientReceivedDTO = Omit<Client, 'id'>

abstract class ClientService {
  static repository = ClientRepository

  constructor() { }

  static async create(client: ClientReceivedDTO) {
    let result: Client;

    const clientFound = await this.repository.getByEmail(client.email)
    const clientExists = clientFound != null

    if(clientExists) {
      return {
        isError: true, 
        error: "Client email already exists!"
      } 
    }

    result = await this.repository.create(client)

    if("error" in result) {
      return {
        isError: true, 
        ...result
      }
    }

    return result
  }

  static async getAll(companyId: string) {
    const result = await this.repository.getAll(companyId)
    
    if("error" in result) {
      return {
        isError: true, 
        ...result
      }
    }

    return result
  }

  static getByEmail(email: string) {
    const result = this.repository.getByEmail(
      email
    )
    
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
    )
    
    if("error" in result) {
      return {
        isError: true, 
        ...result
      }
    }

    return result
  }

  static async update(id: string, newData: ClientReceivedDTO) {

    return null
  }

  static async delete(id: string) {
    const result = this.repository.delete(
      id
    )
    
    if("error" in result) {
      return {
        isError: true, 
        ...result
      }
    }

    return result
  }
}

export { ClientService }