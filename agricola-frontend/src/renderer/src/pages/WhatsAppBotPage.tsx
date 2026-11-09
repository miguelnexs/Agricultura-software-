import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mic,
  Send,
  Sparkles,
  Bot,
  CheckCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Truck,
  Smartphone,
  Play,
  RotateCcw
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MensajeWhatsApp {
  id: string
  remitente: 'campesino' | 'bot'
  texto: string
  esAudio?: boolean
  duracionAudio?: string
  hora: string
  datosExtraidos?: {
    producto: string
    cantidad: string
    precioUnitario: string
    fechaCorte: string
    finca: string
    vereda: string
    modalidad: 'pre_cosecha' | 'flete_retorno'
  }
}

export function WhatsAppBotPage(): JSX.Element {
  const [mensajes, setMensajes] = useState<MensajeWhatsApp[]>([
    {
      id: 'm-1',
      remitente: 'bot',
      texto:
        '¡Hola Don Hernando! 👋 Bienvenido a AgroConexión por WhatsApp. ¿Qué cosecha tiene lista o programada para los próximos días? Puede enviarme un mensaje de voz o una foto de las plantas.',
      hora: '07:05 AM'
    }
  ])

  const [inputTexto, setInputTexto] = useState('')
  const [procesandoIA, setProcesandoIA] = useState(false)
  const [audioReproduciendo, setAudioReproduciendo] = useState(false)

  // Enviar un mensaje de audio de ejemplo (Típico campesino en vereda)
  const simularAudioCampesino = (tipo: 'platano' | 'aguacate' | 'retorno') => {
    let audioTexto = ''
    let extraccion: MensajeWhatsApp['datosExtraidos']

    if (tipo === 'platano') {
      audioTexto =
        '🎙️ Nota de voz (0:12): "Hola mijo, buenos días. Aquí desde la Finca La Esperanza en la Vereda El Paraíso. Tengo 15 bultos de plátano hartón gruesos listos para cortar el jueves, los dejo a $65.000 el bulto para que me consigan los compradores antes del corte."'
      extraccion = {
        producto: 'Plátano Dominico Hartón',
        cantidad: '15 Bultos (~750 kg)',
        precioUnitario: '$65.000 COP / Bulto',
        fechaCorte: 'Jueves (Pre-Cosecha en 3 días)',
        finca: 'Finca La Esperanza',
        vereda: 'Vereda El Paraíso (Salento)',
        modalidad: 'pre_cosecha'
      }
    } else if (tipo === 'aguacate') {
      audioTexto =
        '🎙️ Nota de voz (0:09): "Don Carlos, buenas tardes. Tengo 25 canastillas de aguacate Hass calibre de exportación en la Hacienda El Mirador, listas para bajar a la ciudad el viernes a $4.800 el kilo."'
      extraccion = {
        producto: 'Aguacate Hass Exportación',
        cantidad: '25 Canastillas (~500 kg)',
        precioUnitario: '$4.800 COP / Kilo',
        fechaCorte: 'Viernes (Pre-Cosecha en 4 días)',
        finca: 'Hacienda El Mirador',
        vereda: 'Vereda La Nubia (Circasia)',
        modalidad: 'pre_cosecha'
      }
    } else {
      audioTexto =
        '🎙️ Nota de voz (0:14): "Buenas tardes central. Soy Argemiro en el Willys. Subo con 10 bultos de abono pa la vereda Boquía y bajo vacío hacia Armenia a las 2:00 PM por si hay flete de retorno para aprovechar el viaje."'
      extraccion = {
        producto: 'Flete de Retorno Disponible (Jeep Willys)',
        cantidad: 'Capacidad hasta 20 bultos / 1 Ton',
        precioUnitario: 'Tarifa con 30% descuento por retorno',
        fechaCorte: 'Hoy a las 02:00 PM',
        finca: 'Ruta Vereda Boquía ➔ Armenia',
        vereda: 'Vereda Boquía',
        modalidad: 'flete_retorno'
      }
    }

    const nuevoMsgCampesino: MensajeWhatsApp = {
      id: `camp-${Date.now()}`,
      remitente: 'campesino',
      texto: audioTexto,
      esAudio: true,
      duracionAudio: '0:12',
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMensajes((prev) => [...prev, nuevoMsgCampesino])
    setProcesandoIA(true)

    // Respuesta del Bot con IA procesada
    setTimeout(() => {
      const respuestaBot: MensajeWhatsApp = {
        id: `bot-${Date.now()}`,
        remitente: 'bot',
        texto:
          tipo === 'retorno'
            ? '✅ ¡Flete de Retorno registrado, Don Argemiro! Notificando a 3 fincas en su ruta de bajada para que preparen su carga.'
            : '✅ ¡Cosecha transcrita y clasificada con éxito! Hemos publicado su venta programada en el catálogo B2B. Los restaurantes ya pueden agrupar pedidos antes de que corte el producto.',
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        datosExtraidos: extraccion
      }
      setMensajes((prev) => [...prev, respuestaBot])
      setProcesandoIA(false)
    }, 1800)
  }

  const enviarTextoManual = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputTexto.trim()) return

    const nuevo: MensajeWhatsApp = {
      id: `camp-${Date.now()}`,
      remitente: 'campesino',
      texto: inputTexto,
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMensajes((prev) => [...prev, nuevo])
    const textoGuardado = inputTexto
    setInputTexto('')
    setProcesandoIA(true)

    setTimeout(() => {
      const botReply: MensajeWhatsApp = {
        id: `bot-${Date.now()}`,
        remitente: 'bot',
        texto: `✅ Entendido. La IA ha procesado su mensaje: "${textoGuardado}". Asignando ubicación GPS de la finca y habilitando pedido agrupado para restaurantes.`,
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        datosExtraidos: {
          producto: 'Cosecha de Finca',
          cantidad: 'Según mensaje',
          precioUnitario: 'Precio veredal fijado',
          fechaCorte: 'En 3 días (Cero Merma)',
          finca: 'Finca La Esperanza',
          vereda: 'Vereda El Paraíso',
          modalidad: 'pre_cosecha'
        }
      }
      setMensajes((prev) => [...prev, botReply])
      setProcesandoIA(false)
    }, 1600)
  }

  return (
    <div className="w-full space-y-6">
      {/* Banner Explicativo del Pilar A del PDF */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950/20 via-secondary/70 to-card border border-border p-6 md:p-8 shadow-md">
        <div className="h-1.5 w-full zocalo-border absolute top-0 left-0" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-2">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/15 text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-wider">
              <Bot className="h-3.5 w-3.5" />
              Pilar A del Plan de Negocio • Interfaz Ultra-Simplificada
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
              WhatsApp Bot + IA para el Productor Rural
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              En las veredas rara vez hay señal 4G estable o tiempo para llenar formularios complejos en una app. El campesino simplemente <strong className="text-foreground">envía una nota de voz por WhatsApp</strong>. La IA transcribe el audio, clasifica el alimento, programa la venta pre-cosecha (a 3-7 días) y asigna el transporte de retorno.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <div className="p-3.5 rounded-2xl bg-card border border-border text-xs space-y-1 shadow-sm">
              <span className="font-extrabold text-foreground flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Cero Curva de Aprendizaje:
              </span>
              <p className="text-sm font-bold text-muted-foreground">
                98% de los campesinos colombianos ya usan WhatsApp a diario.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid: Simulador de WhatsApp en Vivo (Lado Izquierdo) + Pipeline de IA & Pre-Cosecha (Lado Derecho) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Simulador Interactivo de WhatsApp en Teléfono (5 cols) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-sm rounded-[38px] border-4 border-foreground/20 bg-background shadow-2xl overflow-hidden flex flex-col h-[640px]">
            {/* Barra de Estado del Móvil */}
            <div className="bg-[#075E54] text-white px-5 py-2.5 flex items-center justify-between text-xs font-semibold">
              <span className="font-bold">07:15 AM</span>
              <div className="flex items-center gap-2">
                <span>📶 3G Veredal</span>
                <span>🔋 85%</span>
              </div>
            </div>

            {/* Cabecera de WhatsApp */}
            <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3 shadow-md">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
                🌱
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-extrabold text-sm truncate">AgroConexión Bot IA</h4>
                <p className="text-[11px] text-emerald-200 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  En línea • Receptor de Cosecha
                </p>
              </div>
            </div>

            {/* Área de Conversación / Mensajes */}
            <div className="flex-1 bg-[#E5DDD5] dark:bg-stone-900/90 p-3.5 overflow-y-auto space-y-3 font-sans text-xs">
              {mensajes.map((msg) => {
                const esCampesino = msg.remitente === 'campesino'

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${esCampesino ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${
                        esCampesino
                          ? 'bg-[#DCF8C6] dark:bg-emerald-950 text-foreground rounded-tr-none'
                          : 'bg-white dark:bg-stone-800 text-foreground rounded-tl-none border border-border/50'
                      }`}
                    >
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.texto}</p>

                      {/* Tarjeta de Datos Extraídos por IA dentro del mensaje del Bot */}
                      {msg.datosExtraidos && (
                        <div className="mt-2.5 p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-1 text-[11px]">
                          <span className="font-black text-primary uppercase tracking-wide block">
                            🤖 Extracción IA Verificada:
                          </span>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Producto:</span>
                            <span className="font-bold text-foreground">
                              {msg.datosExtraidos.producto}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Cantidad:</span>
                            <span className="font-bold text-foreground">
                              {msg.datosExtraidos.cantidad}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Precio:</span>
                            <span className="font-bold text-emerald-700 dark:text-emerald-400">
                              {msg.datosExtraidos.precioUnitario}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Corte / Recolección:</span>
                            <span className="font-bold text-foreground">
                              {msg.datosExtraidos.fechaCorte}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Ubicación GPS:</span>
                            <span className="font-bold text-foreground">
                              {msg.datosExtraidos.vereda}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-end gap-1 text-[9px] text-muted-foreground mt-1 font-semibold">
                        <span>{msg.hora}</span>
                        {esCampesino && <CheckCheck className="h-3 w-3 text-sky-600" />}
                      </div>
                    </div>
                  </div>
                )
              })}

              {procesandoIA && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-stone-800 text-xs font-bold text-primary max-w-[70%] shadow-sm">
                  <Sparkles className="h-4 w-4 animate-spin" />
                  <span>Transcribiendo audio y extrayendo cosecha con IA...</span>
                </div>
              )}
            </div>

            {/* Input de Mensaje y Micrófono */}
            <div className="bg-card border-t border-border p-2.5">
              <form onSubmit={enviarTextoManual} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Escribe como campesino..."
                  value={inputTexto}
                  onChange={(e) => setInputTexto(e.target.value)}
                  className="flex-1 rounded-full border border-input bg-background px-3.5 py-2 text-xs font-medium text-foreground outline-none"
                />
                <Button
                  type="button"
                  size="icon"
                  onClick={() => simularAudioCampesino('platano')}
                  className="h-9 w-9 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white shrink-0 shadow-sm"
                  title="Simular nota de voz del campesino"
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button
                  type="submit"
                  size="icon"
                  className="h-9 w-9 rounded-full bg-primary text-primary-foreground shrink-0 shadow-sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Pipeline de IA, Pruebas Rápidas y Pre-Cosecha (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Botones de Prueba Rápida con Audios Reales */}
          <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="font-black text-base text-foreground flex items-center gap-2">
                  <Play className="h-4 w-4 text-primary" />
                  Probar Notas de Voz Típicas del Campo (Audios Reales)
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Haz clic en cualquiera de estos botones para simular la llegada de un audio al bot de WhatsApp.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                variant="outline"
                onClick={() => simularAudioCampesino('platano')}
                className="h-auto py-3 px-3.5 justify-start text-left border-border hover:bg-secondary/60 rounded-2xl flex flex-col items-start gap-1 font-semibold"
              >
                <span className="text-xs font-black text-foreground flex items-center gap-1.5">
                  🍌 15 Bultos de Plátano
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Finca La Esperanza • Salento
                </span>
                <span className="text-[10px] font-bold text-primary mt-1">
                  Venta Pre-Cosecha (3 días)
                </span>
              </Button>

              <Button
                variant="outline"
                onClick={() => simularAudioCampesino('aguacate')}
                className="h-auto py-3 px-3.5 justify-start text-left border-border hover:bg-secondary/60 rounded-2xl flex flex-col items-start gap-1 font-semibold"
              >
                <span className="text-xs font-black text-foreground flex items-center gap-1.5">
                  🥑 25 Cajas Aguacate
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Hacienda El Mirador • Circasia
                </span>
                <span className="text-[10px] font-bold text-primary mt-1">
                  Exportación ($4.800/kg)
                </span>
              </Button>

              <Button
                variant="outline"
                onClick={() => simularAudioCampesino('retorno')}
                className="h-auto py-3 px-3.5 justify-start text-left border-border hover:bg-secondary/60 rounded-2xl flex flex-col items-start gap-1 font-semibold"
              >
                <span className="text-xs font-black text-foreground flex items-center gap-1.5">
                  🚙 Flete Retorno Willys
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Don Argemiro • Baja a las 2 PM
                </span>
                <span className="text-[10px] font-bold text-amber-600 mt-1">
                  Monetizar Viaje Vacío
                </span>
              </Button>
            </div>
          </div>

          {/* Cómo Funciona el Algoritmo de Pre-Cosecha (Cero Merma) */}
          <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4">
            <h3 className="font-black text-base text-foreground flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Mecanismo de Ventas Programadas (Pre-Cosecha a 3 - 7 Días)
            </h3>

            <div className="space-y-3 text-xs leading-relaxed text-muted-foreground">
              <p>
                En el agro tradicional, el campesino corta o cosecha primero y luego busca comprador desesperadamente. Si no encuentra camión o intermediario ese mismo día, <strong className="text-foreground">el producto se madura y se pudre en la finca</strong> (merma del 30% al 40%).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-secondary/50 border border-border space-y-1">
                  <span className="font-extrabold text-foreground flex items-center gap-1.5 text-xs">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Cero Merma para el Productor
                  </span>
                  <p className="text-[11px]">
                    El agricultor solo corta la mata o descuelga el racimo cuando la plataforma ya tiene los pedidos B2B confirmados y pagados en Escrow.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-secondary/50 border border-border space-y-1">
                  <span className="font-extrabold text-foreground flex items-center gap-1.5 text-xs">
                    <Truck className="h-4 w-4 text-primary" />
                    Ruta Optimizada (Milk-Run)
                  </span>
                  <p className="text-[11px]">
                    El algoritmo agrupa las cosechas de 3 o 4 fincas de la misma vereda para que una sola camioneta o Willys las baje a la ciudad en un único recorrido.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Blindaje Antifraude y Facturación Electrónica */}
          <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-3">
            <h3 className="font-black text-sm text-foreground flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Blindaje Antifraude: Prevención de Fuga de la Plataforma
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              ¿Por qué el restaurante y el campesino no negocian por fuera tras conocerse? La plataforma entrega beneficios que no pueden replicar solos:
            </p>
            <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-4">
              <li>
                <strong className="text-foreground">Facturación electrónica unificada:</strong> Un restaurante recibe 1 sola factura por los 12 productos de 8 fincas diferentes.
              </li>
              <li>
                <strong className="text-foreground">Pago inmediato en efectivo digital:</strong> El campesino recibe su dinero en Nequi al momento exacto en que el conductor sube la canastilla al vehículo.
              </li>
              <li>
                <strong className="text-foreground">Garantía de calidad:</strong> Si un bulto no cumple el estándar en la foto de inspección, la plataforma lo reemplaza sin costo para el comprador.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

