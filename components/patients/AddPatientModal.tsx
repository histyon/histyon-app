'use client'

import { useState } from 'react'
import { Plus, X, User, MapPin, AlertCircle, Phone } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { addPatient } from '@/lib/actions/patient'
import { DateOfBirthPicker } from '@/components/ui/DateOfBirthPicker'
import { ValidatedInput, GlobalLocationSelector, PhoneInput } from '@/components/ui/FormElements'

// funzione di gestione del bottone
function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button disabled={pending} className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 disabled:opacity-50 mt-6 shadow-lg">
      {pending ? 'Salvataggio...' : 'Crea Cartella Paziente'}
    </button>
  )
}

// modulo di aggiunta pazienti
export function AddPatientModal() {
  // stabilisce se è aperto o no, quindi mostrarlo o no
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // sul click del bottone di aggiunta richiama la funzione addPatient, se va a buon fine chiude la finestra, senno mostra errore
  async function handleSubmit(formData: FormData) {
     setError(null) // Resetta errore precedente
     const res = await addPatient(null, formData);
     
     if(res?.success) {
        setIsOpen(false);
        setError(null);
     }
     
     if(res?.error) {
        // Qui gestiamo l'errore visivamente invece dell'alert
        setError(res.error);
     }
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

        {/* BOX ERRORE ROSSO - STILE SITO */}
        {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-3 shadow-sm animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
        )}

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
            
            <div className="grid grid-cols-2 gap-4">
                <ValidatedInput name="placeOfBirth" label="Luogo di Nascita" required />
                <ValidatedInput name="email" label="Email (Opzionale)" type="email" />
            </div>

            <PhoneInput />

          </div>

          <hr className="border-gray-100" />

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