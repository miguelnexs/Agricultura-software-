import { Link, useLocation } from 'react-router-dom'
import { cn } from '../utils/cn'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
import { useTheme } from './ThemeProvider'
import { useTranslation } from 'react-i18next'
import { LayoutDashboard, Users, Settings, BarChart3, HelpCircle, Sun, Moon, LogOut, Languages } from 'lucide-react'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps): JSX.Element {
  const location = useLocation()
  const { theme, setTheme } = useTheme()
  const { t, i18n } = useTranslation()
  
  const links = [
    { name: t('sidebar.dashboard'), href: '/', icon: LayoutDashboard },
    { name: t('sidebar.analytics'), href: '/analytics', icon: BarChart3 },
    { name: t('sidebar.customers'), href: '/customers', icon: Users },
    { name: t('sidebar.settings'), href: '/settings', icon: Settings },
  ]

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es'
    i18n.changeLanguage(newLang)
  }

  return (
    <div className={cn("pb-12 w-64 border-r bg-card flex flex-col justify-between h-full", className)}>
      <ScrollArea className="h-full">
        <div className="space-y-4 py-4">
          <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              Menu
            </h2>
            <div className="space-y-1">
              {links.map((link) => (
                <Button
                  key={link.href}
                  variant={location.pathname === link.href ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <Link to={link.href}>
                    <link.icon className="mr-2 h-4 w-4" />
                    {link.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t space-y-2">
        <div className="flex items-center justify-between px-2">
          <span className="text-sm font-medium">{t('sidebar.theme')}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-8 w-8 rounded-full"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex items-center justify-between px-2">
          <span className="text-sm font-medium">{t('sidebar.language')}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="h-8 px-2 text-xs font-bold"
          >
            <Languages className="mr-2 h-4 w-4" />
            {i18n.language.toUpperCase()}
          </Button>
        </div>

        <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 mt-4">
          <LogOut className="mr-2 h-4 w-4" />
          {t('sidebar.logout')}
        </Button>
      </div>
    </div>
  )
}
