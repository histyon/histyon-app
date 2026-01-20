'use client'

import { useActionState } from 'react' // Usa 'react-dom' se sei su Next 14 o inferiore
import { signup, SignupState } from '@/app/auth/actions'
import { ValidatedInput, GlobalLocationSelector } from '@/components/ui/FormElements'
import { DateOfBirthPicker } from '@/components/ui/DateOfBirthPicker'
import { AlertTriangle } from 'lucide-react'

// Stato iniziale del form
const initialState: SignupState = {
  status: 'idle',
  inputs: {}
}

export function RegisterForm() {
  // useActionState gestisce l'invio del form e la risposta del server (errori/successo)
  const [state, formAction] = useActionState(signup, initialState)

  return (
    <form action={formAction} className="space-y-8 pb-10" noValidate>
        
        {/* BOX ERRORI GENERALI (Es. Errore server generico) */}
        {state.status === 'error' && state.message && (
            <div className="mb-8 bg-red-50 border border-red-200 text-red-600 px-4 py-4 rounded-xl text-sm flex items-start gap-3 shadow-sm animate-in fade-in slide-in-from-top-2">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                <p className="font-bold">Attenzione</p>
                <p>{state.message}</p>
                </div>
            </div>
        )}

        {/* 1. ANAGRAFICA */}
        <section className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Anagrafica</h3>
            
            <div className="grid grid-cols-2 gap-4">
                <ValidatedInput 
                    name="firstName" 
                    label="Nome" 
                    placeholder="Es. Mario" 
                    pattern="^[a-zA-Z\s']+$"
                    errorMessage="Solo lettere consentite"
                    defaultValue={state.inputs?.firstName} // Mantiene il valore inserito
                    required 
                />
                <ValidatedInput 
                    name="lastName" 
                    label="Cognome" 
                    placeholder="Es. Rossi" 
                    pattern="^[a-zA-Z\s']+$"
                    errorMessage="Solo lettere consentite"
                    defaultValue={state.inputs?.lastName}
                    required 
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <ValidatedInput 
                    name="fiscalCode" 
                    label="Codice Fiscale" 
                    placeholder="RSSMRA..." 
                    className="uppercase font-mono" 
                    maxLength={16} 
                    pattern="^[a-zA-Z0-9]{16}$"
                    errorMessage="Deve essere di 16 caratteri alfanumerici"
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
                placeholder="Es. Roma" 
                defaultValue={state.inputs?.placeOfBirth}
                required 
                errorMessage="Campo obbligatorio" 
            />
        </section>

        {/* 2. RESIDENZA */}
        <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-4 mb-4">Residenza</h3>
            <GlobalLocationSelector /> 
        </section>

        {/* 3. PROFESSIONE */}
        <section className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Professione</h3>
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
        </section>

        {/* 4. CREDENZIALI */}
        <section className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Credenziali Accesso
            </h3>
            
            <ValidatedInput 
                name="email" 
                type="email" 
                label="Email Istituzionale" 
                placeholder="nome@ospedale.it" 
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" 
                errorMessage="Formato email non valido"
                defaultValue={state.inputs?.email}
                externalError={state.errors?.email} // ERRORE SERVER (Es. Già registrato)
                required 
            />
            
            <ValidatedInput 
                name="password" 
                type="password" 
                label="Password Sicura" 
                placeholder="••••••••" 
                pattern="^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$"
                errorMessage="Min 8 char, 1 Maiuscola, 1 Speciale (!@#), 1 Numero"
                defaultValue={state.inputs?.password}
                externalError={state.errors?.password}
                required 
            />
        </section>

        <button className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl shadow-black/10">
            Completa Registrazione
        </button>
    </form>
  )
}