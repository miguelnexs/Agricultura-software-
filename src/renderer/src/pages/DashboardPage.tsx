import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { safeIpc, isElectron } from '@/utils/platform'
import { Activity, ShieldCheck, Zap, MousePointer2 } from 'lucide-react'
import logo from '../assets/logo.png'
import { useTranslation } from 'react-i18next'

export function DashboardPage(): JSX.Element {
  const { t } = useTranslation()
  const [count, setCount] = useState(0)

  const handlePing = (): void => {
    // @ts-ignore
    window.api.send('ping', 'pong')
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Hero Section */}
      <motion.section 
        variants={item}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/5 to-background border border-primary/10 p-8 md:p-12 shadow-2xl"
      >
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                {t('app.welcome')}
              </h2>
              <p className="text-xl font-medium text-foreground/80">
                {t('app.subtitle')}
              </p>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto md:mx-0">
              {t('app.description')}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
              <Button onClick={() => setCount((c) => c + 1)} size="lg" className="shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300">
                <MousePointer2 className="mr-2 h-5 w-5" />
                {t('dashboard.clicks')}: {count}
              </Button>
              
              {isElectron() && (
                <Button variant="secondary" onClick={handlePing} size="lg" className="shadow-sm">
                  <Activity className="mr-2 h-5 w-5" />
                  {t('dashboard.test_ipc')}
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex justify-center md:justify-end">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src={logo} 
                alt="Assent Logo" 
                className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
        
        {/* Decorative background blob */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 right-20 translate-y-12 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
      </motion.section>

      {/* Feature Cards */}
      <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: t('dashboard.modern_ts'),
            desc: t('dashboard.modern_ts_desc'),
            icon: ShieldCheck,
            color: "text-blue-500 bg-blue-500/10"
          },
          {
            title: t('dashboard.ui_ux'),
            desc: t('dashboard.ui_ux_desc'),
            icon: MousePointer2,
            color: "text-purple-500 bg-purple-500/10"
          },
          {
            title: t('dashboard.dev_exp'),
            desc: t('dashboard.dev_exp_desc'),
            icon: Zap,
            color: "text-amber-500 bg-amber-500/10"
          }
        ].map((feature, i) => (
          <motion.div 
            key={i}
            variants={item}
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-card border shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/20 group cursor-default"
          >
            <div className={`size-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Button Showcase */}
      <motion.div variants={item} className="p-8 border rounded-3xl bg-card/50 backdrop-blur-sm shadow-sm">
        <h3 className="font-semibold mb-6 text-xl flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          {t('dashboard.components_gallery')}
        </h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          
          <div className="h-8 w-px bg-border mx-2" />
          
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" variant="outline" className="rounded-full">
            <Activity className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
