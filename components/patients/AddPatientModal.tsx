'use client'

import { useState } from 'react'
import { Plus, X, User, MapPin } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { addPatient } from '@/lib/actions/patient'
import { DateOfBirthPicker } from '@/components/ui/DateOfBirthPicker'
import { ValidatedInput, GlobalLocationSelector } from '@/components/ui/FormElements'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button disabled={pending} className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 disabled:opacity-50 mt-6 shadow-lg">
      {pending ? 'Salvataggio...' : 'Crea Cartella Paziente'}
    </button>
  )
}

export function AddPatientModal() {
  const [isOpen, setIsOpen] = useState(false)
  
  async function handleSubmit(formData: FormData) {
     const res = await addPatient(null, formData);
     if(res?.success) setIsOpen(false);
     if(res?.error) alert(res.error);
  }

  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-gray-900 transition-shadow shadow-sm">
        <Plus className="w-4 h-4" /> Nuovo Paziente
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto scrollbar-hide">
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-bold text-2xl tracking-tight">Anagrafica Paziente</h3>
            <p className="text-sm text-gray-500">Compilare tutti i campi obbligatori (*)</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"><X className="w-5 h-5" /></button>
        </div>

        <form action={handleSubmit} className="space-y-6">
          
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4" /> Identità
            </h4>
            <div className="grid grid-cols-2 gap-4">
                <ValidatedInput name="firstName" label="Nome" required />
                <ValidatedInput name="lastName" label="Cognome" required />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <ValidatedInput name="fiscalCode" label="CF" className="uppercase" maxLength={16} required />
                <div className="relative">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Sesso</label>
                    <select name="gender" required defaultValue="" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg appearance-none cursor-pointer outline-none">
                        <option value="" disabled>Seleziona</option>
                        <option value="M">Maschio</option>
                        <option value="F">Femmina</option>
                        <option value="OTHER">Altro</option>
                    </select>
                </div>
            </div>

            <div className="space-y-1">
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Data di nascita</label>
                 <DateOfBirthPicker name="dob" />
            </div>
            
            <ValidatedInput name="placeOfBirth" label="Luogo di Nascita" required />
          </div>

          <hr className="border-gray-100" />

          {/* RESIDENZA GLOBALE */}
          <div>
             <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4" /> Domicilio
            </h4>
            <GlobalLocationSelector />
          </div>

          <SubmitButton />
        </form>
      </div>
    </div>
  )
}