
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('Email o contraseña incorrectos')
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, var(--flowup-bg-light-1) 0%, var(--flowup-bg-light-2) 100%)' }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold tracking-tight">
            <span style={{ color: 'var(--flowup-mint)' }}>Flow</span>
            <span style={{ color: 'var(--flowup-violet)' }}>Up</span>
          </h1>
          <p className="mt-2 text-base" style={{ color: 'var(--flowup-text-soft)' }}>
            Iniciá sesión en tu cuenta
          </p>
        </div>

        {/* Card de Login */}
        <div className="rounded-2xl shadow-xl p-8"
          style={{
            backgroundColor: 'white',
            border: '1px solid var(--flowup-border)',
          }}
        >
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
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
                  required
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

            {/* Password */}
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
                  placeholder="••••••••"
                  required
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

            {/* Error */}
            {error && (
              <div className="text-sm px-4 py-2.5 rounded-xl"
                style={{
                  backgroundColor: 'rgba(220, 38, 38, 0.08)',
                  color: 'var(--flowup-red)',
                }}
              >
                {error}
              </div>
            )}

            {/* Botón Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, var(--flowup-violet) 0%, var(--flowup-violet-dark) 100%)',
              }}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Iniciar sesión
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          
          {/* Link a Registro */}
          <p className="text-center text-sm" style={{ color: 'var(--flowup-text-soft)' }}>
            ¿No tenés cuenta?{' '}
            <Link
              href="/register"
              className="font-semibold hover:underline transition-colors"
              style={{ color: 'var(--flowup-mint)' }}
            >
              Crear cuenta gratis
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs mt-6" style={{ color: 'var(--flowup-text-soft)' }}>
          © 2026 FlowUp. Todos los derechos reservados.
        </p>
      </div>
    </div>
  )
}

