import { Navbar } from '@/widgets/navigation/ui/Navbar'
import { Footer } from '@/features/landing/ui/Footer'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
