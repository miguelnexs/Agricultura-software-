import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Sprout,
  Mountain,
  Droplets,
  Calendar,
  Coffee,
  Trees,
  Sun,
  CheckCircle2,
  MapPin
} from 'lucide-react'

interface LoteFinca {
  id: string
  nombre: string
  cultivo: string
  categoria: 'cafe' | 'aguacate' | 'platano' | 'cana'
  variedad: string
  hectareas: number
  altitud: string
  sombrio: string
  edad: string
  estado: string
  humedad: number
  proximaLabor: string
  produccionEstimada: string
}

const LOTES_DATA: LoteFinca[] = [
  {
    id: 'L-01',
    nombre: 'Lote El Mirador',
    cultivo: 'Café Especial de Montaña',
    categoria: 'cafe',
    variedad: 'Castillo Rosario • Selección Taza',
    hectareas: 4.2,
    altitud: '1.720 m.s.n.m.',
    sombrio: 'Guamo Santafereño y Plátano',
    edad: '4 años (1ra Zoca programada 2028)',
    estado: 'En Cosecha Principal',
    humedad: 78,
    proximaLabor: 'Segundo pase de recolección selectiva',
    produccionEstimada: '38 Cargas de Pergamino Seco'
  },
  {
    id: 'L-02',
    nombre: 'Lote La Cañada',
    cultivo: 'Café de Sombra Tradicional',
    categoria: 'cafe',
    variedad: 'Cenicafé 1 & Caturra',
    hectareas: 5.3,
    altitud: '1.660 m.s.n.m.',
    sombrio: 'Nogal Cafetero y Carbonero',
    edad: '3 años (Plena producción)',
    estado: 'Grano Pintón / Maduro',
    humedad: 80,
    proximaLabor: 'Plateo manual y fertilización orgánica',
    produccionEstimada: '46 Cargas de Pergamino Seco'
  },
  {
    id: 'L-03',
    nombre: 'Lote Alto de los Guamos',
    cultivo: 'Aguacate Hass',
    categoria: 'aguacate',
    variedad: 'Hass Injertado sobre Patrón Criollo',
    hectareas: 4.0,
    altitud: '1.780 m.s.n.m.',
    sombrio: 'Libre exposición con barreras vivas',
    edad: '5 años',
    estado: 'Llenado de Fruto (Calibre Exportación)',
    humedad: 74,
    proximaLabor: 'Monitoreo sanitario y poda de ventilación',
    produccionEstimada: '14 Toneladas / Cosecha Traviesa'
  },
  {
    id: 'L-04',
    nombre: 'Lote La Quebrada',
    cultivo: 'Plátano Dominico Hartón',
    categoria: 'platano',
    variedad: 'Dominico Hartón del Quindío',
    hectareas: 2.5,
    altitud: '1.590 m.s.n.m.',
    sombrio: 'Asociado con Cacao y Cítricos',
    edad: 'Renovación continua por colinos',
    estado: 'Corte Quincenal de Racimos',
    humedad: 82,
    proximaLabor: 'Deshije, descalcetado y embolse de bellota',
    produccionEstimada: '95 Racimos mensuales'
  },
  {
    id: 'L-05',
    nombre: 'Vega del Trapiche',
    cultivo: 'Caña Panelera',
    categoria: 'cana',
    variedad: 'CC 85-92 (Especial para Panela)',
    hectareas: 1.5,
    altitud: '1.540 m.s.n.m.',
    sombrio: 'Cerca viva de Matarratón',
    edad: '14 meses (En sazón)',
    estado: 'Lista para Corte y Molienda',
    humedad: 75,
    proximaLabor: 'Corte por parejo y transporte en mulas al trapiche',
    produccionEstimada: '85 Pacas de Panela Artesanal'
  },
  {
    id: 'L-06',
    nombre: 'Bosque El Guadual',
    cultivo: 'Reserva Natural de Guadua y Agua',
    categoria: 'cana',
    variedad: 'Guadua Angustifolia Kunth & Nacimiento',
    hectareas: 1.0,
    altitud: '1.520 m.s.n.m.',
    sombrio: 'Bosque de Galería Nativo',
    edad: 'Reserva ancestral de la hacienda',
    estado: 'Protección Hídrica Activa',
    humedad: 91,
    proximaLabor: 'Entresaca de guadua hecha en luna menguante',
    produccionEstimada: 'Abastecimiento de agua pura para toda la finca'
  }
]

export function LotesPage(): JSX.Element {
  const [filtro, setFiltro] = useState<'todos' | 'cafe' | 'aguacate' | 'platano' | 'cana'>('todos')

  const lotesFiltrados =
    filtro === 'todos' ? LOTES_DATA : LOTES_DATA.filter((l) => l.categoria === filtro)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <MapPin className="h-3.5 w-3.5" />
            Mapa Agronómico de la Vereda
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
            Lotes y Cultivos de la Hacienda
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Control detallado de variedades, altitud, sombrío y labores culturales por corte.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: 'todos', label: 'Todos los Lotes (6)' },
            { id: 'cafe', label: '☕ Cafetales' },
            { id: 'aguacate', label: '🥑 Aguacate Hass' },
            { id: 'platano', label: '🌿 Plataneras' },
            { id: 'cana', label: '🎋 Caña y Guadual' }
          ].map((btn) => (
            <Button
              key={btn.id}
              size="sm"
              variant={filtro === btn.id ? 'default' : 'outline'}
              onClick={() => setFiltro(btn.id as typeof filtro)}
              className="rounded-full text-xs font-bold"
            >
              {btn.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lotesFiltrados.map((lote, i) => (
          <motion.div
            key={lote.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="p-5 border-b border-border bg-gradient-to-r from-primary/10 via-secondary/40 to-transparent flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="h-11 w-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-sm">
                    {lote.categoria === 'cafe' ? (
                      <Coffee className="h-5 w-5" />
                    ) : lote.categoria === 'cana' ? (
                      <Trees className="h-5 w-5" />
                    ) : (
                      <Sprout className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-secondary text-secondary-foreground border border-border">
                        {lote.id}
                      </span>
                      <h3 className="text-lg font-extrabold text-foreground">{lote.nombre}</h3>
                    </div>
                    <p className="text-xs font-semibold text-primary mt-0.5">{lote.cultivo}</p>
                  </div>
                </div>

                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/25 shrink-0">
                  {lote.hectareas} Ha
                </span>
              </div>

              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-background border border-border">
                    <span className="text-muted-foreground block">Variedad Sembrada</span>
                    <span className="font-bold text-foreground mt-0.5 block">{lote.variedad}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-background border border-border">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Mountain className="h-3 w-3 text-primary" /> Altitud / Piso Térmico
                    </span>
                    <span className="font-bold text-foreground mt-0.5 block">{lote.altitud}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-background border border-border">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Sun className="h-3 w-3 text-amber-600" /> Árboles de Sombrío
                    </span>
                    <span className="font-bold text-foreground mt-0.5 block">{lote.sombrio}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-background border border-border">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Droplets className="h-3 w-3 text-sky-600" /> Humedad del Suelo
                    </span>
                    <span className="font-bold text-foreground mt-0.5 block">{lote.humedad}% Óptima</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-medium">Estado Fenológico:</span>
                    <span className="font-bold text-primary flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {lote.estado}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-medium">Edad del Cultivo:</span>
                    <span className="font-semibold text-foreground">{lote.edad}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-medium">Proyección Cosecha:</span>
                    <span className="font-bold text-foreground">{lote.produccionEstimada}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 py-3 bg-secondary/50 border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                <strong>Próxima labor:</strong> {lote.proximaLabor}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

