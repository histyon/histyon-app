import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { LegalContent } from '@/components/legal/LegalContent'

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
      {/* Ora Header è al sicuro perché siamo in un Server Component */}
      <Header variant="public" />

      {/* Carichiamo il contenuto interattivo client-side */}
      <LegalContent />

      <Footer />
    </div>
  )
}