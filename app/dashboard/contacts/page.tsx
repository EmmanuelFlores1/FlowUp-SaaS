
'use client'

import { useState } from 'react'
import {
  Search,
  Plus,
  Filter,
  LayoutGrid,
  List,
  MoreVertical,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  DollarSign,
  ShoppingCart,
  CalendarCheck,
  HeartPulse,
  User,
  Tag,
  X,
  ChevronDown,
  ArrowUpRight,
  Circle,
  Bot,
} from 'lucide-react'

type ViewMode = 'kanban' | 'table'
type RubroKey = 'cobranzas' | 'ventas' | 'servicios' | 'salud'

const rubroPipelines: Record<RubroKey, { stages: { id: string; name: string; color: string }[] }> = {
  cobranzas: {
    stages: [
      { id: 'vencida', name: 'Vencida', color: '#DC2626' },
      { id: 'contactada', name: 'Contactada', color: '#F97316' },
      { id: 'promesa', name: 'Promesa de pago', color: '#EAB308' },
      { id: 'pagada', name: 'Pagada', color: '#06D6A0' },
    ],
  },
  ventas: {
    stages: [
      { id: 'consulta', name: 'Consulta', color: '#3B82F6' },
      { id: 'cotizacion', name: 'Cotización', color: '#8B5CF6' },
      { id: 'negociacion', name: 'Negociación', color: '#EAB308' },
      { id: 'venta', name: 'Venta cerrada', color: '#06D6A0' },
    ],
  },
  servicios: {
    stages: [
      { id: 'consulta', name: 'Consulta', color: '#3B82F6' },
      { id: 'agendado', name: 'Turno agendado', color: '#8B5CF6' },
      { id: 'confirmado', name: 'Confirmado', color: '#EAB308' },
      { id: 'asistio', name: 'Asistió', color: '#06D6A0' },
    ],
  },
  salud: {
    stages: [
      { id: 'solicitud', name: 'Solicitud', color: '#3B82F6' },
      { id: 'asignado', name: 'Turno asignado', color: '#8B5CF6' },
      { id: 'confirmado', name: 'Confirmado', color: '#EAB308' },
      { id: 'atendido', name: 'Atendido', color: '#06D6A0' },
    ],
  },
}

const rubroFields: Record<RubroKey, { label: string; key: string }[]> = {
  cobranzas: [
    { label: 'Deuda', key: 'deuda' },
    { label: 'Vencimiento', key: 'vencimiento' },
    { label: 'Promesa', key: 'promesa' },
  ],
  ventas: [
    { label: 'Valor deal', key: 'valorDeal' },
    { label: 'Producto', key: 'producto' },
    { label: 'Probabilidad', key: 'probabilidad' },
  ],
  servicios: [
    { label: 'Próximo turno', key: 'proximoTurno' },
    { label: 'Servicio', key: 'servicio' },
    { label: 'Visitas', key: 'visitas' },
  ],
  salud: [
    { label: 'Próximo turno', key: 'proximoTurno' },
    { label: 'Especialidad', key: 'especialidad' },
    { label: 'Obra social', key: 'obraSocial' },
  ],
}

interface Contact {
  id: string
  name: string
  avatar: string
  email: string
  phone: string
  channel: string
  stage: string
  handler: 'ai' | 'human'
  lastActivity: string
  fields: Record<string, string>
}

const sampleContacts: Record<RubroKey, Contact[]> = {
  cobranzas: [
    { id: '1', name: 'María García', avatar: 'MG', email: 'maria@email.com', phone: '+54 11 1234-5678', channel: 'whatsapp', stage: 'vencida', handler: 'ai', lastActivity: 'Hace 2h', fields: { deuda: '$125.000', vencimiento: '15/08/2026', promesa: '-' } },
    { id: '2', name: 'Carlos López', avatar: 'CL', email: 'carlos@email.com', phone: '+54 11 2345-6789', channel: 'whatsapp', stage: 'vencida', handler: 'ai', lastActivity: 'Hace 5h', fields: { deuda: '$89.000', vencimiento: '01/09/2026', promesa: '-' } },
    { id: '3', name: 'Ana Martínez', avatar: 'AM', email: 'ana@email.com', phone: '+54 11 3456-7890', channel: 'email', stage: 'contactada', handler: 'human', lastActivity: 'Hace 1h', fields: { deuda: '$210.000', vencimiento: '20/07/2026', promesa: '-' } },
    { id: '4', name: 'Pedro Sánchez', avatar: 'PS', email: 'pedro@email.com', phone: '+54 11 4567-8901', channel: 'whatsapp', stage: 'contactada', handler: 'ai', lastActivity: 'Ayer', fields: { deuda: '$67.000', vencimiento: '10/08/2026', promesa: '-' } },
    { id: '5', name: 'Laura Fernández', avatar: 'LF', email: 'laura@email.com', phone: '+54 11 5678-9012', channel: 'whatsapp', stage: 'promesa', handler: 'human', lastActivity: 'Hace 3h', fields: { deuda: '$340.000', vencimiento: '05/07/2026', promesa: '20/09/2026' } },
    { id: '6', name: 'Diego Ruiz', avatar: 'DR', email: 'diego@email.com', phone: '+54 11 6789-0123', channel: 'instagram', stage: 'promesa', handler: 'ai', lastActivity: 'Hace 30min', fields: { deuda: '$156.000', vencimiento: '12/08/2026', promesa: '18/09/2026' } },
    { id: '7', name: 'Sofía Torres', avatar: 'ST', email: 'sofia@email.com', phone: '+54 11 7890-1234', channel: 'whatsapp', stage: 'pagada', handler: 'ai', lastActivity: 'Hace 1d', fields: { deuda: '$0', vencimiento: '-', promesa: 'Cumplida' } },
  ],
  ventas: [
    { id: '1', name: 'Roberto Díaz', avatar: 'RD', email: 'roberto@email.com', phone: '+54 11 1111-2222', channel: 'whatsapp', stage: 'consulta', handler: 'ai', lastActivity: 'Hace 1h', fields: { valorDeal: '$180.000', producto: 'Plan Pro', probabilidad: '30%' } },
    { id: '2', name: 'Valentina Paz', avatar: 'VP', email: 'vale@email.com', phone: '+54 11 3333-4444', channel: 'instagram', stage: 'consulta', handler: 'ai', lastActivity: 'Hace 3h', fields: { valorDeal: '$45.000', producto: 'Plan Starter', probabilidad: '20%' } },
    { id: '3', name: 'Martín Gómez', avatar: 'MG', email: 'martin@email.com', phone: '+54 11 5555-6666', channel: 'email', stage: 'cotizacion', handler: 'human', lastActivity: 'Hace 2h', fields: { valorDeal: '$540.000', producto: 'Enterprise', probabilidad: '60%' } },
    { id: '4', name: 'Lucía Herrera', avatar: 'LH', email: 'lucia@email.com', phone: '+54 11 7777-8888', channel: 'whatsapp', stage: 'negociacion', handler: 'human', lastActivity: 'Hace 30min', fields: { valorDeal: '$360.000', producto: 'Plan Pro x8', probabilidad: '75%' } },
    { id: '5', name: 'Tomás Acosta', avatar: 'TA', email: 'tomas@email.com', phone: '+54 11 9999-0000', channel: 'facebook', stage: 'venta', handler: 'ai', lastActivity: 'Ayer', fields: { valorDeal: '$45.000', producto: 'Plan Starter', probabilidad: '100%' } },
  ],
  servicios: [
    { id: '1', name: 'Camila Ríos', avatar: 'CR', email: 'camila@email.com', phone: '+54 11 1234-0000', channel: 'whatsapp', stage: 'consulta', handler: 'ai', lastActivity: 'Hace 1h', fields: { proximoTurno: '-', servicio: 'Corte + Color', visitas: '0' } },
    { id: '2', name: 'Nicolás Vega', avatar: 'NV', email: 'nico@email.com', phone: '+54 11 5678-0000', channel: 'whatsapp', stage: 'agendado', handler: 'ai', lastActivity: 'Hace 2h', fields: { proximoTurno: '19/09 10:00', servicio: 'Consulta', visitas: '3' } },
    { id: '3', name: 'Paula Méndez', avatar: 'PM', email: 'paula@email.com', phone: '+54 11 9012-0000', channel: 'instagram', stage: 'confirmado', handler: 'human', lastActivity: 'Hace 4h', fields: { proximoTurno: '18/09 15:30', servicio: 'Masajes', visitas: '12' } },
    { id: '4', name: 'Facundo Ortiz', avatar: 'FO', email: 'facu@email.com', phone: '+54 11 3456-0000', channel: 'whatsapp', stage: 'asistio', handler: 'ai', lastActivity: 'Ayer', fields: { proximoTurno: '-', servicio: 'Revisión', visitas: '8' } },
  ],
  salud: [
    { id: '1', name: 'Elena Morales', avatar: 'EM', email: 'elena@email.com', phone: '+54 11 1111-0000', channel: 'whatsapp', stage: 'solicitud', handler: 'ai', lastActivity: 'Hace 30min', fields: { proximoTurno: '-', especialidad: 'Cardiología', obraSocial: 'OSDE' } },
    { id: '2', name: 'Jorge Navarro', avatar: 'JN', email: 'jorge@email.com', phone: '+54 11 2222-0000', channel: 'whatsapp', stage: 'asignado', handler: 'ai', lastActivity: 'Hace 2h', fields: { proximoTurno: '20/09 09:00', especialidad: 'Traumatología', obraSocial: 'Swiss Medical' } },
    { id: '3', name: 'Marta Iglesias', avatar: 'MI', email: 'marta@email.com', phone: '+54 11 3333-0000', channel: 'email', stage: 'confirmado', handler: 'human', lastActivity: 'Hace 1h', fields: { proximoTurno: '18/09 11:30', especialidad: 'Dermatología', obraSocial: 'Galeno' } },
    { id: '4', name: 'Ricardo Peña', avatar: 'RP', email: 'ricardo@email.com', phone: '+54 11 4444-0000', channel: 'whatsapp', stage: 'atendido', handler: 'ai', lastActivity: 'Ayer', fields: { proximoTurno: '-', especialidad: 'Clínica médica', obraSocial: 'OSDE' } },
  ],
}

const channelColors: Record<string, string> = {
  whatsapp: '#25D366',
  instagram: '#E1306C',
  email: '#8B5CF6',
  facebook: '#1877F2',
}

const rubroIcons: Record<RubroKey, typeof DollarSign> = {
  cobranzas: DollarSign,
  ventas: ShoppingCart,
  servicios: CalendarCheck,
  salud: HeartPulse,
}

export default function ContactsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('kanban')
  const [selectedRubro, setSelectedRubro] = useState<RubroKey>('cobranzas')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  const pipeline = rubroPipelines[selectedRubro]
  const contacts = sampleContacts[selectedRubro]
  const fields = rubroFields[selectedRubro]

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStageContacts = (stageId: string) =>
    filteredContacts.filter(c => c.stage === stageId)

  const totalValue = (stageId: string) => {
    const stageContacts = getStageContacts(stageId)
    return stageContacts.length
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--flowup-slate)' }}>
            Contactos
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--flowup-text-soft)' }}>
            {filteredContacts.length} contactos · Pipeline de {pipeline.stages.length} etapas
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Vista toggle */}
          <div className="flex items-center gap-0.5 p-0.5 rounded-lg"
            style={{ backgroundColor: 'var(--flowup-bg-light-2)', border: '1px solid var(--flowup-border)' }}
          >
            <button
              onClick={() => setViewMode('kanban')}
              className="p-1.5 rounded-md transition-all"
              style={{
                backgroundColor: viewMode === 'kanban' ? 'white' : 'transparent',
                color: viewMode === 'kanban' ? 'var(--flowup-violet)' : 'var(--flowup-text-soft)',
                boxShadow: viewMode === 'kanban' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className="p-1.5 rounded-md transition-all"
              style={{
                backgroundColor: viewMode === 'table' ? 'white' : 'transparent',
                color: viewMode === 'table' ? 'var(--flowup-violet)' : 'var(--flowup-text-soft)',
                boxShadow: viewMode === 'table' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, var(--flowup-violet) 0%, var(--flowup-violet-dark) 100%)',
            }}
          >
            <Plus className="h-4 w-4" />
            Nuevo contacto
          </button>
        </div>
      </div>

      {/* Búsqueda + Rubro */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
            style={{ color: 'var(--flowup-text-soft)' }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar contactos..."
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
          {(Object.keys(rubroPipelines) as RubroKey[]).map((key) => {
            const Icon = rubroIcons[key]
            return (
              <button
                key={key}
                onClick={() => setSelectedRubro(key)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize"
                style={{
                  backgroundColor: selectedRubro === key ? 'white' : 'transparent',
                  color: selectedRubro === key ? rubroPipelines[key].stages[0].color : 'var(--flowup-text-soft)',
                  boxShadow: selectedRubro === key ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                }}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{key}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ===== VISTA KANBAN ===== */}
      {viewMode === 'kanban' && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {pipeline.stages.map((stage) => {
            const stageContacts = getStageContacts(stage.id)
            return (
              <div key={stage.id} className="flex-shrink-0 w-72">
                {/* Header de columna */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
                    <span className="text-sm font-bold" style={{ color: 'var(--flowup-slate)' }}>
                      {stage.name}
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
                      style={{ backgroundColor: `${stage.color}15`, color: stage.color }}
                    >
                      {stageContacts.length}
                    </span>
                  </div>
                </div>

                {/* Cards */}
                <div className="space-y-2 min-h-[200px] p-2 rounded-xl"
                  style={{ backgroundColor: 'var(--flowup-bg-light-2)' }}
                >
                  {stageContacts.map((contact) => (
                    <div
                      key={contact.id}
                      onClick={() => setSelectedContact(contact)}
                      className="rounded-xl p-3 cursor-pointer transition-all hover:shadow-md"
                      style={{ backgroundColor: 'white', border: '1px solid var(--flowup-border)' }}
                    >
                      {/* Header card */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                            style={{ backgroundColor: 'var(--flowup-violet)' }}
                          >
                            {contact.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--flowup-slate)' }}>
                              {contact.name}
                            </p>
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: channelColors[contact.channel] }} />
                              <span className="text-[10px]" style={{ color: 'var(--flowup-text-soft)' }}>
                                {contact.channel}
                              </span>
                            </div>
                          </div>
                        </div>
                        {contact.handler === 'ai' && (
                          <Bot className="h-3.5 w-3.5" style={{ color: 'var(--flowup-violet)' }} />
                        )}
                      </div>

                      {/* Campos del rubro */}
                      <div className="space-y-1">
                        {fields.map((field) => (
                          <div key={field.key} className="flex items-center justify-between">
                            <span className="text-[10px]" style={{ color: 'var(--flowup-text-soft)' }}>
                              {field.label}
                            </span>
                            <span className="text-[11px] font-semibold" style={{ color: 'var(--flowup-slate)' }}>
                              {contact.fields[field.key] || '-'}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-2 pt-2"
                        style={{ borderTop: '1px solid var(--flowup-border)' }}
                      >
                        <span className="text-[10px]" style={{ color: 'var(--flowup-text-soft)' }}>
                          {contact.lastActivity}
                        </span>
                        <div className="flex items-center gap-1">
                          <button className="p-1 rounded hover:bg-slate-100" style={{ color: 'var(--flowup-text-soft)' }}>
                            <MessageSquare className="h-3 w-3" />
                          </button>
                          <button className="p-1 rounded hover:bg-slate-100" style={{ color: 'var(--flowup-text-soft)' }}>
                            <Phone className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {stageContacts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Circle className="h-8 w-8 mb-2" style={{ color: 'var(--flowup-border)' }} />
                      <p className="text-[11px]" style={{ color: 'var(--flowup-text-soft)' }}>
                        Sin contactos
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ===== VISTA TABLA ===== */}
      {viewMode === 'table' && (
        <div className="rounded-2xl overflow-hidden"
          style={{ backgroundColor: 'white', border: '1px solid var(--flowup-border)' }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: 'var(--flowup-bg-light-2)' }}>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider"
                    style={{ color: 'var(--flowup-text-soft)' }}
                  >
                    Contacto
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider"
                    style={{ color: 'var(--flowup-text-soft)' }}
                  >
                    Etapa
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider"
                    style={{ color: 'var(--flowup-text-soft)' }}
                  >
                    Canal
                  </th>
                  {fields.map((field) => (
                    <th key={field.key} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider"
                      style={{ color: 'var(--flowup-text-soft)' }}
                    >
                      {field.label}
                    </th>
                  ))}
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider"
                    style={{ color: 'var(--flowup-text-soft)' }}
                  >
                    Gestión
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider"
                    style={{ color: 'var(--flowup-text-soft)' }}
                  >
                    Actividad
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => {
                  const stage = pipeline.stages.find(s => s.id === contact.stage)
                  return (
                    <tr key={contact.id}
                      onClick={() => setSelectedContact(contact)}
                      className="cursor-pointer transition-colors hover:bg-slate-50"
                      style={{ borderBottom: '1px solid var(--flowup-border)' }}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                            style={{ backgroundColor: 'var(--flowup-violet)' }}
                          >
                            {contact.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-semibold" style={{ color: 'var(--flowup-slate)' }}>
                              {contact.name}
                            </p>
                            <p className="text-[11px]" style={{ color: 'var(--flowup-text-soft)' }}>
                              {contact.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-1 rounded-full font-medium"
                          style={{ backgroundColor: `${stage?.color}15`, color: stage?.color }}
                        >
                          {stage?.name}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: channelColors[contact.channel] }} />
                          <span className="text-xs capitalize" style={{ color: 'var(--flowup-text-medium)' }}>
                            {contact.channel}
                          </span>
                        </div>
                      </td>
                      {fields.map((field) => (
                        <td key={field.key} className="px-4 py-3">
                          <span className="text-sm font-medium" style={{ color: 'var(--flowup-slate)' }}>
                            {contact.fields[field.key] || '-'}
                          </span>
                        </td>
                      ))}
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-1 rounded-full font-medium"
                          style={{
                            backgroundColor: contact.handler === 'ai' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(6, 214, 160, 0.1)',
                            color: contact.handler === 'ai' ? 'var(--flowup-violet)' : 'var(--flowup-mint-dark)',
                          }}
                        >
                          {contact.handler === 'ai' ? '🤖 IA' : '👤 Humano'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs" style={{ color: 'var(--flowup-text-soft)' }}>
                          {contact.lastActivity}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== MODAL: Detalle del contacto ===== */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl overflow-hidden" style={{ backgroundColor: 'white' }}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: '1px solid var(--flowup-border)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white"
                  style={{ backgroundColor: 'var(--flowup-violet)' }}
                >
                  {selectedContact.avatar}
                </div>
                <div>
                  <h2 className="text-lg font-bold" style={{ color: 'var(--flowup-slate)' }}>
                    {selectedContact.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: `${pipeline.stages.find(s => s.id === selectedContact.stage)?.color}15`,
                        color: pipeline.stages.find(s => s.id === selectedContact.stage)?.color,
                      }}
                    >
                      {pipeline.stages.find(s => s.id === selectedContact.stage)?.name}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: selectedContact.handler === 'ai' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(6, 214, 160, 0.1)',
                        color: selectedContact.handler === 'ai' ? 'var(--flowup-violet)' : 'var(--flowup-mint-dark)',
                      }}
                    >
                      {selectedContact.handler === 'ai' ? '🤖 IA' : '👤 Humano'}
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedContact(null)}
                className="p-1 rounded-lg hover:bg-slate-100"
                style={{ color: 'var(--flowup-text-soft)' }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Contenido */}
            <div className="px-6 py-5 space-y-5">
              {/* Info básica */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" style={{ color: 'var(--flowup-text-soft)' }} />
                  <span className="text-sm" style={{ color: 'var(--flowup-slate)' }}>{selectedContact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" style={{ color: 'var(--flowup-text-soft)' }} />
                  <span className="text-sm" style={{ color: 'var(--flowup-slate)' }}>{selectedContact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: channelColors[selectedContact.channel] }}
                  >
                    <span className="text-[7px] font-bold text-white">{selectedContact.channel[0].toUpperCase()}</span>
                  </div>
                  <span className="text-sm capitalize" style={{ color: 'var(--flowup-slate)' }}>{selectedContact.channel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" style={{ color: 'var(--flowup-text-soft)' }} />
                  <span className="text-sm" style={{ color: 'var(--flowup-slate)' }}>{selectedContact.lastActivity}</span>
                </div>
              </div>

              {/* Campos del rubro */}
              <div style={{ borderTop: '1px solid var(--flowup-border)', paddingTop: '1rem' }}>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-3"
                  style={{ color: 'var(--flowup-text-soft)' }}
                >
                  Datos de {selectedRubro}
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {fields.map((field) => (
                    <div key={field.key} className="p-3 rounded-xl" style={{ backgroundColor: 'var(--flowup-bg-light-2)' }}>
                      <span className="text-[10px] font-medium" style={{ color: 'var(--flowup-text-soft)' }}>
                        {field.label}
                      </span>
                      <p className="text-sm font-bold mt-0.5" style={{ color: 'var(--flowup-slate)' }}>
                        {selectedContact.fields[field.key] || '-'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cambiar etapa */}
              <div style={{ borderTop: '1px solid var(--flowup-border)', paddingTop: '1rem' }}>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-3"
                  style={{ color: 'var(--flowup-text-soft)' }}
                >
                  Mover a etapa
                </h4>
                <div className="flex gap-2">
                  {pipeline.stages.map((stage) => (
                    <button
                      key={stage.id}
                      className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
                      style={{
                        backgroundColor: selectedContact.stage === stage.id ? stage.color : `${stage.color}10`,
                        color: selectedContact.stage === stage.id ? 'white' : stage.color,
                        border: `1px solid ${stage.color}30`,
                      }}
                    >
                      {stage.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 flex gap-2"
              style={{ borderTop: '1px solid var(--flowup-border)' }}
            >
              <button
                onClick={() => setSelectedContact(null)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ border: '1px solid var(--flowup-border)', color: 'var(--flowup-text-medium)', backgroundColor: 'white' }}
              >
                Cerrar
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, var(--flowup-violet) 0%, var(--flowup-violet-dark) 100%)' }}
              >
                <MessageSquare className="h-4 w-4" />
                Ir al chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

