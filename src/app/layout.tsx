import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/context/CartContext'

// Load fonts with custom CSS variables
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// Metadata for the Noura project
export const metadata: Metadata = {
  title: 'Noura | Light for Living',
  description: 'A lifestyle brand focused on mindful products and AI-based coaching tools.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Wrap entire app with CartProvider */}
        <CartProvider>
          {/* Global toast notifications */}
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
