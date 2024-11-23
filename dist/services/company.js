import { CompanyRepository } from "../repositories/company.js";
import { getPublicCompanyPhotoUrl, updateCompanyPhoto, uploadCompanyPhoto } from "../_utils/supabase.js";
class CompanyService {
    static repository = CompanyRepository;
    constructor() { }
    static async create(company) {
        let result;
        const { image, ...companyWithoutImage } = company; // remove image key (selecting it and split in a variable) and create separete the other keys on 'companyWithoutImage'
        const createdAt = new Date();
        const companyFomated = { ...companyWithoutImage, photoUrl: null, createdAt };
        const companyFound = await this.repository.getByEmail(companyFomated.email);
        const companyExists = companyFound != null;
        if (companyExists) {
            return {
                isError: true,
                error: "Company email already exists!"
            };
        }
        result = await this.repository.create(companyFomated).then(data => data).catch(error => error);
        if ("error" in result) {
            return {
                isError: true,
                ...result
            };
        }
        if (image) {
            const allowedFileExtensions = [".jpg", ".png", ".jpeg"];
            const companyImageExtension = allowedFileExtensions.filter(extension => company?.image?.originalname?.includes(extension))[0];
            const companyImageName = result.id.concat(companyImageExtension);
            await uploadCompanyPhoto(companyImageName, company.image).then(data => data).catch(error => console.log(error));
            const companyPublicUrl = getPublicCompanyPhotoUrl(companyImageName);
            const { id, ...newCompanyData } = result;
            result = await this.repository.update(result.id, { ...newCompanyData, photoUrl: companyPublicUrl });
        }
        return result;
    }
    static async getAll() {
        const result = await this.repository.getAll().then(data => data).catch(error => error);
        if ("error" in result) {
            return {
                isError: true,
                ...result
            };
        }
        return result;
    }
    static getByEmailAndPassword(email, password) {
        const result = this.repository.getByEmailAndPassword(email, password).then(data => data).catch(error => error);
        if ("error" in result) {
            return {
                isError: true,
                ...result
            };
        }
        return result;
    }
    static getById(id) {
        const result = this.repository.getById(id).then(data => data).catch(error => error);
        if ("error" in result) {
            return {
                isError: true,
                ...result
            };
        }
        return result;
    }
    static async update(id, newData) {
        let result;
        const foundCompany = await this.getById(id);
        const createdAt = new Date();
        if (newData?.image) {
            const allwedFileExtensions = [".jpg", ".png", ".jpeg"];
            const founfCompanyImageExtension = allwedFileExtensions.filter(extension => foundCompany?.image?.originalname?.includes(extension))[0];
            const foundCompanyImageName = id.concat(founfCompanyImageExtension);
            await updateCompanyPhoto(foundCompanyImageName, newData.image);
            const newCompanyImageName = allwedFileExtensions.filter(extension => newData?.image?.originalname?.includes(extension))[0];
            const companyPublicUrl = getPublicCompanyPhotoUrl(newCompanyImageName);
            const { image, ...newCompanyDataFiltered } = newData;
            result = await this.repository.update(id, { ...newCompanyDataFiltered, photoUrl: companyPublicUrl, createdAt });
        }
        const { image, ...newCompanyDataFiltered } = newData;
        result = this.repository.update(id, { ...newCompanyDataFiltered, photoUrl: null, createdAt }).then(data => data).catch(error => error);
        if ("error" in result) {
            return {
                isError: true,
                ...result
            };
        }
        return result;
    }
    static delete(id) {
        const result = this.repository.delete(id).then(data => data).catch(error => error);
        if ("error" in result) {
            return {
                isError: true,
                ...result
            };
        }
        return result;
    }
}
export { CompanyService };
