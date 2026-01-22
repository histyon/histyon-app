import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Header } from '@/components/layout/Header' 

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name, last_name, hospital_name')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header variant="app" userProfile={profile} />
      {children}
    </div>
  )
}