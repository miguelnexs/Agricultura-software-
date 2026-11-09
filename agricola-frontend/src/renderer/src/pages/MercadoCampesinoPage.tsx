import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingBag,
  MapPin,
  CheckCircle2,
  Filter,
  Plus,
  Truck,
  Heart,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Phone,
  Scale,
  FileText,
  Printer,
  QrCode
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface ProductoCampesino {
  id: string
  nombre: string
  categoria: 'cafe' | 'frutas' | 'tuberculos' | 'panela' | 'lacteos'
  campesino: string
  finca: string
  vereda: string
  municipio: string
  precioUnidad: number
  unidadMedida: string
  disponible: number
  imagenEmoji: string
  calificacion: number
  cosechadoHace: string
  descripcion: string
  transporteListo: boolean
}

export const PRODUCTOS_INICIALES: ProductoCampesino[] = [
  {
    id: 'prod-1',
    nombre: 'Café Especial Castillo (Cereza Seleccionada)',
    categoria: 'cafe',
    campesino: 'Don Hernando Valencia',
    finca: 'Finca La Esperanza',
    vereda: 'Vereda El Paraíso',
    municipio: 'Salento, Quindío',
    precioUnidad: 18500,
    unidadMedida: 'Libra (500g)',
    disponible: 80,
    imagenEmoji: '☕',
    calificacion: 4.9,
    cosechadoHace: 'Ayer por la tarde',
    descripcion: 'Café de altura a 1.720 m.s.n.m. Taza limpia con notas achocolatadas y panela. Secado en marquesina solar.',
    transporteListo: true
  },
  {
    id: 'prod-2',
    nombre: 'Aguacate Hass Calibre Exportación',
    categoria: 'frutas',
    campesino: 'Dra. Luz Marina & Familia',
    finca: 'Hacienda El Mirador',
    vereda: 'Vereda La Nubia',
    municipio: 'Circasia, Quindío',
    precioUnidad: 4500,
    unidadMedida: 'Kilo',
    disponible: 350,
    imagenEmoji: '🥑',
    calificacion: 5.0,
    cosechadoHace: 'Hoy a las 6:00 AM',
    descripcion: 'Aguacate fresco recién bajado del árbol, cremoso y sin golpes. Ideal para restaurantes y consumo familiar.',
    transporteListo: true
  },
  {
    id: 'prod-3',
    nombre: 'Plátano Dominico Hartón Veredal',
    categoria: 'tuberculos',
    campesino: 'Jhon Jairo Patiño',
    finca: 'Finca La Vega',
    vereda: 'Vereda San Antonio',
    municipio: 'Armenia, Quindío',
    precioUnidad: 34000,
    unidadMedida: 'Racimo entero (~25 kg)',
    disponible: 25,
    imagenEmoji: '🍌',
    calificacion: 4.8,
    cosechadoHace: 'Hoy temprano',
    descripcion: 'Plátano grueso y pesado, cultivado orgánicamente junto al cafetal. Excelente para patacones y plátano asado.',
    transporteListo: true
  },
  {
    id: 'prod-4',
    nombre: 'Panela Orgánica Artesanal en Bloque',
    categoria: 'panela',
    campesino: 'Don Carlos Mario Arias',
    finca: 'Trapiche El Cañaduzal',
    vereda: 'Vereda Boquía',
    municipio: 'Salento, Quindío',
    precioUnidad: 5200,
    unidadMedida: 'Kilo (4 pastillas)',
    disponible: 140,
    imagenEmoji: '🍯',
    calificacion: 4.9,
    cosechadoHace: 'Molienda de este fin de semana',
    descripcion: '100% jugo de caña concentrado en paila de cobre, clarificada con balso, sin aditivos ni azúcares añadidos.',
    transporteListo: false
  },
  {
    id: 'prod-5',
    nombre: 'Huevos Criollos de Gallina Feliz',
    categoria: 'lacteos',
    campesino: 'Doña Rosa Elvira',
    finca: 'Granja Villa Clarita',
    vereda: 'Vereda La Florida',
    municipio: 'Pereira, Risaralda',
    precioUnidad: 22000,
    unidadMedida: 'Panal (30 huevos)',
    disponible: 45,
    imagenEmoji: '🥚',
    calificacion: 5.0,
    cosechadoHace: 'Esta mañana',
    descripcion: 'Gallinas criollas pastoreando libres entre platanales, alimentadas con maíz, bore y forrajes de la finca.',
    transporteListo: true
  },
  {
    id: 'prod-6',
    nombre: 'Naranja Valencia y Mandarina Oneco',
    categoria: 'frutas',
    campesino: 'Don Argemiro Ríos',
    finca: 'El Cítrico Montañero',
    vereda: 'Vereda Barcelona',
    municipio: 'Calarcá, Quindío',
    precioUnidad: 28000,
    unidadMedida: 'Canastilla (~18 kg)',
    disponible: 30,
    imagenEmoji: '🍊',
    calificacion: 4.7,
    cosechadoHace: 'Ayer',
    descripcion: 'Fruta jugosa y dulce, cosechada en su punto óptimo de maduración sin ceras artificiales.',
    transporteListo: true
  }
]

interface CarritoItem {
  producto: ProductoCampesino
  cantidad: number
}

interface MercadoCampesinoProps {
  onIrAFlete?: (producto: ProductoCampesino, cantidad: number) => void
}

export function MercadoCampesinoPage({ onIrAFlete }: MercadoCampesinoProps): JSX.Element {
  const [productos, setProductos] = useState<ProductoCampesino[]>(PRODUCTOS_INICIALES)
  const [categoria, setCategoria] = useState<string>('todos')
  const [modalidadCompra, setModalidadCompra] = useState<'b2b' | 'b2c'>('b2b')
  const [busqueda, setBusqueda] = useState<string>('')
  const [carrito, setCarrito] = useState<CarritoItem[]>([])
  const [modalPublicar, setModalPublicar] = useState<boolean>(false)
  const [pedidoConfirmado, setPedidoConfirmado] = useState<boolean>(false)
  const [modalFactura, setModalFactura] = useState<boolean>(false)

  // Nuevo Producto Form State
  const [nuevoNombre, setNuevoNombre] = useState('')
  const [nuevoCampesino, setNuevoCampesino] = useState('')
  const [nuevaFinca, setNuevaFinca] = useState('')
  const [nuevaVereda, setNuevaVereda] = useState('')
  const [nuevoPrecio, setNuevoPrecio] = useState('')
  const [nuevaUnidad, setNuevaUnidad] = useState('Kilo')
  const [nuevoEmoji, setNuevoEmoji] = useState('🌾')
  const [nuevaDesc, setNuevaDesc] = useState('')

  const productosFiltrados = productos.filter((p) => {
    const coincideCat = categoria === 'todos' || p.categoria === categoria
    const coincideTxt =
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.campesino.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.vereda.toLowerCase().includes(busqueda.toLowerCase())
    return coincideCat && coincideTxt
  })

  const agregarAlCarrito = (prod: ProductoCampesino) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.producto.id === prod.id)
      if (existe) {
        return prev.map((item) =>
          item.producto.id === prod.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      }
      return [...prev, { producto: prod, cantidad: 1 }]
    })
  }

  const totalCarrito = carrito.reduce(
    (sum, item) => sum + item.producto.precioUnidad * item.cantidad,
    0
  )

  const handleCrearProducto = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nuevoNombre || !nuevoPrecio) return

    const nuevo: ProductoCampesino = {
      id: `prod-${Date.now()}`,
      nombre: nuevoNombre,
      categoria: 'frutas',
      campesino: nuevoCampesino || 'Productor Local',
      finca: nuevaFinca || 'Mi Parcela',
      vereda: nuevaVereda || 'Vereda Campesina',
      municipio: 'Eje Cafetero',
      precioUnidad: parseFloat(nuevoPrecio) || 10000,
      unidadMedida: nuevaUnidad,
      disponible: 50,
      imagenEmoji: nuevoEmoji,
      calificacion: 5.0,
      cosechadoHace: 'Recién publicado',
      descripcion: nuevaDesc || 'Cosecha fresca y directa del campo sin intermediarios.',
      transporteListo: true
    }

    setProductos([nuevo, ...productos])
    setModalPublicar(false)
    setNuevoNombre('')
    setNuevoPrecio('')
    setNuevaDesc('')
  }

  return (
    <div className="space-y-6">
      {/* Banner Principal de Campesino a Persona */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/25 via-secondary/70 to-card border border-border p-6 md:p-8 shadow-md">
        <div className="h-1.5 w-full zocalo-border absolute top-0 left-0" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              Mercado Campesino Directo • 0% Intermediarios
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
              De la Finca a tu Mesa y Negocio
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Compra cosechas frescas directamente a las familias campesinas de nuestras veredas. 
              El campesino recibe el <strong className="text-foreground">100% de su valor justo</strong> y tú recibes alimentos con identidad, frescura y origen garantizado.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-3 shrink-0">
            <Button
              onClick={() => setModalPublicar(true)}
              size="lg"
              className="font-bold shadow-md hover:shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="mr-2 h-5 w-5" />
              Soy Campesino: Publicar Cosecha
            </Button>
            <div className="text-xs text-muted-foreground flex items-center gap-1.5 justify-center">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Compra protegida y pago directo a cuenta veredal
            </div>
          </div>
        </div>
      </section>

      {/* Selector de Modalidad Pilar B del PDF: B2B vs B2C */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-2.5 bg-secondary/60 border border-border rounded-2xl">
        <div className="flex items-center gap-1.5 p-1 bg-background rounded-xl border border-border">
          <Button
            size="sm"
            variant={modalidadCompra === 'b2b' ? 'default' : 'ghost'}
            onClick={() => setModalidadCompra('b2b')}
            className={`rounded-lg text-xs font-black h-8 px-4 transition-all ${
              modalidadCompra === 'b2b' ? 'bg-primary text-primary-foreground shadow-sm' : ''
            }`}
          >
            🏢 Comercios & Restaurantes (B2B Mayorista)
          </Button>
          <Button
            size="sm"
            variant={modalidadCompra === 'b2c' ? 'default' : 'ghost'}
            onClick={() => setModalidadCompra('b2c')}
            className={`rounded-lg text-xs font-black h-8 px-4 transition-all ${
              modalidadCompra === 'b2c' ? 'bg-primary text-primary-foreground shadow-sm' : ''
            }`}
          >
            🏘️ Familias & Canastas Comunitarias (B2C)
          </Button>
        </div>

        <div className="text-xs text-muted-foreground px-3 font-semibold">
          {modalidadCompra === 'b2b' ? (
            <span className="text-primary font-bold">
              ✓ Compra por bulto/canastilla • Facturación electrónica unificada • Ahorro 15% al 25%
            </span>
          ) : (
            <span className="text-foreground font-bold">
              ✓ Pedidos agrupados por edificio o conjunto residencial • Flete compartido en día fijo
            </span>
          )}
        </div>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por alimento, campesino o vereda..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-card text-sm font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="h-4 w-4 text-primary shrink-0 hidden sm:block" />
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'cafe', label: '☕ Café' },
            { id: 'frutas', label: '🥑 Frutas' },
            { id: 'tuberculos', label: '🍌 Plátano y Yuca' },
            { id: 'panela', label: '🍯 Panela' },
            { id: 'lacteos', label: '🥚 Huevos & Queso' }
          ].map((cat) => (
            <Button
              key={cat.id}
              size="sm"
              variant={categoria === cat.id ? 'default' : 'outline'}
              onClick={() => setCategoria(cat.id)}
              className="rounded-full text-xs font-bold shrink-0"
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid de Productos Campesinos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
        {productosFiltrados.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Encabezado de la tarjeta con Campesino y Ubicación */}
              <div className="p-4 border-b border-border bg-gradient-to-r from-secondary/50 via-card to-transparent flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="text-3xl p-2 rounded-xl bg-background border border-border shadow-inner shrink-0">
                    {item.imagenEmoji}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-foreground group-hover:text-primary transition-colors">
                      {item.nombre}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                      <span className="font-bold text-foreground">{item.campesino}</span>
                      <span>•</span>
                      <span>{item.finca}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenido y Detalles Agronómicos */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {item.vereda}, {item.municipio}
                  </span>
                  <span className="font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full text-[11px]">
                    ⭐ {item.calificacion}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {item.descripcion}
                </p>

                <div className="p-2.5 rounded-xl bg-secondary/50 border border-border text-xs flex items-center justify-between">
                  <span className="text-muted-foreground">Cosecha:</span>
                  <span className="font-bold text-foreground">{item.cosechadoHace}</span>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-2xl font-extrabold text-foreground">
                      ${item.precioUnidad.toLocaleString('es-CO')}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium ml-1">
                      / {item.unidadMedida}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {item.disponible} disp.
                  </span>
                </div>
              </div>
            </div>

            {/* Acciones: Comprar Directo o Vincular a AgroFlete */}
            <div className="p-4 border-t border-border bg-muted/20 flex items-center gap-2">
              <Button
                onClick={() => agregarAlCarrito(item)}
                size="sm"
                className="flex-1 font-bold text-xs shadow-sm"
              >
                <ShoppingBag className="mr-1.5 h-4 w-4" />
                Comprar Cosecha
              </Button>

              {onIrAFlete && (
                <Button
                  onClick={() => onIrAFlete(item, 1)}
                  size="sm"
                  variant="outline"
                  className="font-bold text-xs border-primary/30 text-primary hover:bg-primary/10"
                  title="Pedir flete tipo Uber para recoger en finca"
                >
                  <Truck className="h-4 w-4 mr-1" />
                  Pedir Flete
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Barra Flotante de Canasto Campesino */}
      <AnimatePresence>
        {carrito.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-11/12 max-w-2xl bg-card/95 backdrop-blur-md border border-border p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4 z-40"
          >
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-extrabold shadow-md">
                {carrito.reduce((sum, item) => sum + item.cantidad, 0)}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Canasto Directo del Productor
                </p>
                <p className="text-lg font-extrabold text-foreground">
                  ${totalCarrito.toLocaleString('es-CO')} COP
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCarrito([])}
                className="text-xs font-semibold text-muted-foreground"
              >
                Vaciar
              </Button>
              <Button
                onClick={() => setPedidoConfirmado(true)}
                className="font-bold shadow-md bg-primary text-primary-foreground"
              >
                Pagar Directo a Campesinos
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal: Publicar Cosecha (Para el Campesino) */}
      <AnimatePresence>
        {modalPublicar && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center font-bold">
                    🌱
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-foreground">
                      Publicar Cosecha en la Vereda
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Llega directo a familias, restaurantes y compradores sin intermediarios.
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setModalPublicar(false)}
                  className="rounded-full h-8 w-8 p-0"
                >
                  ✕
                </Button>
              </div>

              <form onSubmit={handleCrearProducto} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1 col-span-2">
                    <label className="font-bold uppercase text-muted-foreground">
                      Alimento o Cosecha
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Yuca Armenia / Café Arábica"
                      value={nuevoNombre}
                      onChange={(e) => setNuevoNombre(e.target.value)}
                      required
                      className="w-full rounded-xl border border-input bg-background p-2.5 font-semibold text-foreground focus:ring-2 focus:ring-ring outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold uppercase text-muted-foreground">Emoji / Icono</label>
                    <input
                      type="text"
                      value={nuevoEmoji}
                      onChange={(e) => setNuevoEmoji(e.target.value)}
                      className="w-full text-center rounded-xl border border-input bg-background p-2.5 text-base font-bold outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold uppercase text-muted-foreground">Campesino / Productor</label>
                    <input
                      type="text"
                      placeholder="Tu Nombre"
                      value={nuevoCampesino}
                      onChange={(e) => setNuevoCampesino(e.target.value)}
                      required
                      className="w-full rounded-xl border border-input bg-background p-2.5 font-semibold text-foreground outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold uppercase text-muted-foreground">Finca & Vereda</label>
                    <input
                      type="text"
                      placeholder="Ej. Finca El Guayabo • Vereda Boquía"
                      value={nuevaVereda}
                      onChange={(e) => setNuevaVereda(e.target.value)}
                      required
                      className="w-full rounded-xl border border-input bg-background p-2.5 font-semibold text-foreground outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold uppercase text-muted-foreground">Precio por Unidad (COP)</label>
                    <input
                      type="number"
                      placeholder="Ej. 12000"
                      value={nuevoPrecio}
                      onChange={(e) => setNuevoPrecio(e.target.value)}
                      required
                      className="w-full rounded-xl border border-input bg-background p-2.5 font-bold text-foreground outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold uppercase text-muted-foreground">Unidad de Medida</label>
                    <select
                      value={nuevaUnidad}
                      onChange={(e) => setNuevaUnidad(e.target.value)}
                      className="w-full rounded-xl border border-input bg-background p-2.5 font-semibold text-foreground outline-none"
                    >
                      <option value="Kilo">Kilo (kg)</option>
                      <option value="Libra (500g)">Libra (500g)</option>
                      <option value="Arroba (@ = 12.5 kg)">Arroba (@ = 12.5 kg)</option>
                      <option value="Canastilla (~18 kg)">Canastilla (~18 kg)</option>
                      <option value="Bulto (~50 kg)">Bulto (~50 kg)</option>
                      <option value="Racimo">Racimo</option>
                      <option value="Panal (30 u)">Panal (30 u)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold uppercase text-muted-foreground">Descripción del Cultivo</label>
                  <textarea
                    rows={2}
                    placeholder="Detalles de frescura, variedad sembrada, cómo fue cultivado..."
                    value={nuevaDesc}
                    onChange={(e) => setNuevaDesc(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background p-2.5 font-medium text-foreground outline-none"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setModalPublicar(false)}
                    className="flex-1 font-bold"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" className="flex-1 font-bold bg-primary text-primary-foreground shadow-md">
                    Publicar en la Plataforma
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Pedido Confirmado */}
      <AnimatePresence>
        {pedidoConfirmado && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl text-center space-y-4"
            >
              <div className="mx-auto h-16 w-16 rounded-2xl bg-primary/20 text-primary flex items-center justify-center text-3xl">
                🇨🇴
              </div>
              <h3 className="text-xl font-extrabold text-foreground">
                ¡Pedido Directo Registrado!
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Tu compra ha sido notificada directamente a las familias campesinas. 
                Ahora puedes coordinar un <strong className="text-foreground">AgroFlete (Tipo Uber)</strong> para que un conductor local en Jeep Willys o camioneta recoja la carga en la finca y te la lleve a tu puerta.
              </p>

              <div className="p-3 rounded-xl bg-secondary text-left text-xs space-y-1.5 font-medium">
                <div className="flex justify-between">
                  <span>Productos:</span>
                  <span className="font-bold">{carrito.length} tipos de cosecha</span>
                </div>
                <div className="flex justify-between">
                  <span>Total directo a campesinos:</span>
                  <span className="font-bold text-primary">${totalCarrito.toLocaleString('es-CO')} COP</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  variant="outline"
                  onClick={() => setModalFactura(true)}
                  className="w-full font-bold border-border bg-card hover:bg-secondary flex items-center justify-center gap-2"
                >
                  <FileText className="h-4 w-4 text-primary" />
                  Ver Factura Electrónica Unificada DIAN
                </Button>

                <Button
                  onClick={() => {
                    setPedidoConfirmado(false)
                    setCarrito([])
                    if (onIrAFlete) {
                      onIrAFlete(carrito[0]?.producto || PRODUCTOS_INICIALES[0], 1)
                    }
                  }}
                  className="w-full font-bold bg-primary text-primary-foreground shadow-md"
                >
                  <Truck className="mr-2 h-4 w-4" />
                  Coordinar Transporte con AgroFlete (Tipo Uber)
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Factura Electrónica Unificada DIAN (Pilar B del Plan de Negocios) */}
      <AnimatePresence>
        {modalFactura && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border-2 border-border rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="h-1.5 w-full zocalo-border -mt-2 -mx-2 rounded-t-full mb-4" />
              
              {/* Encabezado Factura Oficial DIAN */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-black text-2xl shadow-md">
                    🌱
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-foreground">
                      AgroConexión Logística S.A.S.
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      NIT: 901.849.201-4 • Régimen Común • Armenia, Quindío
                    </p>
                    <p className="text-[11px] font-bold text-primary">
                      Resolución DIAN No. 18764000219 de 2026
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-black text-xs">
                    FACTURA ELECTRÓNICA DE VENTA
                  </span>
                  <p className="text-sm font-black text-foreground mt-1">
                    No. FE-2026-00482
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Fecha: {new Date().toLocaleDateString('es-CO')}
                  </p>
                </div>
              </div>

              {/* Datos de Comprador y Tesis del PDF */}
              <div className="p-3.5 rounded-2xl bg-secondary/50 border border-border text-xs space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-muted-foreground">Adquiriente (Comercio / Restaurante):</span>
                  <strong className="text-foreground">Restaurante El Portal de las Tradiciones S.A.S.</strong>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-muted-foreground">NIT Comprador:</span>
                  <span className="text-foreground">900.542.118-2</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-muted-foreground">Beneficio del Modelo AgroConexión:</span>
                  <span className="text-primary font-bold">1 Sola Factura para Cosechas de Múltiples Veredas</span>
                </div>
              </div>

              {/* Detalle Consolidado de Ítems */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Detalle de Cosechas Veredales
                </span>
                <div className="border border-border rounded-2xl overflow-hidden divide-y divide-border text-xs">
                  {(carrito.length > 0 ? carrito : [
                    { producto: PRODUCTOS_INICIALES[0], cantidad: 2 },
                    { producto: PRODUCTOS_INICIALES[1], cantidad: 15 }
                  ]).map((item, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between bg-card hover:bg-secondary/30 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{item.producto.imagenEmoji}</span>
                        <div>
                          <p className="font-extrabold text-foreground">{item.producto.nombre}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {item.producto.campesino} • {item.producto.finca} ({item.producto.vereda})
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-foreground">
                          ${(item.producto.precioUnidad * item.cantidad).toLocaleString('es-CO')} COP
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {item.cantidad} {item.producto.unidadMedida} x ${item.producto.precioUnidad.toLocaleString('es-CO')}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Flete Consolidado Milk-Run */}
                  <div className="p-3 flex items-center justify-between bg-primary/5">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-extrabold text-primary">Servicio Flete Consolidado Milk-Run (Willys)</p>
                        <p className="text-[10px] text-muted-foreground">Ruta rural agrupada entre 3 fincas • Ahorro 45% en transporte</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-primary">$35.000 COP</p>
                      <p className="text-[10px] text-muted-foreground">Tarifa plana veredal</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Totales y CUFE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center pt-2">
                <div className="p-3 rounded-2xl bg-secondary/40 border border-border text-[11px] space-y-1">
                  <div className="flex items-center gap-2 text-foreground font-bold">
                    <QrCode className="h-4 w-4 text-primary" />
                    <span>CUFE Validado por DIAN:</span>
                  </div>
                  <p className="font-mono text-[9px] text-muted-foreground truncate">
                    d4a8e23fc910ba2b1e4f55a901d8492014fe2026004829910c2
                  </p>
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">
                    ✓ Documento tributario deducible de renta
                  </p>
                </div>

                <div className="space-y-1 text-right text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal Cosechas:</span>
                    <span className="font-bold text-foreground">
                      ${((carrito.length > 0 ? totalCarrito : 109000)).toLocaleString('es-CO')} COP
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Flete Consolidado:</span>
                    <span className="font-bold text-foreground">$35.000 COP</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-1.5 text-sm font-black">
                    <span className="text-foreground">Total a Pagar en Escrow:</span>
                    <span className="text-primary">
                      ${((carrito.length > 0 ? totalCarrito : 109000) + 35000).toLocaleString('es-CO')} COP
                    </span>
                  </div>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => window.print()}
                  className="flex-1 font-bold border-border"
                >
                  <Printer className="mr-2 h-4 w-4 text-primary" />
                  Imprimir Factura DIAN
                </Button>
                <Button
                  onClick={() => setModalFactura(false)}
                  className="flex-1 font-bold bg-primary text-primary-foreground"
                >
                  Cerrar
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

