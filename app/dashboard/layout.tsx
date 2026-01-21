import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Header } from '@/components/layout/Header' // <--- USIAMO IL COMPONENTE ORIGINALE

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  // Recuperiamo il profilo per passarlo all'Header
  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name, last_name, hospital_name')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* HEADER ORIGINALE */}
      <Header variant="app" userProfile={profile} />
      
      {/* CONTENUTO PAGINE */}
      {children}
    </div>
  )
}