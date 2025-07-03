import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/context/CartContext'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Rumilander | Art of Master Alijanpour, Persian Miniature & Islamic  Art',
description: "Explore the world of Master Alijan Alijanpour — a global figure in Persian miniature and Islamic art. Rumilander showcases his timeless artworks, reflecting spiritual light, cultural heritage, and decades of mastery."

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

          {/* Global Header */}
          <Header />

          {/* Page content */}
          <main>{children}</main>

          {/* Global Footer */}
          <Footer />
        </CartProvider>
          <Analytics />
      </body>
    </html>
  )
}
