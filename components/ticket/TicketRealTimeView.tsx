'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { HardDrive, Download, BrainCircuit, FileText, Server, AlertTriangle, RefreshCw, ArrowRight, XCircle } from 'lucide-react'
import { StatusTimeline } from '@/components/ticket/StatusTimeline'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function TicketRealtimeView({ initialTicket }: { initialTicket: any }) {
  const [ticket, setTicket] = useState(initialTicket)
  const supabase = createClient()
  const router = useRouter()

  // 1. NORMALIZZAZIONE STATO (Uppercase + Trim)
  const rawStatus = ticket.status || 'UPLOADING'
  const status = rawStatus.toUpperCase().trim()

  // 2. LOGICA BOOLEANA ROBUSTA
  const isError = ['ERROR', 'FAILED', 'FAIL'].includes(status)
  const isCompleted = status === 'COMPLETED'
  // Se non è errore e non è finito, è in corso (Queued, Uploading, Processing...)
  const isProcessing = !isError && !isCompleted

  // 3. REALTIME
  useEffect(() => {
    const channel = supabase.channel(`ticket-view-${ticket.id}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'tickets', filter: `id=eq.${ticket.id}` },
        (payload) => {
          setTicket(payload.new)
          if (payload.new.status === 'COMPLETED') router.refresh()
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [ticket.id, supabase, router])

  // 4. CLASSI BOX (Priorità assoluta a isError)
  const getBoxClasses = () => {
    if (isError) return 'bg-red-600 text-white shadow-xl shadow-red-500/20' // ROSSO
    if (isCompleted) return 'bg-green-600 text-white shadow-xl shadow-green-500/20' // VERDE
    if (status === 'PROCESSING') return 'bg-purple-600 text-white animate-pulse shadow-xl shadow-purple-500/20' // VIOLA
    if (status === 'QUEUED') return 'bg-yellow-400 text-yellow-950 shadow-xl shadow-yellow-500/20' // GIALLO
    return 'bg-gray-800 text-gray-300' // DEFAULT
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* TIMELINE */}
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm w-full">
         <StatusTimeline status={status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
         
         {/* COLONNA SX */}
         <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <HardDrive className="w-5 h-5" /> Dati Sorgente
                </h3>
                <div className="space-y-4 text-sm">
                    <div className="pb-3 border-b border-gray-50">
                        <p className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">Nome File</p>
                        <p className="font-mono text-gray-900 break-all bg-gray-50 p-2 rounded-lg border border-gray-100">
                           {ticket.file_name}
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Dimensione</p>
                            <p className="font-bold">{(ticket.file_size / (1024*1024)).toFixed(2)} MB</p>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Data</p>
                            <p className="font-medium" suppressHydrationWarning>
                                {new Date(ticket.created_at).toLocaleDateString('it-IT')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col h-full">
                <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Note Cliniche
                </h3>
                <div className="bg-yellow-50/50 p-4 rounded-xl border border-yellow-100 flex-grow break-words">
                    <p className="text-gray-700 text-sm italic leading-relaxed whitespace-pre-wrap">
                        {ticket.notes || "Nessuna nota clinica inserita."}
                    </p>
                </div>
            </div>
         </div>

         {/* COLONNA DX: BOX */}
         <div className="lg:col-span-2 h-full">
            <div className={`p-8 rounded-3xl h-full flex flex-col justify-between transition-colors duration-500 ease-in-out ${getBoxClasses()}`}>
                
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h3 className="font-bold text-2xl opacity-90">
                           {isError ? 'Errore Analisi' : isCompleted ? 'Risultati AI' : 'Stato Avanzamento'}
                        </h3>
                        <p className="text-sm opacity-70 mt-1 uppercase tracking-widest font-bold flex items-center gap-2">
                            {isError && <AlertTriangle className="w-4 h-4" />}
                            STATUS: {status === 'QUEUED' ? 'IN CODA' : status}
                        </p>
                    </div>
                    {isCompleted && (
                        <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-bold transition-all border border-white/10">
                            <Download className="w-4 h-4" /> Scarica JSON
                        </button>
                    )}
                </div>

                {/* --- CONTENUTO ERRORE --- */}
                {isError && (
                     <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 min-h-[300px] animate-in zoom-in duration-300">
                        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner border border-white/10">
                            <XCircle className="w-12 h-12 text-white" />
                        </div>
                        <div className="max-w-md w-full">
                            <p className="text-2xl font-bold mb-4">Processo Interrotto</p>
                            
                            <div className="bg-black/20 p-5 rounded-xl border border-white/10 text-left backdrop-blur-sm">
                                <p className="text-[10px] uppercase font-bold opacity-70 mb-2 tracking-wider">Dettagli Errore:</p>
                                <p className="font-mono text-sm leading-relaxed text-red-100">
                                    {ticket.ai_metadata?.error || "Errore sconosciuto. Il file potrebbe essere corrotto o il sistema non è riuscito a processarlo."}
                                </p>
                            </div>
                            
                            <Link 
                                href={`/dashboard/patient/${ticket.patient_id}?tab=analysis&upload=true`}
                                className="mt-8 inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition-all shadow-xl hover:scale-105"
                            >
                                <RefreshCw className="w-5 h-5" /> Genera Nuovo Ticket
                            </Link>
                        </div>
                     </div>
                )}

                {/* --- CONTENUTO COMPLETATO --- */}
                {isCompleted && (
                    <div className="space-y-6 animate-in fade-in flex-1">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/5">
                                <p className="opacity-70 text-xs uppercase font-bold">Confidence</p>
                                <p className="text-4xl font-bold mt-2">98.5%</p>
                            </div>
                            <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/5">
                                <p className="opacity-70 text-xs uppercase font-bold">Rilevamenti</p>
                                <p className="text-4xl font-bold mt-2">3</p>
                            </div>
                        </div>
                        <div className="bg-black/20 p-5 rounded-2xl font-mono text-xs overflow-auto max-h-64 border border-white/10 shadow-inner">
                            {JSON.stringify(ticket.ai_metadata || {}, null, 2)}
                        </div>
                    </div>
                )}

                {/* --- CONTENUTO PROCESSING --- */}
                {isProcessing && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 min-h-[300px]">
                        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner border border-white/10">
                            {status === 'PROCESSING' ? (
                                <BrainCircuit className="w-12 h-12 animate-pulse" />
                            ) : (
                                <Server className="w-12 h-12" />
                            )}
                        </div>
                        <div className="max-w-md">
                            <p className="text-2xl font-bold mb-3">
                                {status === 'QUEUED' ? 'In Coda sul Cloud' : 'Analisi in Corso'}
                            </p>
                            <p className="opacity-80 text-base leading-relaxed font-medium">
                                {status === 'QUEUED' 
                                    ? 'Il file è stato caricato. Attendiamo che l\'AI si liberi per iniziare.' 
                                    : 'Stiamo elaborando il tessuto. L\'operazione richiede circa 1-2 minuti.'}
                            </p>
                        </div>
                    </div>
                )}

            </div>
         </div>
      </div>
    </div>
  )
}