import { ReactNode } from 'react'
import { TitleBar } from '../components/TitleBar'
import { Sidebar } from '../components/Sidebar'
import { useTheme } from '../components/ThemeProvider'

interface LayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: LayoutProps): JSX.Element {
  const { theme } = useTheme()

  return (
    <div className="h-screen bg-background text-foreground flex flex-col font-sans overflow-hidden">
      <TitleBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar className="hidden md:flex w-64 border-r" />
        <main className="flex-1 overflow-auto bg-muted/10 p-6 animate-in fade-in duration-500">
          <div className="container mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
