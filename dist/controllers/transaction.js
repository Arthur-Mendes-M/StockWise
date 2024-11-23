import { Router } from 'express';
import { TransactionService } from "../services/transaction.js";
const TransactionRouter = Router();
async function getTransaction(request, response) {
    response.json(await TransactionService.getAll(response?.locals?.companyId));
}
function putTransaction(request, response) {
    response.json("Rota de teste com o método PUT");
}
async function postTransaction(request, response) {
    const transaction = request.body;
    const companyId = response.locals.companyId;
    response.json(await TransactionService.create({ ...transaction, companyId }));
}
function deleteTransaction(request, response) {
    response.json("Rota de teste com o método DELETE");
}
TransactionRouter.get("/", getTransaction);
TransactionRouter.put("/", putTransaction);
TransactionRouter.post("/", postTransaction);
TransactionRouter.delete("/", deleteTransaction);
export { TransactionRouter };
