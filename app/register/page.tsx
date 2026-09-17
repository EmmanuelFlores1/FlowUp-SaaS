
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  ArrowLeft,
  Loader2,
  DollarSign,
  ShoppingCart,
  CalendarCheck,
  HeartPulse,
  CheckCircle,
} from 'lucide-react'

const rubros = [
  {
    id: 'cobranzas',
    name: 'Cobranzas',
    description: 'Gestión de deudas, recordatorios de pago y seguimiento de morosos',
    icon: DollarSign,
    color: '#8B5CF6',
    bgColor: 'rgba(139, 92, 246, 0.1)',
    examples: ['Promesas de pago', 'Recordatorios automáticos', 'Seguimiento de deuda'],
  },
  {
    id: 'ventas',
    name: 'Ventas',
    description: 'Pipeline de ventas, seguimiento de leads y cierre de negocios',
    icon: ShoppingCart,
    color: '#06D6A0',
    bgColor: 'rgba(6, 214, 160, 0.1)',
    examples: ['Pipeline de ventas', 'Cotizaciones', 'Recupero de carritos'],
  },
  {
    id: 'servicios',
    name: 'Servicios / Turnos',
    description: 'Agendamiento de turnos, confirmaciones y recordatorios',
    icon: CalendarCheck,
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.1)',
    examples: ['Agenda de turnos', 'Confirmaciones', 'Reducción de ausencias'],
  },
  {
    id: 'salud',
    name: 'Salud',
    description: 'Gestión de pacientes, turnos médicos y seguimiento clínico',
    icon: HeartPulse,
    color: '#EF4444',
    bgColor: 'rgba(239, 68, 68, 0.1)',
    examples: ['Turnos médicos', 'Recordatorios', 'Seguimiento de pacientes'],
  },
]

export default function RegisterPage() {
  const [step, setStep] = useState<'datos' | 'rubro'>('datos')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRubro, setSelectedRubro] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password) {
      setError('Completá todos los campos')
      return
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }
    setError('')
    setStep('rubro')
  }

  const handleRegister = async () => {
    if (!selectedRubro) return
    setLoading(true)
    setError('')

    try {
      const [supabase] = useState(() => createClient())
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            rubro: selectedRubro,
          },
        },
      })

      if (signUpError) {
        if (signUpError.message.includes('already')) {
          setError('Este email ya está registrado. Intentá iniciar sesión.')
        } else {
          setError(signUpError.message)
        }
      } else {
        setSuccess(true)
        setTimeout(() => router.push('/login'), 2000)
      }
    } catch {
      setError('Error al crear la cuenta. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4"
        style={{ backgroundColor: 'var(--flowup-bg-light-1)' }}
      >
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: 'rgba(6, 214, 160, 0.1)' }}
          >
            <CheckCircle className="h-8 w-8" style={{ color: 'var(--flowup-mint)' }} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--flowup-slate)' }}>
            ¡Cuenta creada!
          </h2>
          <p className="text-sm" style={{ color: 'var(--flowup-text-soft)' }}>
            Tu cuenta de FlowUp para <strong>{rubros.find(r => r.id === selectedRubro)?.name}</strong> está lista. Redirigiendo al login...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: 'var(--flowup-bg-light-1)' }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold">
            <span style={{ color: 'var(--flowup-mint)' }}>Flow</span>
            <span style={{ color: 'var(--flowup-violet)' }}>Up</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--flowup-text-soft)' }}>
            {step === 'datos' ? 'Creá tu cuenta gratis' : 'Elegí tu rubro'}
          </p>
        </div>

        {/* Progress bar */}
        <div className="flex gap-2 mb-6">
          <div className="flex-1 h-1.5 rounded-full"
            style={{ backgroundColor: 'var(--flowup-violet)' }}
          />
          <div className="flex-1 h-1.5 rounded-full"
            style={{ backgroundColor: step === 'rubro' ? 'var(--flowup-violet)' : 'var(--flowup-border)' }}
          />
        </div>

        {/* Card */}
        <div className="rounded-2xl p-6"
          style={{ backgroundColor: 'white', border: '1px solid var(--flowup-border)' }}
        >
          {/* ===== PASO 1: DATOS ===== */}
          {step === 'datos' && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5"
                  style={{ color: 'var(--flowup-text-medium)' }}
                >
                  Nombre
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                    style={{ color: 'var(--flowup-text-soft)' }}
                  />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
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

              <div>
                <label className="block text-sm font-semibold mb-1.5"
                  style={{ color: 'var(--flowup-text-medium)' }}
                >
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                    style={{ color: 'var(--flowup-text-soft)' }}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
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

              <div>
                <label className="block text-sm font-semibold mb-1.5"
                  style={{ color: 'var(--flowup-text-medium)' }}
                >
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                    style={{ color: 'var(--flowup-text-soft)' }}
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
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

              {error && (
                <p className="text-xs text-center py-2 px-3 rounded-xl"
                  style={{ backgroundColor: 'rgba(220, 38, 38, 0.08)', color: 'var(--flowup-red)' }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{
                  background: 'linear-gradient(135deg, var(--flowup-violet) 0%, var(--flowup-violet-dark) 100%)',
                }}
              >
                Siguiente
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="text-center text-sm" style={{ color: 'var(--flowup-text-soft)' }}>
                ¿Ya tenés cuenta?{' '}
                <a href="/login" className="font-semibold" style={{ color: 'var(--flowup-violet)' }}>
                  Iniciar sesión
                </a>
              </p>
            </form>
          )}

          {/* ===== PASO 2: SELECCIÓN DE RUBRO ===== */}
          {step === 'rubro' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold" style={{ color: 'var(--flowup-slate)' }}>
                  ¿En qué rubro trabajás?
                </h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--flowup-text-soft)' }}>
                  FlowUp se va a configurar automáticamente para tu industria
                </p>
              </div>

              <div className="space-y-2">
                {rubros.map((rubro) => (
                  <div
                    key={rubro.id}
                    onClick={() => setSelectedRubro(rubro.id)}
                    className="flex items-start gap-3 p-3.5 rounded-xl cursor-pointer transition-all"
                    style={{
                      border: selectedRubro === rubro.id
                        ? `2px solid ${rubro.color}`
                        : '1px solid var(--flowup-border)',
                      backgroundColor: selectedRubro === rubro.id
                        ? rubro.bgColor
                        : 'transparent',
                    }}
                  >
                    <div className="p-2 rounded-xl flex-shrink-0"
                      style={{ backgroundColor: rubro.bgColor }}
                    >
                      <rubro.icon className="h-5 w-5" style={{ color: rubro.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold" style={{ color: 'var(--flowup-slate)' }}>
                          {rubro.name}
                        </h3>
                        {selectedRubro === rubro.id && (
                          <CheckCircle className="h-5 w-5 flex-shrink-0" style={{ color: rubro.color }} />
                        )}
                      </div>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--flowup-text-soft)' }}>
                        {rubro.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {rubro.examples.map((ex) => (
                          <span key={ex} className="text-[10px] px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: selectedRubro === rubro.id ? 'white' : 'var(--flowup-bg-light-2)',
                              color: 'var(--flowup-text-soft)',
                            }}
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {error && (
                <p className="text-xs text-center py-2 px-3 rounded-xl"
                  style={{ backgroundColor: 'rgba(220, 38, 38, 0.08)', color: 'var(--flowup-red)' }}
                >
                  {error}
                </p>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => { setStep('datos'); setError('') }}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{
                    border: '1px solid var(--flowup-border)',
                    color: 'var(--flowup-text-medium)',
                    backgroundColor: 'white',
                  }}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Atrás
                </button>
                <button
                  onClick={handleRegister}
                  disabled={!selectedRubro || loading}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, var(--flowup-violet) 0%, var(--flowup-violet-dark) 100%)',
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creando cuenta...
                    </>
                  ) : (
                    <>
                      Crear cuenta
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs mt-6" style={{ color: 'var(--flowup-text-soft)' }}>
          © 2026 FlowUp. Todos los derechos reservados.
        </p>
      </div>
    </div>
  )
}

