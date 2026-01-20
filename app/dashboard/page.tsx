import { createClient } from '@/lib/supabase/server'
import { AddPatientModal } from '@/components/patients/AddPatientModal'
import { PatientList } from '@/components/patients/PatientList'
import { Search, User, FileClock } from 'lucide-react'

// forza aggiornamento dei dati dal db
export const dynamic = 'force-dynamic' 

export default async function Dashboard() {
  // connessione al db e prendo i dati del medico loggato
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  //  prendo i dati dei pazienti del medico loggato
  const { data: patients } = await supabase
    .from('patients')
    .select('*')
    .eq('doctor_id', user!.id)
    .order('created_at', { ascending: false })

  return (
    <main className="max-w-7xl mx-auto p-6 space-y-8 w-full">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold mb-1">Pazienti & Analisi</h1>
          <p className="text-gray-500">Gestisci le anagrafiche e avvia nuove analisi.</p>
        </div>
        <AddPatientModal />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <User className="w-5 h-5" />
            <span className="text-sm font-medium">Pazienti Registrati</span>
          </div>
          <div className="text-3xl font-bold">{patients?.length || 0}</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm opacity-60">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <FileClock className="w-5 h-5" />
            <span className="text-sm font-medium">Analisi Totali</span>
          </div>
          <div className="text-3xl font-bold">0</div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden min-h-[400px]">
        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex gap-4">
          <Search className="w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Cerca paziente..." className="bg-transparent outline-none text-sm w-full" />
        </div>

        {!patients || patients.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <User className="w-12 h-12 mb-2 opacity-20" />
            <p>Nessun paziente trovato.</p>
            <p className="text-xs">Aggiungi il primo paziente per iniziare.</p>
          </div>
        ) : (
          <PatientList patients={patients} />
        )}
      </div>
    </main>
  )
}