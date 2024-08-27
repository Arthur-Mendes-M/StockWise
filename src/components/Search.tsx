import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, XIcon } from "lucide-react"

type SearchBarProps = {
    handleSearchModalFunction: (open: boolean) => void
}

function SearchBar({handleSearchModalFunction}: SearchBarProps) {

    return (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
                <div className="flex flex-col items-start gap-2">
                    <h2 className="text-lg font-semibold">Pesquisar no sistema</h2>
                    <p className="text-sm text-muted-foreground">
                        Insira o que deseja encontrar no sistema, no campo a baixo
                    </p>
                </div>
                
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search" className="pl-8" autoFocus />
                </div>

                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <p>Sem pesquisas recentes</p>
                </div>
                
                <Button
                    className="absolute right-4 top-4"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleSearchModalFunction(false)}
                >
                    <XIcon />
                </Button>
            </div>
        </div>
    )
}

export { SearchBar }