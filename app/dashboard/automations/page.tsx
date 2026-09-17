
'use client'

import { useState } from 'react'
import {
  Zap,
  Plus,
  Play,
  Pause,
  MoreVertical,
  Clock,
  MessageSquare,
  Users,
  ArrowRight,
  CheckCircle,
  DollarSign,
  ShoppingCart,
  CalendarCheck,
  HeartPulse,
  Sparkles,
  Copy,
  Bot,
  Send,
  Filter,
  Bell,
  UserPlus,
  RefreshCw,
  AlertTriangle,
  Star,
} from 'lucide-react'

type RubroKey = 'cobranzas' | 'ventas' | 'servicios' | 'salud'

const rubroIcons: Record<RubroKey, typeof DollarSign> = {
  cobranzas: DollarSign,
  ventas: ShoppingCart,
  servicios: CalendarCheck,
  salud: HeartPulse,
}

const rubroColors: Record<RubroKey, string> = {
  cobranzas: '#8B5CF6',
  ventas: '#06D6A0',
  servicios: '#3B82F6',
  salud: '#EF4444',
}

interface Template {
  id: string
  name: string
  description: string
  trigger: string
  action: string
  result: string
  icon: typeof Zap
  popular?: boolean
}

const rubroTemplates: Record<RubroKey, Template[]> = {
  cobranzas: [
    {
      id: 'c1',
      name: 'Recordatorio de vencimiento',
      description: 'Envía un mensaje automático 3 días antes del vencimiento de la deuda',
      trigger: '3 días antes del vencimiento',
      action: 'Enviar WhatsApp con detalle de deuda',
      result: 'Contacto pasa a "Contactada"',
      icon: Bell,
      popular: true,
    },
    {
      id: 'c2',
      name: 'Seguimiento de promesa de pago',
      description: 'Si la promesa de pago no se cumple, envía recordatorio automático',
      trigger: 'Fecha de promesa vencida',
      action: 'Enviar WhatsApp de seguimiento',
      result: 'Alerta al equipo si no responde',
      icon: AlertTriangle,
      popular: true,
    },
    {
      id: 'c3',
      name: 'Escalamiento por mora',
      description: 'Si la deuda supera 60 días, escala automáticamente al supervisor',
      trigger: 'Mora > 60 días',
      action: 'Notificar supervisor + cambiar prioridad',
      result: 'Contacto marcado como "Crítico"',
      icon: RefreshCw,
    },
    {
      id: 'c4',
      name: 'Confirmación de pago',
      description: 'Cuando se registra un pago, envía agradecimiento y actualiza estado',
      trigger: 'Pago registrado',
      action: 'Enviar WhatsApp de agradecimiento',
      result: 'Contacto pasa a "Pagada"',
      icon: CheckCircle,
    },
  ],
  ventas: [
    {
      id: 'v1',
      name: 'Bienvenida a nuevo lead',
      description: 'Cuando llega un nuevo contacto, la IA envía mensaje de bienvenida personalizado',
      trigger: 'Nuevo contacto creado',
      action: 'IA envía bienvenida por WhatsApp',
      result: 'Lead entra al pipeline en "Consulta"',
      icon: UserPlus,
      popular: true,
    },
    {
      id: 'v2',
      name: 'Recupero de carrito abandonado',
      description: 'Si un lead no responde en 24hs después de cotización, envía seguimiento',
      trigger: '24hs sin respuesta post-cotización',
      action: 'Enviar WhatsApp con oferta especial',
      result: 'Reactivar conversación',
      icon: ShoppingCart,
      popular: true,
    },
    {
      id: 'v3',
      name: 'Seguimiento post-venta',
      description: '7 días después de la venta, envía encuesta de satisfacción',
      trigger: '7 días post-venta',
      action: 'Enviar encuesta por WhatsApp',
      result: 'Registrar NPS del cliente',
      icon: Star,
    },
    {
      id: 'v4',
      name: 'Nurturing de leads fríos',
      description: 'Si un lead lleva 15 días sin actividad, envía contenido de valor',
      trigger: '15 días sin actividad',
      action: 'Enviar contenido relevante',
      result: 'Reactivar interés',
      icon: RefreshCw,
    },
  ],
  servicios: [
    {
      id: 's1',
      name: 'Confirmación de turno',
      description: 'Envía confirmación automática cuando se agenda un turno',
      trigger: 'Turno agendado',
      action: 'Enviar WhatsApp con fecha, hora y dirección',
      result: 'Turno marcado como "Confirmado"',
      icon: CheckCircle,
      popular: true,
    },
    {
      id: 's2',
      name: 'Recordatorio 24hs antes',
      description: 'Envía recordatorio un día antes del turno con opción de cancelar',
      trigger: '24hs antes del turno',
      action: 'Enviar WhatsApp con botones Confirmo/Cancelo',
      result: 'Reducir ausencias un 60%',
      icon: Bell,
      popular: true,
    },
    {
      id: 's3',
      name: 'Re-agendamiento por ausencia',
      description: 'Si el cliente no asiste, ofrece automáticamente un nuevo turno',
      trigger: 'Cliente no asistió',
      action: 'Enviar opciones de nuevo turno',
      result: 'Recuperar turno perdido',
      icon: RefreshCw,
    },
    {
      id: 's4',
      name: 'Recordatorio de revisión periódica',
      description: 'Cada 3 meses envía recordatorio para agendar nueva visita',
      trigger: '90 días desde última visita',
      action: 'Enviar WhatsApp sugiriendo turno',
      result: 'Fidelizar cliente recurrente',
      icon: Clock,
    },
  ],
  salud: [
    {
      id: 'h1',
      name: 'Confirmación de turno médico',
      description: 'Envía confirmación con datos del profesional y preparación necesaria',
      trigger: 'Turno asignado',
      action: 'Enviar WhatsApp con detalles del turno',
      result: 'Paciente informado y preparado',
      icon: CheckCircle,
      popular: true,
    },
    {
      id: 'h2',
      name: 'Recordatorio pre-consulta',
      description: 'Recuerda al paciente 24hs antes con instrucciones de preparación',
      trigger: '24hs antes del turno',
      action: 'Enviar recordatorio + instrucciones',
      result: 'Reducir ausentismo un 32%',
      icon: Bell,
      popular: true,
    },
    {
      id: 'h3',
      name: 'Seguimiento post-consulta',
      description: '48hs después de la consulta, pregunta cómo se siente el paciente',
      trigger: '48hs post-consulta',
      action: 'Enviar WhatsApp de seguimiento',
      result: 'Mejorar experiencia del paciente',
      icon: HeartPulse,
    },
    {
      id: 'h4',
      name: 'Recordatorio de estudios pendientes',
      description: 'Si el paciente tiene estudios pendientes, envía recordatorio semanal',
      trigger: 'Estudios pendientes > 7 días',
      action: 'Enviar recordatorio por WhatsApp',
      result: 'Asegurar continuidad del tratamiento',
      icon: AlertTriangle,
    },
  ],
}

interface Automation {
  id: string
  name: string
  description: string
  status: 'active' | 'paused'
  trigger: string
  executions: number
  successRate: string
  lastRun: string
  fromTemplate?: boolean
}

const myAutomations: Automation[] = [
  {
    id: '1',
    name: 'Bienvenida WhatsApp',
    description: 'Envía mensaje de bienvenida cuando llega un nuevo contacto',
    status: 'active',
    trigger: 'Nuevo contacto',
    executions: 234,
    successRate: '98%',
    lastRun: 'Hace 5 min',
    fromTemplate: true,
  },
  {
    id: '2',
    name: 'Recordatorio de pago',
    description: 'Recuerda a los clientes 3 días antes del vencimiento',
    status: 'active',
    trigger: '3 días antes de vencimiento',
    executions: 156,
    successRate: '95%',
    lastRun: 'Hace 1h',
    fromTemplate: true,
  },
  {
    id: '3',
    name: 'Seguimiento inactivos',
    description: 'Contacta leads que llevan 7 días sin actividad',
    status: 'paused',
    trigger: '7 días sin actividad',
    executions: 89,
    successRate: '72%',
    lastRun: 'Hace 3 días',
  },
]

export default function AutomationsPage() {
  const [selectedRubro, setSelectedRubro] = useState<RubroKey>('cobranzas')
  const [activeTab, setActiveTab] = useState<'templates' | 'mine'>('templates')
  const [showBuilder, setShowBuilder] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)

  const templates = rubroTemplates[selectedRubro]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--flowup-slate)' }}>
            Automatizaciones
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--flowup-text-soft)' }}>
            Flujos automáticos que trabajan por vos
          </p>
        </div>

        <button
          onClick={() => setShowBuilder(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{
            background: 'linear-gradient(135deg, var(--flowup-violet) 0%, var(--flowup-violet-dark) 100%)',
          }}
        >
          <Plus className="h-4 w-4" />
          Crear automatización
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4"
        style={{ borderBottom: '1px solid var(--flowup-border)' }}
      >
        <button
          onClick={() => setActiveTab('templates')}
          className="pb-3 text-sm font-semibold transition-all relative"
          style={{
            color: activeTab === 'templates' ? 'var(--flowup-violet)' : 'var(--flowup-text-soft)',
            borderBottom: activeTab === 'templates' ? '2px solid var(--flowup-violet)' : '2px solid transparent',
          }}
        >
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" />
            Plantillas recomendadas
          </div>
        </button>
        <button
          onClick={() => setActiveTab('mine')}
          className="pb-3 text-sm font-semibold transition-all"
          style={{
            color: activeTab === 'mine' ? 'var(--flowup-violet)' : 'var(--flowup-text-soft)',
            borderBottom: activeTab === 'mine' ? '2px solid var(--flowup-violet)' : '2px solid transparent',
          }}
        >
          <div className="flex items-center gap-1.5">
            <Zap className="h-4 w-4" />
            Mis automatizaciones ({myAutomations.length})
          </div>
        </button>
      </div>

      {/* ===== TAB: PLANTILLAS ===== */}
      {activeTab === 'templates' && (
        <>
          {/* Selector de rubro */}
          <div className="flex items-center gap-1 p-1 rounded-xl w-fit"
            style={{ backgroundColor: 'var(--flowup-bg-light-2)', border: '1px solid var(--flowup-border)' }}
          >
            {(Object.keys(rubroTemplates) as RubroKey[]).map((key) => {
              const Icon = rubroIcons[key]
              return (
                <button
                  key={key}
                  onClick={() => setSelectedRubro(key)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize"
                  style={{
                    backgroundColor: selectedRubro === key ? 'white' : 'transparent',
                    color: selectedRubro === key ? rubroColors[key] : 'var(--flowup-text-soft)',
                    boxShadow: selectedRubro === key ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  }}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{key}</span>
                </button>
              )
            })}
          </div>

          {/* Grid de plantillas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="rounded-2xl p-5 transition-all hover:shadow-md cursor-pointer relative"
                style={{ backgroundColor: 'white', border: '1px solid var(--flowup-border)' }}
                onClick={() => setSelectedTemplate(template)}
              >
                {template.popular && (
                  <span className="absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-full font-semibold"
                    style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', color: '#CA8A04' }}
                  >
                    ⭐ Popular
                  </span>
                )}

                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2.5 rounded-xl flex-shrink-0"
                    style={{ backgroundColor: `${rubroColors[selectedRubro]}10` }}
                  >
                    <template.icon className="h-5 w-5" style={{ color: rubroColors[selectedRubro] }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold" style={{ color: 'var(--flowup-slate)' }}>
                      {template.name}
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--flowup-text-soft)' }}>
                      {template.description}
                    </p>
                  </div>
                </div>

                {/* Flujo visual: Trigger → Action → Result */}
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex-1 p-2 rounded-lg text-center"
                    style={{ backgroundColor: 'rgba(59, 130, 246, 0.06)', border: '1px solid rgba(59, 130, 246, 0.15)' }}
                  >
                    <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: '#3B82F6' }}>
                      Trigger
                    </span>
                    <p className="text-[10px] mt-0.5 font-medium" style={{ color: 'var(--flowup-slate)' }}>
                      {template.trigger}
                    </p>
                  </div>
                  <ArrowRight className="h-3 w-3 flex-shrink-0" style={{ color: 'var(--flowup-border)' }} />
                  <div className="flex-1 p-2 rounded-lg text-center"
                    style={{ backgroundColor: 'rgba(139, 92, 246, 0.06)', border: '1px solid rgba(139, 92, 246, 0.15)' }}
                  >
                    <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: '#8B5CF6' }}>
                      Acción
                    </span>
                    <p className="text-[10px] mt-0.5 font-medium" style={{ color: 'var(--flowup-slate)' }}>
                      {template.action}
                    </p>
                  </div>
                  <ArrowRight className="h-3 w-3 flex-shrink-0" style={{ color: 'var(--flowup-border)' }} />
                  <div className="flex-1 p-2 rounded-lg text-center"
                    style={{ backgroundColor: 'rgba(6, 214, 160, 0.06)', border: '1px solid rgba(6, 214, 160, 0.15)' }}
                  >
                    <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: '#06D6A0' }}>
                      Resultado
                    </span>
                    <p className="text-[10px] mt-0.5 font-medium" style={{ color: 'var(--flowup-slate)' }}>
                      {template.result}
                    </p>
                  </div>
                </div>

                {/* Botón usar */}
                <button
                  className="w-full mt-4 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-90"
                  style={{
                    backgroundColor: `${rubroColors[selectedRubro]}10`,
                    color: rubroColors[selectedRubro],
                    border: `1px solid ${rubroColors[selectedRubro]}30`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedTemplate(template)
                  }}
                >
                  <Copy className="h-3.5 w-3.5" />
                  Usar esta plantilla
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ===== TAB: MIS AUTOMATIZACIONES ===== */}
      {activeTab === 'mine' && (
        <div className="space-y-3">
          {myAutomations.map((automation) => (
            <div
              key={automation.id}
              className="rounded-2xl p-5 transition-all hover:shadow-md"
              style={{ backgroundColor: 'white', border: '1px solid var(--flowup-border)' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl"
                    style={{
                      backgroundColor: automation.status === 'active'
                        ? 'rgba(6, 214, 160, 0.1)'
                        : 'rgba(234, 179, 8, 0.1)',
                    }}
                  >
                    <Zap className="h-5 w-5"
                      style={{
                        color: automation.status === 'active'
                          ? 'var(--flowup-mint-dark)'
                          : '#EAB308',
                      }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold" style={{ color: 'var(--flowup-slate)' }}>
                        {automation.name}
                      </h3>
                      {automation.fromTemplate && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
                          style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', color: 'var(--flowup-violet)' }}
                        >
                          Plantilla
                        </span>
                      )}
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--flowup-text-soft)' }}>
                      {automation.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      backgroundColor: automation.status === 'active'
                        ? 'rgba(6, 214, 160, 0.1)'
                        : 'rgba(234, 179, 8, 0.1)',
                      color: automation.status === 'active'
                        ? 'var(--flowup-mint-dark)'
                        : '#CA8A04',
                    }}
                  >
                    {automation.status === 'active' ? (
                      <>
                        <Play className="h-3 w-3" />
                        Activa
                      </>
                    ) : (
                      <>
                        <Pause className="h-3 w-3" />
                        Pausada
                      </>
                    )}
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-slate-100"
                    style={{ color: 'var(--flowup-text-soft)' }}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Métricas */}
              <div className="flex items-center gap-6 mt-4 pt-3"
                style={{ borderTop: '1px solid var(--flowup-border)' }}
              >
                <div className="flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5" style={{ color: 'var(--flowup-text-soft)' }} />
                  <span className="text-xs" style={{ color: 'var(--flowup-text-soft)' }}>
                    Trigger: <strong style={{ color: 'var(--flowup-slate)' }}>{automation.trigger}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Play className="h-3.5 w-3.5" style={{ color: 'var(--flowup-text-soft)' }} />
                  <span className="text-xs" style={{ color: 'var(--flowup-text-soft)' }}>
                    Ejecuciones: <strong style={{ color: 'var(--flowup-slate)' }}>{automation.executions}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5" style={{ color: 'var(--flowup-text-soft)' }} />
                  <span className="text-xs" style={{ color: 'var(--flowup-text-soft)' }}>
                    Éxito: <strong style={{ color: 'var(--flowup-mint-dark)' }}>{automation.successRate}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" style={{ color: 'var(--flowup-text-soft)' }} />
                  <span className="text-xs" style={{ color: 'var(--flowup-text-soft)' }}>
                    Última: <strong style={{ color: 'var(--flowup-slate)' }}>{automation.lastRun}</strong>
                  </span>
                </div>
              </div>
            </div>
          ))}

          {myAutomations.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Zap className="h-12 w-12 mb-3" style={{ color: 'var(--flowup-border)' }} />
              <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--flowup-slate)' }}>
                No tenés automatizaciones
              </h3>
              <p className="text-sm mb-4" style={{ color: 'var(--flowup-text-soft)' }}>
                Empezá usando una plantilla recomendada para tu rubro
              </p>
              <button
                onClick={() => setActiveTab('templates')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, var(--flowup-violet) 0%, var(--flowup-violet-dark) 100%)' }}
              >
                <Sparkles className="h-4 w-4" />
                Ver plantillas
              </button>
            </div>
          )}
        </div>
      )}

      {/* ===== MODAL: Detalle de plantilla ===== */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl overflow-hidden" style={{ backgroundColor: 'white' }}>
            <div className="px-6 py-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl"
                    style={{ backgroundColor: `${rubroColors[selectedRubro]}10` }}
                  >
                    <selectedTemplate.icon className="h-6 w-6" style={{ color: rubroColors[selectedRubro] }} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold" style={{ color: 'var(--flowup-slate)' }}>
                      {selectedTemplate.name}
                    </h2>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--flowup-text-soft)' }}>
                      {selectedTemplate.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Flujo detallado */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl"
                  style={{ backgroundColor: 'rgba(59, 130, 246, 0.04)', border: '1px solid rgba(59, 130, 246, 0.15)' }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ backgroundColor: '#3B82F6' }}
                    >
                      1
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#3B82F6' }}>
                      Trigger (Cuándo)
                    </span>
                  </div>
                  <p className="text-sm font-medium ml-8" style={{ color: 'var(--flowup-slate)' }}>
                    {selectedTemplate.trigger}
                  </p>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="h-4 w-4 rotate-90" style={{ color: 'var(--flowup-border)' }} />
                </div>

                <div className="p-4 rounded-xl"
                  style={{ backgroundColor: 'rgba(139, 92, 246, 0.04)', border: '1px solid rgba(139, 92, 246, 0.15)' }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ backgroundColor: '#8B5CF6' }}
                    >
                      2
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#8B5CF6' }}>
                      Acción (Qué hace)
                    </span>
                  </div>
                  <p className="text-sm font-medium ml-8" style={{ color: 'var(--flowup-slate)' }}>
                    {selectedTemplate.action}
                  </p>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="h-4 w-4 rotate-90" style={{ color: 'var(--flowup-border)' }} />
                </div>

                <div className="p-4 rounded-xl"
                  style={{ backgroundColor: 'rgba(6, 214, 160, 0.04)', border: '1px solid rgba(6, 214, 160, 0.15)' }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ backgroundColor: '#06D6A0' }}
                    >
                      3
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#06D6A0' }}>
                      Resultado (Qué pasa)
                    </span>
                  </div>
                  <p className="text-sm font-medium ml-8" style={{ color: 'var(--flowup-slate)' }}>
                    {selectedTemplate.result}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 flex gap-2"
              style={{ borderTop: '1px solid var(--flowup-border)' }}
            >
              <button
                onClick={() => setSelectedTemplate(null)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ border: '1px solid var(--flowup-border)', color: 'var(--flowup-text-medium)', backgroundColor: 'white' }}
              >
                Cerrar
              </button>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, var(--flowup-violet) 0%, var(--flowup-violet-dark) 100%)' }}
              >
                <Zap className="h-4 w-4" />
                Activar automatización
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

