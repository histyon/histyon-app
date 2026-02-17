'use client'

import { useState } from 'react'
import { User, Shield, KeyRound, Mail, Save, BadgeCheck } from 'lucide-react'

interface SettingsFormProps {
  user?: any;
  dict?: any;
}

export default function SettingsForm({ user, dict }: SettingsFormProps) {
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingSecurity, setIsSavingSecurity] = useState(false);

  const t = dict?.dashboard?.settings || {
    profileTitle: "Profilo Personale",
    profileDesc: "Gestisci le tue informazioni personali e i dati di contatto.",
    securityTitle: "Sicurezza e Password",
    securityDesc: "Aggiorna la tua password per mantenere l'account protetto.",
    saveBtn: "Salva Modifiche",
    savingBtn: "Salvataggio..."
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setTimeout(() => setIsSavingProfile(false), 1000);
  };

  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSecurity(true);
    setTimeout(() => setIsSavingSecurity(false), 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Impostazioni</h1>
        <p className="text-gray-500 mt-2 text-sm">
          Gestisci le preferenze del tuo account, il profilo clinico e la sicurezza.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-gray-100 text-gray-700 rounded-xl border border-gray-200/50">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">{t.profileTitle}</h2>
              <p className="text-sm text-gray-500 mt-0.5">{t.profileDesc}</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              
              <div className="space-y-2.5">
                <label className="text-sm font-semibold text-gray-700" htmlFor="firstName">Nome</label>
                <input 
                  type="text" 
                  id="firstName"
                  name="firstName"
                  defaultValue={user?.first_name || ''}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-900 transition-all outline-none"
                  placeholder="Il tuo nome"
                />
              </div>

              <div className="space-y-2.5">
                <label className="text-sm font-semibold text-gray-700" htmlFor="lastName">Cognome</label>
                <input 
                  type="text" 
                  id="lastName"
                  name="lastName"
                  defaultValue={user?.last_name || ''}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-900 transition-all outline-none"
                  placeholder="Il tuo cognome"
                />
              </div>

              <div className="space-y-2.5 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700" htmlFor="email">Indirizzo Email</label>
                <div className="relative max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input 
                    type="email" 
                    id="email"
                    defaultValue={user?.email || ''}
                    readOnly
                    className="w-full pl-11 pr-10 py-2.5 bg-gray-100 border border-gray-200 text-gray-500 rounded-xl text-sm cursor-not-allowed outline-none"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <BadgeCheck className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1.5 font-medium">L'indirizzo email di sistema non può essere modificato.</p>
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-100 mt-8">
              <button 
                type="submit"
                disabled={isSavingProfile}
                className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all shadow-sm active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
              >
                {isSavingProfile ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                {isSavingProfile ? t.savingBtn : t.saveBtn}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-gray-100 text-gray-700 rounded-xl border border-gray-200/50">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">{t.securityTitle}</h2>
              <p className="text-sm text-gray-500 mt-0.5">{t.securityDesc}</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <form onSubmit={handleSecuritySubmit} className="space-y-6">
            <div className="max-w-xl space-y-6">
              
              <div className="space-y-2.5">
                <label className="text-sm font-semibold text-gray-700" htmlFor="currentPassword">Password Attuale</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <KeyRound className="h-4 w-4 text-gray-400" />
                  </div>
                  <input 
                    type="password" 
                    id="currentPassword"
                    name="currentPassword"
                    className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-900 transition-all outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2.5">
                  <label className="text-sm font-semibold text-gray-700" htmlFor="newPassword">Nuova Password</label>
                  <input 
                    type="password" 
                    id="newPassword"
                    name="newPassword"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-900 transition-all outline-none"
                    placeholder="Nuova password"
                  />
                </div>

                <div className="space-y-2.5">
                  <label className="text-sm font-semibold text-gray-700" htmlFor="confirmPassword">Conferma Password</label>
                  <input 
                    type="password" 
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-900 transition-all outline-none"
                    placeholder="Ripeti la password"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-100 mt-8">
              <button 
                type="submit"
                disabled={isSavingSecurity}
                className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all shadow-sm active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
              >
                {isSavingSecurity ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                {isSavingSecurity ? t.savingBtn : "Aggiorna Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  )
}