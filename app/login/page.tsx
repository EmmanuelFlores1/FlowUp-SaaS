
'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'

function getSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = getSupabase()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: 'var(--flowup-bg-light-1)' }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            <span style={{ color: 'var(--flowup-mint)' }}>Flow</span>
            <span style={{ color: 'var(--flowup-violet)' }}>Up</span>
          </h1>
          <p className="text-sm mt-2" style={{ color: 'var(--flowup-text-soft)' }}>
            Iniciá sesión en tu cuenta
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8" style={{ backgroundColor: 'white', border: '1px solid var(--flowup-border)' }}>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl text-sm text-red-600"
                style={{ backgroundColor: 'rgba(220, 38, 38, 0.08)' }}
              >
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--flowup-slate)' }}>
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
                style={{
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
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--flowup-slate)' }}>
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
                style={{
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, var(--flowup-violet) 0%, var(--flowup-violet-dark) 100%)',
              }}
            >
              {loading ? 'Ingresando...' : 'Iniciar sesión →'}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: 'var(--flowup-text-soft)' }}>
            ¿No tenés cuenta?{' '}
            <Link href="/register" className="font-semibold" style={{ color: 'var(--flowup-violet)' }}>
              Crear cuenta gratis
            </Link>
          </p>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'var(--flowup-text-soft)' }}>
          © 2026 FlowUp. Todos los derechos reservados.
        </p>
      </div>
    </div>
  )
}

