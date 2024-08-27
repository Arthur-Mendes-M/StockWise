'use client'

import { ShoppingCart, Package, Users, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import Header from '@/components/Header'

const salesData = [
  { name: 'Jan', sales: 4000, purchases: 2400 },
  { name: 'Feb', sales: 3000, purchases: 1398 },
  { name: 'Mar', sales: 2000, purchases: 9800 },
  { name: 'Apr', sales: 2780, purchases: 3908 },
  { name: 'May', sales: 1890, purchases: 4800 },
  { name: 'Jun', sales: 2390, purchases: 3800 },
  { name: 'Jul', sales: 3490, purchases: 4300 },
]

const monthlySalesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de vendas em 2024
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 30.520</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de vendas hoje
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.012</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from yesterday
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de vendas</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">115</div>
              <p className="text-xs text-muted-foreground">
                +19% from last hour
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de vendas nessa semana
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">870</div>
              <p className="text-xs text-muted-foreground">
                +201 since last week
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-8">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Vendas / Compras</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="purchases" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Vendas por mês</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlySalesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-8">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Produtos em falta</CardTitle>
            </CardHeader>
            <CardContent className='px-4'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Casaco vermelho</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell className="text-red-500">Esgotado</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Espada do rei Arthur</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell className="text-red-500">Esgotado</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Óculos de uma marca...</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell className="text-red-500">Esgotado</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Produtos com baixo estoque</CardTitle>
            </CardHeader>
            <CardContent className='px-4'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Smart watch Xiaomi</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell className="text-yellow-500">Baixo</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Camisa básica azul</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell className="text-yellow-500">Baixo</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Telefone fixo antigo</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell className="text-yellow-500">Baixo</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}