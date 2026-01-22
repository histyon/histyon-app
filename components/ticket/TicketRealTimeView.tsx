'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { HardDrive, Download, BrainCircuit, FileText, Server, AlertTriangle, RefreshCw, XCircle, FileImage } from 'lucide-react'
import { StatusTimeline } from '@/components/ticket/StatusTimeline'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getPresignedDownloadUrl } from '@/lib/actions/storage'

export function TicketRealtimeView({ initialTicket }: { initialTicket: any }) {
  const [ticket, setTicket] = useState(initialTicket)
  const [isDownloading, setIsDownloading] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const rawStatus = ticket.status || 'UPLOADING'
  const status = rawStatus.toUpperCase().trim()

  const isError = ['ERROR', 'FAILED', 'FAIL'].includes(status)
  const isCompleted = status === 'COMPLETED'
  const isProcessing = !isError && !isCompleted

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

  const handleDownload = async () => {
    setIsDownloading(true)
    const outputFileName = ticket.ai_metadata?.output_file || `processed-${ticket.file_name}`
    
    const res = await getPresignedDownloadUrl(outputFileName, 'output')
    
    if (res.success && res.url) {
        window.open(res.url, '_blank')
    } else {
        alert("Errore nel download del file")
    }
    setIsDownloading(false)
  }

  const getBoxClasses = () => {
    if (isError) return 'bg-red-600 text-white shadow-xl shadow-red-500/20'
    if (isCompleted) return 'bg-green-600 text-white shadow-xl shadow-green-500/20'
    if (status === 'PROCESSING') return 'bg-purple-600 text-white animate-pulse shadow-xl shadow-purple-500/20'
    if (status === 'QUEUED') return 'bg-yellow-400 text-yellow-950 shadow-xl shadow-yellow-500/20'
    return 'bg-gray-800 text-gray-300'
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm w-full">
         <StatusTimeline status={status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
         
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

         <div className="lg:col-span-2 h-full">
            <div className={`p-8 rounded-3xl h-full flex flex-col justify-between transition-colors duration-500 ease-in-out ${getBoxClasses()}`}>
                
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h3 className="font-bold text-2xl opacity-90">
                           {isError ? 'Errore Analisi' : isCompleted ? 'Analisi Completata' : 'Stato Avanzamento'}
                        </h3>
                        <p className="text-sm opacity-70 mt-1 uppercase tracking-widest font-bold flex items-center gap-2">
                            {isError && <AlertTriangle className="w-4 h-4" />}
                            STATUS: {status === 'QUEUED' ? 'IN CODA' : status}
                        </p>
                    </div>
                </div>

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
                                    {ticket.ai_metadata?.error || "Errore generico durante l'elaborazione del file."}
                                </p>
                            </div>
                            
                            <Link 
                                href={`/dashboard/patient/${ticket.patient_id}?tab=analysis&upload=true`}
                                className="mt-8 inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition-all shadow-xl hover:scale-105"
                            >
                                <RefreshCw className="w-5 h-5" /> Riprova Caricamento
                            </Link>
                        </div>
                     </div>
                )}

                {isCompleted && (
                    <div className="space-y-6 animate-in fade-in flex-1 flex flex-col justify-center">
                        
                        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-green-600">
                                    <FileImage className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase font-bold opacity-70">File Output Generato</p>
                                    <p className="font-mono text-sm font-bold truncate max-w-[200px]">
                                        {ticket.ai_metadata?.output_file || "output_analysis.tiff"}
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={handleDownload}
                                disabled={isDownloading}
                                className="flex items-center gap-2 bg-white text-green-700 px-5 py-3 rounded-xl font-bold hover:bg-green-50 transition-all shadow-lg hover:scale-105 disabled:opacity-50 disabled:scale-100"
                            >
                                {isDownloading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                                Scarica
                            </button>
                        </div>

                        <div className="bg-black/20 p-5 rounded-2xl font-mono text-xs h-32 border border-white/10 shadow-inner flex items-center justify-center text-white/40 italic">
                            Nessun dato strutturato aggiuntivo disponibile al momento.
                        </div>
                    </div>
                )}

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
                                    ? 'Il file è al sicuro. Aspettiamo che il motore AI lo prenda in carico.' 
                                    : 'Sto analizzando i tessuti. Ci vorrà qualche minuto, non chiudere.'}
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