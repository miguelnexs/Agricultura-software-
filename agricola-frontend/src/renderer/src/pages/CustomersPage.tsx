import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Plus, Users, Building2, Phone, MapPin, Award } from 'lucide-react'

interface IntegranteFinca {
  nombre: string
  rol: string
  tipo: 'cuadrilla' | 'aliado'
  veredaUbicacion: string
  contacto: string
  especialidad: string
  estado: 'active' | 'inactive'
}

const INITIAL_DIRECTORY: IntegranteFinca[] = [
  {
    nombre: 'Don Hernando Valencia',
    rol: 'Jefe de Cuadrilla • Recolector Experto',
    tipo: 'cuadrilla',
    veredaUbicacion: 'Vereda El Paraíso, Salento (Quindío)',
    contacto: '312 489 2011 • Cédula Cafetera Activa',
    especialidad: 'Recolección selectiva café cereza (11 @ / día)',
    estado: 'active'
  },
  {
    nombre: 'Cooperativa de Caficultores del Quindío',
    rol: 'Punto de Compra & Almacén del Café',
    tipo: 'aliado',
    veredaUbicacion: 'Plaza Principal, Montenegro / Armenia',
    contacto: 'Línea Agro: (606) 741 1800',
    especialidad: 'Compra de pergamino seco con prima de origen',
    estado: 'active'
  },
  {
    nombre: 'Doña Luz Marina Giraldo',
    rol: 'Alimentadora de Cosecha & Casera',
    tipo: 'cuadrilla',
    veredaUbicacion: 'Casa Principal Hacienda La Esperanza',
    contacto: '310 854 3390',
    especialidad: 'Gastronomía montañera, sancocho y fiambres en hoja de bijao',
    estado: 'active'
  },
  {
    nombre: 'Jhon Jairo Patiño ("El Paisa")',
    rol: 'Podador, Desyerbador y Platanero',
    tipo: 'cuadrilla',
    veredaUbicacion: 'Vereda La Nubia, Circasia',
    contacto: '314 672 9104',
    especialidad: 'Manejo de guadaña, deshije de plátano y zoca de café',
    estado: 'active'
  },
  {
    nombre: 'Argemiro Ríos • Transporte en Jeep Willys',
    rol: 'Transportador Rural (Yipao Modelo 1964)',
    tipo: 'aliado',
    veredaUbicacion: 'Ruta Veredal El Paraíso - Pueblo',
    contacto: '320 511 7742',
    especialidad: 'Acarreo de cargas de café, plátano e insumos agrícolas',
    estado: 'active'
  },
  {
    nombre: 'Comercializadora Andina Hass S.A.S.',
    rol: 'Exportadora de Fruta Fresca',
    tipo: 'aliado',
    veredaUbicacion: 'Parque Agroindustrial, Pereira (Risaralda)',
    contacto: 'compras@andinahass.co',
    especialidad: 'Compra en finca de Aguacate Hass certificado Predio Exportador',
    estado: 'inactive'
  }
]

export function CustomersPage(): JSX.Element {
  const { t } = useTranslation()
  const [tab, setTab] = useState<'todos' | 'cuadrilla' | 'aliado'>('todos')
  const [registros, setRegistros] = useState<IntegranteFinca[]>(INITIAL_DIRECTORY)

  const filtrados =
    tab === 'todos' ? registros : registros.filter((item) => item.tipo === tab)

  const agregarJornaleroDemo = (): void => {
    const nuevo: IntegranteFinca = {
      nombre: `Recolector de Cosecha #${registros.length + 1}`,
      rol: 'Andariego / Recolector de Temporada',
      tipo: 'cuadrilla',
      veredaUbicacion: 'Cordillera Central (Andes Colombianos)',
      contacto: 'Registro en planilla de cuartel',
      especialidad: 'Cosecha de Café con Coco y Estopa',
      estado: 'active'
    }
    setRegistros([nuevo, ...registros])
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            Gente de Nuestra Tierra
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
            {t('customers.title')}
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {t('customers.list')}
          </p>
        </div>

        <Button onClick={agregarJornaleroDemo} className="font-bold shadow-sm">
          <Plus className="mr-2 h-4 w-4" /> {t('customers.add_new')}
        </Button>
      </div>

      {/* Pestañas de filtro */}
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={tab === 'todos' ? 'default' : 'outline'}
          onClick={() => setTab('todos')}
          className="rounded-full text-xs font-bold"
        >
          Todos ({registros.length})
        </Button>
        <Button
          size="sm"
          variant={tab === 'cuadrilla' ? 'default' : 'outline'}
          onClick={() => setTab('cuadrilla')}
          className="rounded-full text-xs font-bold"
        >
          <Users className="mr-1.5 h-3.5 w-3.5" />
          Cuadrilla y Jornaleros
        </Button>
        <Button
          size="sm"
          variant={tab === 'aliado' ? 'default' : 'outline'}
          onClick={() => setTab('aliado')}
          className="rounded-full text-xs font-bold"
        >
          <Building2 className="mr-1.5 h-3.5 w-3.5" />
          Cooperativas, Yipao y Compradores
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden"
      >
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="h-12 px-4 text-left align-middle font-bold text-foreground">
                  {t('customers.name')}
                </th>
                <th className="h-12 px-4 text-left align-middle font-bold text-foreground">
                  Vereda / Contacto
                </th>
                <th className="h-12 px-4 text-left align-middle font-bold text-foreground">
                  Oficio / Especialidad en Finca
                </th>
                <th className="h-12 px-4 text-right align-middle font-bold text-foreground">
                  {t('customers.status')}
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {filtrados.map((persona, i) => (
                <tr
                  key={i}
                  className="border-b border-border transition-colors hover:bg-secondary/30"
                >
                  <td className="p-4 align-middle">
                    <div className="font-bold text-foreground">{persona.nombre}</div>
                    <div className="text-xs text-primary font-medium mt-0.5">{persona.rol}</div>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="text-xs font-medium text-foreground flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                      {persona.veredaUbicacion}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Phone className="h-3 w-3 shrink-0" />
                      {persona.contacto}
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <span className="inline-flex items-center gap-1.5 text-xs text-foreground">
                      <Award className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                      {persona.especialidad}
                    </span>
                  </td>
                  <td className="p-4 align-middle text-right">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border ${
                        persona.estado === 'active'
                          ? 'bg-primary/15 text-primary border-primary/25'
                          : 'bg-secondary text-secondary-foreground border-border'
                      }`}
                    >
                      {persona.estado === 'active'
                        ? t('customers.active')
                        : t('customers.inactive')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
