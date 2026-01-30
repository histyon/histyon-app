'use client'

import { useState, useTransition } from 'react'
import { updateProfile, updateEmail, updatePassword } from '@/lib/actions/settings'
import { User, Lock, Building2, MapPin, Phone, Save, Loader2, AlertCircle, CheckCircle2, Mail, KeyRound } from 'lucide-react'
import { DateOfBirthPicker } from '@/components/ui/DateOfBirthPicker'
import { ValidatedInput, GlobalLocationSelector, PhoneInput } from '@/components/ui/FormElements'

interface SettingsFormProps {
  user: any
  profile: any
  dict: any
}

export function SettingsForm({ user, profile, dict }: SettingsFormProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile')
  const [isPending, startTransition] = useTransition()
  const [feedback, setFeedback] = useState<{ section: string, type: 'success' | 'error', text: string } | null>(null)
  
  const d = dict.dashboard.settings
  const f = dict.auth.form 

  const handleSubmit = async (action: Function, formData: FormData, section: string) => {
    setFeedback(null)
    startTransition(async () => {
      const res = await action(formData)
      if (res.error) setFeedback({ section, type: 'error', text: res.error })
      else {
        setFeedback({ section, type: 'success', text: res.message || d.form.success })
        if (section === 'password') (document.getElementById('password-form') as HTMLFormElement)?.reset()
      }
    })
  }

  const labelClass = "text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 mb-1.5 block"

  return (
    <div className="w-full">
      <div className="flex gap-2 p-1 bg-gray-100/50 rounded-xl w-fit mb-8">
        <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'profile' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}>
          <User className="w-4 h-4" /> {d.tabs.profile}
        </button>
        <button onClick={() => setActiveTab('security')} className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'security' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}>
          <Lock className="w-4 h-4" /> {d.tabs.security}
        </button>
      </div>

      {activeTab === 'profile' && (
        <form action={(fd) => handleSubmit(updateProfile, fd, 'profile')} className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          
          {feedback?.section === 'profile' && (
            <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${feedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {feedback.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              {feedback.text}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><User className="w-5 h-5" /></div>
                    <h3 className="text-lg font-bold text-gray-900">{d.sections.personal}</h3>
                </div>
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-5">
                        <ValidatedInput name="firstName" label={f.labels.firstName} defaultValue={profile?.first_name} required />
                        <ValidatedInput name="lastName" label={f.labels.lastName} defaultValue={profile?.last_name} required />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <PhoneInput label={f.labels.phone} defaultValue={profile?.phone_number} />
                        <ValidatedInput name="placeOfBirth" label={f.labels.birthPlace} defaultValue={profile?.place_of_birth} />
                    </div>
                    <div>
                        <label className={labelClass}>{f.labels.dob}</label>

                        <DateOfBirthPicker 
                            name="birth_date" 
                            dict={dict} 
                            defaultDate={profile?.date_of_birth} 
                        />
                    </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600"><MapPin className="w-5 h-5" /></div>
                    <h3 className="text-lg font-bold text-gray-900">{d.sections.residence}</h3>
                </div>
                <GlobalLocationSelector 
                    dict={dict} 
                    defaults={{
                        country: profile?.country,
                        addressStreet: profile?.address_street,
                        addressCivic: profile?.address_civic,
                        postalCode: profile?.postal_code,
                        city: profile?.city,
                        region: profile?.province
                    }} 
                />
              </div>
            </div>

            <div className="space-y-8 flex flex-col h-full">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex-1">
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600"><Building2 className="w-5 h-5" /></div>
                        <h3 className="text-lg font-bold text-gray-900">{d.sections.professional}</h3>
                    </div>
                    <div className="space-y-6">
                        <ValidatedInput name="hospitalName" label={f.labels.hospital} defaultValue={profile?.hospital_name} />
                        <ValidatedInput name="medicalLicense" label={f.labels.medicalLicense} defaultValue={profile?.medical_license_number} />
                    </div>
                </div>
                <div className="sticky bottom-4">
                    <button type="submit" disabled={isPending} className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-xl shadow-black/10 active:scale-[0.98]">
                        {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} {d.form.updateBtn}
                    </button>
                </div>
            </div>
          </div>
        </form>
      )}

      {activeTab === 'security' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-fit">
            <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><Mail className="w-5 h-5" /></div><h3 className="text-lg font-bold text-gray-900">{d.sections.email}</h3></div>
            {feedback?.section === 'email' && <div className={`mb-6 p-3 rounded-lg text-sm font-medium ${feedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{feedback.text}</div>}
            <form action={(fd) => handleSubmit(updateEmail, fd, 'email')} className="space-y-6">
                <ValidatedInput name="email" label="Email" defaultValue={user.email} />
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-700 text-xs flex gap-3"><AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />{d.form.emailNotice}</div>
                <button type="submit" disabled={isPending} className="w-full bg-white border border-gray-200 text-gray-900 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all disabled:opacity-50">{d.form.updateBtn}</button>
            </form>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-fit">
            <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600"><KeyRound className="w-5 h-5" /></div><h3 className="text-lg font-bold text-gray-900">{d.sections.password}</h3></div>
            {feedback?.section === 'password' && <div className={`mb-6 p-3 rounded-lg text-sm font-medium ${feedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{feedback.text}</div>}
            <form id="password-form" action={(fd) => handleSubmit(updatePassword, fd, 'password')} className="space-y-6">
                <ValidatedInput name="password" type="password" label={d.form.newPassword} placeholder="••••••••" />
                <ValidatedInput name="confirm_password" type="password" label={d.form.confirmPassword} placeholder="••••••••" />
                <button type="submit" disabled={isPending} className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 disabled:opacity-50">{d.form.savePassword}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}