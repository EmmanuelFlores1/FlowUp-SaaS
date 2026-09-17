
'use client'

import { useState } from 'react'
import {
  Search,
  CheckCircle,
  ExternalLink,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Star,
  MessageSquare,
  Mail,
  Phone,
  Globe,
  Calendar,
  Database,
} from 'lucide-react'

interface Integration {
  id: string
  name: string
  description: string
  icon: string
  color: string
  category: 'principal' | 'canales' | 'herramientas' | 'crm'
  status: 'connected' | 'available' | 'coming_soon'
  popular?: boolean
  features?: string[]
}

const integrations: Integration[] = [
  // PRINCIPAL
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    description: 'Conectá tu número de WhatsApp Business para enviar y recibir mensajes automáticos con tus clientes',
    icon: '💬',
    color: '#25D366',
    category: 'principal',
    status: 'available',
    popular: true,
    features: [
      'Mensajes automáticos con IA',
      'Plantillas de mensajes aprobadas',
      'Envío masivo programado',
      'Botones interactivos',
      'Catálogo de productos',
      'Lectura de estados (enviado, leído)',
    ],
  },
  // CANALES
  {
    id: 'instagram',
    name: 'Instagram DM',
    description: 'Respondé mensajes directos de Instagram desde FlowUp',
    icon: '📸',
    color: '#E1306C',
    category: 'canales',
    status: 'available',
    features: ['Mensajes directos', 'Respuestas a stories', 'Comentarios'],
  },
  {
    id: 'facebook',
    name: 'Facebook Messenger',
    description: 'Gestioná conversaciones de Messenger desde un solo lugar',
    icon: '👤',
    color: '#1877F2',
    category: 'canales',
    status: 'available',
    features: ['Messenger', 'Comentarios de página', 'Respuestas automáticas'],
  },
  {
    id: 'email',
    name: 'Email (Gmail / Outlook)',
    description: 'Integrá tu correo para gestionar emails como conversaciones',
    icon: '✉️',
    color: '#8B5CF6',
    category: 'canales',
    status: 'available',
    features: ['Gmail', 'Outlook', 'Seguimiento de apertura'],
  },
  {
    id: 'telegram',
    name: 'Telegram',
    description: 'Conectá un bot de Telegram para atender clientes',
    icon: '✈️',
    color: '#0088CC',
    category: 'canales',
    status: 'coming_soon',
  },
  {
    id: 'webchat',
    name: 'Web Chat',
    description: 'Widget de chat para tu sitio web con IA integrada',
    icon: '🌐',
    color: '#3B82F6',
    category: 'canales',
    status: 'coming_soon',
  },
  // HERRAMIENTAS
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Sincronizá turnos y citas con Google Calendar',
    icon: '📅',
    color: '#4285F4',
    category: 'herramientas',
    status: 'available',
    features: ['Sincronización de turnos', 'Disponibilidad en tiempo real'],
  },
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    description: 'Exportá datos y reportes automáticamente a planillas',
    icon: '📊',
    color: '#34A853',
    category: 'herramientas',
    status: 'available',
    features: ['Exportación automática', 'Reportes programados'],
  },
  {
    id: 'n8n',
    name: 'n8n',
    description: 'Conectá FlowUp con n8n para automatizaciones avanzadas',
    icon: '⚡',
    color: '#FF6D5A',
    category: 'herramientas',
    status: 'available',
    features: ['Webhooks', 'Triggers personalizados', 'Flujos complejos'],
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Conectá con +5000 apps a través de Zapier',
    icon: '🔗',
    color: '#FF4A00',
    category: 'herramientas',
    status: 'coming_soon',
  },
  // CRM
  {
    id: 'mercadopago',
    name: 'Mercado Pago',
    description: 'Recibí pagos y verificá cobros automáticamente',
    icon: '💰',
    color: '#00B1EA',
    category: 'crm',
    status: 'coming_soon',
  },
  {
    id: 'api',
    name: 'API REST',
    description: 'Conectá cualquier sistema externo con nuestra API',
    icon: '🔌',
    color: '#6366F1',
    category: 'crm',
    status: 'available',
    features: ['REST API completa', 'Webhooks', 'Documentación'],
  },
]

const categories = [
  { id: 'all', name: 'Todas' },
  { id: 'principal', name: '⭐ Principal' },
  { id: 'canales', name: 'Canales' },
  { id: 'herramientas', name: 'Herramientas' },
  { id: 'crm', name: 'Pagos & API' },
]

export default function IntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)

  const filteredIntegrations = integrations.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'all' || i.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const whatsapp = integrations.find(i => i.id === 'whatsapp')!
  const otherIntegrations = filteredIntegrations.filter(i => i.id !== 'whatsapp')

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--flowup-slate)' }}>
            Integraciones
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--flowup-text-soft)' }}>
            Conectá tus canales y herramientas favoritas
          </p>
        </div>
      </div>

      {/* ===== WHATSAPP HERO ===== */}
      {(activeCategory === 'all' || activeCategory === 'principal') && !searchQuery && (
        <div className="rounded-2xl p-6 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          }}
        >
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl">💬</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white">
                      WhatsApp Business
                    </h2>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                      style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                    >
                      INTEGRACIÓN PRINCIPAL
                    </span>
                  </div>
                  <p className="text-sm text-white/80 mt-0.5">
                    El canal más importante para tu negocio. Conectalo primero.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                {whatsapp.features?.map((feature) => (
                  <div key={feature} className="flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-white/80 flex-shrink-0" />
                    <span className="text-xs text-white/90">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                style={{ backgroundColor: 'white', color: '#128C7E' }}
              >
                Conectar WhatsApp
                <ArrowRight className="h-4 w-4" />
              </button>
              <div className="flex items-center justify-center gap-3 text-white/60">
                <div className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  <span className="text-[10px]">API Oficial</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span className="text-[10px]">5 min setup</span>
                </div>
              </div>
            </div>
          </div>

          {/* Decoración de fondo */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
            style={{ backgroundColor: 'white', transform: 'translate(30%, -30%)' }}
          />
        </div>
      )}

      {/* Búsqueda + Filtros */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
            style={{ color: 'var(--flowup-text-soft)' }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar integraciones..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
            style={{
              backgroundColor: 'white',
              border: '1px solid var(--flowup-border)',
              color: 'var(--flowup-slate)',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--flowup-violet)'
              e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--flowup-border)'
              e.target.style.boxShadow = 'none'
            }}
          />
        </div>

        <div className="flex items-center gap-1 p-1 rounded-xl"
          style={{ backgroundColor: 'var(--flowup-bg-light-2)', border: '1px solid var(--flowup-border)' }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap"
              style={{
                backgroundColor: activeCategory === cat.id ? 'white' : 'transparent',
                color: activeCategory === cat.id ? 'var(--flowup-violet)' : 'var(--flowup-text-soft)',
                boxShadow: activeCategory === cat.id ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de integraciones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {otherIntegrations.map((integration) => (
          <div
            key={integration.id}
            onClick={() => integration.status !== 'coming_soon' && setSelectedIntegration(integration)}
            className="rounded-2xl p-5 transition-all hover:shadow-md relative"
            style={{
              backgroundColor: 'white',
              border: '1px solid var(--flowup-border)',
              cursor: integration.status !== 'coming_soon' ? 'pointer' : 'default',
              opacity: integration.status === 'coming_soon' ? 0.6 : 1,
            }}
          >
            {integration.status === 'coming_soon' && (
              <span className="absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-full font-semibold"
                style={{ backgroundColor: 'var(--flowup-bg-light-2)', color: 'var(--flowup-text-soft)' }}
              >
                Próximamente
              </span>
            )}

            {integration.status === 'connected' && (
              <span className="absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-full font-semibold"
                style={{ backgroundColor: 'rgba(6, 214, 160, 0.1)', color: 'var(--flowup-mint-dark)' }}
              >
                ✅ Conectado
              </span>
            )}

            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ backgroundColor: `${integration.color}10` }}
              >
                {integration.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold" style={{ color: 'var(--flowup-slate)' }}>
                  {integration.name}
                </h3>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--flowup-text-soft)' }}>
                  {integration.description}
                </p>
              </div>
            </div>

            {integration.features && integration.status !== 'coming_soon' && (
              <div className="flex flex-wrap gap-1 mt-2">
                {integration.features.slice(0, 3).map((feature) => (
                  <span key={feature} className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: 'var(--flowup-bg-light-2)', color: 'var(--flowup-text-soft)' }}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}

            {integration.status === 'available' && (
              <button
                className="w-full mt-3 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all"
                style={{
                  backgroundColor: `${integration.color}10`,
                  color: integration.color,
                  border: `1px solid ${integration.color}30`,
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedIntegration(integration)
                }}
              >
                Conectar
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>

      {filteredIntegrations.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Search className="h-12 w-12 mb-3" style={{ color: 'var(--flowup-border)' }} />
          <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--flowup-slate)' }}>
            No se encontraron integraciones
          </h3>
          <p className="text-sm" style={{ color: 'var(--flowup-text-soft)' }}>
            Probá con otro término de búsqueda
          </p>
        </div>
      )}

      {/* ===== MODAL: Detalle de integración ===== */}
      {selectedIntegration && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl overflow-hidden" style={{ backgroundColor: 'white' }}>
            <div className="px-6 py-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                  style={{ backgroundColor: `${selectedIntegration.color}10` }}
                >
                  {selectedIntegration.icon}
                </div>
                <div>
                  <h2 className="text-lg font-bold" style={{ color: 'var(--flowup-slate)' }}>
                    {selectedIntegration.name}
                  </h2>
                  <p className="text-xs" style={{ color: 'var(--flowup-text-soft)' }}>
                    {selectedIntegration.description}
                  </p>
                </div>
              </div>

              {selectedIntegration.features && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: 'var(--flowup-text-soft)' }}
                  >
                    Funcionalidades
                  </h4>
                  <div className="space-y-1.5">
                    {selectedIntegration.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: selectedIntegration.color }} />
                        <span className="text-sm" style={{ color: 'var(--flowup-slate)' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 p-3 rounded-xl"
                style={{ backgroundColor: 'var(--flowup-bg-light-2)' }}
              >
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" style={{ color: 'var(--flowup-mint-dark)' }} />
                  <span className="text-xs font-medium" style={{ color: 'var(--flowup-slate)' }}>
                    Conexión segura y encriptada
                  </span>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 flex gap-2"
              style={{ borderTop: '1px solid var(--flowup-border)' }}
            >
              <button
                onClick={() => setSelectedIntegration(null)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ border: '1px solid var(--flowup-border)', color: 'var(--flowup-text-medium)', backgroundColor: 'white' }}
              >
                Cerrar
              </button>
              <button
                onClick={() => setSelectedIntegration(null)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: selectedIntegration.color }}
              >
                <Zap className="h-4 w-4" />
                Conectar ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

