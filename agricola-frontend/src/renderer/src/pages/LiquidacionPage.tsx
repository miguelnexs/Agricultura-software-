import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Scale,
  Plus,
  Trash2,
  DollarSign,
  Coffee,
  Calendar,
  Users,
  CheckCircle2,
  Receipt,
  Download
} from 'lucide-react'

interface RegistroPesaje {
  id: string
  recolector: string
  lote: string
  arrobas: number
  kilos: number
  tarifaArroba: number
  deducciones: number
  totalPagar: number
  hora: string
  fecha: string
}

const STORAGE_KEY = 'hacienda_pesajes_data'

const RECOLECTORES_DEFAULT = [
  'Don Hernando Valencia',
  'Jhon Jairo Patiño',
  'Argemiro Ríos',
  'Luz Marina Giraldo',
  'Mateo Henao',
  'Carlos Mario Arias'
]

const LOTES_DEFAULT = [
  'L-01 • Lote El Mirador (Castillo)',
  'L-02 • Lote La Cañada (Cenicafé 1)',
  'L-03 • Lote Alto de los Guamos',
  'L-04 • Lote La Quebrada'
]

export function LiquidacionPage(): JSX.Element {
  const [pesajes, setPesajes] = useState<RegistroPesaje[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.error(e)
    }
    return [
      {
        id: '1',
        recolector: 'Don Hernando Valencia',
        lote: 'L-01 • Lote El Mirador (Castillo)',
        arrobas: 11.5,
        kilos: 143.75,
        tarifaArroba: 14000,
        deducciones: 5000,
        totalPagar: 11.5 * 14000 - 5000,
        hora: '04:15 PM',
        fecha: 'Hoy'
      },
      {
        id: '2',
        recolector: 'Jhon Jairo Patiño',
        lote: 'L-02 • Lote La Cañada (Cenicafé 1)',
        arrobas: 9.0,
        kilos: 112.5,
        tarifaArroba: 14000,
        deducciones: 0,
        totalPagar: 9.0 * 14000,
        hora: '04:22 PM',
        fecha: 'Hoy'
      },
      {
        id: '3',
        recolector: 'Mateo Henao',
        lote: 'L-01 • Lote El Mirador (Castillo)',
        arrobas: 8.2,
        kilos: 102.5,
        tarifaArroba: 14000,
        deducciones: 0,
        totalPagar: 8.2 * 14000,
        hora: '04:30 PM',
        fecha: 'Hoy'
      }
    ]
  })

  // Form State
  const [recolector, setRecolector] = useState(RECOLECTORES_DEFAULT[0])
  const [lote, setLote] = useState(LOTES_DEFAULT[0])
  const [arrobasInput, setArrobasInput] = useState<string>('9.5')
  const [tarifaInput, setTarifaInput] = useState<string>('14000')
  const [deduccionesInput, setDeduccionesInput] = useState<string>('0')
  const [mensajeExito, setMensajeExito] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pesajes))
    } catch (e) {
      console.error(e)
    }
  }, [pesajes])

  const arrobasNum = parseFloat(arrobasInput) || 0
  const kilosNum = arrobasNum * 12.5
  const tarifaNum = parseFloat(tarifaInput) || 0
  const deduccionesNum = parseFloat(deduccionesInput) || 0
  const liquidacionCalculada = Math.max(0, arrobasNum * tarifaNum - deduccionesNum)

  const registrarPesaje = (e: React.FormEvent) => {
    e.preventDefault()
    if (arrobasNum <= 0) return

    const nuevo: RegistroPesaje = {
      id: Date.now().toString(),
      recolector,
      lote,
      arrobas: arrobasNum,
      kilos: kilosNum,
      tarifaArroba: tarifaNum,
      deducciones: deduccionesNum,
      totalPagar: liquidacionCalculada,
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fecha: 'Hoy'
    }

    setPesajes([nuevo, ...pesajes])
    setMensajeExito(true)
    setTimeout(() => setMensajeExito(false), 2500)
    setArrobasInput('')
    setDeduccionesInput('0')
  }

  const eliminarRegistro = (id: string) => {
    setPesajes(pesajes.filter((p) => p.id !== id))
  }

  const totalArrobasHoy = pesajes.reduce((acc, curr) => acc + curr.arrobas, 0)
  const totalKilosHoy = totalArrobasHoy * 12.5
  const totalDineroPagar = pesajes.reduce((acc, curr) => acc + curr.totalPagar, 0)

  return (
    <div className="space-y-6">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <Scale className="h-3.5 w-3.5" />
            Control del Pesaje en Beneficiadero
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
            Liquidación de Cosecha & Recolección
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Registro diario de pesada de café cereza, control de cuadrilla y planilla de pago a jornaleros.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="font-bold border-border"
          >
            <Download className="mr-2 h-4 w-4 text-primary" />
            Imprimir Planilla
          </Button>
        </div>
      </div>

      {/* Resumen Total del Día */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Total Arrobas (@) Pesadas
            </span>
            <p className="text-2xl font-extrabold text-foreground mt-1">
              {totalArrobasHoy.toFixed(1)} @
            </p>
            <span className="text-xs text-primary font-semibold">
              ≈ {totalKilosHoy.toLocaleString()} kg de cereza
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-primary/15 border border-primary/25 text-primary flex items-center justify-center">
            <Coffee className="h-6 w-6" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="p-5 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Monto a Liquidar Cuadrilla
            </span>
            <p className="text-2xl font-extrabold text-foreground mt-1">
              ${totalDineroPagar.toLocaleString('es-CO')} COP
            </p>
            <span className="text-xs text-muted-foreground font-medium">
              Tarifa base: ${tarifaNum.toLocaleString('es-CO')} / @
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-amber-500/15 border border-amber-500/25 text-amber-700 dark:text-amber-400 flex items-center justify-center">
            <DollarSign className="h-6 w-6" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="p-5 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Pases de Báscula Hoy
            </span>
            <p className="text-2xl font-extrabold text-foreground mt-1">
              {pesajes.length} Pesajes
            </p>
            <span className="text-xs text-primary font-semibold">
              Beneficiadero Principal Activo
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-secondary border border-border text-foreground flex items-center justify-center">
            <Receipt className="h-6 w-6" />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Formulario de Pesaje en Romana / Báscula */}
        <motion.form
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={registrarPesaje}
          className="lg:col-span-5 p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4"
        >
          <div className="border-b border-border pb-3">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              Ingresar Pesaje en Romana
            </h3>
            <p className="text-xs text-muted-foreground">
              Registra el peso del coco/costal al momento de la llegada del recolector.
            </p>
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="font-bold uppercase text-muted-foreground flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-primary" /> Recolector / Jornalero
            </label>
            <select
              value={recolector}
              onChange={(e) => setRecolector(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {RECOLECTORES_DEFAULT.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="font-bold uppercase text-muted-foreground flex items-center gap-1">
              <Coffee className="h-3.5 w-3.5 text-primary" /> Lote Cosechado
            </label>
            <select
              value={lote}
              onChange={(e) => setLote(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {LOTES_DEFAULT.map((l, i) => (
                <option key={i} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5 text-xs">
              <label className="font-bold uppercase text-muted-foreground">
                Arrobas (@) Pesadas
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                placeholder="Ej. 10.5"
                value={arrobasInput}
                onChange={(e) => setArrobasInput(e.target.value)}
                required
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <span className="text-[11px] text-muted-foreground">
                = {(arrobasNum * 12.5).toFixed(1)} Kilos
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-bold uppercase text-muted-foreground">
                Tarifa por Arroba (@)
              </label>
              <input
                type="number"
                step="500"
                value={tarifaInput}
                onChange={(e) => setTarifaInput(e.target.value)}
                required
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <span className="text-[11px] text-muted-foreground">Pesos Colombianos</span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="font-bold uppercase text-muted-foreground">
              Deducción (Anticipo / Casino de Comida)
            </label>
            <input
              type="number"
              step="500"
              value={deduccionesInput}
              onChange={(e) => setDeduccionesInput(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Tarjeta de Cálculo en Vivo */}
          <div className="p-3.5 rounded-xl bg-secondary/70 border border-border space-y-1 text-xs">
            <div className="flex justify-between items-center text-muted-foreground">
              <span>Valor Bruto:</span>
              <span className="font-semibold text-foreground">
                ${(arrobasNum * tarifaNum).toLocaleString('es-CO')} COP
              </span>
            </div>
            {deduccionesNum > 0 && (
              <div className="flex justify-between items-center text-destructive">
                <span>Deducciones:</span>
                <span className="font-semibold">
                  -${deduccionesNum.toLocaleString('es-CO')} COP
                </span>
              </div>
            )}
            <div className="flex justify-between items-center pt-1 border-t border-border font-bold text-sm text-foreground">
              <span>Neto a Pagar:</span>
              <span className="text-base text-primary font-extrabold">
                ${liquidacionCalculada.toLocaleString('es-CO')} COP
              </span>
            </div>
          </div>

          <Button type="submit" className="w-full font-bold h-11 shadow-md">
            <Plus className="mr-2 h-4 w-4" />
            Registrar Pesaje en Cuaderno
          </Button>

          {mensajeExito && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-primary font-bold text-center flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="h-4 w-4" />
              ¡Pesaje anotado en la planilla del día!
            </motion.p>
          )}
        </motion.form>

        {/* Tabla / Planilla de Pesajes Registrados */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7 rounded-2xl border border-border bg-card shadow-sm overflow-hidden flex flex-col justify-between"
        >
          <div>
            <div className="p-5 border-b border-border bg-secondary/40 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Planilla de Báscula • Beneficiadero
                </h3>
                <p className="text-xs text-muted-foreground">
                  Registros del día guardados de forma segura en la memoria de la finca.
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/15 text-primary border border-primary/25">
                {pesajes.length} pases
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border text-muted-foreground font-bold uppercase tracking-wider text-left bg-muted/20">
                    <th className="p-3.5">Hora / Lote</th>
                    <th className="p-3.5">Recolector</th>
                    <th className="p-3.5 text-right">Peso (@ / kg)</th>
                    <th className="p-3.5 text-right">Liquidación</th>
                    <th className="p-3.5 text-center">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {pesajes.map((item) => (
                    <tr key={item.id} className="hover:bg-secondary/25 transition-colors">
                      <td className="p-3.5">
                        <span className="font-bold text-foreground block">{item.hora}</span>
                        <span className="text-[11px] text-muted-foreground truncate max-w-[150px] block">
                          {item.lote}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-foreground">
                        {item.recolector}
                      </td>
                      <td className="p-3.5 text-right">
                        <span className="font-extrabold text-primary block">
                          {item.arrobas.toFixed(1)} @
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {item.kilos.toFixed(1)} kg
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <span className="font-extrabold text-foreground block">
                          ${item.totalPagar.toLocaleString('es-CO')}
                        </span>
                        {item.deducciones > 0 && (
                          <span className="text-[10px] text-destructive">
                            -${item.deducciones.toLocaleString('es-CO')} ded.
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => eliminarRegistro(item.id)}
                          className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          title="Eliminar registro"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {pesajes.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-muted-foreground">
                        No hay pesajes registrados hoy en la báscula.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 border-t border-border bg-secondary/30 flex items-center justify-between text-xs font-semibold">
            <span className="text-muted-foreground">
              Promedio por recolector: {(totalArrobasHoy / (pesajes.length || 1)).toFixed(1)} @
            </span>
            <span className="text-primary font-bold">
              Total liquidado: ${totalDineroPagar.toLocaleString('es-CO')} COP
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

