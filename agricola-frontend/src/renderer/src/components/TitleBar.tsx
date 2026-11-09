import { useState, useEffect } from 'react'
import { Minus, Square, X, Copy, Mountain, Sun, Coffee } from 'lucide-react'
import { isElectron, safeIpc } from '../utils/platform'

export function TitleBar(): JSX.Element {
  const [isMaximized, setIsMaximized] = useState(true)

  useEffect(() => {
    if (!isElectron()) return
    safeIpc.on('window-maximized-state', (maximized: boolean) => {
      setIsMaximized(Boolean(maximized))
    })
  }, [])

  const handleMaximize = () => {
    safeIpc.send('window-maximize', null)
  }

  return (
    <div className="flex flex-col select-none z-50">
      {/* Franja cultural de Zócalo Colombiano */}
      <div className="h-1.5 w-full zocalo-border" />
      <div className="h-9 bg-card/95 backdrop-blur-sm flex items-center justify-between border-b border-border px-3 drag">
        <div className="flex items-center gap-2.5 no-drag">
          <div className="w-6 h-6 rounded-md bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
            <Coffee className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold tracking-wide text-foreground">
            LA HACIENDA
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium border border-border">
            <Mountain className="w-3 h-3 text-primary" />
            1.650 m.s.n.m • Eje Cafetero, Colombia
          </span>
        </div>

        <div className="flex items-center gap-3 h-full no-drag">
          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium pr-2">
            <Sun className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>22°C Templado de Montaña</span>
          </div>

          {isElectron() && (
            <div className="flex h-full -mr-3">
              <button
                onClick={() => safeIpc.send('window-minimize', null)}
                className="h-full w-11 flex items-center justify-center hover:bg-muted transition-colors focus:outline-none"
                title="Minimizar"
              >
                <Minus className="w-4 h-4 text-foreground" />
              </button>
              <button
                onClick={handleMaximize}
                className="h-full w-11 flex items-center justify-center hover:bg-muted transition-colors focus:outline-none"
                title="Maximizar"
              >
                {isMaximized ? (
                  <Copy className="w-3.5 h-3.5 text-foreground rotate-180" />
                ) : (
                  <Square className="w-3.5 h-3.5 text-foreground" />
                )}
              </button>
              <button
                onClick={() => safeIpc.send('window-close', null)}
                className="h-full w-11 flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors focus:outline-none"
                title="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
