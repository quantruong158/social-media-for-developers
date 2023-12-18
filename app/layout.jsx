import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import NavBar from '@/components/NavBar'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DevUnite',
  description: 'Social media platform for developers',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <ClerkProvider>
        <body className={inter.className}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            {children}
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  )
}
