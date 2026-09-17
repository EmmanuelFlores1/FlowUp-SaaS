
'use client'

import { useState } from 'react'
import {
  Search,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
  Circle,
  Check,
  CheckCheck,
  MessageSquare,
  Mail,
  Tag,
  Clock,
  ChevronLeft,
  Bot,
  UserCheck,
  Filter,
  Sparkles,
  Hand,
  X,
  AlertCircle,
} from 'lucide-react'

type MessageStatus = 'sent' | 'delivered' | 'read'

const filters = [
  { id: 'all', name: 'Todas' },
  { id: 'mine', name: 'Mías' },
  { id: 'unassigned', name: 'Sin asignar' },
  { id: 'ai', name: '🤖 IA' },
  { id: 'waiting', name: 'Esperando' },
]

const sampleConversations = [
  {
    id: '1',
    name: 'María García',
    avatar: 'MG',
    lastMessage: 'Sí, me interesa el plan Pro. ¿Qué incluye exactamente?',
    time: '10:35',
    unread: 2,
    channel: 'whatsapp',
    status: 'online',
    handler: 'ai' as const,
    aiConfidence: 92,
    lastMessageStatus: 'read' as MessageStatus,
    lastMessageDirection: 'inbound' as const,
  },
  {
    id: '2',
    name: 'Carlos López',
    avatar: 'CL',
    lastMessage: 'Perfecto, muchas gracias!',
    time: '09:15',
    unread: 0,
    channel: 'instagram',
    status: 'offline',
    handler: 'human' as const,
    aiConfidence: 0,
    lastMessageStatus: 'read' as MessageStatus,
    lastMessageDirection: 'inbound' as const,
  },
  {
    id: '3',
    name: 'Ana Martínez',
    avatar: 'AM',
    lastMessage: 'Me interesa el plan Pro',
    time: 'Ayer',
    unread: 1,
    channel: 'email',
    status: 'offline',
    handler: 'ai' as const,
    aiConfidence: 78,
    lastMessageStatus: 'delivered' as MessageStatus,
    lastMessageDirection: 'inbound' as const,
  },
  {
    id: '4',
    name: 'Pedro Sánchez',
    avatar: 'PS',
    lastMessage: '¿Tienen descuento por volumen?',
    time: 'Ayer',
    unread: 0,
    channel: 'facebook',
    status: 'online',
    handler: 'unassigned' as const,
    aiConfidence: 0,
    lastMessageStatus: 'sent' as MessageStatus,
    lastMessageDirection: 'outbound' as const,
  },
  {
    id: '5',
    name: 'Laura Fernández',
    avatar: 'LF',
    lastMessage: 'Necesito ayuda con la configuración',
    time: 'Lun',
    unread: 3,
    channel: 'whatsapp',
    status: 'offline',
    handler: 'waiting' as const,
    aiConfidence: 45,
    lastMessageStatus: 'delivered' as MessageStatus,
    lastMessageDirection: 'inbound' as const,
  },
]

const sampleMessages = [
  {
    id: '1',
    content: 'Hola, quería consultar sobre el servicio',
    time: '10:30',
    direction: 'inbound' as const,
    sender: 'contact' as const,
    status: 'read' as MessageStatus,
  },
  {
    id: '2',
    content: '¡Hola María! 👋 Gracias por escribirnos. Con gusto te ayudo. ¿Qué necesitás saber sobre nuestros servicios?',
    time: '10:31',
    direction: 'outbound' as const,
    sender: 'ai' as const,
    status: 'read' as MessageStatus,
  },
  {
    id: '3',
    content: '¿Cuáles son los planes disponibles y los precios?',
    time: '10:32',
    direction: 'inbound' as const,
    sender: 'contact' as const,
    status: 'read' as MessageStatus,
  },
  {
    id: '4',
    content: 'Tenemos 3 planes: Starter ($15.000/mes), Pro ($45.000/mes) y Enterprise (personalizado). El plan Pro es el más popular e incluye todos los canales y conversaciones ilimitadas. ¿Querés que te cuente más detalles?',
    time: '10:33',
    direction: 'outbound' as const,
    sender: 'ai' as const,
    status: 'read' as MessageStatus,
  },
  {
    id: '5',
    content: 'Sí, me interesa el plan Pro. ¿Qué incluye exactamente?',
    time: '10:35',
    direction: 'inbound' as const,
    sender: 'contact' as const,
    status: 'read' as MessageStatus,
  },
  {
    id: '6',
    content: 'El Plan Pro incluye:\n\n✅ 5 usuarios\n✅ Todos los canales (WhatsApp, Instagram, Facebook, Email)\n✅ Conversaciones ilimitadas\n✅ Automatizaciones avanzadas\n✅ Analytics completo\n✅ Soporte prioritario\n\n¿Te gustaría agendar una demo para verlo en acción?',
    time: '10:36',
    direction: 'outbound' as const,
    sender: 'ai' as const,
    status: 'delivered' as MessageStatus,
  },
]

const aiSummary = {
  topic: 'Consulta sobre planes y precios',
  sentiment: 'Positivo',
  intent: 'Interés en Plan Pro',
  suggestedAction: 'Enviar detalle del Plan Pro y ofrecer demo',
  confidence: 92,
}

const channelColors: Record<string, string> = {
  whatsapp: '#25D366',
  instagram: '#E1306C',
  email: '#8B5CF6',
  facebook: '#1877F2',
}

const channelNames: Record<string, string> = {
  whatsapp: 'WhatsApp',
  instagram: 'Instagram',
  email: 'Email',
  facebook: 'Facebook',
}

const handlerLabels: Record<string, { label: string; color: string; bg: string }> = {
  ai: { label: '🤖 IA', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' },
  human: { label: '👤 Humano', color: '#06D6A0', bg: 'rgba(6, 214, 160, 0.1)' },
  unassigned: { label: 'Sin asignar', color: '#EAB308', bg: 'rgba(234, 179, 8, 0.1)' },
  waiting: { label: '⏳ Esperando', color: '#F97316', bg: 'rgba(249, 115, 22, 0.1)' },
}

function MessageStatusIcon({ status, direction }: { status: MessageStatus; direction: string }) {
  if (direction === 'inbound') return null

  if (status === 'sent') {
    return <Check className="h-3.5 w-3.5 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.5)' }} />
  }
  if (status === 'delivered') {
    return <CheckCheck className="h-3.5 w-3.5 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.5)' }} />
  }
  if (status === 'read') {
    return <CheckCheck className="h-3.5 w-3.5 flex-shrink-0" style={{ color: '#53BDEB' }} />
  }
  return null
}

function ListMessageStatus({ status, direction }: { status: MessageStatus; direction: string }) {
  if (direction === 'inbound') return null

  if (status === 'sent') {
    return <Check className="h-3.5 w-3.5 flex-shrink-0" style={{ color: '#94A3B8' }} />
  }
  if (status === 'delivered') {
    return <CheckCheck className="h-3.5 w-3.5 flex-shrink-0" style={{ color: '#94A3B8' }} />
  }
  if (status === 'read') {
    return <CheckCheck className="h-3.5 w-3.5 flex-shrink-0" style={{ color: '#53BDEB' }} />
  }
  return null
}

export default function InboxPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1')
  const [messageInput, setMessageInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showContactInfo, setShowContactInfo] = useState(false)
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list')
  const [activeFilter, setActiveFilter] = useState('all')
  const [isAiHandling, setIsAiHandling] = useState(true)
  const [showAiSummary, setShowAiSummary] = useState(true)

  const activeConversation = sampleConversations.find(c => c.id === selectedConversation)

  const filteredConversations = sampleConversations.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = activeFilter === 'all' ||
      (activeFilter === 'mine' && c.handler === 'human') ||
      (activeFilter === 'unassigned' && c.handler === 'unassigned') ||
      (activeFilter === 'ai' && c.handler === 'ai') ||
      (activeFilter === 'waiting' && c.handler === 'waiting')
    return matchesSearch && matchesFilter
  })

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id)
    setMobileView('chat')
    const conv = sampleConversations.find(c => c.id === id)
    setIsAiHandling(conv?.handler === 'ai')
    setShowAiSummary(true)
  }

  const handleBackToList = () => {
    setMobileView('list')
  }

  const handleTakeControl = () => {
    setIsAiHandling(false)
  }

  const handleReturnToAi = () => {
    setIsAiHandling(true)
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] rounded-2xl overflow-hidden"
      style={{ border: '1px solid var(--flowup-border)', backgroundColor: 'white' }}
    >
      {/* === COLUMNA IZQUIERDA: Lista de conversaciones === */}
      <div
        className={`
          w-full md:w-80 lg:w-96 flex-shrink-0 flex flex-col
          ${mobileView === 'chat' ? 'hidden md:flex' : 'flex'}
        `}
        style={{ borderRight: '1px solid var(--flowup-border)' }}
      >
        {/* Header de búsqueda */}
        <div className="p-3 space-y-2" style={{ borderBottom: '1px solid var(--flowup-border)' }}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: 'var(--flowup-text-soft)' }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar conversaciones..."
              className="w-full pl-10 pr-4 py-2 rounded-xl text-sm focus:outline-none transition-all"
              style={{
                backgroundColor: 'var(--flowup-bg-light-2)',
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

          {/* Filtros */}
          <div className="flex gap-1 overflow-x-auto pb-0.5">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className="px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap"
                style={{
                  backgroundColor: activeFilter === filter.id ? 'var(--flowup-violet)' : 'var(--flowup-bg-light-2)',
                  color: activeFilter === filter.id ? 'white' : 'var(--flowup-text-soft)',
                }}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de conversaciones */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => {
            const hasUnread = conversation.unread > 0
            return (
              <div
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation.id)}
                className="flex items-center gap-3 px-3 py-3 cursor-pointer transition-all"
                style={{
                  backgroundColor: selectedConversation === conversation.id
                    ? 'var(--flowup-bg-light-2)'
                    : 'transparent',
                  borderBottom: '1px solid var(--flowup-border)',
                }}
                onMouseEnter={(e) => {
                  if (selectedConversation !== conversation.id) {
                    e.currentTarget.style.backgroundColor = 'var(--flowup-bg-light-1)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedConversation !== conversation.id) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ backgroundColor: 'var(--flowup-violet)' }}
                  >
                    {conversation.avatar}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] font-bold"
                    style={{
                      backgroundColor: channelColors[conversation.channel],
                      border: '2px solid white',
                    }}
                  >
                    {conversation.channel[0].toUpperCase()}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className={`text-sm truncate ${hasUnread ? 'font-bold' : 'font-semibold'}`}
                        style={{ color: 'var(--flowup-slate)' }}
                      >
                        {conversation.name}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0"
                        style={{
                          backgroundColor: handlerLabels[conversation.handler].bg,
                          color: handlerLabels[conversation.handler].color,
                        }}
                      >
                        {handlerLabels[conversation.handler].label}
                      </span>
                    </div>
                    <span className="text-[11px] flex-shrink-0 ml-2"
                      style={{ color: hasUnread ? 'var(--flowup-mint-dark)' : 'var(--flowup-text-soft)' }}
                    >
                      {conversation.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <div className="flex items-center gap-1 min-w-0">
                      <ListMessageStatus
                        status={conversation.lastMessageStatus}
                        direction={conversation.lastMessageDirection}
                      />
                      <span className={`text-xs truncate ${hasUnread ? 'font-semibold' : 'font-normal'}`}
                        style={{ color: hasUnread ? 'var(--flowup-slate)' : 'var(--flowup-text-soft)' }}
                      >
                        {conversation.lastMessage}
                      </span>
                    </div>
                    {hasUnread && (
                      <span className="flex-shrink-0 ml-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                        style={{ backgroundColor: 'var(--flowup-mint)' }}
                      >
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          {filteredConversations.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <Filter className="h-10 w-10 mb-3" style={{ color: 'var(--flowup-border)' }} />
              <p className="text-sm font-medium" style={{ color: 'var(--flowup-text-soft)' }}>
                No hay conversaciones con este filtro
              </p>
            </div>
          )}
        </div>
      </div>

      {/* === COLUMNA CENTRAL: Chat === */}
      <div
        className={`
          flex-1 flex flex-col min-w-0
          ${mobileView === 'list' ? 'hidden md:flex' : 'flex'}
        `}
      >
        {activeConversation ? (
          <>
            {/* Header del chat */}
            <div className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: '1px solid var(--flowup-border)' }}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackToList}
                  className="md:hidden p-1 rounded-lg"
                  style={{ color: 'var(--flowup-text-soft)' }}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ backgroundColor: 'var(--flowup-violet)' }}
                >
                  {activeConversation.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--flowup-slate)' }}>
                    {activeConversation.name}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <Circle className="h-2 w-2 fill-current"
                      style={{ color: activeConversation.status === 'online' ? 'var(--flowup-mint)' : 'var(--flowup-text-soft)' }}
                    />
                    <span className="text-xs" style={{ color: 'var(--flowup-text-soft)' }}>
                      {activeConversation.status === 'online' ? 'En línea' : 'Desconectado'}
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: `${channelColors[activeConversation.channel]}15`,
                        color: channelColors[activeConversation.channel],
                      }}
                    >
                      {channelNames[activeConversation.channel]}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {isAiHandling ? (
                  <button
                    onClick={handleTakeControl}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all hover:opacity-90"
                    style={{
                      background: 'linear-gradient(135deg, var(--flowup-mint) 0%, var(--flowup-mint-dark) 100%)',
                      color: 'white',
                    }}
                  >
                    <Hand className="h-3.5 w-3.5" />
                    Tomar control
                  </button>
                ) : (
                  <button
                    onClick={handleReturnToAi}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all hover:opacity-90"
                    style={{
                      backgroundColor: 'rgba(139, 92, 246, 0.1)',
                      color: 'var(--flowup-violet)',
                    }}
                  >
                    <Bot className="h-3.5 w-3.5" />
                    Devolver a IA
                  </button>
                )}

                <button className="p-2 rounded-xl transition-colors hover:bg-slate-100"
                  style={{ color: 'var(--flowup-text-soft)' }}
                >
                  <Phone className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-xl transition-colors hover:bg-slate-100"
                  style={{ color: 'var(--flowup-text-soft)' }}
                >
                  <Video className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setShowContactInfo(!showContactInfo)}
                  className="p-2 rounded-xl transition-colors hover:bg-slate-100"
                  style={{ color: 'var(--flowup-text-soft)' }}
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Banner de estado IA */}
            {isAiHandling && (
              <div className="flex items-center justify-between px-4 py-2"
                style={{ backgroundColor: 'rgba(139, 92, 246, 0.06)', borderBottom: '1px solid var(--flowup-border)' }}
              >
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4" style={{ color: 'var(--flowup-violet)' }} />
                  <span className="text-xs font-medium" style={{ color: 'var(--flowup-violet)' }}>
                    La IA está respondiendo esta conversación
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                    style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', color: 'var(--flowup-violet)' }}
                  >
                    Confianza: {activeConversation.aiConfidence}%
                  </span>
                </div>
                <button
                  onClick={handleTakeControl}
                  className="text-xs font-semibold underline"
                  style={{ color: 'var(--flowup-violet)' }}
                >
                  Tomar control
                </button>
              </div>
            )}

            {!isAiHandling && (
              <div className="flex items-center justify-between px-4 py-2"
                style={{ backgroundColor: 'rgba(6, 214, 160, 0.06)', borderBottom: '1px solid var(--flowup-border)' }}
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4" style={{ color: 'var(--flowup-mint-dark)' }} />
                  <span className="text-xs font-medium" style={{ color: 'var(--flowup-mint-dark)' }}>
                    Vos estás respondiendo esta conversación
                  </span>
                </div>
                <button
                  onClick={handleReturnToAi}
                  className="text-xs font-semibold underline"
                  style={{ color: 'var(--flowup-mint-dark)' }}
                >
                  Devolver a IA
                </button>
              </div>
            )}

            {/* Resumen IA */}
            {showAiSummary && (
              <div className="mx-4 mt-3 p-3 rounded-xl relative"
                style={{ backgroundColor: 'rgba(139, 92, 246, 0.04)', border: '1px solid rgba(139, 92, 246, 0.15)' }}
              >
                <button
                  onClick={() => setShowAiSummary(false)}
                  className="absolute top-2 right-2 p-0.5 rounded hover:bg-white/50"
                  style={{ color: 'var(--flowup-text-soft)' }}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles className="h-3.5 w-3.5" style={{ color: 'var(--flowup-violet)' }} />
                  <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--flowup-violet)' }}>
                    Resumen IA
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] font-medium" style={{ color: 'var(--flowup-text-soft)' }}>Tema</span>
                    <p className="text-xs font-medium" style={{ color: 'var(--flowup-slate)' }}>{aiSummary.topic}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-medium" style={{ color: 'var(--flowup-text-soft)' }}>Sentimiento</span>
                    <p className="text-xs font-medium" style={{ color: 'var(--flowup-mint-dark)' }}>😊 {aiSummary.sentiment}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-medium" style={{ color: 'var(--flowup-text-soft)' }}>Intención</span>
                    <p className="text-xs font-medium" style={{ color: 'var(--flowup-slate)' }}>{aiSummary.intent}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-medium" style={{ color: 'var(--flowup-text-soft)' }}>Acción sugerida</span>
                    <p className="text-xs font-medium" style={{ color: 'var(--flowup-violet)' }}>{aiSummary.suggestedAction}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1"
              style={{ backgroundColor: 'var(--flowup-bg-light-1)' }}
            >
              {/* Fecha separador */}
              <div className="flex justify-center mb-3">
                <span className="text-[11px] px-3 py-1 rounded-lg font-medium"
                  style={{ backgroundColor: 'rgba(139, 92, 246, 0.08)', color: 'var(--flowup-text-soft)' }}
                >
                  Hoy
                </span>
              </div>

              {sampleMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.direction === 'outbound' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-[75%]">
                    {/* Indicador de quién envió (solo outbound) */}
                    {message.direction === 'outbound' && (
                      <div className="flex items-center justify-end gap-1 mb-0.5">
                        {message.sender === 'ai' ? (
                          <>
                            <Bot className="h-3 w-3" style={{ color: 'var(--flowup-violet)' }} />
                            <span className="text-[10px] font-medium" style={{ color: 'var(--flowup-violet)' }}>
                              FlowUp IA
                            </span>
                          </>
                        ) : (
                          <>
                            <UserCheck className="h-3 w-3" style={{ color: 'var(--flowup-mint-dark)' }} />
                            <span className="text-[10px] font-medium" style={{ color: 'var(--flowup-mint-dark)' }}>
                              Emmanuel
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    <div
                      className="px-3 py-2 rounded-lg shadow-sm relative"
                      style={{
                        backgroundColor: message.direction === 'outbound'
                          ? message.sender === 'ai' ? 'var(--flowup-violet)' : 'var(--flowup-mint-dark)'
                          : 'white',
                        color: message.direction === 'outbound'
                          ? 'white'
                          : 'var(--flowup-slate)',
                        borderRadius: message.direction === 'outbound'
                          ? '8px 8px 2px 8px'
                          : '8px 8px 8px 2px',
                      }}
                    >
                      <p className="text-[13.5px] leading-relaxed whitespace-pre-line">{message.content}</p>
                      <div className={`flex items-center gap-1 mt-0.5 ${message.direction === 'outbound' ? 'justify-end' : ''}`}>
                        <span className="text-[10px]"
                          style={{
                            color: message.direction === 'outbound'
                              ? 'rgba(255,255,255,0.6)'
                              : 'var(--flowup-text-soft)',
                          }}
                        >
                          {message.time}
                        </span>
                        <MessageStatusIcon status={message.status} direction={message.direction} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input de mensaje */}
            <div className="p-3" style={{ borderTop: '1px solid var(--flowup-border)' }}>
              {isAiHandling && (
                <div className="flex items-center gap-2 mb-2 px-3 py-2 rounded-xl"
                  style={{ backgroundColor: 'rgba(234, 179, 8, 0.08)' }}
                >
                  <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: '#CA8A04' }} />
                  <span className="text-[11px]" style={{ color: '#CA8A04' }}>
                    La IA está respondiendo. Si escribís un mensaje, vas a tomar el control de la conversación.
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-xl transition-colors hover:bg-slate-100"
                  style={{ color: 'var(--flowup-text-soft)' }}
                >
                  <Smile className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-xl transition-colors hover:bg-slate-100"
                  style={{ color: 'var(--flowup-text-soft)' }}
                >
                  <Paperclip className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder={isAiHandling ? 'Escribí para tomar el control...' : 'Escribí un mensaje...'}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
                  style={{
                    backgroundColor: 'var(--flowup-bg-light-2)',
                    border: '1px solid var(--flowup-border)',
                    color: 'var(--flowup-slate)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--flowup-violet)'
                    e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)'
                    if (isAiHandling) handleTakeControl()
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--flowup-border)'
                    e.target.style.boxShadow = 'none'
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && messageInput.trim()) {
                      setMessageInput('')
                    }
                  }}
                />
                <button
                  className="p-2.5 rounded-xl text-white transition-all hover:opacity-90"
                  style={{
                    background: messageInput.trim()
                      ? 'linear-gradient(135deg, var(--flowup-violet) 0%, var(--flowup-violet-dark) 100%)'
                      : 'var(--flowup-border)',
                  }}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <MessageSquare className="h-16 w-16 mb-4" style={{ color: 'var(--flowup-border)' }} />
            <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--flowup-slate)' }}>
              Seleccioná una conversación
            </h3>
            <p className="text-sm" style={{ color: 'var(--flowup-text-soft)' }}>
              Elegí una conversación de la lista para empezar a chatear.
            </p>
          </div>
        )}
      </div>

      {/* === COLUMNA DERECHA: Info del contacto === */}
      {showContactInfo && activeConversation && (
        <div className="hidden lg:flex w-72 flex-shrink-0 flex-col"
          style={{ borderLeft: '1px solid var(--flowup-border)' }}
        >
          <div className="p-4 text-center" style={{ borderBottom: '1px solid var(--flowup-border)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white mx-auto mb-3"
              style={{ backgroundColor: 'var(--flowup-violet)' }}
            >
              {activeConversation.avatar}
            </div>
            <h3 className="text-base font-bold" style={{ color: 'var(--flowup-slate)' }}>
              {activeConversation.name}
            </h3>
            <div className="flex items-center justify-center gap-1.5 mt-1">
              <Circle className="h-2 w-2 fill-current"
                style={{ color: activeConversation.status === 'online' ? 'var(--flowup-mint)' : 'var(--flowup-text-soft)' }}
              />
              <span className="text-xs" style={{ color: 'var(--flowup-text-soft)' }}>
                {activeConversation.status === 'online' ? 'En línea' : 'Desconectado'}
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: 'var(--flowup-text-soft)' }}
              >
                Información
              </h4>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4" style={{ color: 'var(--flowup-text-soft)' }} />
                  <span className="text-sm" style={{ color: 'var(--flowup-slate)' }}>
                    maria@email.com
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4" style={{ color: 'var(--flowup-text-soft)' }} />
                  <span className="text-sm" style={{ color: 'var(--flowup-slate)' }}>
                    +54 11 1234-5678
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4" style={{ color: 'var(--flowup-text-soft)' }} />
                  <span className="text-sm" style={{ color: 'var(--flowup-slate)' }}>
                    Cliente desde Sep 2026
                  </span>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--flowup-border)', paddingTop: '1rem' }}>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1"
                style={{ color: 'var(--flowup-text-soft)' }}
              >
                <Sparkles className="h-3 w-3" style={{ color: 'var(--flowup-violet)' }} />
                Análisis IA
              </h4>
              <div className="space-y-2">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--flowup-bg-light-2)' }}>
                  <span className="text-[10px] font-medium" style={{ color: 'var(--flowup-text-soft)' }}>Sentimiento</span>
                  <p className="text-xs font-medium" style={{ color: 'var(--flowup-mint-dark)' }}>😊 Positivo</p>
                </div>
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--flowup-bg-light-2)' }}>
                  <span className="text-[10px] font-medium" style={{ color: 'var(--flowup-text-soft)' }}>Intención</span>
                  <p className="text-xs font-medium" style={{ color: 'var(--flowup-slate)' }}>Interés en Plan Pro</p>
                </div>
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--flowup-bg-light-2)' }}>
                  <span className="text-[10px] font-medium" style={{ color: 'var(--flowup-text-soft)' }}>Confianza IA</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: 'var(--flowup-border)' }}>
                      <div className="h-full rounded-full" style={{ width: '92%', backgroundColor: 'var(--flowup-violet)' }} />
                    </div>
                    <span className="text-xs font-bold" style={{ color: 'var(--flowup-violet)' }}>92%</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--flowup-border)', paddingTop: '1rem' }}>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: 'var(--flowup-text-soft)' }}
              >
                Etiquetas
              </h4>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', color: 'var(--flowup-violet)' }}
                >
                  Interesado
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ backgroundColor: 'rgba(6, 214, 160, 0.1)', color: 'var(--flowup-mint-dark)' }}
                >
                  Plan Pro
                </span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--flowup-border)', paddingTop: '1rem' }}>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: 'var(--flowup-text-soft)' }}
              >
                Canal
              </h4>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: channelColors[activeConversation.channel] }}
                />
                <span className="text-sm font-medium" style={{ color: 'var(--flowup-slate)' }}>
                  {channelNames[activeConversation.channel]}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

