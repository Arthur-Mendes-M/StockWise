import { Bell, Search, HelpCircle } from 'lucide-react'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Logo from '@/components/Logo'
import { Button } from './ui/button'
import Link from 'next/link'
import { useState } from 'react'
import { SearchBar } from './Search'

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    return (
        <>
            <header className="container flex h-14 gap-5 items-center justify-between sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="hidden lg:flex lg:gap-2 lg:flex-1 lg:justify-between">
                    <div className="flex items-center">
                        <h1 className="hidden text-xl font-bold sm:inline-block">Dashboard</h1>
                    </div>

                    <nav className="flex items-center text-sm font-medium gap-4">
                        <Link className="transition-colors hover:text-foreground/80 text-foreground h-full px-2 flex items-center" href="/">Dashboard</Link>
                        <NavigationMenu>
                            <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Produtos</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <li className="row-span-3">
                                        <NavigationMenuLink asChild>
                                            <Link
                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                            href="/virtualstock"
                                            >
                                            <div className="mb-2 mt-4 text-lg font-medium">
                                                Gerencie o seu estoque de <span className='text-green-600'>forma inteligente</span>
                                            </div>
                                            <p className="text-sm leading-tight text-muted-foreground font-normal">
                                                Use o <span className='text-green-600 italic'>Virtual Stock</span> para organizar o seu estoque físico de forma digital!
                                            </p>
                                            </Link>
                                        </NavigationMenuLink>
                                        </li>
                                        <li>
                                        <NavigationMenuLink asChild>
                                            <Link href="/stock">
                                                <h3>Estoque</h3>
                                                <p className='font-light text-[0.8rem]'>Consulte, exclua ou atualize todos os produtos já cadastrados! Aproveite e cadastre novos.</p>
                                            </Link>
                                        </NavigationMenuLink>
                                        </li>
                                        <li>
                                        <NavigationMenuLink asChild>
                                            <Link href="/purchases">
                                                <h3>Compras</h3>
                                                <p className='font-light text-[0.8rem]'>Analise os pedidos de fornecimentos que foram efetuados e entenda os produtos mais comprados.</p>    
                                            </Link>
                                        </NavigationMenuLink>
                                        </li>
                                        <li>
                                        <NavigationMenuLink asChild>
                                            <Link href="/seles">
                                                <h3>Vendas</h3>
                                                <p className='font-light text-[0.8rem]'>Aumente seus lucros após entender todas as vendas já feitas até o momento.</p>
                                            </Link>
                                        </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                        <Link className="transition-colors hover:text-foreground/80 text-foreground h-full px-2 flex items-center" href="/reports">Relatórios</Link>
                        <Link className="transition-colors hover:text-foreground/80 text-foreground h-full px-2 flex items-center" href="/employees">Funcionários</Link>
                    </nav>
                </div>

                <div className="flex flex-1 items-center justify-between gap-2 md:justify-end md:flex-initial">
                    <div className="w-full flex-1 md:w-auto md:flex-initial">
                        <button onClick={() => setIsSearchOpen(true)} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9">
                            <Search className="h-5 w-5" />
                            <span className="sr-only">Pesquisar</span>
                        </button>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full" size="icon">
                            <Bell className="h-5 w-5" />
                            <span className="sr-only">Toggle notifications</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                            
                            <DropdownMenuSeparator />

                            <DropdownMenuItem>Novo pedido de fornecimento recebido</DropdownMenuItem>
                            <DropdownMenuItem>Produto sem estoque</DropdownMenuItem>
                            <DropdownMenuItem>Relatório criado</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full"
                        size="icon"
                    >
                        <HelpCircle className="h-5 w-5" />
                        <span className="sr-only">Help</span>
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full max-h-full" size="icon">
                            <Logo version='short' className='h-[60%]' image={{className: "w-full h-full"}} />
                            <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link href='/settings'>Configurações</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            {isSearchOpen && <SearchBar handleSearchModalFunction={setIsSearchOpen} />}
        </>
    )
}