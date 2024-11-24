import { Report, PrismaClient } from "@prisma/client"

type ReportDTO = Omit<Report, 'id'>
type ReportUpdateDTO = Omit<Report, 'id' | 'companyId' | 'createdAt'>

abstract class ReportRepository {
  // static prismaClient = new PrismaClient().report
  static prismaClient = new PrismaClient()

  constructor() {}

  static create(report: ReportDTO) {
    return ReportRepository.prismaClient.report.create({data: report})
  }

  static getAll(companyId: string) {
    return ReportRepository.prismaClient.report.findMany({where: {
      companyId
    }})
  }

  static getById(id: string) {
    return ReportRepository.prismaClient.report.findUnique({where: {
      id
    }})
  }

  static update(id: string, newData: ReportUpdateDTO) {
    return ReportRepository.prismaClient.report.update({where: {
      id
    }, data: newData})
  }

  static delete(id: string) {
    return ReportRepository.prismaClient.$transaction(async (prisma) => {
      return prisma.report.delete({
        where: {id}
      })
    })
  }
}

export { ReportRepository }