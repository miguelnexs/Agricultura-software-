import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Wheat, TrendingUp, Users, DollarSign, Coffee, Award, Truck } from 'lucide-react'

export function AnalyticsPage(): JSX.Element {
  const { t } = useTranslation()

  const stats = [
    {
      title: t('analytics.revenue'),
      value: '$48.650.000 COP',
      change: '+18.4% frente a mitaca anterior',
      icon: DollarSign,
      color: 'text-primary bg-primary/15 border-primary/25'
    },
    {
      title: t('analytics.sales'),
      value: '22,4 Cargas (2.800 kg)',
      change: 'Factor de rendimiento: 88.6 (Bonificado)',
      icon: Coffee,
      color: 'text-amber-700 dark:text-amber-400 bg-amber-500/15 border-amber-500/25'
    },
    {
      title: t('analytics.users'),
      value: '28 Recolectores',
      change: 'Promedio: 9.5 arrobas/día por jornalero',
      icon: Users,
      color: 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 border-emerald-500/25'
    },
    {
      title: t('analytics.growth'),
      value: '9,2 Cargas / Ha',
      change: '+1,4 cargas gracias a renovación y sombrío',
      icon: TrendingUp,
      color: 'text-lime-700 dark:text-lime-400 bg-lime-500/15 border-lime-500/25'
    }
  ]

  const cosechaMeses = [
    { mes: 'May (Mitaca)', arrobas: 310, pct: 55 },
    { mes: 'Jun', arrobas: 240, pct: 42 },
    { mes: 'Jul', arrobas: 120, pct: 22 },
    { mes: 'Ago', arrobas: 150, pct: 28 },
    { mes: 'Sep', arrobas: 390, pct: 68 },
    { mes: 'Oct (Principal)', arrobas: 560, pct: 96 },
    { mes: 'Nov (Actual)', arrobas: 520, pct: 90 }
  ]

  const entregasCooperativa = [
    {
      fecha: '08 Nov 2026',
      comprador: 'Cooperativa de Caficultores del Quindío',
      producto: '6 Cargas Café Pergamino Seco (Sello Especial)',
      valor: '$13.450.000 COP',
      estado: 'Liquidado en Cuenta'
    },
    {
      fecha: '04 Nov 2026',
      comprador: 'Comercializadora Andina Hass S.A.S.',
      producto: '1.850 kg Aguacate Hass Calibre 18-22',
      valor: '$9.620.000 COP',
      estado: 'Liquidado en Cuenta'
    },
    {
      fecha: '01 Nov 2026',
      comprador: 'Plaza Mayorista de Armenia (Yipao)',
      producto: '45 Racimos Plátano Dominico Hartón',
      valor: '$1.440.000 COP',
      estado: 'Pago en Efectivo'
    },
    {
      fecha: '28 Oct 2026',
      comprador: 'Trapiche Comunitario San José',
      producto: '28 Pacas de Panela Pulverizada y en Bloque',
      valor: '$2.072.000 COP',
      estado: 'Liquidado en Cuenta'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
            <Wheat className="h-3.5 w-3.5" />
            Balance Productivo y Comercial
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
            {t('analytics.title')}
          </h2>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-secondary border border-border text-xs font-bold text-secondary-foreground">
          <Award className="h-4 w-4 text-primary" />
          Prima por Calidad Café de Origen: +$185.000 / Carga
        </div>
      </div>

      {/* Tarjetas de Indicadores */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-border bg-card text-card-foreground shadow-sm p-5"
          >
            <div className="flex flex-row items-center justify-between pb-3">
              <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {stat.title}
              </span>
              <div className={`p-2 rounded-lg border ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1 font-medium">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Gráfica de Cosecha y Entregas en Cooperativa */}
      <div className="grid gap-6 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between"
        >
          <div>
            <h3 className="font-bold text-lg text-foreground">
              Curva de Recolección (Mitaca vs. Cosecha Principal)
            </h3>
            <p className="text-xs text-muted-foreground mb-6">
              Arrobas (@) de café cereza pesadas en el beneficiadero durante los últimos 7 meses
            </p>
          </div>

          <div className="h-64 flex items-end justify-between gap-3 pt-6 px-2 border-b border-border pb-3">
            {cosechaMeses.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[11px] font-extrabold text-foreground">
                  {item.arrobas}@
                </span>
                <div className="w-full max-w-[44px] bg-secondary/70 rounded-t-xl h-44 flex items-end overflow-hidden p-0.5 border border-border">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${item.pct}%` }}
                    transition={{ duration: 0.6, delay: idx * 0.07 }}
                    className={`w-full rounded-t-lg ${
                      item.pct > 80
                        ? 'bg-gradient-to-t from-primary to-emerald-500'
                        : 'bg-primary/75'
                    }`}
                  />
                </div>
                <span className="text-[11px] font-semibold text-muted-foreground text-center">
                  {item.mes}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-muted-foreground gap-2">
            <span>🌱 Conversión promedio: 5 kg de cereza = 1 kg de pergamino seco</span>
            <span className="font-bold text-primary">Humedad en silo: 11.2%</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35 }}
          className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                Remesas y Ventas en Cooperativa
              </h3>
              <p className="text-xs text-muted-foreground">
                Últimos despachos en Jeep Willys y camión desde la finca
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {entregasCooperativa.map((entrega, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-background border border-border space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-primary">
                    {entrega.comprador}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-medium">
                    {entrega.fecha}
                  </span>
                </div>
                <p className="text-xs font-medium text-foreground">{entrega.producto}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm font-extrabold text-foreground">{entrega.valor}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/15 text-primary">
                    {entrega.estado}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
