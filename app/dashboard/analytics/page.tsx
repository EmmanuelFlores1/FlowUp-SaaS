
'use client'
import React from 'react'
import { useState } from 'react'
import {
  MessageSquare,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Zap,
  BarChart3,
  PieChart,
  Calendar,
  ChevronDown,
} from 'lucide-react'

const periods = ['Hoy', '7 días', '30 días', '90 días']

const statsCards = [
  {
    name: 'Mensajes totales',
    value: '1,247',
    change: '+12.5%',
    trend: 'up',
    icon: MessageSquare,
    iconBg: 'rgba(139, 92, 246, 0.1)',
    iconColor: '#8B5CF6',
    detail: 'vs período anterior',
  },
  {
    name: 'Conversaciones nuevas',
    value: '89',
    change: '+8.3%',
    trend: 'up',
    icon: Users,
    iconBg: 'rgba(6, 214, 160, 0.1)',
    iconColor: '#06D6A0',
    detail: 'vs período anterior',
  },
  {
    name: 'Tiempo de respuesta',
    value: '2.4 min',
    change: '-18.2%',
    trend: 'up',
    icon: Clock,
    iconBg: 'rgba(59, 130, 246, 0.1)',
    iconColor: '#3B82F6',
    detail: 'promedio',
  },
  {
    name: 'Tasa de resolución',
    value: '94.2%',
    change: '+3.1%',
    trend: 'up',
    icon: Zap,
    iconBg: 'rgba(234, 179, 8, 0.1)',
    iconColor: '#EAB308',
    detail: 'conversaciones cerradas',
  },
]

const channelData = [
  { name: 'WhatsApp', messages: 687, percentage: 55, color: '#25D366' },
  { name: 'Instagram', messages: 312, percentage: 25, color: '#E1306C' },
  { name: 'Email', messages: 149, percentage: 12, color: '#8B5CF6' },
  { name: 'Facebook', messages: 99, percentage: 8, color: '#1877F2' },
]

const weeklyData = [
  { day: 'Lun', messages: 145, conversations: 23 },
  { day: 'Mar', messages: 198, conversations: 31 },
  { day: 'Mié', messages: 176, conversations: 28 },
  { day: 'Jue', messages: 210, conversations: 35 },
  { day: 'Vie', messages: 234, conversations: 38 },
  { day: 'Sáb', messages: 156, conversations: 19 },
  { day: 'Dom', messages: 128, conversations: 14 },
]

const topAgents = [
  { name: 'Emmanuel', avatar: 'EM', conversations: 45, avgTime: '1.8 min', satisfaction: 98 },
  { name: 'María García', avatar: 'MG', conversations: 38, avgTime: '2.1 min', satisfaction: 96 },
  { name: 'Carlos López', avatar: 'CL', conversations: 32, avgTime: '2.5 min', satisfaction: 94 },
  { name: 'Ana Martínez', avatar: 'AM', conversations: 28, avgTime: '3.0 min', satisfaction: 91 },
]

const recentActivity = [
  { type: 'message', text: 'Nuevo mensaje de María García', channel: 'WhatsApp', time: 'Hace 5 min' },
  { type: 'resolved', text: 'Conversación con Pedro resuelta', channel: 'Email', time: 'Hace 12 min' },
  { type: 'new', text: 'Nuevo contacto: Laura Fernández', channel: 'Instagram', time: 'Hace 25 min' },
  { type: 'automation', text: 'Automatización "Bienvenida" ejecutada', channel: 'WhatsApp', time: 'Hace 30 min' },
  { type: 'message', text: 'Nuevo mensaje de Diego Romero', channel: 'Facebook', time: 'Hace 45 min' },
]

const maxMessages = Math.max(...weeklyData.map(d => d.messages))

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30 días')

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--flowup-slate)' }}>
            Analytics
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--flowup-text-soft)' }}>
            Métricas y rendimiento de tu equipo
          </p>
        </div>

        {/* Selector de período */}
        <div className="flex items-center gap-1 p-1 rounded-xl"
          style={{ backgroundColor: 'var(--flowup-bg-light-2)', border: '1px solid var(--flowup-border)' }}
        >
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                backgroundColor: selectedPeriod === period ? 'white' : 'transparent',
                color: selectedPeriod === period ? 'var(--flowup-violet)' : 'var(--flowup-text-soft)',
                boxShadow: selectedPeriod === period ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => (
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

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Gráfico de barras - Mensajes por día */}
        <div className="lg:col-span-2 rounded-2xl p-5"
          style={{ backgroundColor: 'white', border: '1px solid var(--flowup-border)' }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold" style={{ color: 'var(--flowup-slate)' }}>
                Mensajes por día
              </h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--flowup-text-soft)' }}>
                Última semana
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--flowup-violet)' }} />
                <span className="text-xs" style={{ color: 'var(--flowup-text-soft)' }}>Mensajes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--flowup-mint)' }} />
                <span className="text-xs" style={{ color: 'var(--flowup-text-soft)' }}>Conversaciones</span>
              </div>
            </div>
          </div>

          {/* Barras */}
          <div className="flex items-end justify-between gap-3 h-48">
            {weeklyData.map((day) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-medium" style={{ color: 'var(--flowup-text-soft)' }}>
                  {day.messages}
                </span>
                <div className="w-full flex gap-1 items-end" style={{ height: '140px' }}>
                  {/* Barra mensajes */}
                  <div
                    className="flex-1 rounded-t-md transition-all hover:opacity-80"
                    style={{
                      height: `${(day.messages / maxMessages) * 100}%`,
                      background: 'linear-gradient(180deg, var(--flowup-violet) 0%, var(--flowup-violet-dark) 100%)',
                    }}
                  />
                  {/* Barra conversaciones */}
                  <div
                    className="flex-1 rounded-t-md transition-all hover:opacity-80"
                    style={{
                      height: `${(day.conversations / maxMessages) * 100}%`,
                      background: 'linear-gradient(180deg, var(--flowup-mint) 0%, var(--flowup-mint-dark) 100%)',
                    }}
                  />
                </div>
                <span className="text-xs font-medium" style={{ color: 'var(--flowup-text-soft)' }}>
                  {day.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Distribución por canal */}
        <div className="rounded-2xl p-5"
          style={{ backgroundColor: 'white', border: '1px solid var(--flowup-border)' }}
        >
          <h3 className="text-base font-bold mb-1" style={{ color: 'var(--flowup-slate)' }}>
            Canales
          </h3>
          <p className="text-xs mb-5" style={{ color: 'var(--flowup-text-soft)' }}>
            Distribución de mensajes
          </p>

          {/* Donut chart simplificado */}
          <div className="flex justify-center mb-5">
            <div className="relative w-36 h-36">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                {channelData.reduce((acc, channel, i) => {
                  const offset = channelData.slice(0, i).reduce((sum, c) => sum + c.percentage, 0)
                  acc.push(
                    <circle
                      key={channel.name}
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke={channel.color}
                      strokeWidth="4"
                      strokeDasharray={`${channel.percentage} ${100 - channel.percentage}`}
                      strokeDashoffset={`${-offset}`}
                      className="transition-all"
                    />
                  )
                  return acc
                }, [] as React.ReactElement[])}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold" style={{ color: 'var(--flowup-slate)' }}>
                  1,247
                </span>
                <span className="text-[10px]" style={{ color: 'var(--flowup-text-soft)' }}>
                  mensajes
                </span>
              </div>
            </div>
          </div>

          {/* Leyenda */}
          <div className="space-y-2.5">
            {channelData.map((channel) => (
              <div key={channel.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: channel.color }} />
                  <span className="text-sm font-medium" style={{ color: 'var(--flowup-slate)' }}>
                    {channel.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold" style={{ color: 'var(--flowup-slate)' }}>
                    {channel.messages}
                  </span>
                  <span className="text-xs px-1.5 py-0.5 rounded-full"
                    style={{ backgroundColor: `${channel.color}15`, color: channel.color }}
                  >
                    {channel.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fila inferior */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top agentes */}
        <div className="rounded-2xl p-5"
          style={{ backgroundColor: 'white', border: '1px solid var(--flowup-border)' }}
        >
          <h3 className="text-base font-bold mb-1" style={{ color: 'var(--flowup-slate)' }}>
            Top agentes
          </h3>
          <p className="text-xs mb-4" style={{ color: 'var(--flowup-text-soft)' }}>
            Rendimiento del equipo
          </p>

          {/* Header tabla */}
          <div className="grid grid-cols-12 gap-2 px-2 py-2 text-[10px] font-bold uppercase tracking-wider"
            style={{ color: 'var(--flowup-text-soft)', borderBottom: '1px solid var(--flowup-border)' }}
          >
            <div className="col-span-5">Agente</div>
            <div className="col-span-2 text-center">Conv.</div>
            <div className="col-span-3 text-center">Tiempo resp.</div>
            <div className="col-span-2 text-center">Satisf.</div>
          </div>

          {/* Filas */}
          {topAgents.map((agent, index) => (
            <div key={agent.name}
              className="grid grid-cols-12 gap-2 px-2 py-3 items-center"
              style={{ borderBottom: index < topAgents.length - 1 ? '1px solid var(--flowup-border)' : 'none' }}
            >
              <div className="col-span-5 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: index === 0 ? 'var(--flowup-mint)' : 'var(--flowup-violet)' }}
                >
                  {agent.avatar}
                </div>
                <span className="text-sm font-medium truncate" style={{ color: 'var(--flowup-slate)' }}>
                  {agent.name}
                </span>
              </div>
              <div className="col-span-2 text-center">
                <span className="text-sm font-semibold" style={{ color: 'var(--flowup-slate)' }}>
                  {agent.conversations}
                </span>
              </div>
              <div className="col-span-3 text-center">
                <span className="text-sm" style={{ color: 'var(--flowup-text-medium)' }}>
                  {agent.avgTime}
                </span>
              </div>
              <div className="col-span-2 text-center">
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{
                    backgroundColor: agent.satisfaction >= 95
                      ? 'rgba(6, 214, 160, 0.1)'
                      : 'rgba(234, 179, 8, 0.1)',
                    color: agent.satisfaction >= 95
                      ? 'var(--flowup-mint-dark)'
                      : '#CA8A04',
                  }}
                >
                  {agent.satisfaction}%
                </span>
              </div>
            </div>
          ))}
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
              <div key={index} className="flex items-start gap-3">
                {/* Ícono */}
                <div className="p-1.5 rounded-lg flex-shrink-0 mt-0.5"
                  style={{
                    backgroundColor: activity.type === 'message'
                      ? 'rgba(139, 92, 246, 0.1)'
                      : activity.type === 'resolved'
                        ? 'rgba(6, 214, 160, 0.1)'
                        : activity.type === 'new'
                          ? 'rgba(59, 130, 246, 0.1)'
                          : 'rgba(234, 179, 8, 0.1)',
                  }}
                >
                  {activity.type === 'message' && (
                    <MessageSquare className="h-3.5 w-3.5" style={{ color: 'var(--flowup-violet)' }} />
                  )}
                  {activity.type === 'resolved' && (
                    <TrendingUp className="h-3.5 w-3.5" style={{ color: 'var(--flowup-mint)' }} />
                  )}
                  {activity.type === 'new' && (
                    <Users className="h-3.5 w-3.5" style={{ color: '#3B82F6' }} />
                  )}
                  {activity.type === 'automation' && (
                    <Zap className="h-3.5 w-3.5" style={{ color: '#EAB308' }} />
                  )}
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm" style={{ color: 'var(--flowup-slate)' }}>
                    {activity.text}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: 'var(--flowup-bg-light-2)',
                        color: 'var(--flowup-text-soft)',
                      }}
                    >
                      {activity.channel}
                    </span>
                    <span className="text-[10px]" style={{ color: 'var(--flowup-text-soft)' }}>
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

