import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Package,
  Truck,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  AlertCircle,
  FileText,
  Printer,
  ChevronRight,
  ShieldCheck,
  User,
  Navigation,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface PedidoRastreo {
  id: string
  codigoSeguimiento: string
  fecha: string
  cliente: string
  telefonoCliente: string
  direccionEntrega: string
  campesino: string
  fincaOrigen: string
  veredaOrigen: string
  items: { nombre: string; cantidad: string; subtotal: number }[]
  totalProductos: number
  costoFlete: number
  totalGeneral: number
  conductor: {
    nombre: string
    vehiculo: string
    placa: string
    telefono: string
    fotoEmoji: string
  }
  estado: 'alistando' | 'en_willys' | 'en_ruta' | 'entregado'
  horaEstimada: string
  distanciaRestante: string
}

export const PEDIDOS_EJEMPLO: PedidoRastreo[] = [
  {
    id: 'ped-01',
    codigoSeguimiento: 'AGRO-7821-COL',
    fecha: 'Hoy, 07:15 AM',
    cliente: 'Restaurante Sabor Andino (Chef Andrés)',
    telefonoCliente: '315 442 8890',
    direccionEntrega: 'Calle 21 # 14-30 • Centro, Armenia (Quindío)',
    campesino: 'Don Hernando Valencia',
    fincaOrigen: 'Finca La Esperanza',
    veredaOrigen: 'Vereda El Paraíso, Salento',
    items: [
      { nombre: 'Café Especial Castillo (Cereza)', cantidad: '10 Libras', subtotal: 185000 },
      { nombre: 'Plátano Dominico Hartón', cantidad: '2 Racimos (50 kg)', subtotal: 68000 },
      { nombre: 'Aguacate Hass Exportación', cantidad: '15 Kilos', subtotal: 67500 }
    ],
    totalProductos: 320500,
    costoFlete: 48000,
    totalGeneral: 368500,
    conductor: {
      nombre: 'Don Argemiro Ríos ("El Mocho")',
      vehiculo: 'Jeep Willys M38A1 Tradicional (Yipao)',
      placa: 'WLY-1964',
      telefono: '320 511 7742',
      fotoEmoji: '🚙'
    },
    estado: 'en_ruta',
    horaEstimada: '08:45 AM (en 25 min)',
    distanciaRestante: '6.4 km por Carretera Veredal'
  },
  {
    id: 'ped-02',
    codigoSeguimiento: 'AGRO-6512-COL',
    fecha: 'Hoy, 06:30 AM',
    cliente: 'Familia Ramírez Gómez',
    telefonoCliente: '310 998 1234',
    direccionEntrega: 'Barrio La Castellana • Manizales, Caldas',
    campesino: 'Dra. Luz Marina & Familia',
    fincaOrigen: 'Hacienda El Mirador',
    veredaOrigen: 'Vereda La Nubia, Circasia',
    items: [
      { nombre: 'Panela Orgánica Artesanal en Bloque', cantidad: '1 Paca (24 kg)', subtotal: 76000 },
      { nombre: 'Huevos Criollos de Gallina Feliz', cantidad: '2 Panales (60 u)', subtotal: 44000 }
    ],
    totalProductos: 120000,
    costoFlete: 32000,
    totalGeneral: 152000,
    conductor: {
      nombre: 'Nelson Gómez & Hijo',
      vehiculo: 'Toyota Land Cruiser Estacas',
      placa: 'TOY-829',
      telefono: '314 890 2231',
      fotoEmoji: '🛻'
    },
    estado: 'alistando',
    horaEstimada: '10:30 AM',
    distanciaRestante: 'Cargando en beneficiadero de la finca'
  },
  {
    id: 'ped-03',
    codigoSeguimiento: 'AGRO-4410-COL',
    fecha: 'Ayer, 04:00 PM',
    cliente: 'Fruver La 19',
    telefonoCliente: '312 770 5511',
    direccionEntrega: 'Av. Bolívar # 9N-12 • Pereira',
    campesino: 'Don Carlos Mario Arias',
    fincaOrigen: 'Trapiche El Cañaduzal',
    veredaOrigen: 'Vereda Boquía, Salento',
    items: [
      { nombre: 'Papa Pastusa Selección', cantidad: '6 Bultos (300 kg)', subtotal: 690000 },
      { nombre: 'Tomate Chonto Primera', cantidad: '5 Cajas (110 kg)', subtotal: 270000 }
    ],
    totalProductos: 960000,
    costoFlete: 85000,
    totalGeneral: 1045000,
    conductor: {
      nombre: 'Cooperativa de Transportadores',
      vehiculo: 'Camión Turbo Chevrolet NPR',
      placa: 'NPR-512',
      telefono: '318 402 7700',
      fotoEmoji: '🚛'
    },
    estado: 'entregado',
    horaEstimada: 'Entregado con éxito',
    distanciaRestante: 'Recibido a satisfacción por el comprador'
  }
]

export function PedidosRastreoPage(): JSX.Element {
  const [pedidos, setPedidos] = useState<PedidoRastreo[]>(PEDIDOS_EJEMPLO)
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState<PedidoRastreo>(PEDIDOS_EJEMPLO[0])
  const [filtroEstado, setFiltroEstado] = useState<string>('todos')

  const pedidosFiltrados = pedidos.filter((p) => {
    if (filtroEstado === 'todos') return true
    return p.estado === filtroEstado
  })

  const getPasoProgreso = (estado: PedidoRastreo['estado']) => {
    switch (estado) {
      case 'alistando':
        return 1
      case 'en_willys':
        return 2
      case 'en_ruta':
        return 3
      case 'entregado':
        return 4
      default:
        return 1
    }
  }

  const pasoActual = getPasoProgreso(pedidoSeleccionado.estado)

  return (
    <div className="space-y-6">
      {/* Cabecera */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/25 via-secondary/70 to-card border border-border p-6 md:p-8 shadow-md">
        <div className="h-1.5 w-full zocalo-border absolute top-0 left-0" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-extrabold uppercase tracking-wider">
              <Navigation className="h-3.5 w-3.5" />
              Rastreo en Vivo • De la Mata a la Puerta
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
              Seguimiento de Cosechas & Fletes en Camino
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Monitorea el trayecto en tiempo real desde que el campesino cosecha en su vereda, se carga en el <strong className="text-foreground">Jeep Willys o camioneta</strong>, y llega al comprador con guía y remesa digital.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="font-bold border-border bg-card"
            >
              <Printer className="mr-2 h-4 w-4 text-primary" />
              Imprimir Guía de Carga
            </Button>
          </div>
        </div>
      </section>

      {/* Grid: Lista de Pedidos (4 cols) + Detalle de Rastreo en Vivo (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Lista de Pedidos a la Izquierda */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-foreground flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              Envíos Recientes ({pedidos.length})
            </h3>
            <div className="flex gap-1">
              {[
                { id: 'todos', label: 'Todos' },
                { id: 'en_ruta', label: 'En Ruta' },
                { id: 'entregado', label: 'Listos' }
              ].map((f) => (
                <Button
                  key={f.id}
                  size="sm"
                  variant={filtroEstado === f.id ? 'default' : 'ghost'}
                  onClick={() => setFiltroEstado(f.id)}
                  className="h-7 px-2.5 text-[11px] font-bold rounded-lg"
                >
                  {f.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {pedidosFiltrados.map((item) => {
              const isSelected = item.id === pedidoSeleccionado.id

              return (
                <motion.div
                  key={item.id}
                  onClick={() => setPedidoSeleccionado(item)}
                  whileHover={{ y: -2 }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer shadow-sm ${
                    isSelected
                      ? 'bg-primary/10 border-primary shadow-md'
                      : 'bg-card hover:bg-secondary/40 border-border'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold text-primary">
                      {item.codigoSeguimiento}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.estado === 'en_ruta'
                          ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/25'
                          : item.estado === 'entregado'
                          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25'
                          : 'bg-primary/15 text-primary border border-primary/25'
                      }`}
                    >
                      {item.estado === 'en_ruta'
                        ? 'En Camino 🚙'
                        : item.estado === 'entregado'
                        ? 'Entregado ✅'
                        : 'En Finca 🌾'}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-sm text-foreground mt-1.5 truncate">
                    {item.cliente}
                  </h4>

                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                    <span>Origen:</span>
                    <span className="font-semibold text-foreground truncate">{item.fincaOrigen}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2.5 mt-2 border-t border-border">
                    <span className="font-extrabold text-foreground">
                      ${item.totalGeneral.toLocaleString('es-CO')} COP
                    </span>
                    <span className="text-[11px] text-muted-foreground font-medium">
                      {item.conductor.vehiculo.split('(')[0]}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Detalle del Pedido y Línea de Tiempo en Vivo (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-md space-y-6">
            {/* Encabezado del Detalle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-primary px-2.5 py-0.5 rounded-full bg-primary/15">
                    Guía: {pedidoSeleccionado.codigoSeguimiento}
                  </span>
                  <span className="text-xs text-muted-foreground">{pedidoSeleccionado.fecha}</span>
                </div>
                <h3 className="text-xl font-black text-foreground mt-1">
                  {pedidoSeleccionado.cliente}
                </h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  {pedidoSeleccionado.direccionEntrega}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-muted-foreground block">Total Liquidado</span>
                <span className="text-2xl font-black text-foreground">
                  ${pedidoSeleccionado.totalGeneral.toLocaleString('es-CO')}
                </span>
                <span className="text-[11px] text-primary font-bold block">
                  Incluye ${pedidoSeleccionado.costoFlete.toLocaleString('es-CO')} de flete
                </span>
              </div>
            </div>

            {/* Línea de Tiempo del Flete Rural (Estilo Uber) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-primary" />
                  Estado del Trayecto Veredal
                </span>
                <span className="text-primary font-extrabold">
                  {pedidoSeleccionado.horaEstimada}
                </span>
              </div>

              {/* Barra de Progreso con 4 Hitos */}
              <div className="relative pt-2 pb-1">
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${(pasoActual / 4) * 100}%` }}
                  />
                </div>

                <div className="grid grid-cols-4 gap-2 pt-3 text-center">
                  {[
                    { paso: 1, titulo: '1. Retención Escrow', desc: 'Pago seguro en custodia' },
                    { paso: 2, titulo: '2. Agro-Driver', desc: 'Conductor asignado' },
                    { paso: 3, titulo: '3. Foto & Pago Nequi', desc: 'Pago inmediato campesino' },
                    { paso: 4, titulo: '4. Validación QR', desc: 'Liquidación flete transportador' }
                  ].map((p) => {
                    const completado = pasoActual >= p.paso
                    const esActual = pasoActual === p.paso

                    return (
                      <div key={p.paso} className="space-y-0.5">
                        <div
                          className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold ${
                            completado
                              ? 'bg-primary text-primary-foreground shadow-sm'
                              : 'bg-muted text-muted-foreground'
                          } ${esActual ? 'ring-2 ring-primary ring-offset-2 ring-offset-card' : ''}`}
                        >
                          {completado ? '✓' : p.paso}
                        </div>
                        <p className={`text-xs font-bold ${completado ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {p.titulo}
                        </p>
                        <p className="text-[10px] text-muted-foreground">{p.desc}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-secondary/60 border border-border flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Navigation className="h-3.5 w-3.5 text-primary" />
                  <strong>Ubicación actual:</strong> {pedidoSeleccionado.distanciaRestante}
                </span>
                <span className="font-extrabold text-foreground">Vía 100% Despejada</span>
              </div>
            </div>

            {/* Datos del Conductor y del Campesino (Dos Columnas) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Conductor AgroFlete */}
              <div className="p-4 rounded-2xl bg-secondary/40 border border-border space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold uppercase tracking-wider text-muted-foreground text-[10px]">
                    Transportador Asignado (AgroFlete)
                  </span>
                  <span className="text-2xl">{pedidoSeleccionado.conductor.fotoEmoji}</span>
                </div>

                <div>
                  <h4 className="font-extrabold text-sm text-foreground">
                    {pedidoSeleccionado.conductor.nombre}
                  </h4>
                  <p className="text-xs text-primary font-bold mt-0.5">
                    {pedidoSeleccionado.conductor.vehiculo}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Placa: <strong>{pedidoSeleccionado.conductor.placa}</strong>
                  </p>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => alert(`Llamando al transportador ${pedidoSeleccionado.conductor.telefono}`)}
                  className="w-full font-bold text-xs border-primary/30 text-primary hover:bg-primary/10"
                >
                  <Phone className="h-3.5 w-3.5 mr-1.5" />
                  Llamar Transportador ({pedidoSeleccionado.conductor.telefono})
                </Button>
              </div>

              {/* Campesino / Productor */}
              <div className="p-4 rounded-2xl bg-secondary/40 border border-border space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold uppercase tracking-wider text-muted-foreground text-[10px]">
                    Productor Campesino (Origen)
                  </span>
                  <span className="text-2xl">🧑‍🌾</span>
                </div>

                <div>
                  <h4 className="font-extrabold text-sm text-foreground">
                    {pedidoSeleccionado.campesino}
                  </h4>
                  <p className="text-xs text-primary font-bold mt-0.5">
                    {pedidoSeleccionado.fincaOrigen}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {pedidoSeleccionado.veredaOrigen}
                  </p>
                </div>

                <div className="p-2 rounded-xl bg-background border border-border text-[11px] text-muted-foreground">
                  Pago del 100% garantizado al productor sin deducción de intermediario.
                </div>
              </div>
            </div>

            {/* Lista de Alimentos en la Carga */}
            <div className="space-y-3 pt-2">
              <h4 className="font-extrabold text-sm text-foreground flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-primary" />
                Manifiesto de Carga Transportada
              </h4>

              <div className="border border-border rounded-2xl overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50 text-muted-foreground font-bold uppercase text-left">
                      <th className="p-3">Alimento Cosechado</th>
                      <th className="p-3 text-center">Cantidad</th>
                      <th className="p-3 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {pedidoSeleccionado.items.map((it, idx) => (
                      <tr key={idx} className="hover:bg-secondary/20">
                        <td className="p-3 font-bold text-foreground">{it.nombre}</td>
                        <td className="p-3 text-center text-muted-foreground font-semibold">
                          {it.cantidad}
                        </td>
                        <td className="p-3 text-right font-extrabold text-foreground">
                          ${it.subtotal.toLocaleString('es-CO')}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-muted/20 font-bold">
                      <td colSpan={2} className="p-3 text-muted-foreground">
                        Flete Veredal (AgroFlete Jeep Willys):
                      </td>
                      <td className="p-3 text-right text-primary">
                        +${pedidoSeleccionado.costoFlete.toLocaleString('es-CO')}
                      </td>
                    </tr>
                    <tr className="bg-secondary/40 font-black text-sm">
                      <td colSpan={2} className="p-3 text-foreground">
                        Total Liquidación:
                      </td>
                      <td className="p-3 text-right text-foreground">
                        ${pedidoSeleccionado.totalGeneral.toLocaleString('es-CO')} COP
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Botones Interactivos del Sistema Antifraude (Escrow) */}
              <div className="p-4 rounded-2xl bg-secondary/60 border border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <span className="font-black text-foreground flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    Billetera en Custodia (Escrow Antifraude Activa)
                  </span>
                  <p className="text-[11px] text-muted-foreground">
                    Los fondos están retenidos en la pasarela hasta que se confirme cada hito.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <Button
                    size="sm"
                    onClick={() =>
                      alert(
                        `📸 Inspección de Origen Aprobada: Foto de la canastilla verificada por el conductor. Se liberaron $${pedidoSeleccionado.totalProductos.toLocaleString(
                          'es-CO'
                        )} COP al Nequi/Daviplata de ${pedidoSeleccionado.campesino}.`
                      )
                    }
                    className="flex-1 sm:flex-none text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                  >
                    📸 Check Calidad & Pago Nequi
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      alert(
                        `📲 Código QR Escaneado por ${pedidoSeleccionado.cliente}: Carga entregada conforme. Se liberaron $${pedidoSeleccionado.costoFlete.toLocaleString(
                          'es-CO'
                        )} COP del flete a ${pedidoSeleccionado.conductor.nombre}.`
                      )
                    }
                    className="flex-1 sm:flex-none text-xs font-black border-primary text-primary hover:bg-primary/10"
                  >
                    📲 Validar QR Entrega
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

