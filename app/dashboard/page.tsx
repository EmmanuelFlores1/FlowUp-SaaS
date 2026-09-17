
'use client'

import { useState } from 'react'
import {
  DollarSign,
  ShoppingCart,
  CalendarCheck,
  HeartPulse,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  MessageSquare,
  Users,
  Clock,
  Zap,
  Target,
  Percent,
  Ban,
  Handshake,
  Receipt,
  UserCheck,
  CalendarX,
  Stethoscope,
  Activity,
  BarChart3,
  Bot,
} from 'lucide-react'

const rubroConfig = {
  cobranzas: {
    name: 'Cobranzas',
    icon: DollarSign,
    color: '#8B5CF6',
    stats: [
      { name: 'Recupero total', value: '$2.450.000', change: '+18.3%', trend: 'up', icon: DollarSign, iconBg: 'rgba(139, 92, 246, 0.1)', iconColor: '#8B5CF6', detail: 'este mes' },
      { name: 'Promesas cumplidas', value: '73%', change: '+5.2%', trend: 'up', icon: Handshake, iconBg: 'rgba(6, 214, 160, 0.1)', iconColor: '#06D6A0', detail: 'vs mes anterior' },
      { name: 'Contactabilidad', value: '68%', change: '+12.1%', trend: 'up', icon: Users, iconBg: 'rgba(59, 130, 246, 0.1)', iconColor: '#3B82F6', detail: 'deudores contactados' },
      { name: 'Mora promedio', value: '45 días', change: '-8.5%', trend: 'up', icon: Clock, iconBg: 'rgba(234, 179, 8, 0.1)', iconColor: '#EAB308', detail: 'reducción vs anterior' },
    ],
    pipeline: [
      { stage: 'Vencida', count: 234, amount: '$5.200.000', color: '#DC2626' },
      { stage: 'Contactada', count: 156, amount: '$3.100.000', color: '#F97316' },
      { stage: 'Promesa de pago', count: 89, amount: '$1.800.000', color: '#EAB308' },
      { stage: 'Pagada', count: 67, amount: '$2.450.000', color: '#06D6A0' },
    ],
    aiMetrics: {
      conversationsHandled: 312,
      avgResponseTime: '8 seg',
      resolutionRate: '78%',
      promisesGenerated: 45,
    },
  },
  ventas: {
    name: 'Ventas',
    icon: ShoppingCart,
    color: '#06D6A0',
    stats: [
      { name: 'Ventas cerradas', value: '$1.890.000', change: '+22.4%', trend: 'up', icon: DollarSign, iconBg: 'rgba(6, 214, 160, 0.1)', iconColor: '#06D6A0', detail: 'este mes' },
      { name: 'Tasa de conversión', value: '12.8%', change: '+3.1%', trend: 'up', icon: Target, iconBg: 'rgba(139, 92, 246, 0.1)', iconColor: '#8B5CF6', detail: 'leads → ventas' },
      { name: 'Ticket promedio', value: '$45.000', change: '+8.7%', trend: 'up', icon: Receipt, iconBg: 'rgba(59, 130, 246, 0.1)', iconColor: '#3B82F6', detail: 'por venta' },
      { name: 'Carritos recuperados', value: '34', change: '+15.2%', trend: 'up', icon: ShoppingCart, iconBg: 'rgba(234, 179, 8, 0.1)', iconColor: '#EAB308', detail: 'este mes' },
    ],
    pipeline: [
      { stage: 'Consulta', count: 189, amount: '$8.500.000', color: '#3B82F6' },
      { stage: 'Cotización', count: 78, amount: '$3.500.000', color: '#8B5CF6' },
      { stage: 'Negociación', count: 34, amount: '$1.530.000', color: '#EAB308' },
      { stage: 'Venta cerrada', count: 42, amount: '$1.890.000', color: '#06D6A0' },
    ],
    aiMetrics: {
      conversationsHandled: 456,
      avgResponseTime: '5 seg',
      resolutionRate: '65%',
      promisesGenerated: 0,
    },
  },
  servicios: {
    name: 'Servicios / Turnos',
    icon: CalendarCheck,
    color: '#3B82F6',
    stats: [
      { name: 'Turnos ocupados', value: '87%', change: '+9.3%', trend: 'up', icon: CalendarCheck, iconBg: 'rgba(59, 130, 246, 0.1)', iconColor: '#3B82F6', detail: 'tasa de ocupación' },
      { name: 'Ausencias reducidas', value: '62%', change: '+18.5%', trend: 'up', icon: UserCheck, iconBg: 'rgba(6, 214, 160, 0.1)', iconColor: '#06D6A0', detail: 'vs sin recordatorio' },
      { name: 'Turnos confirmados', value: '156', change: '+12.1%', trend: 'up', icon: Handshake, iconBg: 'rgba(139, 92, 246, 0.1)', iconColor: '#8B5CF6', detail: 'esta semana' },
      { name: 'Cancelaciones', value: '8', change: '-25.0%', trend: 'up', icon: CalendarX, iconBg: 'rgba(234, 179, 8, 0.1)', iconColor: '#EAB308', detail: 'esta semana' },
    ],
    pipeline: [
      { stage: 'Consulta', count: 89, amount: '', color: '#3B82F6' },
      { stage: 'Turno agendado', count: 156, amount: '', color: '#8B5CF6' },
      { stage: 'Confirmado', count: 134, amount: '', color: '#EAB308' },
      { stage: 'Asistió', count: 128, amount: '', color: '#06D6A0' },
    ],
    aiMetrics: {
      conversationsHandled: 278,
      avgResponseTime: '3 seg',
      resolutionRate: '89%',
      promisesGenerated: 0,
    },
  },
  salud: {
    name: 'Salud',
    icon: HeartPulse,
    color: '#EF4444',
    stats: [
      { name: 'Turnos confirmados', value: '234', change: '+14.2%', trend: 'up', icon: CalendarCheck, iconBg: 'rgba(59, 130, 246, 0.1)', iconColor: '#3B82F6', detail: 'este mes' },
      { name: 'Ausentismo', value: '8.5%', change: '-32.0%', trend: 'up', icon: CalendarX, iconBg: 'rgba(6, 214, 160, 0.1)', iconColor: '#06D6A0', detail: 'reducción vs anterior' },
      { name: 'Pacientes activos', value: '1,247', change: '+6.8%', trend: 'up', icon: Users, iconBg: 'rgba(139, 92, 246, 0.1)', iconColor: '#8B5CF6', detail: 'en seguimiento' },
      { name: 'Tiempo de espera', value: '2.3 días', change: '-15.4%', trend: 'up', icon: Clock, iconBg: 'rgba(234, 179, 8, 0.1)', iconColor: '#EAB308', detail: 'para turno' },
    ],
    pipeline: [
      { stage: 'Solicitud', count: 67, amount: '', color: '#3B82F6' },
      { stage: 'Turno asignado', count: 234, amount: '', color: '#8B5CF6' },
      { stage: 'Confirmado', count: 198, amount: '', color: '#EAB308' },
      { stage: 'Atendido', count: 187, amount: '', color: '#06D6A0' },
    ],
    aiMetrics: {
      conversationsHandled: 389,
      avgResponseTime: '4 seg',
      resolutionRate: '92%',
      promisesGenerated: 0,
    },
  },
}

type RubroKey = keyof typeof rubroConfig

const recentActivity = [
  { text: 'María García respondió por WhatsApp', time: 'Hace 5 min', type: 'message' },
  { text: 'IA resolvió consulta de Carlos López', time: 'Hace 12 min', type: 'ai' },
  { text: 'Nuevo contacto: Laura Fernández', time: 'Hace 25 min', type: 'new' },
  { text: 'Automatización "Recordatorio" ejecutada', time: 'Hace 30 min', type: 'automation' },
  { text: 'Pedro Sánchez cambió a etapa "Negociación"', time: 'Hace 45 min', type: 'pipeline' },
]

export default function DashboardPage() {
  const [selectedRubro, setSelectedRubro] = useState<RubroKey>('cobranzas')

  const rubro = rubroConfig[selectedRubro]
  const maxPipelineCount = Math.max(...rubro.pipeline.map(p => p.count))

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--flowup-slate)' }}>
            Dashboard
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--flowup-text-soft)' }}>
            Métricas de resultado · {rubro.name}
          </p>
        </div>

        {/* Selector de rubro */}
        <div className="flex items-center gap-1 p-1 rounded-xl"
          style={{ backgroundColor: 'var(--flowup-bg-light-2)', border: '1px solid var(--flowup-border)' }}
        >
          {(Object.keys(rubroConfig) as RubroKey[]).map((key) => {
            const r = rubroConfig[key]
            return (
              <button
                key={key}
                onClick={() => setSelectedRubro(key)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  backgroundColor: selectedRubro === key ? 'white' : 'transparent',
                  color: selectedRubro === key ? r.color : 'var(--flowup-text-soft)',
                  boxShadow: selectedRubro === key ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                }}
              >
                <r.icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{r.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {rubro.stats.map((stat) => (
          <div
            key={stat.name}
            className="rounded-2xl p-5 hover:shadow-md transition-shadow"
            style={{ backgroundColor: 'white', border: '1px solid var(--flowup-border)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl" style={{ backgroundColor: stat.iconBg }}>
                <stat.icon className="h-5 w-5" style={{ color: stat.iconColor }} />
              </div>
              <span className="text-xs font-semibold flex items-center gap-0.5"
                style={{ color: stat.trend === 'up' ? 'var(--flowup-mint-dark)' : 'var(--flowup-red)' }}
              >
                {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold" style={{ color: 'var(--flowup-slate)' }}>
              {stat.value}
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--flowup-text-soft)' }}>
              {stat.name} · {stat.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Fila: Pipeline + IA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pipeline */}
        <div className="lg:col-span-2 rounded-2xl p-5"
          style={{ backgroundColor: 'white', border: '1px solid var(--flowup-border)' }}
        >
          <h3 className="text-base font-bold mb-1" style={{ color: 'var(--flowup-slate)' }}>
            Pipeline · {rubro.name}
          </h3>
          <p className="text-xs mb-5" style={{ color: 'var(--flowup-text-soft)' }}>
            Estado actual del embudo
          </p>

          <div className="space-y-4">
            {rubro.pipeline.map((stage, index) => (
              <div key={stage.stage}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
                    <span className="text-sm font-semibold" style={{ color: 'var(--flowup-slate)' }}>
                      {stage.stage}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold" style={{ color: 'var(--flowup-slate)' }}>
                      {stage.count}
                    </span>
                    {stage.amount && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${stage.color}15`, color: stage.color }}
                      >
                        {stage.amount}
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--flowup-bg-light-2)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(stage.count / maxPipelineCount) * 100}%`,
                      backgroundColor: stage.color,
                      opacity: 0.8,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Flecha de flujo */}
          <div className="flex items-center justify-center gap-2 mt-5 pt-4"
            style={{ borderTop: '1px solid var(--flowup-border)' }}
          >
            {rubro.pipeline.map((stage, index) => (
              <div key={stage.stage} className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ backgroundColor: stage.color }}
                  >
                    {stage.count}
                  </div>
                  <span className="text-[9px] mt-1 text-center max-w-[60px]" style={{ color: 'var(--flowup-text-soft)' }}>
                    {stage.stage}
                  </span>
                </div>
                {index < rubro.pipeline.length - 1 && (
                  <div className="text-xs mb-4" style={{ color: 'var(--flowup-border)' }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Rendimiento IA */}
        <div className="rounded-2xl p-5"
          style={{ backgroundColor: 'white', border: '1px solid var(--flowup-border)' }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Bot className="h-5 w-5" style={{ color: 'var(--flowup-violet)' }} />
            <h3 className="text-base font-bold" style={{ color: 'var(--flowup-slate)' }}>
              FlowUp IA
            </h3>
          </div>
          <p className="text-xs mb-5" style={{ color: 'var(--flowup-text-soft)' }}>
            Rendimiento del asistente
          </p>

          <div className="space-y-4">
            <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(139, 92, 246, 0.04)', border: '1px solid rgba(139, 92, 246, 0.1)' }}>
              <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--flowup-text-soft)' }}>
                Conversaciones gestionadas
              </span>
              <p className="text-2xl font-bold mt-0.5" style={{ color: 'var(--flowup-violet)' }}>
                {rubro.aiMetrics.conversationsHandled}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--flowup-bg-light-2)' }}>
                <span className="text-[10px] font-medium" style={{ color: 'var(--flowup-text-soft)' }}>
                  Tiempo resp.
                </span>
                <p className="text-lg font-bold" style={{ color: 'var(--flowup-slate)' }}>
                  {rubro.aiMetrics.avgResponseTime}
                </p>
              </div>
              <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--flowup-bg-light-2)' }}>
                <span className="text-[10px] font-medium" style={{ color: 'var(--flowup-text-soft)' }}>
                  Resolución
                </span>
                <p className="text-lg font-bold" style={{ color: 'var(--flowup-mint-dark)' }}>
                  {rubro.aiMetrics.resolutionRate}
                </p>
              </div>
            </div>

            {selectedRubro === 'cobranzas' && (
              <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(6, 214, 160, 0.06)', border: '1px solid rgba(6, 214, 160, 0.15)' }}>
                <span className="text-[10px] font-medium" style={{ color: 'var(--flowup-text-soft)' }}>
                  Promesas generadas por IA
                </span>
                <p className="text-2xl font-bold mt-0.5" style={{ color: 'var(--flowup-mint-dark)' }}>
                  {rubro.aiMetrics.promisesGenerated}
                </p>
                <p className="text-[10px]" style={{ color: 'var(--flowup-text-soft)' }}>
                  sin intervención humana
                </p>
              </div>
            )}

            {/* Barra de confianza */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium" style={{ color: 'var(--flowup-text-soft)' }}>
                  Confianza promedio
                </span>
                <span className="text-xs font-bold" style={{ color: 'var(--flowup-violet)' }}>
                  87%
                </span>
              </div>
              <div className="h-2 rounded-full" style={{ backgroundColor: 'var(--flowup-bg-light-2)' }}>
                <div className="h-full rounded-full" style={{ width: '87%', backgroundColor: 'var(--flowup-violet)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actividad reciente */}
      <div className="rounded-2xl p-5"
        style={{ backgroundColor: 'white', border: '1px solid var(--flowup-border)' }}
      >
        <h3 className="text-base font-bold mb-1" style={{ color: 'var(--flowup-slate)' }}>
          Actividad reciente
        </h3>
        <p className="text-xs mb-4" style={{ color: 'var(--flowup-text-soft)' }}>
          Últimos eventos del sistema
        </p>

        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg flex-shrink-0"
                style={{
                  backgroundColor: activity.type === 'message'
                    ? 'rgba(139, 92, 246, 0.1)'
                    : activity.type === 'ai'
                      ? 'rgba(6, 214, 160, 0.1)'
                      : activity.type === 'new'
                        ? 'rgba(59, 130, 246, 0.1)'
                        : activity.type === 'automation'
                          ? 'rgba(234, 179, 8, 0.1)'
                          : 'rgba(139, 92, 246, 0.1)',
                }}
              >
                {activity.type === 'message' && <MessageSquare className="h-3.5 w-3.5" style={{ color: 'var(--flowup-violet)' }} />}
                {activity.type === 'ai' && <Bot className="h-3.5 w-3.5" style={{ color: 'var(--flowup-mint)' }} />}
                {activity.type === 'new' && <Users className="h-3.5 w-3.5" style={{ color: '#3B82F6' }} />}
                {activity.type === 'automation' && <Zap className="h-3.5 w-3.5" style={{ color: '#EAB308' }} />}
                {activity.type === 'pipeline' && <Target className="h-3.5 w-3.5" style={{ color: 'var(--flowup-violet)' }} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate" style={{ color: 'var(--flowup-slate)' }}>
                  {activity.text}
                </p>
              </div>
              <span className="text-xs flex-shrink-0" style={{ color: 'var(--flowup-text-soft)' }}>
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

