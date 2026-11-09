import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Package,
  Sparkles,
  ShoppingBag,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Truck,
  Plus,
  ArrowRight,
  Filter
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface InsumoAgro {
  id: string
  nombre: string
  categoria: 'fertilizantes' | 'herramientas' | 'semillas' | 'alimentacion'
  proveedor: string
  ubicacion: string
  precioDirecto: number
  precioComercio: number
  unidad: string
  minimoPedido: string
  emoji: string
  descripcion: string
  calificacion: number
}

const INSUMOS_INICIALES: InsumoAgro[] = [
  {
    id: 'ins-1',
    nombre: 'Abono Orgánico Compostado con Micorrizas (50 kg)',
    categoria: 'fertilizantes',
    proveedor: 'BioAbonos de la Cordillera',
    ubicacion: 'Parque Agroindustrial • Manizales',
    precioDirecto: 38000,
    precioComercio: 54000,
    unidad: 'Bulto de 50 kg',
    minimoPedido: '5 bultos',
    emoji: '🌱',
    descripcion: 'Rico en materia orgánica, microorganismos benéficos y pulpa de café compostada. Recupera suelos erosionados.',
    calificacion: 4.9
  },
  {
    id: 'ins-2',
    nombre: 'Tijeras de Podar Felco 2 Profesionales',
    categoria: 'herramientas',
    proveedor: 'Importadora AgroAndina',
    ubicacion: 'Pereira, Risaralda',
    precioDirecto: 185000,
    precioComercio: 245000,
    unidad: 'Unidad',
    minimoPedido: '1 unidad',
    emoji: '✂️',
    descripcion: 'Acero templado suizo, repuestos originales garantizados. Indispensable para zoca y desmoche de cafetales.',
    calificacion: 5.0
  },
  {
    id: 'ins-3',
    nombre: 'Cal Dolomita Agrícola Micronizada (Corrector de Acidez)',
    categoria: 'fertilizantes',
    proveedor: 'Minerales de Caldas S.A.',
    ubicacion: 'Neira, Caldas',
    precioDirecto: 14500,
    precioComercio: 22000,
    unidad: 'Bulto de 50 kg',
    minimoPedido: '10 bultos',
    emoji: '🪨',
    descripcion: 'Aporta Calcio y Magnesio asimilable. Neutraliza el aluminio tóxico en suelos cafeteros de ladera.',
    calificacion: 4.8
  },
  {
    id: 'ins-4',
    nombre: 'Colinos de Plátano Dominico Hartón Certificados',
    categoria: 'semillas',
    proveedor: 'Vivero Agrobiológico El Paraíso',
    ubicacion: 'Armenia, Quindío',
    precioDirecto: 2800,
    precioComercio: 4500,
    unidad: 'Plántula lista para siembra',
    minimoPedido: '50 unidades',
    emoji: '🌿',
    descripcion: 'Libres de picudo y moko. Multiplicadas por meristemos para máximo vigor y racimos de 25+ kilos.',
    calificacion: 4.9
  },
  {
    id: 'ins-5',
    nombre: 'Concentrado Postura Campesina con Maíz y Harina de Pescado',
    categoria: 'alimentacion',
    proveedor: 'Nutrición Animal del Valle',
    ubicacion: 'Cartago, Valle del Cauca',
    precioDirecto: 76000,
    precioComercio: 95000,
    unidad: 'Bulto de 40 kg',
    minimoPedido: '2 bultos',
    emoji: '🌽',
    descripcion: 'Formulado para yemas de huevo bien coloradas y cáscara dura en gallinas libres de pastoreo.',
    calificacion: 4.8
  }
]

export function ProveedoresAgroPage(): JSX.Element {
  const [insumos, setInsumos] = useState<InsumoAgro[]>(INSUMOS_INICIALES)
  const [categoria, setCategoria] = useState<string>('todos')
  const [modalCotizar, setModalCotizar] = useState<InsumoAgro | null>(null)
  const [pedidoEnviado, setPedidoEnviado] = useState<boolean>(false)

  const filtrados = insumos.filter((item) => {
    if (categoria === 'todos') return true
    return item.categoria === categoria
  })

  return (
    <div className="space-y-6">
      {/* Banner Proveedores a Campesinos */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/25 via-secondary/70 to-card border border-border p-6 md:p-8 shadow-md">
        <div className="h-1.5 w-full zocalo-border absolute top-0 left-0" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-extrabold uppercase tracking-wider">
              <Building2 className="h-3.5 w-3.5" />
              Alianza Proveedor Directo al Campesino
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
              Insumos y Herramientas a Precio de Fábrica
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Los fabricantes y cooperativas suministran directamente al campesino sin revendedores. 
              Ahorra hasta un <strong className="text-primary">35% en costos de producción</strong> y recibe los insumos en tu finca mediante la red de <strong className="text-foreground">AgroFlete</strong>.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <div className="p-3.5 rounded-2xl bg-secondary/80 border border-border text-xs space-y-1">
              <span className="font-extrabold text-foreground flex items-center gap-1.5">
                <TrendingDown className="h-4 w-4 text-primary" />
                Ahorro Promedio por Hectárea:
              </span>
              <p className="text-sm font-extrabold text-primary">~$1.450.000 COP / Ciclo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter className="h-4 w-4 text-primary shrink-0" />
        {[
          { id: 'todos', label: 'Todos los Insumos' },
          { id: 'fertilizantes', label: '🌱 Fertilizantes & Enmiendas' },
          { id: 'herramientas', label: '✂️ Herramientas Agrícolas' },
          { id: 'semillas', label: '🌿 Plántulas y Semillas' },
          { id: 'alimentacion', label: '🌽 Alimento Animal' }
        ].map((c) => (
          <Button
            key={c.id}
            size="sm"
            variant={categoria === c.id ? 'default' : 'outline'}
            onClick={() => setCategoria(c.id)}
            className="rounded-full text-xs font-bold shrink-0"
          >
            {c.label}
          </Button>
        ))}
      </div>

      {/* Grid de Insumos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtrados.map((item) => {
          const ahorro = item.precioComercio - item.precioDirecto
          const ahorroPct = Math.round((ahorro / item.precioComercio) * 100)

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="p-4 border-b border-border bg-gradient-to-r from-secondary/40 via-card to-transparent flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl p-2 rounded-xl bg-background border border-border shrink-0 shadow-inner">
                      {item.emoji}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-foreground">{item.nombre}</h3>
                      <p className="text-xs text-primary font-bold mt-0.5">{item.proveedor}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-primary/15 text-primary shrink-0">
                    -{ahorroPct}%
                  </span>
                </div>

                <div className="p-4 space-y-3">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.descripcion}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-secondary/50 border border-border">
                      <span className="text-muted-foreground block text-[11px]">Precio de Fábrica:</span>
                      <span className="text-base font-extrabold text-primary">
                        ${item.precioDirecto.toLocaleString('es-CO')}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-muted/40 border border-border">
                      <span className="text-muted-foreground block text-[11px]">En el Pueblo:</span>
                      <span className="text-sm font-semibold line-through text-muted-foreground">
                        ${item.precioComercio.toLocaleString('es-CO')}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between text-xs text-muted-foreground pt-1">
                    <span>Pedido mínimo: {item.minimoPedido}</span>
                    <span className="font-semibold text-foreground">📍 {item.ubicacion}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-border bg-muted/20 flex gap-2">
                <Button
                  onClick={() => setModalCotizar(item)}
                  size="sm"
                  className="flex-1 font-bold text-xs bg-primary text-primary-foreground shadow-sm"
                >
                  <ShoppingBag className="h-4 w-4 mr-1.5" />
                  Pedir Directo a Finca
                </Button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Modal de Pedido a Proveedor */}
      <AnimatePresence>
        {modalCotizar && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{modalCotizar.emoji}</span>
                  <div>
                    <h3 className="font-extrabold text-base text-foreground">
                      Solicitud Directa al Proveedor
                    </h3>
                    <p className="text-xs text-primary font-bold">{modalCotizar.proveedor}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setModalCotizar(null)}
                  className="h-8 w-8 p-0 rounded-full"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-secondary space-y-1">
                  <p className="font-bold text-foreground">{modalCotizar.nombre}</p>
                  <p className="text-muted-foreground">{modalCotizar.unidad}</p>
                  <p className="text-base font-extrabold text-primary pt-1">
                    ${modalCotizar.precioDirecto.toLocaleString('es-CO')} COP por unidad
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="font-bold uppercase text-muted-foreground">
                    Cantidad a Pedir
                  </label>
                  <input
                    type="number"
                    defaultValue="5"
                    min="1"
                    className="w-full rounded-xl border border-input bg-background p-2.5 font-bold text-foreground outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold uppercase text-muted-foreground">
                    Finca y Vereda de Entrega
                  </label>
                  <input
                    type="text"
                    defaultValue="Finca La Esperanza • Vereda El Paraíso (Salento)"
                    className="w-full rounded-xl border border-input bg-background p-2.5 font-semibold text-foreground outline-none"
                  />
                </div>

                <div className="p-3 rounded-xl bg-primary/10 border border-primary/25 flex items-center gap-2.5">
                  <Truck className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-xs font-semibold text-primary">
                    Envío coordinado automáticamente con la red de <strong>AgroFlete (Yipao / Camión)</strong>.
                  </span>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setModalCotizar(null)}
                    className="flex-1 font-bold"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => {
                      setModalCotizar(null)
                      setPedidoEnviado(true)
                      setTimeout(() => setPedidoEnviado(false), 3000)
                    }}
                    className="flex-1 font-bold bg-primary text-primary-foreground shadow-md"
                  >
                    Confirmar Pedido Directo
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Notificación de Pedido Enviado */}
      <AnimatePresence>
        {pedidoEnviado && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 bg-card border-2 border-primary p-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 max-w-sm"
          >
            <div className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-foreground">¡Pedido Directo Notificado!</p>
              <p className="text-[11px] text-muted-foreground">
                El proveedor despachará el insumo a través del transporte veredal.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

