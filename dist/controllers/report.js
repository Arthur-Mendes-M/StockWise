import { Router } from "express";
const ReportRouter = Router();
function getReport(request, response) {
    response.json("Rota de teste com o método GET");
}
function putReport(request, response) {
    response.json("Rota de teste com o método PUT");
}
function postReport(request, response) {
    response.json("Rota de teste com o método POST");
}
function deleteReport(request, response) {
    response.json("Rota de teste com o método DELETE");
}
ReportRouter.get("/", getReport);
ReportRouter.put("/", putReport);
ReportRouter.post("/", postReport);
ReportRouter.delete("/", deleteReport);
export { ReportRouter };
