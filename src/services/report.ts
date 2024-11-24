import { Report } from "@prisma/client"
import { ReportRepository } from "../repositories/report.js"
// import { VirtualStockObjectValidator, VirtualStockObjectType, VirtualStockObjectReceivedType } from "../_validations/VirtualStock.js"
import { codeGenerator } from "../_utils/stringGenerator.js"
import { getPublicReportUrl, uploadReportFiles } from "../_utils/supabase.js"

type ReceivedReportDTO = Omit<Report, 'id' | 'createdAt' | 'fileUrl'> & {file: any}
type ReportToSaveDTO = Omit<Report, 'id'>
abstract class ReportService {
  static repository = ReportRepository

  constructor() { }

  static async create(report: ReceivedReportDTO) {
    const {file, ...cleanReport} = report

    const formattedReport: ReportToSaveDTO = {
        ...cleanReport,
        createdAt: new Date(),
        fileUrl: null
    }

    const savedReport = await this.repository.create(formattedReport) 
    const fileName = `${savedReport?.id}.pdf`

    await uploadReportFiles(fileName, file)
    const reportPublicUrl = getPublicReportUrl(fileName)

    const {companyId, id, createdAt, ...cleanSavedReport} = savedReport
    const reportUpdatedToSave = {
        ...cleanSavedReport,
        fileUrl: reportPublicUrl
    }

    await this.repository.update(savedReport?.id, reportUpdatedToSave)
  }

  static async getAll(companyId: string) {
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

  static async update(receivedId: string, newData: ReceivedReportDTO) {
    // const productsIds = newData.products.map(prod => {return {id: prod?.id}})

    // const {id, ...cleanVirtualStock} = newData

    // return await this.repository.update(receivedId, cleanVirtualStock, productsIds)

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

export { ReportService }