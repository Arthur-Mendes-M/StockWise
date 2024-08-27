"use client"

import { ChangeEvent, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, ArrowLeft, ArrowRight, Check } from "lucide-react"
import Link from "next/link"
import Logo from "@/components/Logo"

function previewPhoto(ev: ChangeEvent<HTMLInputElement>) {
    const inputFile = ev.currentTarget
    if(!inputFile) return null

    const files = inputFile?.files
    if(!files) return null

    const file = files[0]

    const labelParent = inputFile.parentElement?.querySelector('img')
    if(!labelParent) return null

    labelParent.src = URL.createObjectURL(file)
    labelParent.style.objectFit = 'cover'
    labelParent.classList.remove('hidden')
}

const steps = [
  { id: 1, name: "Sobre" },
  { id: 2, name: "Endereço" },
  { id: 3, name: "Contatos" },
  { id: 4, name: "Senha" },
  { id: 5, name: "Validação" },
]

export default function Component() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <Label htmlFor="dropzone-file"  className="flex flex-col items-center justify-center relative overflow-hidden w-full h-64 border-2 p-2 text-center border-green-300 border-dashed rounded-lg cursor-pointer bg-green-50 hover:bg-green-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-green-400" />
                  <p className="mb-2 text-sm text-green-500">
                    <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
                  </p>
                  <p className="text-xs text-green-500">SVG, PNG, JPG ou GIF (MAX. 800x400px)</p>

                  <Image src="/ShortStockWiseLogo.svg" alt="Avatar" className="hidden absolute inset-0 w-full h-full" height={300} width={400} />
                </div>
                <Input 
                    id="dropzone-file" 
                    type="file" className="hidden" 
                    onChange={previewPhoto}
                />
              </Label>
            </div>
            <div>
              <Label htmlFor="company-name">Nome da Empresa <span className="text-red-400 font-bold" title="Campo obrigatório">*</span></Label>
              <Input id="company-name" name="companyName" required onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="company-description">Descrição da Empresa</Label>
              <Textarea id="company-description" name="companyDescription" onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="cnpj">CNPJ <span className="text-red-400 font-bold" title="Campo obrigatório">*</span></Label>
              <Input id="cnpj" name="cnpj" required onChange={handleInputChange} />
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cep">CEP <span className="text-red-400 font-bold" title="Campo obrigatório">*</span></Label>
              <Input id="cep" name="cep" required onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="street">Rua <span className="text-red-400 font-bold" title="Campo obrigatório">*</span></Label>
              <Input id="street" name="street" required onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="neighborhood">Bairro <span className="text-red-400 font-bold" title="Campo obrigatório">*</span></Label>
              <Input id="neighborhood" name="neighborhood" required onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="number">Número <span className="text-red-400 font-bold" title="Campo obrigatório">*</span></Label>
              <Input id="number" name="number" required onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="state">Estado <span className="text-red-400 font-bold" title="Campo obrigatório">*</span></Label>
              <Input id="state" name="state" required onChange={handleInputChange} />
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="email1">Email 1 <span className="text-red-400 font-bold" title="Campo obrigatório">*</span></Label>
              <Input id="email1" name="email1" type="email" required onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="email2">Email 2</Label>
              <Input id="email2" name="email2" type="email" onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="phone1">Telefone fixo 1 <span className="text-red-400 font-bold" title="Campo obrigatório">*</span></Label>
              <Input id="phone1" name="phone1" type="tel" required onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="phone2">Telefone fixo 2</Label>
              <Input id="phone2" name="phone2" type="tel" onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input id="whatsapp" name="whatsapp" type="tel" onChange={handleInputChange} />
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="password">Senha <span className="text-red-400 font-bold" title="Campo obrigatório">*</span></Label>
              <Input id="password" name="password" type="password" required onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirmar Senha <span className="text-red-400 font-bold" title="Campo obrigatório">*</span></Label>
              <Input id="confirm-password" name="confirmPassword" type="password" required onChange={handleInputChange} />
            </div>
          </div>
        )
      case 5:
        return (
            <div 
                className="space-y-4"
            >
            <Button
                type="button"
                className="w-full border-2 border-solid border-green-600 text-green-600 bg-transparent hover:bg-green-600 hover:text-white"
            >
              Enviar código por email
            </Button>
            <div>
              <Label htmlFor="confirmation-code">Código de confirmação <span className="text-red-400 font-bold" title="Campo obrigatório">*</span></Label>
              <Input id="confirmation-code" name="confirmationCode" required onChange={handleInputChange} />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen bg-green-50">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col gap-3 items-center text-center">
            <Logo version="completed" image={{height: 45, width: 45}} className="text-3xl" />
            <h2 className="mt-6 text-2xl font-bold text-green-800">Criar uma conta empresarial</h2>
          </div>
          <div className="mb-8">
            <nav aria-label="Progress">
              <ol role="list" className="relative flex items-center justify-between">
                <span className="w-full h-[2px] absolute inset-0 flex items-center bg-green-600 top-2/4" ></span>
                {steps.map((step, stepIdx) => (
                  <li key={step.name} className="relative">
                    {/* <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className={`h-0.5 w-full ${currentStep > step.id ? 'bg-green-600' : 'bg-green-200'}`} />
                    </div> */}
                    <div className={`relative w-8 h-8 flex items-center justify-center rounded-full ${
                      currentStep > step.id ? 'bg-green-600' : currentStep === step.id ? 'bg-green-600' : 'bg-white border-2 border-green-300'
                    }`}>
                      {currentStep > step.id ? (
                        <Check className="w-5 h-5 text-white" aria-hidden="true" />
                      ) : (
                        <span className={`${currentStep === step.id ? 'text-white' : 'text-green-500'}`}>{step.id}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
          
          <form className="mt-8 space-y-6"> 
            {renderStepContent()}
            <div className="flex justify-between gap-2 flex-wrap">
                {
                    currentStep === 1 ? (
                        <Link
                            href="/"
                            className="grow-[10] md:grow-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >Login</Link>
                    ) :
                    (
                        <Button
                            type="button"
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className="grow-[10] md:grow-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar
                        </Button>
                    )
                }

                {
                    currentStep === 5 ? (
                        <Button
                            type="button"
                            onClick={nextStep}
                            className="grow-[10] inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                        Confirmar código
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button> 
                    ) :
                    (
                        <Button
                            type="button"
                            onClick={nextStep}
                            disabled={currentStep === 5}
                            className="grow-[10] md:grow-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Avançar
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    )
                }
            </div>
          </form>
        </div>
      </div>
      
      <div className="hidden md:block w-1/2 bg-cover bg-center max-h-screen sticky top-0">
        <Image
          src="/boxes.svg"
          alt="Caixas de estoque"
          width={300}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}