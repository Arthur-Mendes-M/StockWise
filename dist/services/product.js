import { ProductRepository } from "../repositories/product.js";
import { qrCodeFileGenerator } from "../_utils/qrcode.js";
import { codeGenerator } from "../_utils/stringGenerator.js";
import { getPublicProductPhotoUrl, updateProductPhoto, uploadProductImages, } from "../_utils/supabase.js";
class ProductService {
    static repository = ProductRepository;
    constructor() { }
    static async create(companyId, product) {
        let result;
        const code = codeGenerator();
        const qrCodeFile = await qrCodeFileGenerator(code);
        const currentDate = new Date();
        const { image, technicalDetails, ...cleanProduct } = product;
        const productToSave = {
            ...cleanProduct,
            code,
            createdAt: currentDate,
            updatedAt: currentDate,
            technicalDetails,
            trackUrl: null,
            photoUrl: null,
            companyId,
            transactionsIds: [],
            virtualStocksIds: [],
        };
        result = await this.repository.create(productToSave);
        const qrcodePhotoName = `qrcode_${code.replace("#", "")}.png`;
        await uploadProductImages(qrcodePhotoName, qrCodeFile)
            .then((data) => data)
            .catch((error) => console.log(error));
        const qrcodePublicUrl = getPublicProductPhotoUrl(qrcodePhotoName);
        if (image) {
            const allowedFileExtensions = [".jpg", ".png", ".jpeg"];
            const productImageExtension = allowedFileExtensions.filter((extension) => product?.image?.originalname?.includes(extension))[0];
            const productImageName = "photo_".concat(code.replace("#", ""), productImageExtension);
            await uploadProductImages(productImageName, product.image)
                .then((data) => data)
                .catch((error) => console.log(error));
            const productPublicUrl = getPublicProductPhotoUrl(productImageName);
            result = await this.repository.update(result.id, {
                ...productToSave,
                photoUrl: productPublicUrl,
                trackUrl: qrcodePublicUrl,
            });
        }
        else {
            result = await this.repository.update(result.id, {
                ...productToSave,
                photoUrl: null,
                trackUrl: qrcodePublicUrl,
            });
        }
        return result;
    }
    static async getAll(companyId, code) {
        if (code) {
            return await this.repository.getByCode(code, companyId);
        }
        else {
            return await this.repository.getAll(companyId);
        }
    }
    static getByEmailAndPassword(email, password) { }
    static getById(id) { }
    static async update(productId, newData) {
        let result;
        const foundProduct = await this.repository.getById(productId);
        const { id, companyId, image, ...cleanProductToSave } = {
            ...foundProduct,
            ...newData,
        };
        const productToSave = {
            ...cleanProductToSave,
            updatedAt: new Date(),
        };
        console.log(newData);
        if (newData?.image && foundProduct?.photoUrl != null) {
            const allowedFileExtensions = [".jpg", ".png", ".jpeg"];
            const productImageExtension = allowedFileExtensions.filter((extension) => newData?.image?.originalname?.includes(extension))[0];
            const productImageName = "photo_".concat(productToSave.code.replace("#", ""), productImageExtension);
            await updateProductPhoto(productImageName, newData?.image)
                .then((data) => data)
                .catch((error) => console.log(error));
            const productPublicUrl = getPublicProductPhotoUrl(productImageName);
            result = await this.repository.update(productId, {
                ...productToSave,
                photoUrl: productPublicUrl,
            });
        }
        else if (newData?.image && cleanProductToSave.photoUrl == null) {
            const allowedFileExtensions = [".jpg", ".png", ".jpeg"];
            // const productImageExtension = allowedFileExtensions.filter(extension => newData?.image?.originalname?.includes(extension))[0]
            const productImageExtension = allowedFileExtensions.filter((extension) => productToSave?.photoUrl?.includes(extension))[0];
            const productImageName = "photo_".concat(productToSave.code.replace("#", ""), productImageExtension);
            await updateProductPhoto(productImageName, newData?.image)
                .then((data) => data)
                .catch((error) => console.log(error));
            const productPublicUrl = getPublicProductPhotoUrl(productImageName);
            result = await this.repository.update(productId, {
                ...productToSave,
                photoUrl: productPublicUrl,
            });
        }
        else {
            result = await this.repository.update(productId, productToSave);
        }
        return result;
    }
    static async delete(id) {
        return await this.repository.delete(id);
    }
}
export { ProductService };
