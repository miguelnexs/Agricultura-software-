import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../utils/cn'
import { useTheme } from '../components/ThemeProvider'
import { Button } from '../components/ui/button'
import { isElectron, safeIpc } from '../utils/platform'
import logo from '../assets/logo.png'

interface LayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: LayoutProps): JSX.Element {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <header className="border-b p-4 flex justify-between items-center bg-gradient-to-r from-primary/10 via-background to-background backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 drag select-none">
        <div className="flex items-center gap-2 no-drag">
          <img src={logo} alt="Logo" className="size-8 object-contain" />
          <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Assent
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <nav className="flex gap-6 no-drag">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
          </nav>
          <div className="flex items-center gap-2 no-drag">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
              className="rounded-full"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            {isElectron() && (
              <div className="flex items-center gap-1 pl-4 border-l ml-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => safeIpc.send('window-minimize', null)}
                  className="h-8 w-8 rounded-full hover:bg-muted"
                  title="Minimizar"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => safeIpc.send('window-maximize', null)}
                  className="h-8 w-8 rounded-full hover:bg-muted"
                  title="Maximizar"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => safeIpc.send('window-close', null)}
                  className="h-8 w-8 rounded-full hover:bg-destructive hover:text-destructive-foreground"
                  title="Cerrar"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 p-6 container mx-auto max-w-5xl animate-in fade-in duration-500">
        {children}
      </main>
      <footer className="border-t p-6 text-center text-sm text-muted-foreground bg-muted/30">
        <div className="flex justify-center gap-4 mb-2">
           {/* Add social icons or similar here if needed */}
        </div>
        &copy; {new Date().getFullYear()} Your Company. Built with <span className="text-primary">♥</span> and Electron.
      </footer>
    </div>
  )
}
