import { Request, Response } from "express";
import { Router } from "express";
import { ClientService } from "../services/client.js";

const ClientRouter = Router();

async function getClient(request: Request, response: Response) {
  response.json(await ClientService.getAll(response.locals.companyId));
}

async function putClient(request: Request, response: Response) {
  response.json("Rota de teste com o método PUT");
}

async function postClient(request: Request, response: Response) {
  response.json(await ClientService.create({
    name: request.body.name,
    email: request.body.email,
    companyId: response.locals.companyId,
    createdAt: new Date()
  }));
}

async function deleteClient(request: Request, response: Response) {
  response.json(await ClientService.delete(request.params.id));
}

ClientRouter.get("/", getClient);
ClientRouter.put("/", putClient);
ClientRouter.post("/", postClient);
ClientRouter.delete("/:id", deleteClient);

export { ClientRouter };
