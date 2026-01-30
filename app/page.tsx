import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getDictionary } from '@/lib/dictionary'
import { 
  ArrowRight, 
  Database, 
  BrainCircuit, 
  ShieldCheck, 
  Activity, 
  Microscope,
  CheckCircle2,
  Flame,
  Zap,
  LayoutDashboard
} from 'lucide-react'

export default async function LandingPage() {
  const dict = await getDictionary();
  const t = dict.landing;

  return (
    <div className="bg-white text-gray-900 font-sans selection:bg-orange-100 selection:text-orange-900 flex flex-col overflow-x-hidden">
      
      <Header variant="public" />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-10 pb-20 isolate">
        
        <div className="absolute inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,rgba(234,88,12,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(234,88,12,0.08)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_30%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_30%,transparent_100%)]"></div>
        
        <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-orange-50/40 via-red-50/10 to-transparent -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center z-10 relative">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-orange-200 shadow-sm text-[10px] font-bold tracking-widest text-orange-600 uppercase mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            {t.hero.badge}
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 mb-8 leading-[1.05] max-w-5xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            {t.hero.title_line1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-orange-500 animate-gradient-x bg-[length:200%_auto]">
              {t.hero.title_line2}
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mb-12 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <Link 
              href="/auth/register" 
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-orange-600 text-white rounded-full font-medium text-lg transition-all hover:scale-105 shadow-[0_10px_40px_-10px_rgba(234,88,12,0.4)] hover:shadow-[0_20px_40px_-10px_rgba(220,38,38,0.6)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t.hero.ctaAccess} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <Link 
              href="/documentation" 
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-600 rounded-full font-medium text-lg border border-gray-200 hover:border-orange-200 hover:bg-orange-50 transition-all hover:shadow-lg hover:shadow-orange-100/50"
            >
              {t.hero.ctaDocs}
            </Link>
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-white flex items-center py-24 relative overflow-hidden">
        
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-orange-200/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-200/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          
          <div className="space-y-12 order-2 lg:order-1">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-[1.1]">
              {t.workflow.title} <br/>
              <span className="text-gray-400">{t.workflow.title_colored}</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              {t.workflow.description}
            </p>
            
            <div className="space-y-10 pt-4">
              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-orange-600 shrink-0 group-hover:scale-110 transition-transform duration-500 group-hover:border-orange-200 group-hover:bg-orange-50">
                  <Database className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-orange-600 transition-colors">{t.workflow.step1_title}</h3>
                  <p className="text-gray-500 leading-relaxed">{t.workflow.step1_desc}</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-red-600 shrink-0 group-hover:scale-110 transition-transform duration-500 group-hover:border-red-200 group-hover:bg-red-50">
                  <BrainCircuit className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-red-600 transition-colors">{t.workflow.step2_title}</h3>
                  <p className="text-gray-500 leading-relaxed">{t.workflow.step2_desc}</p>
                </div>
              </div>

               <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-amber-600 shrink-0 group-hover:scale-110 transition-transform duration-500 group-hover:border-amber-200 group-hover:bg-amber-50">
                  <Zap className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-amber-600 transition-colors">{t.workflow.step3_title}</h3>
                  <p className="text-gray-500 leading-relaxed">{t.workflow.step3_desc}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative h-[650px] w-full flex items-center justify-center perspective-1000">
             
             <div className="relative w-full max-w-md aspect-[3/4] bg-white rounded-[2rem] shadow-2xl shadow-gray-200 border border-gray-100 flex flex-col overflow-hidden rotate-[-6deg] hover:rotate-0 transition-all duration-700 ease-out hover:scale-105 group">
                
                <div className="bg-white border-b border-gray-50 h-14 flex items-center justify-between px-5 shrink-0">
                   <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                   </div>
                   <div className="flex gap-2 items-center bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                      <ShieldCheck className="w-3 h-3 text-orange-600" />
                      <span className="text-[10px] text-gray-500 font-bold tracking-wide">{t.workflow.card_header_secure}</span>
                   </div>
                </div>

                <div className="flex-1 p-6 flex flex-col gap-6 relative">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                    
                    <div className="flex justify-between items-center z-10">
                        <div>
                            <div className="h-2 w-16 bg-gray-100 rounded-full mb-2"></div>
                            <h3 className="font-bold text-xl text-gray-900">{t.workflow.card_patient_name}</h3>
                            <p className="text-xs text-gray-400 font-mono mt-0.5">{t.workflow.card_patient_id}</p>
                        </div>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-[10px] font-bold border border-green-200 shadow-sm flex items-center gap-1">
                           <CheckCircle2 className="w-3 h-3" /> {t.workflow.card_status}
                        </span>
                    </div>

                    <div className="flex-1 bg-gray-900 rounded-xl overflow-hidden relative group-hover:ring-4 ring-orange-500/20 transition-all duration-500">
                       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#7c2d12_0%,_#000_100%)] opacity-80"></div>
                       
                       <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>

                       <div className="absolute inset-0 flex items-center justify-center">
                          <Microscope className="w-14 h-14 text-white/20 group-hover:text-orange-500 group-hover:scale-110 transition-all duration-700" />
                       </div>
                       
                       <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/10 shadow-xl">
                          <div className="flex justify-between text-white text-[10px] uppercase font-bold mb-1.5">
                             <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-orange-500" /> Rilevamento Anomalie</span>
                             <span>98.4%</span>
                          </div>
                          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                             <div className="h-full w-[98%] bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></div>
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 z-10">
                       <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 flex items-center gap-3 cursor-pointer hover:bg-orange-50 hover:border-orange-100 transition-colors group/btn">
                          <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 group-hover/btn:text-orange-500">
                             <LayoutDashboard className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col">
                             <span className="text-[9px] text-gray-400 uppercase font-bold">Report</span>
                             <span className="text-xs font-bold text-gray-700">Apri Dati</span>
                          </div>
                       </div>
                       <button className="bg-gray-900 text-white rounded-lg p-3 flex items-center justify-center gap-2 shadow-lg shadow-orange-900/10 hover:bg-black transition-colors">
                          <span className="text-xs font-bold">{t.workflow.card_action_btn}</span>
                          <ArrowRight className="w-3 h-3" />
                       </button>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-white flex items-center py-24 relative">
         <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            <div className="lg:col-span-2 mb-8">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-[1.1] mb-6">
                {t.features.title} <br/>
                <span className="text-gray-400">{t.features.title_colored}</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                {t.features.subtitle}
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
               
               <div className="bg-gray-50 rounded-[2.5rem] p-10 hover:bg-white hover:shadow-2xl hover:shadow-orange-200/20 transition-all duration-700 ease-out border border-transparent hover:border-orange-100 group flex flex-col">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-700 ease-out text-orange-600 border border-gray-100">
                     <Database className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{t.features.feat1_title}</h3>
                  <p className="text-gray-500 leading-relaxed flex-1">
                     {t.features.feat1_desc}
                  </p>
               </div>

               <div className="bg-gray-900 text-white rounded-[2.5rem] p-10 relative overflow-hidden group shadow-2xl flex flex-col md:-mt-8 md:-mb-8 z-10 hover:scale-[1.02] transition-transform duration-700 ease-out">
                  <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity transform ease-out">
                     <BrainCircuit className="w-64 h-64" />
                  </div>
                  <div className="relative z-10 flex flex-col h-full">
                     <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:bg-white/20 transition-colors duration-500">
                        <Activity className="w-7 h-7 text-red-500" />
                     </div>
                     <h3 className="text-2xl font-bold mb-4">{t.features.feat2_title}</h3>
                     <p className="text-gray-300 leading-relaxed flex-1">
                        {t.features.feat2_desc}
                     </p>
                     <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-3">
                        <div className="flex -space-x-2">
                           <div className="w-8 h-8 rounded-full bg-orange-500 border-2 border-gray-900"></div>
                           <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-gray-900"></div>
                        </div>
                        <span className="text-xs font-medium text-gray-400">{t.features.feat2_trusted}</span>
                     </div>
                  </div>
               </div>

               <div className="bg-gray-50 rounded-[2.5rem] p-10 hover:bg-white hover:shadow-2xl hover:shadow-orange-200/20 transition-all duration-700 ease-out border border-transparent hover:border-orange-100 group flex flex-col">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-700 ease-out text-amber-600 border border-gray-100">
                     <ShieldCheck className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{t.features.feat3_title}</h3>
                  <p className="text-gray-500 leading-relaxed flex-1">
                     {t.features.feat3_desc}
                  </p>
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  )
}