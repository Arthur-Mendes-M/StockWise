import {Client, PrismaClient} from "@prisma/client"

type ClientDTO = Omit<Client, 'id'>

abstract class ClientRepository {
  static prismaClient = new PrismaClient().client

  constructor() {}

  static async create(client: ClientDTO) {
    return await this.prismaClient.create({data: client})
  }

  static async getAll(companyId: string) {
    return await this.prismaClient.findMany({
        where: {
            companyId
        }
    })
  }

  static getByEmail(email: string) {
    return this.prismaClient.findUnique({where: {
      email
    }})
  }

  static getById(id: string) {
    return this.prismaClient.findUnique({where: {
      id
    }})
  }

  static update(id: string, newData: ClientDTO) {
    return this.prismaClient.update({where: {
      id
    }, data: newData})
  }

  static delete(id: string) {
    return this.prismaClient.delete({where: {id}})
  }
}

export { ClientRepository }