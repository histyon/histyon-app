'use client'

import { useState, useActionState } from 'react'
import { signup, SignupState } from '@/lib/actions/auth'
import { ValidatedInput, GlobalLocationSelector, PhoneInput } from '@/components/ui/FormElements'
import { DateOfBirthPicker } from '@/components/ui/DateOfBirthPicker'
import { AlertTriangle, ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { REGEX_VALIDATORS } from '@/lib/constants'

const initialState: SignupState = {
  status: 'idle',
  inputs: {}
}

export function RegisterForm() {
  const [state, formAction] = useActionState(signup, initialState)
  const [currentStep, setCurrentStep] = useState(1)

  // funzioni di navigazione (scrollano in cima al form quando cambi step)
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  return (
    <form action={formAction} className="flex flex-col h-full" noValidate>
        
        <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
                <span className={currentStep >= 1 ? "text-black" : ""}>Step 1</span>
                <span className="w-4 h-[1px] bg-gray-200"></span>
                <span className={currentStep >= 2 ? "text-black" : ""}>Step 2</span>
                <span className="w-4 h-[1px] bg-gray-200"></span>
                <span className={currentStep >= 3 ? "text-black" : ""}>Step 3</span>
            </div>
            <h2 className="text-2xl font-bold">
                {currentStep === 1 && "Anagrafica"}
                {currentStep === 2 && "Residenza"}
                {currentStep === 3 && "Professione & Account"}
            </h2>
        </div>

        {state.status === 'error' && state.message && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-4 rounded-xl text-sm flex items-start gap-3 shadow-sm animate-in fade-in slide-in-from-top-2">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                <p className="font-bold">Attenzione</p>
                <p>{state.message}</p>
                </div>
            </div>
        )}

        <div className="flex-1 overflow-y-auto pr-1 pb-4 space-y-6">
            
            <div className={currentStep === 1 ? 'block space-y-6 animate-in fade-in slide-in-from-right-4 duration-300' : 'hidden'}>
                <div className="grid grid-cols-2 gap-4">
                    <ValidatedInput 
                        name="firstName" 
                        label="Nome" 
                        pattern={REGEX_VALIDATORS.NAME}
                        errorMessage="Solo lettere"
                        defaultValue={state.inputs?.firstName} 
                        required 
                    />
                    <ValidatedInput 
                        name="lastName" 
                        label="Cognome" 
                        pattern={REGEX_VALIDATORS.NAME}
                        errorMessage="Solo lettere"
                        defaultValue={state.inputs?.lastName}
                        required 
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <ValidatedInput 
                        name="fiscalCode" 
                        label="Codice Fiscale" 
                        className="uppercase font-mono" 
                        maxLength={16} 
                        pattern={REGEX_VALIDATORS.FISCAL_CODE}
                        errorMessage="16 car. alfanumerici"
                        defaultValue={state.inputs?.fiscalCode}
                        required 
                    />
                    
                    <div className="relative">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Sesso *</label>
                        <select 
                            name="gender" 
                            required 
                            defaultValue={state.inputs?.gender || ""} 
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl appearance-none cursor-pointer outline-none focus:ring-4 focus:ring-gray-100 focus:border-black transition-all"
                        >
                            <option value="" disabled>Seleziona</option>
                            <option value="M">Maschio</option>
                            <option value="F">Femmina</option>
                        </select>
                    </div>
                </div>
                
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Data di nascita *</label>
                    <DateOfBirthPicker name="dob" />
                </div>

                <ValidatedInput 
                    name="placeOfBirth" 
                    label="Luogo di Nascita" 
                    defaultValue={state.inputs?.placeOfBirth}
                    required 
                    errorMessage="Obbligatorio" 
                />

                <PhoneInput label="Telefono Cellulare" />
            </div>

            <div className={currentStep === 2 ? 'block space-y-6 animate-in fade-in slide-in-from-right-4 duration-300' : 'hidden'}>
                <GlobalLocationSelector /> 
            </div>

            <div className={currentStep === 3 ? 'block space-y-6 animate-in fade-in slide-in-from-right-4 duration-300' : 'hidden'}>
                <div className="grid grid-cols-2 gap-4">
                    <ValidatedInput 
                        name="medicalLicense" 
                        label="N. Ordine" 
                        placeholder="Es. 12345/RM" 
                        defaultValue={state.inputs?.medicalLicense}
                        required 
                        errorMessage="Obbligatorio" 
                    />
                    <ValidatedInput 
                        name="hospitalName" 
                        label="Struttura" 
                        placeholder="Es. Policlinico..." 
                        defaultValue={state.inputs?.hospitalName}
                        required 
                        errorMessage="Obbligatorio" 
                    />
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        Credenziali Accesso
                    </h3>
                    
                    <ValidatedInput 
                        name="email" 
                        type="email" 
                        label="Email Istituzionale" 
                        pattern={REGEX_VALIDATORS.EMAIL}
                        errorMessage="Email non valida"
                        defaultValue={state.inputs?.email}
                        externalError={state.errors?.email}
                        required 
                    />
                    
                    <ValidatedInput 
                        name="password" 
                        type="password" 
                        label="Password Sicura" 
                        pattern={REGEX_VALIDATORS.PASSWORD}
                        errorMessage="Min 8 char, 1 Maiusc, 1 Num"
                        defaultValue={state.inputs?.password}
                        externalError={state.errors?.password}
                        required 
                    />
                </div>
            </div>

        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3">
            
            {currentStep > 1 && (
                <button 
                    type="button" 
                    onClick={prevStep}
                    className="flex-1 bg-white text-gray-900 border border-gray-200 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Indietro
                </button>
            )}

            {currentStep < 3 ? (
                <button 
                    type="button" 
                    onClick={nextStep}
                    className="flex-[2] bg-black text-white py-3.5 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                    Avanti <ArrowRight className="w-4 h-4" />
                </button>
            ) : (
                <button 
                    type="submit"
                    className="flex-[2] bg-black text-white py-3.5 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                    Completa Registrazione <Check className="w-4 h-4" />
                </button>
            )}
        </div>
    </form>
  )
}