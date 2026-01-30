import { Ticket } from "@/types";
import { Download, Eye } from "lucide-react"; 

export default function TicketResult({ ticket, dict }: { ticket: Ticket, dict: any }) {
  if (ticket.status !== 'completed') return null;
  const t = dict.dashboard.results;

  const stats = ticket.ai_results?.summary;

  return (
    <div className="space-y-6 mt-6 border-t pt-6">
      <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>

      {ticket.output_dzi_url && (
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-600" />
            {t.tissueView}
          </h3>
          <div className="relative w-full h-[500px] bg-black rounded-lg overflow-hidden border">
            <img 
              src={ticket.output_dzi_url} 
              alt="Analisi AI" 
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            {t.previewNote}
          </p>
        </div>
      )}

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 p-4 rounded-xl border border-red-100">
            <p className="text-red-600 text-sm font-medium">{t.sickTissue}</p>
            <p className="text-3xl font-bold text-red-700">
              {stats.percentuale_tessuto_malato?.toFixed(1)}%
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <p className="text-blue-600 text-sm font-medium">{t.totalGlom}</p>
            <p className="text-3xl font-bold text-blue-700">
              {stats.counts?.glomeruli || 0}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <p className="text-gray-600 text-sm font-medium">{t.scleroGlom}</p>
            <p className="text-3xl font-bold text-gray-700">
              {stats.counts?.glomeruli_sclerotici || 0}
            </p>
          </div>
        </div>
      )}

      {ticket.project_file_url && (
        <div className="bg-gray-900 text-white p-6 rounded-xl flex items-center justify-between shadow-lg">
          <div>
            <h3 className="font-bold text-lg">{t.fullProject}</h3>
            <p className="text-gray-400 text-sm">{t.downloadZip}</p>
          </div>
          <a 
            href={ticket.project_file_url} 
            download 
            className="flex items-center gap-2 bg-white text-gray-900 px-5 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            <Download className="w-5 h-5" />
            {t.btnDownload}
          </a>
        </div>
      )}
    </div>
  );
}