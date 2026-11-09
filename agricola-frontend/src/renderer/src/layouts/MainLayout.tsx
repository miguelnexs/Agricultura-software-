import { ReactNode } from 'react'
import { TitleBar } from '../components/TitleBar'
import { Sidebar } from '../components/Sidebar'

interface LayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="h-screen w-screen bg-background text-foreground flex flex-col font-sans overflow-hidden">
      <TitleBar />
      <div className="flex flex-1 overflow-hidden min-h-0 w-full">
        <Sidebar className="shrink-0" />
        <main className="flex-1 min-w-0 overflow-y-auto bg-fique-pattern p-3 sm:p-5 md:p-6 lg:p-8 animate-in fade-in duration-300">
          <div className="w-full pb-16">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
