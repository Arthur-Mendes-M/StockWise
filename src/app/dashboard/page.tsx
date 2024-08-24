import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
    return (
        <>
            <h1>Dashboard</h1>
            <Link href="/" className="flex gap-2">
                Voltar para a página inicial
                <ArrowRightIcon />
            </Link>
        </>
    )
}