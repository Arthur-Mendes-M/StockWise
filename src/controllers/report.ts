import { Request, Response } from "express";
import { Router } from "express";
import { formFileMapper } from "../_utils/multer.js";
import { ReportService } from "../services/report.js";

const ReportRouter = Router();

async function getReport(request: Request, response: Response) {
  response.json(await ReportService.getAll(response.locals.companyId));
}

function putReport(request: Request, response: Response) {
  response.json("Rota de teste com o método PUT");
}

async function postReport(request: Request, response: Response) {
  const file = request.file
  const reportPeriod = request.body?.period
  const companyId = response.locals.companyId

  response.json(await ReportService.create({file, period: reportPeriod, companyId}));
}

function deleteReport(request: Request, response: Response) {
  response.json("Rota de teste com o método DELETE");
}

ReportRouter.get("/", getReport);
ReportRouter.put("/", putReport);
ReportRouter.post("/", formFileMapper.single("file"), postReport);
ReportRouter.delete("/", deleteReport);

export { ReportRouter };
