import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { BarChart, TrendingUp, Users, DollarSign } from 'lucide-react'

export function AnalyticsPage(): JSX.Element {
  const { t } = useTranslation()

  const stats = [
    {
      title: t('analytics.revenue'),
      value: "$45,231.89",
      change: "+20.1%",
      icon: DollarSign,
      color: "text-green-500"
    },
    {
      title: t('analytics.users'),
      value: "+2350",
      change: "+180.1%",
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: t('analytics.sales'),
      value: "+12,234",
      change: "+19%",
      icon: TrendingUp,
      color: "text-purple-500"
    },
    {
      title: t('analytics.growth'),
      value: "+573",
      change: "+201",
      icon: BarChart,
      color: "text-amber-500"
    }
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">{t('analytics.title')}</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border bg-card text-card-foreground shadow p-6"
          >
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <span className="text-sm font-medium">{stat.title}</span>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.change} from last month
            </p>
          </motion.div>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="col-span-4 rounded-xl border bg-card p-6"
        >
          <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg bg-muted/20">
            <span className="text-muted-foreground">Chart Placeholder</span>
          </div>
        </motion.div>
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.5 }}
           className="col-span-3 rounded-xl border bg-card p-6"
        >
          <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg bg-muted/20">
            <span className="text-muted-foreground">Recent Activity Placeholder</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
