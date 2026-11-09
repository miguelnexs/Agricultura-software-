import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { isElectron } from '@/utils/platform'
import {
  Activity,
  Sprout,
  Sun,
  Droplets,
  ThermometerSun,
  Coffee,
  CheckCircle2,
  Circle,
  Scale,
  MapPin,
  Trees,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface LaborItem {
  id: number
  titulo: string
  lote: string
  responsable: string
  hora: string
  completada: boolean
}

export function DashboardPage(): JSX.Element {
  const { t } = useTranslation()
  const [arrobas, setArrobas] = useState(38)
  const [labores, setLabores] = useState<LaborItem[]>([
    {
      id: 1,
      titulo: 'Recolección de café cereza maduro (2do pase)',
      lote: 'Lote El Mirador (1.720 m)',
      responsable: 'Cuadrilla de Don Hernando (12 recolectores)',
      hora: '06:00 AM',
      completada: true
    },
    {
      id: 2,
      titulo: 'Volteo de café pergamino en marquesina solar',
      lote: 'Beneficiadero Principal',
      responsable: 'Mayordomo Carlos Arias',
      hora: '10:30 AM',
      completada: true
    },
    {
      id: 3,
      titulo: 'Deshoje y destronque de Plátano Dominico Hartón',
      lote: 'Lote La Quebrada',
      responsable: 'Jhon Jairo & Mateo',
      hora: '01:30 PM',
      completada: false
    },
    {
      id: 4,
      titulo: 'Abonada orgánica con pulpa compostada y micorrizas',
      lote: 'Lote Alto de los Guamos (Aguacate Hass)',
      responsable: 'Cuadrilla Técnica',
      hora: '03:00 PM',
      completada: false
    }
  ])

  const handlePing = (): void => {
    // @ts-ignore
    window.api?.send('ping', 'pong')
  }

  const toggleLabor = (id: number): void => {
    setLabores((prev) =>
      prev.map((l) => (l.id === id ? { ...l, completada: !l.completada } : l))
    )
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const item = {
    hidden: { y: 16, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-7"
    >
      {/* Hero Banner Cultural: Hacienda Cafetera Colombiana */}
      <motion.section
        variants={item}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/60 to-card border border-border shadow-xl"
      >
        {/* Franja superior de Zócalo */}
        <div className="h-2 w-full zocalo-border opacity-90" />

        <div className="p-7 md:p-10 relative z-10 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/25 text-primary text-xs font-bold tracking-wide">
              <MapPin className="w-3.5 h-3.5" />
              <span>PAISAJE CULTURAL CAFETERO • TRADICIÓN DE MONTAÑA</span>
            </div>

            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
                {t('app.welcome')}
              </h2>
              <p className="text-lg md:text-xl font-semibold text-primary mt-1">
                {t('app.subtitle')}
              </p>
            </div>

            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
              {t('app.description')}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                onClick={() => setArrobas((c) => c + 1)}
                size="lg"
                className="shadow-md hover:shadow-lg transition-all font-bold"
              >
                <Scale className="mr-2 h-5 w-5" />
                {t('dashboard.clicks')}: {arrobas} (@ = {arrobas * 12.5} kg)
              </Button>

              <Button variant="secondary" size="lg" className="font-semibold border border-border" asChild>
                <Link to="/lotes">
                  <Sprout className="mr-2 h-5 w-5 text-primary" />
                  Recorrer Lotes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              {isElectron() && (
                <Button variant="outline" onClick={handlePing} size="lg">
                  <Activity className="mr-2 h-5 w-5 text-primary" />
                  {t('dashboard.test_ipc')}
                </Button>
              )}
            </div>
          </div>

          {/* Ilustración SVG Cultural: Finca Cafetera, Palmas de Cera y Cordillera */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 250 }}
              className="w-full max-w-sm rounded-2xl bg-gradient-to-b from-amber-100/70 via-emerald-100/50 to-emerald-900/20 dark:from-amber-950/40 dark:via-emerald-950/40 dark:to-background p-4 border border-border shadow-inner"
            >
              <svg
                viewBox="0 0 360 230"
                className="w-full h-auto rounded-xl overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fde68a" />
                    <stop offset="60%" stopColor="#fef3c7" />
                    <stop offset="100%" stopColor="#d1fae5" />
                  </linearGradient>
                  <linearGradient id="mtnBack" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#166534" />
                    <stop offset="100%" stopColor="#14532d" />
                  </linearGradient>
                  <linearGradient id="mtnMid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#15803d" />
                    <stop offset="100%" stopColor="#166534" />
                  </linearGradient>
                  <linearGradient id="mtnFront" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#15803d" />
                  </linearGradient>
                </defs>

                {/* Cielo de amanecer en los Andes */}
                <rect width="360" height="230" fill="url(#skyGrad)" />

                {/* Sol de los Venados */}
                <circle cx="290" cy="52" r="28" fill="#f59e0b" opacity="0.85" />
                <circle cx="290" cy="52" r="38" fill="#fbbf24" opacity="0.25" />

                {/* Nubes suaves */}
                <path
                  d="M40 50 Q55 40 70 50 Q85 43 95 52 L35 52 Z"
                  fill="#ffffff"
                  opacity="0.75"
                />
                <path
                  d="M170 35 Q185 25 200 35 Q215 28 225 37 L165 37 Z"
                  fill="#ffffff"
                  opacity="0.7"
                />

                {/* Cordillera lejana */}
                <path
                  d="M0 140 Q70 75 150 120 T310 95 L360 115 L360 230 L0 230 Z"
                  fill="url(#mtnBack)"
                />

                {/* Montaña media con surcos de cafetal */}
                <path
                  d="M0 155 Q110 95 210 145 T360 125 L360 230 L0 230 Z"
                  fill="url(#mtnMid)"
                />

                {/* Palmas de Cera del Quindío */}
                <g stroke="#064e3b" strokeWidth="2" fill="none">
                  <path d="M62 140 Q60 95 65 65" />
                  <path d="M88 145 Q90 105 86 78" />
                </g>
                <g fill="#065f46">
                  <circle cx="65" cy="63" r="8" />
                  <circle cx="58" cy="66" r="6" />
                  <circle cx="72" cy="66" r="6" />
                  <circle cx="86" cy="76" r="7" />
                  <circle cx="80" cy="79" r="5" />
                  <circle cx="92" cy="79" r="5" />
                </g>

                {/* Colina frontal de la Hacienda */}
                <path
                  d="M0 185 Q140 140 360 175 L360 230 L0 230 Z"
                  fill="url(#mtnFront)"
                />

                {/* Casa Tradicional de Hacienda Cafetera (Bahareque, Teja de Barro y Zócalos) */}
                <g transform="translate(125, 118)">
                  {/* Sombra base */}
                  <rect x="-8" y="54" width="136" height="6" rx="3" fill="#064e3b" opacity="0.4" />
                  {/* Paredes blancas de bahareque y cal */}
                  <rect x="0" y="20" width="120" height="36" fill="#fefcf6" stroke="#78350f" strokeWidth="1.5" />
                  {/* Zócalo rojo y amarillo tradicional */}
                  <rect x="0" y="46" width="120" height="10" fill="#b91c1c" />
                  <rect x="0" y="44" width="120" height="2" fill="#f59e0b" />
                  {/* Columnas de madera del corredor */}
                  <rect x="20" y="20" width="3" height="36" fill="#78350f" />
                  <rect x="58" y="20" width="3" height="36" fill="#78350f" />
                  <rect x="96" y="20" width="3" height="36" fill="#78350f" />
                  {/* Puerta y ventanas verdes con chambranas */}
                  <rect x="34" y="27" width="14" height="27" fill="#15803d" stroke="#ffffff" strokeWidth="1" />
                  <rect x="6" y="27" width="10" height="12" fill="#15803d" stroke="#ffffff" strokeWidth="1" />
                  <rect x="72" y="27" width="14" height="12" fill="#15803d" stroke="#ffffff" strokeWidth="1" />
                  <rect x="103" y="27" width="10" height="12" fill="#15803d" stroke="#ffffff" strokeWidth="1" />
                  {/* Techo de teja de barro cocido */}
                  <polygon
                    points="-12,22 60,-4 132,22"
                    fill="#9a3412"
                    stroke="#7c2d12"
                    strokeWidth="2"
                  />
                  <polygon points="-6,20 60,0 126,20" fill="#c2410c" />
                </g>

                {/* Ramas de café con cerezas rojas en primer plano */}
                <g transform="translate(15, 175)">
                  <circle cx="15" cy="20" r="14" fill="#14532d" />
                  <circle cx="32" cy="24" r="12" fill="#166534" />
                  <circle cx="18" cy="18" r="3.5" fill="#dc2626" />
                  <circle cx="25" cy="22" r="3.5" fill="#ef4444" />
                  <circle cx="12" cy="25" r="3" fill="#b91c1c" />
                  <circle cx="33" cy="20" r="3" fill="#f59e0b" />
                </g>
              </svg>

              <div className="mt-2.5 flex items-center justify-between text-xs px-1">
                <span className="font-bold text-foreground flex items-center gap-1.5">
                  <Coffee className="h-3.5 w-3.5 text-primary" />
                  Hacienda La Esperanza
                </span>
                <span className="text-muted-foreground font-medium">
                  Cosecha 2026 • Café de Origen
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Indicadores de Clima, Suelo y Beneficiadero */}
      <motion.div variants={container} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Clima en la Vereda',
            valor: '22°C • Soleado',
            detalle: 'Viento suave del cañón (12 km/h)',
            icon: Sun,
            accent: 'text-amber-600 dark:text-amber-400 bg-amber-500/15 border-amber-500/25'
          },
          {
            label: 'Humedad del Suelo',
            valor: '76% Óptima',
            detalle: 'Suelo franco-volcánico con sombrío',
            icon: Droplets,
            accent: 'text-sky-600 dark:text-sky-400 bg-sky-500/15 border-sky-500/25'
          },
          {
            label: 'Marquesina / Elbas',
            valor: '14 Cargas al Sol',
            detalle: 'Humedad de grano actual: 11.4%',
            icon: ThermometerSun,
            accent: 'text-orange-600 dark:text-orange-400 bg-orange-500/15 border-orange-500/25'
          },
          {
            label: 'Pesaje del Día',
            valor: `${arrobas} Arrobas (@)`,
            detalle: `Equivalente a ${(arrobas * 12.5).toLocaleString()} kg de cereza`,
            icon: Scale,
            accent: 'text-primary bg-primary/15 border-primary/25'
          }
        ].map((card, idx) => (
          <motion.div
            key={idx}
            variants={item}
            className="p-4 rounded-2xl bg-card border border-border shadow-sm flex items-start gap-3.5"
          >
            <div className={`p-3 rounded-xl border ${card.accent} shrink-0`}>
              <card.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">{card.label}</p>
              <p className="text-lg font-extrabold text-foreground mt-0.5">{card.valor}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{card.detalle}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Pilares Culturales y Productivos de la Finca */}
      <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: t('dashboard.modern_ts'),
            desc: t('dashboard.modern_ts_desc'),
            tag: 'Conservación & Agua',
            icon: Trees,
            color: 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 border-emerald-500/25'
          },
          {
            title: t('dashboard.ui_ux'),
            desc: t('dashboard.ui_ux_desc'),
            tag: 'Calidad Taza 86.5 pts',
            icon: Coffee,
            color: 'text-amber-800 dark:text-amber-400 bg-amber-600/15 border-amber-600/25'
          },
          {
            title: t('dashboard.dev_exp'),
            desc: t('dashboard.dev_exp_desc'),
            tag: 'Soberanía Alimentaria',
            icon: Sprout,
            color: 'text-lime-700 dark:text-lime-400 bg-lime-500/15 border-lime-500/25'
          }
        ].map((feature, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`size-12 rounded-xl border ${feature.color} flex items-center justify-center group-hover:scale-105 transition-transform`}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
                {feature.tag}
              </span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-foreground">{feature.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Bitácora del Mayordomo y Resumen de Cosecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <motion.div
          variants={item}
          className="lg:col-span-7 p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Planilla de Labores del Día (Mayordomía)
              </h3>
              <p className="text-xs text-muted-foreground">
                Haz clic en una labor para marcarla como cumplida en la libreta de campo.
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/15 text-primary">
              {labores.filter((l) => l.completada).length} de {labores.length} listas
            </span>
          </div>

          <div className="space-y-2.5">
            {labores.map((labor) => (
              <div
                key={labor.id}
                onClick={() => toggleLabor(labor.id)}
                role="button"
                className={`p-3.5 rounded-xl border transition-all flex items-start gap-3.5 ${
                  labor.completada
                    ? 'bg-primary/5 border-primary/25 opacity-85'
                    : 'bg-background hover:bg-secondary/40 border-border'
                }`}
              >
                <div className="mt-0.5 text-primary">
                  {labor.completada ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-semibold ${
                      labor.completada ? 'line-through text-muted-foreground' : 'text-foreground'
                    }`}
                  >
                    {labor.titulo}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-muted-foreground">
                    <span className="font-medium text-primary">{labor.lote}</span>
                    <span>•</span>
                    <span>{labor.responsable}</span>
                  </div>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-secondary text-secondary-foreground shrink-0">
                  {labor.hora}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Estado de Cultivos de la Finca */}
        <motion.div
          variants={item}
          className="lg:col-span-5 p-6 rounded-2xl bg-card border border-border shadow-sm flex flex-col justify-between space-y-5"
        >
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg text-foreground">
                Distribución Agrícola de la Hacienda
              </h3>
              <p className="text-xs text-muted-foreground">
                18.5 Hectáreas totales en producción agroecológica
              </p>
            </div>

            <div className="space-y-3.5">
              {[
                {
                  nombre: 'Café Arábica (Castillo & Cenicafé 1)',
                  area: '9.5 Ha • 48.000 árboles',
                  pct: 52,
                  color: 'bg-primary'
                },
                {
                  nombre: 'Aguacate Hass de Exportación',
                  area: '4.0 Ha • En llenado de fruto',
                  pct: 22,
                  color: 'bg-emerald-600'
                },
                {
                  nombre: 'Plátano Dominico Hartón (Barreras)',
                  area: '2.5 Ha • 1.800 sitios',
                  pct: 14,
                  color: 'bg-amber-600'
                },
                {
                  nombre: 'Caña Panelera & Reserva de Guadua',
                  area: '2.5 Ha • Protección de quebrada',
                  pct: 12,
                  color: 'bg-lime-700'
                }
              ].map((c, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-foreground">{c.nombre}</span>
                    <span className="text-muted-foreground font-medium">{c.area}</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className={`h-full rounded-full ${c.color}`}
                      style={{ width: `${c.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-secondary/60 border border-border text-xs space-y-1.5">
            <p className="font-bold text-secondary-foreground">
              ☕ Dicho del Corredor Cafetero:
            </p>
            <p className="italic text-muted-foreground leading-relaxed">
              “A la tierra buena y al cafetal bien sombreado, nunca le falta el grano maduro ni el agua en la quebrada.”
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
