import { PrismaClient } from "@prisma/client";
class CompanyRepository {
    static prismaClient = new PrismaClient().company;
    constructor() { }
    static create(company) {
        return this.prismaClient.create({ data: company });
    }
    static getAll() {
        return this.prismaClient.findMany();
    }
    static getByEmailAndPassword(email, password) {
        return this.prismaClient.findUnique({ where: {
                email,
                password
            } });
    }
    static getByEmail(email) {
        return this.prismaClient.findUnique({ where: {
                email
            } });
    }
    static getById(id) {
        return this.prismaClient.findUnique({ where: {
                id
            } });
    }
    static update(id, newData) {
        return this.prismaClient.update({ where: {
                id
            }, data: newData });
    }
    static delete(id) {
        return this.prismaClient.delete({ where: { id } });
    }
}
export { CompanyRepository };
