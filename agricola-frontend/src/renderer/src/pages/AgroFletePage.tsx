import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Truck,
  MapPin,
  Navigation,
  Clock,
  DollarSign,
  Star,
  ShieldCheck,
  CheckCircle2,
  Phone,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Compass,
  ChevronRight,
  Car
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface ConductorVeredal {
  id: string
  nombre: string
  telefono: string
  vehiculoTipo: 'willys' | 'estacas' | 'camion' | 'motocarga'
  vehiculoNombre: string
  placa: string
  modelo: string
  capacidadKilos: number
  capacidadBultos: number
  calificacion: number
  viajesRealizados: number
  ubicacionActual: string
  distanciaMinutos: number
  tarifaBaseKm: number
  fotoEmoji: string
  disponible: boolean
}

export interface SolicitudFlete {
  id: string
  origenFinca: string
  veredaOrigen: string
  destino: string
  producto: string
  pesoKilos: number
  bultos: number
  tarifaOfrecida: number
  conductorAsignado?: ConductorVeredal
  estado: 'buscando' | 'asignado' | 'cargando' | 'en_camino' | 'entregado'
  horaSolicitud: string
}

const CONDUCTORES_INICIALES: ConductorVeredal[] = [
  {
    id: 'cond-1',
    nombre: 'Don Argemiro Ríos ("El Mocho")',
    telefono: '320 511 7742',
    vehiculoTipo: 'willys',
    vehiculoNombre: 'Jeep Willys M38A1 Tradicional (Yipao)',
    placa: 'WLY-1964',
    modelo: '1964 • Tracción 4x4',
    capacidadKilos: 1200,
    capacidadBultos: 22,
    calificacion: 4.9,
    viajesRealizados: 480,
    ubicacionActual: 'Plaza de Salento (a 12 min de la vereda)',
    distanciaMinutos: 12,
    tarifaBaseKm: 4500,
    fotoEmoji: '🚙',
    disponible: true
  },
  {
    id: 'cond-2',
    nombre: 'Nelson Gómez & Hijo',
    telefono: '314 890 2231',
    vehiculoTipo: 'estacas',
    vehiculoNombre: 'Toyota Land Cruiser Estacas Veredal',
    placa: 'TOY-829',
    modelo: '1998 • Fuerte para trocha empinada',
    capacidadKilos: 2000,
    capacidadBultos: 38,
    calificacion: 5.0,
    viajesRealizados: 310,
    ubicacionActual: 'Vereda Boquía (a 8 min)',
    distanciaMinutos: 8,
    tarifaBaseKm: 5200,
    fotoEmoji: '🛻',
    disponible: true
  },
  {
    id: 'cond-3',
    nombre: 'Jairo Albeiro Morales',
    telefono: '311 632 0945',
    vehiculoTipo: 'motocarga',
    vehiculoNombre: 'Motocarro de Carga Torito 250cc',
    placa: 'MCG-45D',
    modelo: '2022 • Rápido para pedidos medianos',
    capacidadKilos: 450,
    capacidadBultos: 8,
    calificacion: 4.8,
    viajesRealizados: 195,
    ubicacionActual: 'Vereda El Paraíso (a 4 min)',
    distanciaMinutos: 4,
    tarifaBaseKm: 3200,
    fotoEmoji: '🛺',
    disponible: true
  },
  {
    id: 'cond-4',
    nombre: 'Cooperativa de Transportadores del Quindío',
    telefono: '318 402 7700',
    vehiculoTipo: 'camion',
    vehiculoNombre: 'Camión Turbo Chevrolet NPR (Furgón Fresco)',
    placa: 'NPR-512',
    modelo: '2019 • Transporte a Grandes Plazas / Bogotá',
    capacidadKilos: 5000,
    capacidadBultos: 100,
    calificacion: 4.9,
    viajesRealizados: 740,
    ubicacionActual: 'Autopista del Café (a 25 min)',
    distanciaMinutos: 25,
    tarifaBaseKm: 7500,
    fotoEmoji: '🚛',
    disponible: true
  }
]

export function AgroFletePage(): JSX.Element {
  const [conductores, setConductores] = useState<ConductorVeredal[]>(CONDUCTORES_INICIALES)
  const [rol, setRol] = useState<'solicitar' | 'conductor'>('solicitar')

  // Formulario Solicitud Flete
  const [origen, setOrigen] = useState('Finca La Esperanza • Vereda El Paraíso (Salento)')
  const [destino, setDestino] = useState('Plaza Minorista / Domicilio Urbano (Armenia)')
  const [productoCarga, setProductoCarga] = useState('Café Pergamino Seco y Plátano')
  const [pesoEstimado, setPesoEstimado] = useState('350')
  const [tipoVehiculoDeseado, setTipoVehiculoDeseado] = useState<string>('todos')
  const [modalidadLogistica, setModalidadLogistica] = useState<'milk_run' | 'retorno' | 'exclusivo'>('milk_run')

  // Estado del viaje activo
  const [solicitudActiva, setSolicitudActiva] = useState<SolicitudFlete | null>(null)
  const [conductorSeleccionado, setConductorSeleccionado] = useState<ConductorVeredal | null>(null)

  // Cálculo de distancia y flete
  const distanciaKm = 18 // km promedio vereda - cabecera
  const pesoNum = parseFloat(pesoEstimado) || 100
  const tarifaBase = Math.round((distanciaKm * 3800 + pesoNum * 40) / 1000) * 1000
  const tarifaCalculada =
    modalidadLogistica === 'milk_run'
      ? 35000 // Tarifa dividida en ruta consolidada Milk-Run
      : modalidadLogistica === 'retorno'
      ? Math.round((tarifaBase * 0.7) / 1000) * 1000 // 30% descuento flete de retorno
      : tarifaBase

  const handlePedirFlete = (conductor?: ConductorVeredal) => {
    const asignado = conductor || conductores[0]
    setConductorSeleccionado(asignado)

    const nuevaSol: SolicitudFlete = {
      id: `flete-${Date.now()}`,
      origenFinca: origen,
      veredaOrigen: 'Vereda El Paraíso',
      destino,
      producto: productoCarga,
      pesoKilos: pesoNum,
      bultos: Math.ceil(pesoNum / 50),
      tarifaOfrecida: tarifaCalculada,
      conductorAsignado: asignado,
      estado: 'buscando',
      horaSolicitud: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setSolicitudActiva(nuevaSol)

    // Simular que el conductor acepta en 2 segundos
    setTimeout(() => {
      setSolicitudActiva((prev) => (prev ? { ...prev, estado: 'asignado' } : null))
    }, 2500)
  }

  const conductoresFiltrados = conductores.filter((c) => {
    if (tipoVehiculoDeseado === 'todos') return true
    return c.vehiculoTipo === tipoVehiculoDeseado
  })

  return (
    <div className="space-y-6">
      {/* Banner AgroFlete: Uber del Campo */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/25 via-secondary/70 to-card border border-border p-6 md:p-8 shadow-md">
        <div className="h-1.5 w-full zocalo-border absolute top-0 left-0" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-extrabold uppercase tracking-wider">
              <Truck className="h-3.5 w-3.5" />
              AgroFlete • Transporte Rural Colaborativo ("El Uber del Campo")
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
              ¿Tienes Carga en la Finca o un Vehículo en la Vereda?
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Conectamos campesinos y compradores con conductores locales en <strong className="text-foreground">Jeep Willys (Yipao)</strong>, camionetas de estacas y camiones para mover cosechas sin intermediarios y al mejor precio por viaje.
            </p>
          </div>

          <div className="flex rounded-2xl bg-background/80 p-1.5 border border-border shrink-0 self-start md:self-auto shadow-sm">
            <Button
              size="sm"
              variant={rol === 'solicitar' ? 'default' : 'ghost'}
              onClick={() => setRol('solicitar')}
              className="rounded-xl font-bold text-xs"
            >
              <Truck className="h-4 w-4 mr-1.5" />
              Pedir Transporte
            </Button>
            <Button
              size="sm"
              variant={rol === 'conductor' ? 'default' : 'ghost'}
              onClick={() => setRol('conductor')}
              className="rounded-xl font-bold text-xs"
            >
              <Car className="h-4 w-4 mr-1.5" />
              Soy Conductor (Ganar Fletes)
            </Button>
          </div>
        </div>
      </section>

      {/* Viaje Activo en Curso (Si el usuario ya pidió un viaje) */}
      <AnimatePresence>
        {solicitudActiva && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="rounded-3xl border-2 border-primary/40 bg-card p-6 shadow-xl relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-2xl shadow-md">
                  {conductorSeleccionado?.fotoEmoji || '🚙'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      {solicitudActiva.estado === 'buscando'
                        ? '📡 Buscando conductor veredal más cercano...'
                        : '✅ Flete Confirmado • Conductor en Camino a la Finca'}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground">
                    {conductorSeleccionado?.nombre}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {conductorSeleccionado?.vehiculoNombre} • Placa{' '}
                    <strong className="text-foreground">{conductorSeleccionado?.placa}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs text-muted-foreground block">Tarifa Acordada</span>
                  <span className="text-xl font-extrabold text-primary">
                    ${solicitudActiva.tarifaOfrecida.toLocaleString('es-CO')} COP
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert(`Llamando al conductor ${conductorSeleccionado?.telefono}`)}
                  className="font-bold border-primary/30 text-primary"
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Llamar Conductor
                </Button>
              </div>
            </div>

            {/* Pasos del Viaje tipo Uber */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 text-xs font-medium">
              <div
                className={`p-3 rounded-xl border flex items-center gap-2 ${
                  solicitudActiva.estado !== 'buscando'
                    ? 'bg-primary/10 border-primary/30 text-primary font-bold'
                    : 'bg-muted/40 border-border'
                }`}
              >
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>1. Solicitud Aceptada</span>
              </div>
              <div
                className={`p-3 rounded-xl border flex items-center gap-2 ${
                  solicitudActiva.estado === 'cargando' ||
                  solicitudActiva.estado === 'en_camino' ||
                  solicitudActiva.estado === 'entregado'
                    ? 'bg-primary/10 border-primary/30 text-primary font-bold'
                    : 'bg-muted/40 border-border text-muted-foreground'
                }`}
              >
                <Clock className="h-4 w-4 shrink-0" />
                <span>2. Cargando en Finca ({conductorSeleccionado?.distanciaMinutos} min)</span>
              </div>
              <div
                className={`p-3 rounded-xl border flex items-center gap-2 ${
                  solicitudActiva.estado === 'en_camino' || solicitudActiva.estado === 'entregado'
                    ? 'bg-primary/10 border-primary/30 text-primary font-bold'
                    : 'bg-muted/40 border-border text-muted-foreground'
                }`}
              >
                <Navigation className="h-4 w-4 shrink-0" />
                <span>3. En Trocha Veredal</span>
              </div>
              <div
                className={`p-3 rounded-xl border flex items-center gap-2 ${
                  solicitudActiva.estado === 'entregado'
                    ? 'bg-primary/10 border-primary/30 text-primary font-bold'
                    : 'bg-muted/40 border-border text-muted-foreground'
                }`}
              >
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span>4. Entregado con Firma</span>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSolicitudActiva(null)}
                className="text-xs text-muted-foreground hover:text-destructive"
              >
                Finalizar o Cancelar Viaje
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mapa Satelital y Radar Veredal en Vivo (Estilo Uber Rural) */}
      <section className="rounded-3xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="p-4 md:p-5 border-b border-border bg-secondary/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
              <Navigation className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm md:text-base text-foreground flex items-center gap-2">
                Radar de Trochas y Conductores en Vivo
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </h3>
              <p className="text-xs text-muted-foreground">
                Ruta Veredal Salento ➔ Boquía ➔ El Paraíso ➔ Armenia • 1.650 a 1.480 m.s.n.m.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background border border-border font-semibold text-foreground">
              <span className="h-2 w-2 rounded-full bg-primary" /> 4 Vehículos en Trocha
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-muted-foreground">
              🌤️ Vía Seca y Transitable
            </span>
          </div>
        </div>

        {/* Mapa Interactivo SVG */}
        <div className="relative h-72 md:h-80 w-full bg-gradient-to-br from-emerald-950/20 via-background to-secondary/40 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg">
            {/* Curvas de nivel topográficas suaves */}
            <path
              d="M-50 80 Q 150 40, 350 90 T 750 60 T 900 110"
              fill="none"
              stroke="hsl(var(--primary) / 0.12)"
              strokeWidth="1.5"
            />
            <path
              d="M-50 160 Q 200 120, 420 180 T 820 140"
              fill="none"
              stroke="hsl(var(--primary) / 0.12)"
              strokeWidth="1.5"
            />
            <path
              d="M-50 240 Q 250 200, 500 260 T 900 220"
              fill="none"
              stroke="hsl(var(--primary) / 0.12)"
              strokeWidth="1.5"
            />

            {/* Río / Quebrada de montaña */}
            <path
              d="M 50 320 Q 180 200, 240 120 T 400 0"
              fill="none"
              stroke="#0284c7"
              strokeWidth="3"
              strokeOpacity="0.4"
              strokeDasharray="6 4"
            />
            <text x="210" y="160" fill="#0284c7" fontSize="10" opacity="0.6" fontWeight="bold">
              Río Quindío
            </text>

            {/* Carretera Principal (Pavimentada) */}
            <path
              d="M 120 0 Q 280 80, 480 140 T 780 320"
              fill="none"
              stroke="hsl(var(--muted-foreground) / 0.35)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M 120 0 Q 280 80, 480 140 T 780 320"
              fill="none"
              stroke="hsl(var(--background))"
              strokeWidth="1.5"
              strokeDasharray="8 6"
            />

            {/* Trochas Veredales de Fincas (Líneas de tierra / café) */}
            <path
              id="trocha1"
              d="M 280 80 Q 210 140, 160 210 Q 220 280, 290 260"
              fill="none"
              stroke="#d97706"
              strokeWidth="3.5"
              strokeDasharray="4 3"
            />
            <path
              id="trocha2"
              d="M 480 140 Q 560 90, 640 130 T 720 80"
              fill="none"
              stroke="#d97706"
              strokeWidth="3.5"
              strokeDasharray="4 3"
            />

            {/* Puntos de Fincas Campesinas */}
            {/* 1. Finca La Esperanza */}
            <g transform="translate(160, 210)">
              <circle r="18" fill="hsl(var(--primary) / 0.2)" />
              <circle r="8" fill="hsl(var(--primary))" />
              <text x="14" y="4" fill="hsl(var(--foreground))" fontSize="11" fontWeight="bold">
                Finca La Esperanza ☕
              </text>
              <text x="14" y="17" fill="hsl(var(--muted-foreground))" fontSize="9">
                Carga: 22 bultos café
              </text>
            </g>

            {/* 2. Hacienda El Mirador */}
            <g transform="translate(640, 130)">
              <circle r="14" fill="hsl(var(--primary) / 0.2)" />
              <circle r="7" fill="hsl(var(--primary))" />
              <text x="12" y="4" fill="hsl(var(--foreground))" fontSize="11" fontWeight="bold">
                El Mirador (Aguacate Hass) 🥑
              </text>
            </g>

            {/* 3. Trapiche El Cañaduzal */}
            <g transform="translate(290, 260)">
              <circle r="14" fill="hsl(var(--primary) / 0.2)" />
              <circle r="7" fill="hsl(var(--primary))" />
              <text x="12" y="4" fill="hsl(var(--foreground))" fontSize="11" fontWeight="bold">
                Trapiche Boquía 🍯
              </text>
            </g>

            {/* 4. Destino: Plaza Minorista / Armenia */}
            <g transform="translate(730, 290)">
              <rect x="-10" y="-10" width="20" height="20" rx="6" fill="#b91c1c" />
              <text x="-4" y="4" fill="#ffffff" fontSize="11" fontWeight="bold">
                🏢
              </text>
              <text x="-120" y="4" fill="hsl(var(--foreground))" fontSize="11" fontWeight="bold">
                Plaza Minorista / Casco Urbano
              </text>
            </g>

            {/* Vehículos en Movimiento (Conductores Tipo Uber) */}
            {/* Willys de Don Argemiro */}
            <g transform="translate(230, 125)">
              <circle r="16" fill="rgba(34, 197, 94, 0.25)">
                <animate attributeName="r" values="12;22;12" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle r="12" fill="#15803d" stroke="#ffffff" strokeWidth="2" />
              <text x="-7" y="4" fontSize="11">🚙</text>
              <text x="-35" y="-16" fill="hsl(var(--foreground))" fontSize="10" fontWeight="extrabold">
                Willys Don Argemiro
              </text>
              <text x="-25" y="-6" fill="hsl(var(--primary))" fontSize="9" fontWeight="bold">
                A 6 min de Finca
              </text>
            </g>

            {/* Toyota Estacas de Nelson Gómez */}
            <g transform="translate(540, 110)">
              <circle r="14" fill="rgba(217, 119, 6, 0.25)">
                <animate attributeName="r" values="10;20;10" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="2.4s" repeatCount="indefinite" />
              </circle>
              <circle r="11" fill="#d97706" stroke="#ffffff" strokeWidth="2" />
              <text x="-6" y="4" fontSize="10">🛻</text>
              <text x="14" y="4" fill="hsl(var(--foreground))" fontSize="10" fontWeight="bold">
                Toyota Estacas (Disponible)
              </text>
            </g>

            {/* Motocarro Torito */}
            <g transform="translate(210, 240)">
              <circle r="10" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
              <text x="-5" y="4" fontSize="9">🛺</text>
              <text x="12" y="3" fill="hsl(var(--foreground))" fontSize="9" fontWeight="semibold">
                Motocarro Carga
              </text>
            </g>
          </svg>

          {/* Tarjeta Flotante sobre el Mapa */}
          <div className="absolute bottom-3 left-3 bg-card/90 backdrop-blur-md border border-border p-2.5 rounded-xl text-xs space-y-1 shadow-md max-w-xs">
            <div className="flex items-center gap-1.5 font-bold text-foreground">
              <Compass className="h-3.5 w-3.5 text-primary" />
              <span>Monitoreo Satelital de Trocha</span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-snug">
              Haz clic en cualquier conductor de la lista para contratar su flete y asignarlo a la ruta.
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Formulario de Solicitud de Viaje (Lado Izquierdo) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4">
            <div className="border-b border-border pb-3">
              <h3 className="font-extrabold text-lg text-foreground flex items-center gap-2">
                <Navigation className="h-5 w-5 text-primary" />
                {rol === 'solicitar' ? 'Cotizar y Pedir Flete' : 'Rutas Disponibles para Conducir'}
              </h3>
              <p className="text-xs text-muted-foreground">
                Ingresa el punto de recogida en la finca y el destino de entrega de la cosecha.
              </p>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold uppercase text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-primary" /> Origen (Finca / Vereda de Recogida)
                </label>
                <input
                  type="text"
                  value={origen}
                  onChange={(e) => setOrigen(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background p-2.5 font-semibold text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase text-muted-foreground flex items-center gap-1">
                  <Compass className="h-3.5 w-3.5 text-amber-600" /> Destino (Plaza / Restaurante /
                  Pueblo)
                </label>
                <input
                  type="text"
                  value={destino}
                  onChange={(e) => setDestino(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background p-2.5 font-semibold text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold uppercase text-muted-foreground">
                    Cosecha / Carga
                  </label>
                  <input
                    type="text"
                    value={productoCarga}
                    onChange={(e) => setProductoCarga(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background p-2.5 font-semibold text-foreground outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold uppercase text-muted-foreground">
                    Peso Estimado (kg)
                  </label>
                  <input
                    type="number"
                    value={pesoEstimado}
                    onChange={(e) => setPesoEstimado(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background p-2.5 font-bold text-foreground outline-none"
                  />
                </div>
              </div>

              {/* Selector de Vehículo Deseado */}
              <div className="space-y-1 pt-1">
                <label className="font-bold uppercase text-muted-foreground">Tipo de Transporte</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { id: 'todos', label: 'Todos' },
                    { id: 'willys', label: '🚙 Willys' },
                    { id: 'estacas', label: '🛻 Estacas' },
                    { id: 'motocarga', label: '🛺 Motocarro' }
                  ].map((v) => (
                    <Button
                      key={v.id}
                      type="button"
                      size="sm"
                      variant={tipoVehiculoDeseado === v.id ? 'default' : 'outline'}
                      onClick={() => setTipoVehiculoDeseado(v.id)}
                      className="rounded-xl text-[11px] font-bold h-9 p-0"
                    >
                      {v.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Modalidad Logística del PDF (Pilar C) */}
              <div className="space-y-1.5 pt-1">
                <label className="font-bold uppercase text-muted-foreground flex items-center justify-between text-[11px]">
                  <span>Modalidad Logística (Pilar C del Plan)</span>
                  <span className="text-[10px] text-primary font-black">Ruta Inteligente</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setModalidadLogistica('milk_run')}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      modalidadLogistica === 'milk_run'
                        ? 'bg-primary/15 border-primary text-foreground font-black ring-1 ring-primary'
                        : 'bg-background hover:bg-secondary border-border text-muted-foreground'
                    }`}
                  >
                    <span className="block text-[11px] font-bold text-foreground">🥛 Milk-Run</span>
                    <span className="block text-[9px] text-primary font-bold">Dividido $35.000 c/u</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalidadLogistica('retorno')}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      modalidadLogistica === 'retorno'
                        ? 'bg-primary/15 border-primary text-foreground font-black ring-1 ring-primary'
                        : 'bg-background hover:bg-secondary border-border text-muted-foreground'
                    }`}
                  >
                    <span className="block text-[11px] font-bold text-foreground">🔄 Retorno</span>
                    <span className="block text-[9px] text-emerald-600 font-bold">-30% Backhauling</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalidadLogistica('exclusivo')}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      modalidadLogistica === 'exclusivo'
                        ? 'bg-primary/15 border-primary text-foreground font-black ring-1 ring-primary'
                        : 'bg-background hover:bg-secondary border-border text-muted-foreground'
                    }`}
                  >
                    <span className="block text-[11px] font-bold text-foreground">⚡ Directo</span>
                    <span className="block text-[9px] text-muted-foreground">Exclusivo Finca</span>
                  </button>
                </div>
              </div>

              {/* Tarjeta de Tarifa Calculada Tipo Uber */}
              <div className="p-4 rounded-2xl bg-secondary/70 border border-border space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Distancia Estimada:</span>
                  <span className="font-bold text-foreground">{distanciaKm} km (Vía Veredal)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Carga aprox.:</span>
                  <span className="font-bold text-foreground">
                    {pesoNum} kg (~{Math.ceil(pesoNum / 50)} bultos)
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <span className="text-sm font-bold text-foreground">Tarifa Flete Sugerida:</span>
                  <span className="text-xl font-extrabold text-primary">
                    ${tarifaCalculada.toLocaleString('es-CO')} COP
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground italic text-center">
                  Tarifa pactada directamente con el conductor. Sin comisiones abusivas.
                </p>
              </div>

              <Button
                onClick={() => handlePedirFlete()}
                className="w-full font-bold h-12 text-sm shadow-md bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Truck className="mr-2 h-5 w-5" />
                Solicitar Conductor Más Cercano (Tipo Uber)
              </Button>
            </div>
          </div>
        </div>

        {/* Lista de Conductores Veredales Disponibles (Lado Derecho) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-lg text-foreground flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                Conductores y Vehículos Disponibles Cerca ({conductoresFiltrados.length})
              </h3>
              <p className="text-xs text-muted-foreground">
                Vecinos con vehículos habilitados listos para recoger carga en fincas y veredas.
              </p>
            </div>
          </div>

          <div className="space-y-3.5">
            {conductoresFiltrados.map((c) => (
              <motion.div
                key={c.id}
                whileHover={{ y: -2 }}
                className="p-5 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl p-2.5 rounded-2xl bg-secondary/80 border border-border shrink-0 shadow-inner">
                    {c.fotoEmoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-base text-foreground">{c.nombre}</h4>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        ⭐ {c.calificacion} ({c.viajesRealizados} fletes)
                      </span>
                    </div>

                    <p className="text-xs font-bold text-primary mt-0.5">{c.vehiculoNombre}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Placa: <strong className="text-foreground">{c.placa}</strong> • {c.modelo}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground mt-2">
                      <span className="flex items-center gap-1 font-medium text-foreground">
                        <MapPin className="h-3 w-3 text-primary" />
                        {c.ubicacionActual}
                      </span>
                      <span>•</span>
                      <span>Capacidad: {c.capacidadKilos.toLocaleString()} kg ({c.capacidadBultos} bultos)</span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-border">
                  <div className="text-left sm:text-right">
                    <span className="text-[11px] text-muted-foreground block">Tiempo estimado</span>
                    <span className="text-sm font-bold text-foreground">
                      ~{c.distanciaMinutos} minutos
                    </span>
                  </div>

                  <Button
                    onClick={() => handlePedirFlete(c)}
                    size="sm"
                    className="font-bold text-xs bg-primary text-primary-foreground shadow-sm"
                  >
                    Elegir a {c.nombre.split(' ')[0]}
                    <ChevronRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Información Cultural de los Yipaos */}
          <div className="p-4 rounded-2xl bg-secondary/50 border border-border text-xs flex items-center gap-3">
            <span className="text-2xl">🇨🇴</span>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Orgullo y Tradición Campesina:</strong> En Colombia, los Jeep Willys (Yipaos) y las camionetas veredales son el alma del transporte de montaña. Con AgroFlete, cada flete apoya directamente la economía de los transportadores rurales de la región.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

