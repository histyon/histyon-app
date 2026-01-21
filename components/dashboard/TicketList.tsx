'use client'

import { useRouter } from 'next/navigation'
import { Clock, CheckCircle2, AlertTriangle, Loader2, FileText } from 'lucide-react'

interface TicketListProps {
  tickets: any[]
  showPatientName?: boolean
}

export function TicketList({ tickets, showPatientName = false }: TicketListProps) {
  const router = useRouter()

  if (!tickets || tickets.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
        <p className="text-gray-400 text-sm">Nessuna analisi presente in archivio.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden font-sans">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="px-6 py-4 font-bold text-gray-500 uppercase text-xs tracking-wider">Ticket ID</th>
            {showPatientName && <th className="px-6 py-4 font-bold text-gray-500 uppercase text-xs tracking-wider">Paziente</th>}
            <th className="px-6 py-4 font-bold text-gray-500 uppercase text-xs tracking-wider">File</th>
            <th className="px-6 py-4 font-bold text-gray-500 uppercase text-xs tracking-wider">Data Caricamento</th>
            <th className="px-6 py-4 font-bold text-gray-500 uppercase text-xs tracking-wider text-right">Stato</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {tickets.map((t) => (
            <tr 
              key={t.id} 
              // NAVIGAZIONE AL DETTAGLIO TICKET
              onClick={() => router.push(`/dashboard/ticket/${t.id}`)}
              className="hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <td className="px-6 py-4 font-mono text-xs text-gray-500 group-hover:text-black">
                #{t.id.slice(0, 8)}
              </td>
              
              {showPatientName && (
                <td className="px-6 py-4 font-bold text-gray-900">
                  {t.patients?.first_name} {t.patients?.last_name}
                </td>
              )}
              
              <td className="px-6 py-4 text-gray-700 flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                <span className="truncate max-w-[150px] font-medium" title={t.file_name}>
                    {t.file_name}
                </span>
              </td>
              
              <td className="px-6 py-4 text-gray-500 text-xs">
                {new Date(t.created_at).toLocaleString('it-IT', { 
                    day: '2-digit', month: '2-digit', year: 'numeric', 
                    hour: '2-digit', minute: '2-digit' 
                })}
              </td>
              
              <td className="px-6 py-4 text-right">
                <StatusBadge status={t.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'COMPLETED':
      return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-100"><CheckCircle2 className="w-3.5 h-3.5"/> Completato</span>
    case 'PROCESSING':
      return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100 animate-pulse"><Loader2 className="w-3.5 h-3.5 animate-spin"/> In Elaborazione</span>
    case 'QUEUED':
      return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-50 text-yellow-700 border border-yellow-100"><Clock className="w-3.5 h-3.5"/> In Coda</span>
    case 'UPLOADING':
    case 'UPLOADED': 
      return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200"><Loader2 className="w-3.5 h-3.5 animate-spin"/> Caricamento...</span>
    default: 
      return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-100"><AlertTriangle className="w-3.5 h-3.5"/> Errore</span>
  }
}