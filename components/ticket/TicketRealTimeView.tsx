'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { HardDrive, Download, BrainCircuit, FileText, Server, AlertTriangle, RefreshCw, XCircle, FileImage, Code2 } from 'lucide-react'
import { StatusTimeline } from '@/components/ticket/StatusTimeline'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getPresignedDownloadUrl } from '@/lib/actions/storage'

interface RealTimeProps {
    initialTicket: any
    dict: any
}

export function TicketRealtimeView({ initialTicket, dict }: RealTimeProps) {
  const [ticket, setTicket] = useState(initialTicket)
  const [isDownloading, setIsDownloading] = useState(false)
  const supabase = createClient()
  const router = useRouter()
  const t = dict.dashboard.realtime;

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
    
    const outputFileName = ticket.output_dzi_url || ticket.ai_metadata?.output_file
    
    if (!outputFileName) {
        alert(t.outputNotReady)
        setIsDownloading(false)
        return
    }

    let fullPathKey = outputFileName;
    if (!outputFileName.includes('/')) {
         fullPathKey = `${ticket.doctor_id}/${ticket.patient_id}/${outputFileName}`;
    }

    const res = await getPresignedDownloadUrl(fullPathKey, 'output')
    
    if (res.success && res.url) {
        const link = document.createElement('a');
        link.href = res.url;
        link.setAttribute('download', outputFileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert(dict.validation.fileNotFound)
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

  const displayOutputName = ticket.output_dzi_url || ticket.ai_metadata?.output_file || ticket.file_name

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm w-full">
         <StatusTimeline status={status} dict={dict} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
         
         <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <HardDrive className="w-5 h-5" /> {t.sourceData}
                </h3>
                <div className="space-y-4 text-sm">
                    <div className="pb-3 border-b border-gray-50">
                        <p className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">{t.inputFile}</p>
                        <p className="font-mono text-gray-900 break-all bg-gray-50 p-2 rounded-lg border border-gray-100 text-xs">
                           {ticket.file_name}
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">{t.size}</p>
                            <p className="font-bold">{(ticket.file_size / (1024*1024)).toFixed(2)} MB</p>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">{t.date}</p>
                            <p className="font-medium" suppressHydrationWarning>
                                {new Date(ticket.created_at).toLocaleDateString('it-IT')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col h-full">
                <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> {t.clinicalNotes}
                </h3>
                <div className="bg-yellow-50/50 p-4 rounded-xl border border-yellow-100 flex-grow break-words">
                    <p className="text-gray-700 text-sm italic leading-relaxed whitespace-pre-wrap">
                        {ticket.notes || t.noNotes}
                    </p>
                </div>
            </div>
         </div>

         <div className="lg:col-span-2 h-full">
            <div className={`p-8 rounded-3xl h-full flex flex-col justify-between transition-colors duration-500 ease-in-out ${getBoxClasses()}`}>
                
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h3 className="font-bold text-2xl opacity-90">
                           {isError ? t.errorAnalysis : isCompleted ? t.completedAnalysis : t.progressStatus}
                        </h3>
                        <p className="text-sm opacity-70 mt-1 uppercase tracking-widest font-bold flex items-center gap-2">
                            {isError && <AlertTriangle className="w-4 h-4" />}
                            {t.statusLabel}: {status === 'QUEUED' ? 'IN CODA' : status}
                        </p>
                    </div>
                </div>

                {isError && (
                     <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 min-h-[300px] animate-in zoom-in duration-300">
                        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner border border-white/10">
                            <XCircle className="w-12 h-12 text-white" />
                        </div>
                        <div className="max-w-md w-full">
                            <p className="text-2xl font-bold mb-4">{t.processInterrupted}</p>
                            <div className="bg-black/20 p-5 rounded-xl border border-white/10 text-left backdrop-blur-sm">
                                <p className="text-[10px] uppercase font-bold opacity-70 mb-2 tracking-wider">{t.errorDetails}</p>
                                <p className="font-mono text-sm leading-relaxed text-red-100">
                                    {ticket.ai_metadata?.error || t.genericError}
                                </p>
                            </div>
                            <Link 
                                href={`/dashboard/patient/${ticket.patient_id}?tab=analysis&upload=true`}
                                className="mt-8 inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition-all shadow-xl hover:scale-105"
                            >
                                <RefreshCw className="w-5 h-5" /> {t.retryUpload}
                            </Link>
                        </div>
                     </div>
                )}

                {isCompleted && (
                    <div className="space-y-6 animate-in fade-in flex-1 flex flex-col justify-center">
                        
                        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4 flex-1 min-w-0 w-full">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-green-600 flex-shrink-0">
                                    <FileImage className="w-6 h-6" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs uppercase font-bold opacity-70">{t.outputFile}</p>
                                    <p className="font-mono text-sm font-bold truncate w-full" title={displayOutputName}>
                                        {displayOutputName}
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={handleDownload}
                                disabled={isDownloading}
                                className="flex-shrink-0 w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-green-700 px-5 py-3 rounded-xl font-bold hover:bg-green-50 transition-all shadow-lg hover:scale-105 disabled:opacity-50 disabled:scale-100"
                            >
                                {isDownloading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                                {t.download}
                            </button>
                        </div>

                        <div className="flex flex-col gap-2 h-full min-h-[200px]">
                            <p className="text-xs uppercase font-bold opacity-70 flex items-center gap-2">
                                <Code2 className="w-4 h-4" /> {t.resultsJson}
                            </p>
                            
                            {ticket.ai_results ? (
                                <div className="bg-black/30 p-4 rounded-2xl font-mono text-xs border border-white/10 shadow-inner overflow-y-auto max-h-[300px] custom-scrollbar">
                                    <pre className="whitespace-pre-wrap text-green-100 leading-relaxed break-all">
                                        {JSON.stringify(ticket.ai_results, null, 2)}
                                    </pre>
                                </div>
                            ) : (
                                <div className="bg-black/20 p-5 rounded-2xl font-mono text-xs h-32 border border-white/10 shadow-inner flex items-center justify-center text-white/40 italic">
                                    {t.noJson}
                                </div>
                            )}
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
                                {status === 'QUEUED' ? t.queuedTitle : t.processingTitle}
                            </p>
                            <p className="opacity-80 text-base leading-relaxed font-medium">
                                {status === 'QUEUED' 
                                    ? t.queuedDesc 
                                    : t.processingDesc}
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