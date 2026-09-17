
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Zap,
  BarChart3,
  Puzzle,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, exact: true },
  { name: 'Inbox', href: '/dashboard/inbox', icon: MessageSquare },
  { name: 'Contactos', href: '/dashboard/contacts', icon: Users },
  { name: 'Automatizaciones', href: '/dashboard/automations', icon: Zap },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Integraciones', href: '/dashboard/integrations', icon: Puzzle },
  { name: 'Configuración', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  const currentPage = menuItems.find(item => pathname.startsWith(item.href))?.name || 'Dashboard'

  const handleLogout = async () => {
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <div className="flex h-screen" style={{ backgroundColor: 'var(--flowup-bg-light-1)' }}>
      {/* ===== OVERLAY MOBILE ===== */}
      {sidebarOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 lg:w-64
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          flex flex-col
        `}
        style={{
          backgroundColor: 'var(--flowup-slate)',
          borderRight: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
        >
          <Link href="/dashboard" className="flex items-center gap-1">
            <span className="text-2xl font-black" style={{ color: 'var(--flowup-mint)', fontFamily: 'var(--font-heading)' }}>
              Flow
            </span>
            <span className="text-2xl font-black" style={{ color: 'var(--flowup-violet)', fontFamily: 'var(--font-heading)' }}>
              Up
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Menú */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{
                  backgroundColor: isActive ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                  color: isActive ? '#A78BFA' : 'rgba(255,255,255,0.6)',
                }}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.name}</span>
                {item.name === 'Inbox' && (
                  <span className="ml-auto w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ backgroundColor: 'var(--flowup-mint)' }}
                  >
                    3
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer sidebar */}
        <div className="px-3 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ backgroundColor: 'var(--flowup-violet)' }}
            >
              E
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: 'white' }}>
                Emmanuel
              </p>
              <p className="text-[11px] truncate" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Admin
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ===== CONTENIDO PRINCIPAL ===== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar mobile/tablet */}
        <header
          className="lg:hidden flex items-center justify-between px-4 py-3 sticky top-0 z-30"
          style={{
            backgroundColor: 'white',
            borderBottom: '1px solid var(--flowup-border)',
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl hover:bg-slate-100"
            style={{ color: 'var(--flowup-slate)' }}
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-1">
            <span className="text-lg font-black" style={{ color: 'var(--flowup-mint)', fontFamily: 'var(--font-heading)' }}>
              Flow
            </span>
            <span className="text-lg font-black" style={{ color: 'var(--flowup-violet)', fontFamily: 'var(--font-heading)' }}>
              Up
            </span>
          </div>

          <span className="text-sm font-semibold" style={{ color: 'var(--flowup-slate)' }}>
            {currentPage}
          </span>
        </header>

        {/* Contenido */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

