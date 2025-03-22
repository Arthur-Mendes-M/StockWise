import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.POSTGRE_BASE_URL ?? "", process.env.POSTGRE_DATABASE_KEY ?? "")

const uploadCompanyPhoto = async (fileName: string, file: any) => {
    const {data, error} = await supabase.storage.from('stock-images').upload(`company/${fileName}`, file.buffer, {
        contentType: file.mimetype
    })

    return data ?? error
}

const getPublicCompanyPhotoUrl = (fileName: string) => {
    return supabase
      .storage
      .from('stock-images')
      .getPublicUrl(`company/${fileName}`)?.data?.publicUrl
}

const updateCompanyPhoto = async (currentFileName: string, newFile: any) => {
    const {data, error} = await supabase.storage.from("stock-images").update(currentFileName, newFile.buffer, {upsert: true})

    return data ?? error
}


const uploadProductImages = async (fileName: string, file: any) => {
    const {data, error} = await supabase.storage.from('stock-images').upload(`product/${fileName}`, file.buffer, {
        contentType: file.mimetype ?? file.type
    })

    return data ?? error
}

const getPublicProductPhotoUrl = (fileName: string) => {
    return supabase
      .storage
      .from('stock-images')
      .getPublicUrl(`product/${fileName}`)?.data?.publicUrl
}

const updateProductPhoto = async (currentFileName: string, newFile: any) => {
    const {data, error} = await supabase.storage.from("stock-images").update(currentFileName, newFile.buffer, {upsert: true})

    return data ?? error
}

const uploadReportFiles = async (fileName: string, file: any) => {
    const {data, error} = await supabase.storage.from('stock-images').upload(`report/${fileName}`, file.buffer, {
        contentType: file.mimetype ?? file.type
    })

    return data ?? error
}

const getPublicReportUrl = (fileName: string) => {
    return supabase
      .storage
      .from('stock-images')
      .getPublicUrl(`report/${fileName}`)?.data?.publicUrl
}


const uploadTransactionFile = async (fileName: string, file: any) => {
    const {data, error} = await supabase.storage.from('stock-images').upload(`transaction/${fileName}`, file.buffer, {
        contentType: file.mimetype ?? file.type
    })

    return data ?? error
}

const getPublicTransactionUrl = (fileName: string) => {
    return supabase
      .storage
      .from('stock-images')
      .getPublicUrl(`transaction/${fileName}`)?.data?.publicUrl
}


const uploadVirtualStockTrackFile = async (fileName: string, file: any) => {
    const {data, error} = await supabase.storage.from('stock-images').upload(`virtualStock/${fileName}`, file.buffer, {
        contentType: file.mimetype ?? file.type
    })

    return data ?? error
}

const getPublicVirtualStockTrackUrl = (fileName: string) => {
    return supabase
      .storage
      .from('stock-images')
      .getPublicUrl(`virtualStock/${fileName}`)?.data?.publicUrl
}


export { uploadCompanyPhoto, getPublicCompanyPhotoUrl, uploadTransactionFile, getPublicTransactionUrl, updateCompanyPhoto, uploadProductImages, getPublicProductPhotoUrl, updateProductPhoto, uploadReportFiles, getPublicReportUrl, uploadVirtualStockTrackFile, getPublicVirtualStockTrackUrl }