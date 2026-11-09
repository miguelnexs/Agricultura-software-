import React, { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe, Calendar, User, Building2, Palette, Link as LinkIcon, HelpCircle, FileText,
  Loader2, CheckCircle2, Clock, Send, Upload, Package, CreditCard, Users, Ban, Settings, X, Eye, ArrowUpRight,
  Instagram, Facebook
} from 'lucide-react'
import { buildApiUrl } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'

interface WebsiteRequest {
  id: number
  business_name: string
  business_type: string
  primary_colors: string
  preferred_subdomain: string
  additional_notes: string
  site_type?: string
  design_style?: string
  sections?: string[]
  payment_methods?: string[]
  social_whatsapp?: string
  social_instagram?: string
  social_facebook?: string
  has_logo?: string
  inspiration_urls?: string
  proposals: string[]
  files: { name: string; url: string }[]
  questions: string[]
  answers: Record<string, string>
  status: string
  live_url: string
  created_at: string
  tenant_admin: string
  tenant_name: string
  enable_web_advertising: boolean
  enable_web_sync: boolean
  stats: {
    products: number
    sales: number
    clients: number
  }
}

const siteTypeLabels: Record<string, string> = {
  'e-commerce': 'Tienda Virtual 🛒',
  catalog: 'Catálogo Digital 📦',
  landing: 'Página Corporativa 🏢'
}

const designStyleLabels: Record<string, string> = {
  minimalist: 'Minimalista & Moderno 📱',
  premium: 'Elegante & Premium 💎',
  colorful: 'Divertido & Colorido 🎨',
  rustic: 'Rústico / Eco 🌿'
}

const logoLabels: Record<string, string> = {
  yes: 'Tiene Logo ✅',
  no_text_only: 'Texto Elegante ✍️',
  no_need_ai: 'Generar con IA 🤖'
}

const sectionLabels: Record<string, string> = {
  home: 'Inicio',
  about: 'Nosotros',
  catalog: 'Tienda',
  services: 'Servicios',
  contact: 'Contacto',
  faq: 'FAQ',
  reviews: 'Testimonios'
}

const paymentLabels: Record<string, string> = {
  whatsapp: 'Pedidos WhatsApp',
  bank_transfer: 'Transferencia',
  gateway: 'Pasarela Online'
}

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } }
const item = { hidden: { y: 12, opacity: 0 }, show: { y: 0, opacity: 1 } }

export function WebRequestsPage(): JSX.Element {
  const { token } = useAuth()
  const [requests, setRequests] = useState<WebsiteRequest[]>([])
  const [selectedRequest, setSelectedRequest] = useState<WebsiteRequest | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploadingId, setUploadingId] = useState<number | null>(null)
  
  const fetchRequests = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(buildApiUrl('webconfig/website-request/'), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.ok) {
        const data = await res.json()
        const list = Array.isArray(data) ? data : []
        setRequests(list)
        
        // If a request is currently selected, update its data as well
        if (selectedRequest) {
          const updated = list.find((r: WebsiteRequest) => r.id === selectedRequest.id)
          if (updated) {
            setSelectedRequest(updated)
          }
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [token, selectedRequest])

  useEffect(() => {
    fetchRequests()
  }, [token]) // run on mount or token change

  const updateRequest = async (id: number, fields: any, isFormData = false) => {
    try {
      let body
      const headers: Record<string, string> = {
        'Authorization': `Bearer ${token}`
      }

      if (isFormData) {
        body = fields
      } else {
        headers['Content-Type'] = 'application/json'
        body = JSON.stringify({ id, ...fields })
      }

      const res = await fetch(buildApiUrl('webconfig/website-request/'), {
        method: 'PATCH',
        headers,
        body
      })
      if (res.ok) {
        // Refresh local data
        const res2 = await fetch(buildApiUrl('webconfig/website-request/'), {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        if (res2.ok) {
          const list = await res2.json()
          setRequests(list)
          const updated = list.find((r: WebsiteRequest) => r.id === id)
          if (updated) {
            setSelectedRequest(updated)
          }
        }
        return true
      }
    } catch (err) {
      console.error(err)
    }
    return false
  }

  const handleFileUpload = async (id: number, file: File) => {
    setUploadingId(id)
    const formData = new FormData()
    formData.append('id', id.toString())
    formData.append('file', file)
    await updateRequest(id, formData, true)
    setUploadingId(null)
  }

  const addQuestion = async (id: number, currentQuestions: string[], text: string) => {
    if (!text.trim()) return
    const questions = [...(currentQuestions || []), text]
    await updateRequest(id, { questions })
  }

  const addProposal = async (id: number, currentProposals: string[], text: string) => {
    if (!text.trim()) return
    const proposals = [...(currentProposals || []), text]
    await updateRequest(id, { proposals })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase"><Clock className="w-3 h-3" /> Pendiente</span>
      case 'in_progress':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase"><Loader2 className="w-3 h-3 animate-spin" /> En Proceso</span>
      case 'completed':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase"><CheckCircle2 className="w-3 h-3" /> Activo</span>
      default:
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground text-xs font-bold uppercase">{status}</span>
    }
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 min-h-[calc(100vh-6rem)] flex flex-col justify-between">
      
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Globe className="w-6 h-6 text-primary" /> Solicitudes Web
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">Control de despliegue, sincronización y propuestas de páginas web para clientes</p>
        </div>
        <button 
          onClick={fetchRequests}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-sm font-semibold transition-all duration-200"
        >
          Sincronizar
        </button>
      </motion.div>

      {/* Main Content (Table) */}
      <motion.div variants={item} className="flex-1 mt-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 glass-card border border-white/5">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
            <p className="text-sm text-muted-foreground">Obteniendo solicitudes de páginas web...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="glass-card p-20 text-center text-muted-foreground border border-white/5">
            No hay solicitudes web registradas actualmente.
          </div>
        ) : (
          <div className="glass-card border border-white/5 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 bg-white/3">
                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Cliente / Negocio</th>
                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Tipo de Negocio</th>
                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Subdominio / Enlace</th>
                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Estado</th>
                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Fecha Solicitud</th>
                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Actividad Tienda</th>
                    <th className="px-5 py-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr 
                      key={req.id} 
                      className="border-b border-white/3 hover:bg-white/2 transition-colors cursor-pointer group"
                      onClick={() => setSelectedRequest(req)}
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary/30 to-purple-600/20 flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-white group-hover:text-primary transition-colors">{req.business_name}</p>
                            <p className="text-xs text-muted-foreground font-mono">ID: {req.tenant_name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground">{req.business_type}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex flex-col">
                          <span className="text-xs text-cyan-400 font-semibold">{req.preferred_subdomain || 'auto'}.asenting.com</span>
                          {req.live_url && (
                            <a 
                              href={req.live_url} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="text-[10px] text-muted-foreground hover:text-white flex items-center gap-1 underline mt-0.5"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <LinkIcon className="w-2.5 h-2.5" /> Ver web <ArrowUpRight className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3.5">{getStatusBadge(req.status)}</td>
                      <td className="px-5 py-3.5 text-xs text-muted-foreground">
                        {new Date(req.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>📦 {req.stats?.products || 0}</span>
                          <span>🛒 {req.stats?.sales || 0}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSelectedRequest(req) }}
                          className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-1 ml-auto"
                        >
                          <Eye className="w-3.5 h-3.5" /> Ver Detalle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>

      {/* Slide-out Side Drawer Panel */}
      <AnimatePresence>
        {selectedRequest && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-end"
            onClick={() => setSelectedRequest(null)}
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-2xl bg-[#090b11] border-l border-white/10 h-full overflow-y-auto thin-scrollbar flex flex-col shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-white/5 px-6 py-5 shrink-0 sticky top-0 bg-[#090b11]/90 backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/25">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white leading-none">{selectedRequest.business_name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">ID: {selectedRequest.tenant_name} • Admin: {selectedRequest.tenant_admin}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedRequest(null)} 
                  className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 p-6 space-y-6">
                
                {/* Status and KPIs */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/3 border border-white/5 rounded-xl p-4 flex flex-col justify-center">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Estado de Solicitud</span>
                    <div>{getStatusBadge(selectedRequest.status)}</div>
                  </div>
                  <div className="bg-white/3 border border-white/5 rounded-xl p-4 flex flex-col justify-center">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Fecha de Solicitud</span>
                    <span className="text-xs font-semibold text-white flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      {new Date(selectedRequest.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Domain & URL Config */}
                <div className="bg-white/3 border border-white/5 rounded-xl p-5 space-y-4">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" /> Enlaces y Dominios
                  </h4>
                  <div className="text-xs space-y-3">
                    <div>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Subdominio Reservado:</p>
                      <span className="font-bold text-white text-sm">{selectedRequest.preferred_subdomain || 'auto'}.asenting.com</span>
                    </div>
                    <div className="flex flex-col gap-1.5 pt-2 border-t border-white/5">
                      <label className="text-[10px] text-muted-foreground font-bold uppercase">URL de Producción (Enlace Directo):</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          defaultValue={selectedRequest.live_url || ''}
                          placeholder="https://su-tienda.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-primary/50 text-white pr-10"
                          onBlur={(e) => updateRequest(selectedRequest.id, { live_url: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              updateRequest(selectedRequest.id, { live_url: (e.target as HTMLInputElement).value })
                              ;(e.target as any).blur()
                            }
                          }}
                        />
                        <LinkIcon className="w-3.5 h-3.5 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Control Toggles */}
                <div className="bg-white/3 border border-white/5 rounded-xl p-5 space-y-4">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Settings className="w-3.5 h-3.5" /> Configuración del Sitio
                  </h4>
                  <div className="space-y-4 text-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">Publicidad de Asenting en Web</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Muestra banners promocionales de Asenting en el pie de página</p>
                      </div>
                      <button 
                        onClick={() => updateRequest(selectedRequest.id, { enable_web_advertising: !selectedRequest.enable_web_advertising })}
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${selectedRequest.enable_web_advertising ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/10' : 'bg-white/5 border border-white/10 text-muted-foreground'}`}
                      >
                        {selectedRequest.enable_web_advertising ? 'Activa' : 'Pausada'}
                      </button>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <div>
                        <p className="font-semibold text-white">Sincronización en Tiempo Real</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Sincroniza stock y ventas de la tienda física con la web</p>
                      </div>
                      <button 
                        onClick={() => updateRequest(selectedRequest.id, { enable_web_sync: !selectedRequest.enable_web_sync })}
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${selectedRequest.enable_web_sync ? 'bg-primary text-white shadow-lg shadow-primary/10' : 'bg-red-500/20 border border-red-500/30 text-red-400'}`}
                      >
                        {selectedRequest.enable_web_sync ? 'Activa' : 'Pausada'}
                      </button>
                    </div>
                {/* Preferred Aesthetics & Site Details */}
                <div className="bg-white/3 border border-white/5 rounded-xl p-5 space-y-4">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5" /> Detalle del Sitio Solicitado
                  </h4>
                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Tipo de Sitio:</p>
                        <p className="font-semibold text-white">{siteTypeLabels[selectedRequest.site_type || ''] || selectedRequest.site_type || 'No especificado'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Estilo Estético:</p>
                        <p className="font-semibold text-white">{designStyleLabels[selectedRequest.design_style || ''] || selectedRequest.design_style || 'No especificado'}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/5">
                      <div>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Identidad de Logo:</p>
                        <p className="font-semibold text-white">{logoLabels[selectedRequest.has_logo || ''] || selectedRequest.has_logo || 'No especificado'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Paleta de Colores:</p>
                        <p className="font-semibold text-white">{selectedRequest.primary_colors || 'Por defecto'}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/5">
                      <p className="text-[10px] text-muted-foreground font-bold uppercase mb-2">Secciones Solicitadas:</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedRequest.sections && selectedRequest.sections.length > 0 ? (
                          selectedRequest.sections.map((sec) => (
                            <span key={sec} className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary rounded text-[10px] font-bold">
                              {sectionLabels[sec] || sec}
                            </span>
                          ))
                        ) : (
                          <span className="text-muted-foreground italic">Ninguna seleccionada</span>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/5">
                      <p className="text-[10px] text-muted-foreground font-bold uppercase mb-2">Métodos de Pago:</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedRequest.payment_methods && selectedRequest.payment_methods.length > 0 ? (
                          selectedRequest.payment_methods.map((p) => (
                            <span key={p} className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold">
                              {paymentLabels[p] || p}
                            </span>
                          ))
                        ) : (
                          <span className="text-muted-foreground italic">Ninguno seleccionado</span>
                        )}
                      </div>
                    </div>

                    {(selectedRequest.social_whatsapp || selectedRequest.social_instagram || selectedRequest.social_facebook) && (
                      <div className="pt-3 border-t border-white/5 space-y-1.5">
                        <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Canales & Redes:</p>
                        {selectedRequest.social_whatsapp && (
                          <p className="text-xs text-white/90 font-medium flex items-center gap-1.5">
                            🟢 <b>WhatsApp:</b> {selectedRequest.social_whatsapp}
                          </p>
                        )}
                        {selectedRequest.social_instagram && (
                          <p className="text-xs text-white/90 font-medium flex items-center gap-1.5">
                            📸 <b>Instagram:</b> {selectedRequest.social_instagram}
                          </p>
                        )}
                        {selectedRequest.social_facebook && (
                          <p className="text-xs text-white/90 font-medium flex items-center gap-1.5">
                            👤 <b>Facebook:</b> {selectedRequest.social_facebook}
                          </p>
                        )}
                      </div>
                    )}

                    {selectedRequest.inspiration_urls && (
                      <div className="pt-3 border-t border-white/5">
                        <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Inspiración / Referencias:</p>
                        <p className="text-xs text-white/90 leading-relaxed break-words font-medium">{selectedRequest.inspiration_urls}</p>
                      </div>
                    )}

                    {selectedRequest.additional_notes && (
                      <div className="pt-3 border-t border-white/5">
                        <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Notas adicionales:</p>
                        <p className="font-medium text-white/90 italic leading-relaxed">{selectedRequest.additional_notes}</p>
                      </div>
                    )}
                  </div>
                </div>
                  </div>
                </div>

                {/* Upload Logos/Images */}
                <div className="bg-white/3 border border-white/5 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" /> Archivos y Logotipos
                    </h4>
                    <label className="cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 text-white p-1.5 rounded-lg transition-colors flex items-center gap-1 text-[11px] font-bold">
                      <Upload className="w-3.5 h-3.5" /> Subir
                      <input 
                        type="file" className="hidden" 
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(selectedRequest.id, e.target.files[0])}
                      />
                    </label>
                  </div>
                  <div className="space-y-2">
                    {(!selectedRequest.files || selectedRequest.files.length === 0) ? (
                      <p className="text-xs text-muted-foreground italic py-1">No hay archivos adjuntos.</p>
                    ) : (
                      selectedRequest.files.map((file, idx) => (
                        <a 
                          key={idx} href={file.url} target="_blank" rel="noreferrer"
                          className="flex items-center justify-between bg-white/5 hover:bg-white/8 p-2.5 rounded-xl border border-white/5 text-xs text-primary hover:underline transition-colors"
                        >
                          <span className="flex items-center gap-2 truncate">
                            <FileText className="w-3.5 h-3.5" />
                            {file.name}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      ))
                    )}
                    {uploadingId === selectedRequest.id && (
                      <div className="flex items-center gap-2 text-xs text-primary animate-pulse py-1">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Subiendo archivo a la nube...
                      </div>
                    )}
                  </div>
                </div>

                {/* Design Proposals */}
                <div className="bg-white/3 border border-white/5 rounded-xl p-5 flex flex-col h-[320px]">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5" /> Propuestas de Diseño
                  </h4>
                  <div className="flex-1 space-y-2.5 overflow-y-auto thin-scrollbar pr-1 mb-4 text-xs">
                    {(!selectedRequest.proposals || selectedRequest.proposals.length === 0) ? (
                      <p className="text-xs text-muted-foreground italic py-1">Sin propuestas enviadas.</p>
                    ) : (
                      selectedRequest.proposals.map((prop, idx) => (
                        <div key={idx} className="bg-indigo-500/5 p-3 rounded-xl border border-indigo-500/10 text-white/80 relative">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 absolute -left-1 -top-1" />
                          <span className="break-words">{prop}</span>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="relative shrink-0">
                    <input 
                      type="text" 
                      placeholder="Nueva propuesta (ej. Propuesta 1 lista en /web)..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-500/50 pr-10 text-white"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          addProposal(selectedRequest.id, selectedRequest.proposals || [], (e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = ''
                        }
                      }}
                    />
                    <button 
                      onClick={(e) => {
                        const input = (e.currentTarget.previousSibling as HTMLInputElement)
                        addProposal(selectedRequest.id, selectedRequest.proposals || [], input.value)
                        input.value = ''
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-white p-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Questions and Answers */}
                <div className="bg-white/3 border border-white/5 rounded-xl p-5 flex flex-col h-[320px]">
                  <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" /> Preguntas al Cliente
                  </h4>
                  <div className="flex-1 space-y-3 overflow-y-auto thin-scrollbar pr-1 mb-4 text-xs">
                    {(!selectedRequest.questions || selectedRequest.questions.length === 0) ? (
                      <p className="text-xs text-muted-foreground italic py-1">Haz una pregunta si necesitas aclarar logos o colores.</p>
                    ) : (
                      selectedRequest.questions.map((q, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="bg-purple-500/10 p-2.5 rounded-xl font-bold text-purple-400 border border-purple-500/10">
                            Pregunta: {q}
                          </div>
                          {selectedRequest.answers?.[q] ? (
                            <div className="bg-emerald-500/10 p-2.5 rounded-xl font-medium text-emerald-400 border border-emerald-500/10 ml-3">
                              Respuesta: {selectedRequest.answers[q]}
                            </div>
                          ) : (
                            <div className="text-[10px] text-muted-foreground italic ml-3">Esperando respuesta del cliente...</div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                  <div className="relative shrink-0">
                    <input 
                      type="text" 
                      placeholder="Preguntar algo..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-purple-500/50 pr-10 text-white"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          addQuestion(selectedRequest.id, selectedRequest.questions || [], (e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = ''
                        }
                      }}
                    />
                    <button 
                      onClick={(e) => {
                        const input = (e.currentTarget.previousSibling as HTMLInputElement)
                        addQuestion(selectedRequest.id, selectedRequest.questions || [], input.value)
                        input.value = ''
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-400 hover:text-white p-1"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Drawer Footer Actions */}
              <div className="border-t border-white/5 px-6 py-5 shrink-0 bg-[#090b11]/90 backdrop-blur-md sticky bottom-0 z-10 flex items-center justify-between">
                <div>
                  {selectedRequest.status === 'pending' ? (
                    <button 
                      onClick={() => updateRequest(selectedRequest.id, { status: 'in_progress' })}
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white uppercase tracking-wider transition-colors"
                    >
                      Marcar en Proceso
                    </button>
                  ) : (
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">En curso</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                      if (window.confirm('¿Confirmas que la web está lista? Esto activará la tienda web y habilitará todas sus secciones en el dashboard del cliente.')) {
                        updateRequest(selectedRequest.id, { status: 'completed' })
                      }
                    }}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/10 hover:scale-102 active:scale-98 transition-all uppercase tracking-wider"
                  >
                    Activar y Finalizar Web
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </motion.div>
  )
}
export default WebRequestsPage
