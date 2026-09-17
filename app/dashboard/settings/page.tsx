
'use client'

import { useState } from 'react'
import {
  User,
  Building2,
  Users,
  CreditCard,
  Bell,
  Shield,
  Palette,
  Globe,
  Mail,
  Phone,
  Camera,
  Save,
  Plus,
  Trash2,
  Crown,
  Check,
  ArrowRight,
  ChevronRight,
  X, 
} from 'lucide-react'

const tabs = [
  { id: 'profile', name: 'Mi perfil', icon: User },
  { id: 'business', name: 'Negocio', icon: Building2 },
  { id: 'team', name: 'Equipo', icon: Users },
  { id: 'billing', name: 'Plan y facturación', icon: CreditCard },
  { id: 'notifications', name: 'Notificaciones', icon: Bell },
]

const teamMembers = [
  { id: '1', name: 'Emmanuel', email: 'emmanuel@flowup.com', role: 'Administrador', avatar: 'EM', status: 'active' },
  { id: '2', name: 'María García', email: 'maria@flowup.com', role: 'Agente', avatar: 'MG', status: 'active' },
  { id: '3', name: 'Carlos López', email: 'carlos@flowup.com', role: 'Agente', avatar: 'CL', status: 'active' },
  { id: '4', name: 'Ana Martínez', email: 'ana@flowup.com', role: 'Supervisor', avatar: 'AM', status: 'invited' },
]

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$15.000',
    period: '/mes',
    description: 'Para emprendedores y negocios pequeños',
    features: ['1 usuario', '2 canales', '500 conversaciones/mes', 'Automatizaciones básicas', 'Soporte por email'],
    current: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$45.000',
    period: '/mes',
    description: 'Para equipos en crecimiento',
    features: ['5 usuarios', 'Todos los canales', 'Conversaciones ilimitadas', 'Automatizaciones avanzadas', 'Analytics completo', 'Soporte prioritario'],
    current: true,
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Personalizado',
    period: '',
    description: 'Para grandes empresas',
    features: ['Usuarios ilimitados', 'Todos los canales', 'Conversaciones ilimitadas', 'API completa', 'Integraciones custom', 'Soporte dedicado 24/7', 'SLA garantizado'],
    current: false,
  },
]

const notificationSettings = [
  { id: 'new_message', label: 'Nuevo mensaje recibido', description: 'Cuando llega un mensaje nuevo a cualquier canal', email: true, push: true, sound: true },
  { id: 'assigned', label: 'Conversación asignada', description: 'Cuando te asignan una conversación', email: true, push: true, sound: false },
  { id: 'mention', label: 'Mención en conversación', description: 'Cuando alguien te menciona en una nota interna', email: false, push: true, sound: true },
  { id: 'automation', label: 'Automatización ejecutada', description: 'Cuando una automatización se ejecuta', email: true, push: false, sound: false },
  { id: 'report', label: 'Reporte semanal', description: 'Resumen semanal de métricas y rendimiento', email: true, push: false, sound: false },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showInvite, setShowInvite] = useState(false)
  const [notifications, setNotifications] = useState(notificationSettings)

  const toggleNotification = (id: string, type: 'email' | 'push' | 'sound') => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, [type]: !n[type] } : n)
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--flowup-slate)' }}>
          Configuración
        </h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--flowup-text-soft)' }}>
          Gestioná tu cuenta, equipo y preferencias
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Sidebar de tabs */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: 'white', border: '1px solid var(--flowup-border)' }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all text-left"
                style={{
                  backgroundColor: activeTab === tab.id ? 'var(--flowup-bg-light-2)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--flowup-violet)' : 'var(--flowup-text-medium)',
                  borderBottom: '1px solid var(--flowup-border)',
                  borderLeft: activeTab === tab.id ? '3px solid var(--flowup-violet)' : '3px solid transparent',
                }}
              >
                <tab.icon className="h-4 w-4 flex-shrink-0" />
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Contenido */}
        <div className="flex-1 min-w-0">
          {/* ===== MI PERFIL ===== */}
          {activeTab === 'profile' && (
            <div className="rounded-2xl p-6 space-y-6"
              style={{ backgroundColor: 'white', border: '1px solid var(--flowup-border)' }}
            >
              <h2 className="text-lg font-bold" style={{ color: 'var(--flowup-slate)' }}>
                Mi perfil
              </h2>

              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                    style={{ backgroundColor: 'var(--flowup-violet)' }}
                  >
                    EM
                  </div>
                  <button className="absolute bottom-0 right-0 p-1.5 rounded-full text-white"
                    style={{ backgroundColor: 'var(--flowup-slate)' }}
                  >
                    <Camera className="h-3 w-3" />
                  </button>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--flowup-slate)' }}>
                    Foto de perfil
                  </p>
                  <p className="text-xs" style={{ color: 'var(--flowup-text-soft)' }}>
                    JPG, PNG o GIF. Máximo 2MB.
                  </p>
                </div>
              </div>

              {/* Campos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5"
                    style={{ color: 'var(--flowup-text-medium)' }}
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    defaultValue="Emmanuel"
                    className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
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
                <div>
                  <label className="block text-sm font-semibold mb-1.5"
                    style={{ color: 'var(--flowup-text-medium)' }}
                  >
                    Apellido
                  </label>
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Tu apellido"
                    className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
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
                <div>
                  <label className="block text-sm font-semibold mb-1.5"
                    style={{ color: 'var(--flowup-text-medium)' }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="emmanuel@flowup.com"
                    className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
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
                <div>
                  <label className="block text-sm font-semibold mb-1.5"
                    style={{ color: 'var(--flowup-text-medium)' }}
                  >
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    defaultValue=""
                    placeholder="+54 11 1234-5678"
                    className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
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
              </div>

              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{
                  background: 'linear-gradient(135deg, var(--flowup-violet) 0%, var(--flowup-violet-dark) 100%)',
                }}
              >
                <Save className="h-4 w-4" />
                Guardar cambios
              </button>
            </div>
          )}

          {/* ===== NEGOCIO ===== */}
          {activeTab === 'business' && (
            <div className="rounded-2xl p-6 space-y-6"
              style={{ backgroundColor: 'white', border: '1px solid var(--flowup-border)' }}
            >
              <h2 className="text-lg font-bold" style={{ color: 'var(--flowup-slate)' }}>
                Datos del negocio
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold mb-1.5"
                    style={{ color: 'var(--flowup-text-medium)' }}
                  >
                    Nombre del negocio
                  </label>
                  <input
                    type="text"
                    defaultValue="Mi Empresa"
                    className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
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
                <div>
                  <label className="block text-sm font-semibold mb-1.5"
                    style={{ color: 'var(--flowup-text-medium)' }}
                  >
                    Industria
                  </label>
                  <select
                    className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all appearance-none"
                    style={{
                      backgroundColor: 'var(--flowup-bg-light-2)',
                      border: '1px solid var(--flowup-border)',
                      color: 'var(--flowup-slate)',
                    }}
                  >
                    <option>Tecnología</option>
                    <option>E-commerce</option>
                    <option>Servicios</option>
                    <option>Salud</option>
                    <option>Educación</option>
                    <option>Gastronomía</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5"
                    style={{ color: 'var(--flowup-text-medium)' }}
                  >
                    Tamaño del equipo
                  </label>
                  <select
                    className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all appearance-none"
                    style={{
                      backgroundColor: 'var(--flowup-bg-light-2)',
                      border: '1px solid var(--flowup-border)',
                      color: 'var(--flowup-slate)',
                    }}
                  >
                    <option>1-5 personas</option>
                    <option>6-20 personas</option>
                    <option>21-50 personas</option>
                    <option>51-200 personas</option>
                    <option>200+ personas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5"
                    style={{ color: 'var(--flowup-text-medium)' }}
                  >
                    País
                  </label>
                  <select
                    className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all appearance-none"
                    style={{
                      backgroundColor: 'var(--flowup-bg-light-2)',
                      border: '1px solid var(--flowup-border)',
                      color: 'var(--flowup-slate)',
                    }}
                  >
                    <option>Argentina</option>
                    <option>México</option>
                    <option>Colombia</option>
                    <option>Chile</option>
                    <option>España</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5"
                    style={{ color: 'var(--flowup-text-medium)' }}
                  >
                    Zona horaria
                  </label>
                  <select
                    className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all appearance-none"
                    style={{
                      backgroundColor: 'var(--flowup-bg-light-2)',
                      border: '1px solid var(--flowup-border)',
                      color: 'var(--flowup-slate)',
                    }}
                  >
                    <option>América/Buenos_Aires (GMT-3)</option>
                    <option>América/México_City (GMT-6)</option>
                    <option>América/Bogotá (GMT-5)</option>
                    <option>Europa/Madrid (GMT+1)</option>
                  </select>
                </div>
              </div>

              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{
                  background: 'linear-gradient(135deg, var(--flowup-violet) 0%, var(--flowup-violet-dark) 100%)',
                }}
              >
                <Save className="h-4 w-4" />
                Guardar cambios
              </button>
            </div>
          )}

          {/* ===== EQUIPO ===== */}
          {activeTab === 'team' && (
            <div className="space-y-4">
              <div className="rounded-2xl p-6"
                style={{ backgroundColor: 'white', border: '1px solid var(--flowup-border)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold" style={{ color: 'var(--flowup-slate)' }}>
                    Miembros del equipo
                  </h2>
                  <button
                    onClick={() => setShowInvite(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{
                      background: 'linear-gradient(135deg, var(--flowup-violet) 0%, var(--flowup-violet-dark) 100%)',
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    Invitar
                  </button>
                </div>

                <div className="space-y-2">
                  {teamMembers.map((member) => (
                    <div key={member.id}
                      className="flex items-center justify-between p-3 rounded-xl transition-all"
                      style={{ border: '1px solid var(--flowup-border)' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                          style={{ backgroundColor: member.role === 'Administrador' ? 'var(--flowup-mint)' : 'var(--flowup-violet)' }}
                        >
                          {member.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold" style={{ color: 'var(--flowup-slate)' }}>
                              {member.name}
                            </span>
                            {member.role === 'Administrador' && (
                              <Crown className="h-3.5 w-3.5" style={{ color: 'var(--flowup-yellow)' }} />
                            )}
                            {member.status === 'invited' && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                                style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', color: '#CA8A04' }}
                              >
                                Invitado
                              </span>
                            )}
                          </div>
                          <span className="text-xs" style={{ color: 'var(--flowup-text-soft)' }}>
                            {member.email}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          defaultValue={member.role}
                          className="text-xs px-2 py-1 rounded-lg focus:outline-none appearance-none"
                          style={{
                            backgroundColor: 'var(--flowup-bg-light-2)',
                            border: '1px solid var(--flowup-border)',
                            color: 'var(--flowup-text-medium)',
                          }}
                        >
                          <option>Administrador</option>
                          <option>Supervisor</option>
                          <option>Agente</option>
                        </select>
                        {member.role !== 'Administrador' && (
                          <button className="p-1.5 rounded-lg transition-colors hover:bg-red-50"
                            style={{ color: 'var(--flowup-red)' }}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal invitar */}
              {showInvite && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                  <div className="w-full max-w-md rounded-2xl p-6" style={{ backgroundColor: 'white' }}>
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="text-lg font-bold" style={{ color: 'var(--flowup-slate)' }}>
                        Invitar miembro
                      </h2>
                      <button onClick={() => setShowInvite(false)} className="p-1 rounded-lg hover:bg-slate-100"
                        style={{ color: 'var(--flowup-text-soft)' }}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-1.5"
                          style={{ color: 'var(--flowup-text-medium)' }}
                        >
                          Email
                        </label>
                        <input type="email" placeholder="email@ejemplo.com"
                          className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
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
                      <div>
                        <label className="block text-sm font-semibold mb-1.5"
                          style={{ color: 'var(--flowup-text-medium)' }}
                        >
                          Rol
                        </label>
                        <select
                          className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all appearance-none"
                          style={{
                            backgroundColor: 'var(--flowup-bg-light-2)',
                            border: '1px solid var(--flowup-border)',
                            color: 'var(--flowup-slate)',
                          }}
                        >
                          <option>Agente</option>
                          <option>Supervisor</option>
                          <option>Administrador</option>
                        </select>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button onClick={() => setShowInvite(false)}
                          className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                          style={{ border: '1px solid var(--flowup-border)', color: 'var(--flowup-text-medium)', backgroundColor: 'white' }}
                        >
                          Cancelar
                        </button>
                        <button
                          className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                          style={{ background: 'linear-gradient(135deg, var(--flowup-violet) 0%, var(--flowup-violet-dark) 100%)' }}
                        >
                          Enviar invitación
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===== PLAN Y FACTURACIÓN ===== */}
          {activeTab === 'billing' && (
            <div className="space-y-4">
              {/* Planes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <div key={plan.id}
                    className="rounded-2xl p-5 relative transition-all"
                    style={{
                      backgroundColor: 'white',
                      border: plan.current
                        ? '2px solid var(--flowup-violet)'
                        : '1px solid var(--flowup-border)',
                    }}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold text-white"
                        style={{ background: 'linear-gradient(135deg, var(--flowup-violet) 0%, var(--flowup-violet-dark) 100%)' }}
                      >
                        POPULAR
                      </div>
                    )}

                    <h3 className="text-base font-bold" style={{ color: 'var(--flowup-slate)' }}>
                      {plan.name}
                    </h3>
                    <p className="text-xs mt-0.5 mb-3" style={{ color: 'var(--flowup-text-soft)' }}>
                      {plan.description}
                    </p>

                    <div className="mb-4">
                      <span className="text-3xl font-extrabold" style={{ color: 'var(--flowup-slate)' }}>
                        {plan.price}
                      </span>
                      <span className="text-sm" style={{ color: 'var(--flowup-text-soft)' }}>
                        {plan.period}
                      </span>
                    </div>

                    <div className="space-y-2 mb-5">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 flex-shrink-0" style={{ color: 'var(--flowup-mint)' }} />
                          <span className="text-xs" style={{ color: 'var(--flowup-text-medium)' }}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      className="w-full py-2 rounded-xl text-sm font-semibold transition-all"
                      style={{
                        background: plan.current
                          ? 'var(--flowup-bg-light-2)'
                          : 'linear-gradient(135deg, var(--flowup-violet) 0%, var(--flowup-violet-dark) 100%)',
                        color: plan.current ? 'var(--flowup-text-soft)' : 'white',
                        border: plan.current ? '1px solid var(--flowup-border)' : 'none',
                      }}
                      disabled={plan.current}
                    >
                      {plan.current ? 'Plan actual' : plan.id === 'enterprise' ? 'Contactar ventas' : 'Cambiar plan'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== NOTIFICACIONES ===== */}
          {activeTab === 'notifications' && (
            <div className="rounded-2xl p-6"
              style={{ backgroundColor: 'white', border: '1px solid var(--flowup-border)' }}
            >
              <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--flowup-slate)' }}>
                Notificaciones
              </h2>
              <p className="text-xs mb-5" style={{ color: 'var(--flowup-text-soft)' }}>
                Configurá cómo y cuándo querés recibir notificaciones
              </p>

              {/* Header */}
              <div className="grid grid-cols-12 gap-2 px-3 py-2 mb-2 text-[10px] font-bold uppercase tracking-wider"
                style={{ color: 'var(--flowup-text-soft)' }}
              >
                <div className="col-span-6">Evento</div>
                <div className="col-span-2 text-center">Email</div>
                <div className="col-span-2 text-center">Push</div>
                <div className="col-span-2 text-center">Sonido</div>
              </div>

              <div className="space-y-1">
                {notifications.map((notif) => (
                  <div key={notif.id}
                    className="grid grid-cols-12 gap-2 px-3 py-3 rounded-xl items-center"
                    style={{ borderBottom: '1px solid var(--flowup-border)' }}
                  >
                    <div className="col-span-6">
                      <p className="text-sm font-medium" style={{ color: 'var(--flowup-slate)' }}>
                        {notif.label}
                      </p>
                      <p className="text-[10px]" style={{ color: 'var(--flowup-text-soft)' }}>
                        {notif.description}
                      </p>
                    </div>
                    {(['email', 'push', 'sound'] as const).map((type) => (
                      <div key={type} className="col-span-2 flex justify-center">
                        <button
                          onClick={() => toggleNotification(notif.id, type)}
                          className="w-9 h-5 rounded-full transition-all relative"
                          style={{
                            backgroundColor: notif[type] ? 'var(--flowup-violet)' : 'var(--flowup-border)',
                          }}
                        >
                          <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all"
                            style={{
                              left: notif[type] ? '18px' : '2px',
                            }}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

