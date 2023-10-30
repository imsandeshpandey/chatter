import React from 'react'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import Sidebar from '@/components/Sidebar/Sidebar'
import SessionProvider from '@/components/SessionProvider'
import { ThemeProvider } from '../components/ui/theme-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Chatter',
  description: 'Generated by create next app'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}): Promise<React.JSX.Element> {
  const session = await getServerSession()
  return (
    <html lang='en' className='scroll-smooth'>
      <body className={inter.className}>
        <SessionProvider session={session}> 
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange
          >
            <div className='flex h-screen'>
              {session != null && <Sidebar />}
              {children}
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}