import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../utils/cn'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
import { useTheme } from './ThemeProvider'
import { useTranslation } from 'react-i18next'
import {
  ShoppingBag,
  TrendingUp,
  Truck,
  Package,
  Building2,
  Sprout,
  Scale,
  Settings,
  Sun,
  Moon,
  Languages,
  Bot,
  Calculator,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
  badge?: string
  badgeVariant?: 'primary' | 'success' | 'amber' | 'neutral'
}

interface NavSection {
  title: string
  items: NavItem[]
}

export function Sidebar({ className }: { className?: string }): JSX.Element {
  const location = useLocation()
  const { theme, setTheme } = useTheme()
  const { i18n } = useTranslation()

  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem('agro_sidebar_collapsed') === 'true'
  })

  const toggleCollapse = () => {
    setCollapsed((prev) => {
      const next = !prev
      localStorage.setItem('agro_sidebar_collapsed', String(next))
      return next
    })
  }

  // Secciones organizadas de acuerdo al Plan de Negocio y Operación Agro-Logística
  const secciones: NavSection[] = [
    {
      title: 'Comercio Directo',
      items: [
        {
          name: 'Mercado Campesino',
          href: '/',
          icon: ShoppingBag,
          badge: 'B2B/B2C',
          badgeVariant: 'primary'
        },
        {
          name: 'WhatsApp Bot + IA',
          href: '/whatsapp-bot',
          icon: Bot,
          badge: 'Veredal',
          badgeVariant: 'success'
        },
        {
          name: 'Pizarra de Precios',
          href: '/precios',
          icon: TrendingUp,
          badge: 'Bolsa',
          badgeVariant: 'amber'
        }
      ]
    },
    {
      title: 'Logística Rural & Transporte',
      items: [
        {
          name: 'AgroFlete (Tipo Uber)',
          href: '/flete',
          icon: Truck,
          badge: 'Milk-Run',
          badgeVariant: 'primary'
        },
        {
          name: 'Mis Envíos & Escrow',
          href: '/rastreo',
          icon: Package,
          badge: 'Antifraude',
          badgeVariant: 'success'
        }
      ]
    },
    {
      title: 'Finanzas & Insumos',
      items: [
        {
          name: 'Plan de Rentabilidad',
          href: '/unit-economics',
          icon: Calculator,
          badge: 'Unit Econ.',
          badgeVariant: 'primary'
        },
        {
          name: 'Proveedores de Insumos',
          href: '/proveedores',
          icon: Building2,
          badge: '-35%',
          badgeVariant: 'amber'
        }
      ]
    },
    {
      title: 'Operación en Finca',
      items: [
        {
          name: 'Mi Finca & Lotes',
          href: '/mi-finca',
          icon: Sprout
        },
        {
          name: 'Libro de Liquidación',
          href: '/pesaje',
          icon: Scale,
          badge: 'Báscula'
        },
        {
          name: 'Configuración',
          href: '/settings',
          icon: Settings
        }
      ]
    }
  ]

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es'
    i18n.changeLanguage(newLang)
  }

  return (
    <aside
      className={cn(
        'border-r border-border bg-card/95 backdrop-blur-md flex flex-col justify-between h-full select-none transition-all duration-200 ease-in-out shrink-0',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* 1. Cabecera de Identidad Agro-Logística */}
      <div className="p-3 border-b border-border bg-gradient-to-br from-primary/15 via-secondary/40 to-transparent flex items-center justify-between">
        {!collapsed ? (
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-9 w-9 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-black shadow-md border border-primary-foreground/20 text-lg shrink-0">
              🌱
            </div>
            <div className="min-w-0">
              <h1 className="font-black text-sm tracking-tight text-foreground truncate">
                AgroConexión
              </h1>
              <p className="text-[10px] font-bold text-primary flex items-center gap-1">
                <span>🇨🇴</span> Red Agro-Logística
              </p>
            </div>
          </div>
        ) : (
          <div className="mx-auto h-9 w-9 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-black shadow-md text-lg">
            🌱
          </div>
        )}

        <button
          onClick={toggleCollapse}
          className={cn(
            'p-1.5 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors shrink-0',
            collapsed && 'hidden'
          )}
          title="Colapsar menú"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      {collapsed && (
        <div className="py-2 flex justify-center border-b border-border/60">
          <button
            onClick={toggleCollapse}
            className="p-1.5 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            title="Expandir menú"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* 2. Navegación Organizada por Secciones Claras */}
      <ScrollArea className="flex-1 px-2 py-2">
        <div className="space-y-4">
          {secciones.map((sec, secIdx) => (
            <div key={secIdx} className="space-y-1">
              {/* Título de la Sección */}
              {!collapsed && (
                <div className="px-2 pt-1 pb-1">
                  <h3 className="text-[10px] font-black uppercase tracking-wider text-muted-foreground/75 truncate">
                    {sec.title}
                  </h3>
                </div>
              )}

              {/* Enlaces de la Sección */}
              <div className="space-y-0.5">
                {sec.items.map((item) => {
                  const isActive = location.pathname === item.href
                  const Icon = item.icon

                  return (
                    <Button
                      key={item.href}
                      variant={isActive ? 'default' : 'ghost'}
                      size="sm"
                      title={collapsed ? item.name : undefined}
                      className={cn(
                        'w-full h-9 font-semibold text-xs rounded-xl transition-all',
                        collapsed
                          ? 'justify-center px-0'
                          : 'justify-between px-2.5',
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-sm font-bold'
                          : 'hover:bg-secondary/70 text-foreground/80 hover:text-foreground'
                      )}
                      asChild
                    >
                      <Link to={item.href}>
                        <div className="flex items-center gap-2 truncate">
                          <Icon
                            className={cn(
                              'h-4 w-4 shrink-0 transition-colors',
                              isActive ? 'text-primary-foreground' : 'text-primary'
                            )}
                          />
                          {!collapsed && <span className="truncate">{item.name}</span>}
                        </div>

                        {!collapsed && item.badge && (
                          <span
                            className={cn(
                              'text-[9px] px-1.5 py-0.2 rounded-full font-black shrink-0 ml-1 border',
                              isActive
                                ? 'bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30'
                                : item.badgeVariant === 'success'
                                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/25'
                                : item.badgeVariant === 'amber'
                                ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/25'
                                : 'bg-secondary text-secondary-foreground border-border'
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </Button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* 3. Pie del Menú con Controles Rápidos y Perfil */}
      <div className="p-2 border-t border-border bg-secondary/30 space-y-1.5">
        {!collapsed ? (
          <>
            {/* Controles de Ambiente e Idioma */}
            <div className="grid grid-cols-2 gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="h-7 px-2 text-[10px] font-bold rounded-xl border-border bg-card justify-center gap-1 shadow-none"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="h-3 w-3 text-amber-500" />
                    <span>Amanecer</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-3 w-3 text-primary" />
                    <span>Nocturno</span>
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="h-7 px-2 text-[10px] font-bold rounded-xl border-border bg-card justify-center gap-1 shadow-none"
              >
                <Languages className="h-3 w-3 text-primary" />
                <span>{i18n.language === 'es' ? '🇨🇴 ES' : '🌎 EN'}</span>
              </Button>
            </div>

            {/* Tarjeta de Sesión Veredal / Mayordomo */}
            <div className="p-2 rounded-xl bg-card border border-border flex items-center justify-between text-xs shadow-sm">
              <div className="flex items-center gap-2 min-w-0">
                <div className="h-7 w-7 rounded-lg bg-primary/15 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                  DH
                </div>
                <div className="min-w-0">
                  <p className="font-extrabold text-[11px] text-foreground truncate">
                    Don Hernando V.
                  </p>
                  <p className="text-[9px] text-muted-foreground truncate">
                    Finca La Esperanza
                  </p>
                </div>
              </div>
              <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" title="Conectado a la Red" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1.5 py-1">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground"
              title="Cambiar tema"
            >
              {theme === 'dark' ? (
                <Sun className="h-3.5 w-3.5 text-amber-500" />
              ) : (
                <Moon className="h-3.5 w-3.5 text-primary" />
              )}
            </button>
            <div
              className="h-7 w-7 rounded-lg bg-primary/15 text-primary flex items-center justify-center font-bold text-[10px] shrink-0"
              title="Don Hernando Valencia • En Línea"
            >
              DH
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
