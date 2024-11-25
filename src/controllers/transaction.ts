import { Request, Response } from "express";
import { Router } from 'express'
import { TransactionService } from "../services/transaction.js";
import { formFileMapper } from "../_utils/multer.js";

const TransactionRouter = Router()

async function getTransaction(request: Request, response: Response) {
  response.json(await TransactionService.getAll(response?.locals?.companyId));
}

function putTransaction(request: Request, response: Response) {
  response.json("Rota de teste com o método PUT");
}

async function postTransaction(request: Request, response: Response) {
  const transaction = request.body
  const transactionFile = request.file
  const companyId = response.locals.companyId

  response.json(await TransactionService.create({...transaction, companyId, file: transactionFile}));
}

function deleteTransaction(request: Request, response: Response) {
  response.json("Rota de teste com o método DELETE");
}

TransactionRouter.get("/", getTransaction)
TransactionRouter.put("/", putTransaction)
TransactionRouter.post("/", formFileMapper.single("file"), postTransaction)
TransactionRouter.delete("/", deleteTransaction)

export { TransactionRouter };
