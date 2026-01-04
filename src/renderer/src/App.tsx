import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/ThemeProvider'
import MainLayout from '@/layouts/MainLayout'
import { Button } from '@/components/ui/button'
import { safeIpc, isElectron } from '@/utils/platform'
import logo from './assets/logo.png'

function HomePage(): JSX.Element {
  const [count, setCount] = useState(0)

  const handlePing = (): void => {
    // @ts-ignore
    window.api.send('ping', 'pong')
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/5 to-background border border-primary/10 p-8 md:p-12">
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Bienvenido a Assent
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Esta es una plantilla profesional potenciada con Electron, React, TypeScript y Tailwind CSS.
              Diseñada para ser rápida, moderna y completamente personalizable.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button onClick={() => setCount((c) => c + 1)} size="lg" className="shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300">
                Contador: {count}
              </Button>
              
              {isElectron() && (
                <Button variant="secondary" onClick={handlePing} size="lg">
                  Probar IPC (Ping)
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex justify-center md:justify-end">
            <img 
              src={logo} 
              alt="Assent Logo" 
              className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl animate-in fade-in zoom-in duration-700 hover:scale-105 transition-transform"
            />
          </div>
        </div>
        
        {/* Decorative background blob */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 right-20 translate-y-12 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
      </section>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-card border shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20 group">
          <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">TypeScript Moderno</h3>
          <p className="text-sm text-muted-foreground">Tipado estático robusto y configuración estricta para un código más seguro y mantenible.</p>
        </div>

        <div className="p-6 rounded-2xl bg-card border shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20 group">
          <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Diseño UI/UX</h3>
          <p className="text-sm text-muted-foreground">Componentes hermosos basados en shadcn/ui con soporte completo para temas oscuros.</p>
        </div>

        <div className="p-6 rounded-2xl bg-card border shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20 group">
          <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Developer Experience</h3>
          <p className="text-sm text-muted-foreground">Hot Reloading instantáneo, alias de rutas y una estructura de proyecto escalable.</p>
        </div>
      </div>

      {/* Button Showcase */}
      <div className="p-8 border rounded-3xl bg-card/50 backdrop-blur-sm">
        <h3 className="font-semibold mb-6 text-xl">Galería de Botones</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link Button</Button>
          
          <div className="h-8 w-px bg-border mx-2" />
          
          <Button size="sm">Small</Button>
          <Button size="lg">Large Button</Button>
          <Button size="icon" variant="outline">
            <span className="text-lg">✨</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

function App(): JSX.Element {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <HashRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<div className="text-2xl font-bold text-center mt-20">Página About</div>} />
          </Routes>
        </MainLayout>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App
