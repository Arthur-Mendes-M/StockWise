"use server"

import { redirect } from "next/navigation";

async function navigate(path:string) {
    redirect(path)
}

export { navigate }