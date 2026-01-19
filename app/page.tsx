import { 
  UploadCloud, 
  FileClock, 
  Activity, 
  Search, 
  User, 
  LogOut,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function Dashboard() {
  const historyData = [
    { id: 'AN-2024-001', patient: 'Paziente Anonimo #992', date: '16 Gen 2024', status: 'completed', result: 'Operabile (98%)' },
    { id: 'AN-2024-002', patient: 'Paziente Anonimo #841', date: '15 Gen 2024', status: 'processing', result: 'In Analisi...' },
    { id: 'AN-2024-003', patient: 'Paziente Anonimo #120', date: '12 Gen 2024', status: 'error', result: 'Errore File' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <Activity className="text-white w-5 h-5" />
          </div>
          <span className="font-semibold text-lg tracking-tight">Histyon</span>
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full border border-gray-200">BETA</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Info Dottore */}
          <div className="flex items-center gap-3 pr-4 border-r border-gray-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Dr. Tripodi</p>
              <p className="text-xs text-gray-500">Osp. Siena</p>
            </div>
            <div className="w-9 h-9 bg-gray-100 rounded-full border border-gray-200 flex items-center justify-center text-gray-600">
              <User className="w-5 h-5" />
            </div>
          </div>
          <button className="text-sm text-gray-500 hover:text-black transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-6xl mx-auto p-6 space-y-8">
        
        {/* Header Sezione */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Dashboard Analisi</h1>
          <p className="text-gray-500">Gestisci i caricamenti e visualizza i referti AI.</p>
        </div>

        {/* --- GRID AZIONI PRINCIPALI --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CARD 1: UPLOAD (Grande e prominente) */}
          <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 p-1 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="border border-dashed border-gray-300 rounded-lg h-64 flex flex-col items-center justify-center bg-gray-50 group-hover:bg-gray-100/50 transition-colors">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-8 h-8 text-gray-700" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Carica nuova scansione WSI</h3>
              <p className="text-sm text-gray-500 mt-1 max-w-sm text-center px-4">
                Trascina qui il file .SVS o .TIFF (Max 5GB) oppure clicca per sfogliare.
              </p>
            </div>
          </div>

          {/* CARD 2: STATISTICHE RAPIDE */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-gray-500 mb-4">
                <FileClock className="w-5 h-5" />
                <span className="text-sm font-medium">Analisi questo mese</span>
              </div>
              <div className="text-4xl font-bold tracking-tight text-gray-900">24</div>
              <p className="text-sm text-gray-500 mt-2">
                <span className="text-green-600 font-medium">+12%</span> rispetto al mese scorso
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <button className="w-full py-2 px-4 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                Vedi Report Mensile
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* --- TABELLA CRONOLOGIA --- */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {/* Header Tabella con Ricerca */}
          <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
            <h3 className="font-semibold text-gray-900">Cronologia Recente</h3>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Cerca per ID o paziente..." 
                className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all"
              />
            </div>
          </div>

          {/* Lista */}
          <div className="divide-y divide-gray-100">
            {historyData.map((item) => (
              <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                    <span className="text-xs font-bold text-gray-600">RX</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.patient}</p>
                    <p className="text-xs text-gray-500">ID: {item.id} • {item.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {/* Status Badge */}
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5
                    ${item.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' : 
                      item.status === 'processing' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                      'bg-red-50 text-red-700 border-red-200'}`}>
                    {item.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                    {item.status === 'processing' && <Activity className="w-3 h-3 animate-pulse" />}
                    {item.status === 'error' && <AlertCircle className="w-3 h-3" />}
                    
                    {item.status === 'completed' ? 'Completato' : 
                     item.status === 'processing' ? 'In Analisi' : 'Errore'}
                  </div>

                  {/* Risultato (visibile solo se completato) */}
                  <div className="w-32 text-right hidden sm:block">
                    <span className="text-sm font-medium text-gray-900">{item.result}</span>
                  </div>
                  
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-600" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 border-t border-gray-200 bg-gray-50 text-center">
            <button className="text-xs font-medium text-gray-500 hover:text-black transition-colors">
              Visualizza tutti i 124 casi
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}