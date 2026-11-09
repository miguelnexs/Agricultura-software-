import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/ThemeProvider'
import { Home, Sun, Moon, Mountain, Check, Compass, Scale } from 'lucide-react'

export function SettingsPage(): JSX.Element {
  const { t, i18n } = useTranslation()
  const { theme, setTheme } = useTheme()

  const [nombreFinca, setNombreFinca] = useState('Hacienda La Esperanza')
  const [vereda, setVereda] = useState('Vereda El Paraíso • Salento, Quindío')
  const [altitud, setAltitud] = useState('1.650 m.s.n.m.')
  const [unidadPesaje, setUnidadPesaje] = useState<'arrobas' | 'cargas' | 'kilos'>('arrobas')
  const [guardado, setGuardado] = useState(false)

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  const guardarCambios = () => {
    setGuardado(true)
    setTimeout(() => setGuardado(false), 2500)
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
          <Home className="h-3.5 w-3.5" />
          Administración de la Hacienda
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
          {t('settings.title')}
        </h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Ajusta la identidad de tu finca, las medidas tradicionales de cosecha y el ambiente visual del corredor.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Datos de la Finca */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-card p-6 space-y-5 shadow-sm"
        >
          <div className="flex items-center gap-2.5 border-b border-border pb-3">
            <Compass className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">{t('settings.general')}</h3>
          </div>

          <div className="space-y-4 text-sm">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-muted-foreground">
                Nombre de la Finca o Hacienda
              </label>
              <input
                type="text"
                value={nombreFinca}
                onChange={(e) => setNombreFinca(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-muted-foreground">
                Vereda, Municipio y Departamento
              </label>
              <input
                type="text"
                value={vereda}
                onChange={(e) => setVereda(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1">
                <Mountain className="h-3.5 w-3.5 text-primary" />
                Altitud Media del Cafetal
              </label>
              <input
                type="text"
                value={altitud}
                onChange={(e) => setAltitud(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <Button onClick={guardarCambios} className="w-full font-bold">
              {guardado ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Datos Guardados en el Libro de Hacienda
                </>
              ) : (
                'Guardar Datos de la Finca'
              )}
            </Button>
          </div>
        </motion.div>

        {/* Ambiente Visual, Unidades e Idioma */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border bg-card p-6 space-y-6 shadow-sm"
        >
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Sun className="h-5 w-5 text-amber-500" />
              {t('settings.appearance')}
            </h3>
            <p className="text-xs text-muted-foreground">
              Elige entre la calidez de las paredes de bahareque al amanecer o la frescura nocturna del bosque cafetero.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                onClick={() => setTheme('light')}
                className="justify-start font-bold h-11"
              >
                <Sun className="mr-2 h-4 w-4 text-amber-400" />
                Amanecer Campesino
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                onClick={() => setTheme('dark')}
                className="justify-start font-bold h-11"
              >
                <Moon className="mr-2 h-4 w-4" />
                Noche en el Cafetal
              </Button>
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-border">
            <label className="text-sm font-bold text-foreground flex items-center gap-2">
              <Scale className="h-4 w-4 text-primary" />
              Unidad Tradicional de Pesaje en Beneficiadero
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'arrobas', label: 'Arrobas (@ = 12,5 kg)' },
                { id: 'cargas', label: 'Cargas (125 kg)' },
                { id: 'kilos', label: 'Kilogramos (kg)' }
              ].map((u) => (
                <Button
                  key={u.id}
                  size="sm"
                  variant={unidadPesaje === u.id ? 'default' : 'outline'}
                  onClick={() => setUnidadPesaje(u.id as typeof unidadPesaje)}
                  className="font-semibold text-xs"
                >
                  {u.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-border">
            <label className="text-sm font-bold text-foreground block">
              {t('settings.language_select')}
            </label>
            <div className="flex gap-3">
              <Button
                variant={i18n.language === 'es' ? 'default' : 'outline'}
                onClick={() => changeLanguage('es')}
                className="font-bold"
              >
                🇨🇴 Español Colombiano
              </Button>
              <Button
                variant={i18n.language === 'en' ? 'default' : 'outline'}
                onClick={() => changeLanguage('en')}
                className="font-bold"
              >
                🌎 English (Export)
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
