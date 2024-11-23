import { Router } from "express";
import { VirtualStockService } from "../services/virtualStock.js";
const VirtualStockRouter = Router();
async function getVirtualStock(request, response) {
    const companyId = response.locals.companyId;
    response.json(await VirtualStockService.getAll(companyId));
}
async function putVirtualStock(request, response) {
    const receivedData = request.body;
    // const productFormData: VirtualStockObjectType = {
    //   ...receivedData,
    //   companyId,
    //   products: receivedData?.products ?? [],
    //   productsIds: receivedData?.productsIds ?? [],
    // }
    // const validations = VirtualStockObjectValidator.safeParse(productFormData)
    // console.log(validations)
    // if(!validations.success) {
    //   response.status(400).json(...validations.error.issues)
    //   return
    // }
    console.log("Recebido:");
    console.log(receivedData);
    response.json(await VirtualStockService.update(receivedData?.id ?? "", receivedData));
}
async function postVirtualStock(request, response) {
    const stock = request.body;
    const companyId = response.locals.companyId;
    response.json(await VirtualStockService.create({ ...stock, companyId }));
}
async function deleteVirtualStock(request, response) {
    const id = request.params.id;
    response.json(await VirtualStockService.delete(id));
}
VirtualStockRouter.get("/", getVirtualStock);
VirtualStockRouter.put("/", putVirtualStock);
VirtualStockRouter.post("/", postVirtualStock);
VirtualStockRouter.delete("/:id", deleteVirtualStock);
export { VirtualStockRouter };
