import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import Footer from "./_components/footer"
import AuthProvider from "./_providers/auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LUDMILA BARBER",
  description: "Clique aqui para agendar, é rapido e fácil!",
  icons: "/logludd.png",
  openGraph: {
    title: "AGENDE SEU HORÁRIO!",
    description: "Clique aqui para agendar, é rapido e fácil!",
    url: "https://ludimila-kappa.vercel.app", // coloque seu domínio aqui
    siteName: "LUDIMILA BARBER",
    type: "website",
    images: [
      {
        url: "/loglud.png", // imagem que aparecerá no WhatsApp
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LUDIMILA BARBER",
    description: "Clique aqui para agendar, é rapido e fácil!",
    images: ["/loglud.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head></head>
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex h-full flex-col">
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
