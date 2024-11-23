import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.POSTGRE_BASE_URL ?? "", process.env.POSTGRE_DATABASE_KEY ?? "");
const uploadCompanyPhoto = async (fileName, file) => {
    const { data, error } = await supabase.storage.from('stock_images').upload(`company/${fileName}`, file.buffer, {
        contentType: file.mimetype
    });
    return data ?? error;
};
const getPublicCompanyPhotoUrl = (fileName) => {
    return supabase
        .storage
        .from('stock_images')
        .getPublicUrl(`company/${fileName}`)?.data?.publicUrl;
};
const updateCompanyPhoto = async (currentFileName, newFile) => {
    const { data, error } = await supabase.storage.from("stock_images").update(currentFileName, newFile.buffer, { upsert: true });
    return data ?? error;
};
const uploadProductImages = async (fileName, file) => {
    const { data, error } = await supabase.storage.from('stock_images').upload(`product/${fileName}`, file.buffer, {
        contentType: file.mimetype ?? file.type
    });
    return data ?? error;
};
const getPublicProductPhotoUrl = (fileName) => {
    return supabase
        .storage
        .from('stock_images')
        .getPublicUrl(`product/${fileName}`)?.data?.publicUrl;
};
const updateProductPhoto = async (currentFileName, newFile) => {
    const { data, error } = await supabase.storage.from("stock_images").update(currentFileName, newFile.buffer, { upsert: true });
    return data ?? error;
};
export { uploadCompanyPhoto, getPublicCompanyPhotoUrl, updateCompanyPhoto, uploadProductImages, getPublicProductPhotoUrl, updateProductPhoto };
