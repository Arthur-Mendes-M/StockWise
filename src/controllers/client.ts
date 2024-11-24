import { Request, Response } from "express";
import { Router } from "express";

const ClientRouter = Router();

function getClient(request: Request, response: Response) {
  response.json("Rota de teste com o método GET");
}

function putClient(request: Request, response: Response) {
  response.json("Rota de teste com o método PUT");
}

function postClient(request: Request, response: Response) {
  response.json("Rota de teste com o método POST");
}

function deleteClient(request: Request, response: Response) {
  response.json("Rota de teste com o método DELETE");
}

ClientRouter.get("/", getClient);
ClientRouter.put("/", putClient);
ClientRouter.post("/", postClient);
ClientRouter.delete("/", deleteClient);

export { ClientRouter };
