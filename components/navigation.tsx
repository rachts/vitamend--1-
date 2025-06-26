"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, User, Settings, LogOut, Users, BarChart, FileText, Heart, Shield, Package, Menu, X } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Dashboard", href: "/dashboard", icon: BarChart, auth: true },
    { name: "Donate", href: "/donate", icon: Heart },
    { name: "Volunteer", href: "/volunteer", icon: Users },
    { name: "Transparency", href: "/transparency", icon: Shield },
  ]

  // Role-specific navigation items
  const roleNavItems = {
    admin: [
      { name: "Analytics", href: "/analytics", icon: BarChart },
      { name: "Users", href: "/admin/users", icon: Users },
    ],
    ngo_partner: [{ name: "NGO Dashboard", href: "/ngo/dashboard", icon: Package }],
    reviewer: [{ name: "Verify Medicines", href: "/reviewer/verify", icon: FileText }],
  }

  // Add role-specific items if user is logged in
  const allNavItems = [...navItems]
  if (session?.user?.role && roleNavItems[session.user.role as keyof typeof roleNavItems]) {
    allNavItems.push(...roleNavItems[session.user.role as keyof typeof roleNavItems])
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative h-8 w-8">
              <Image src="/logo.png" alt="VitaMend Logo" fill className="object-contain" priority />
            </div>
            <span className="font-bold text-xl text-[#1a472a]">VitaMend</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {allNavItems.map((item) => {
              if (item.auth && !session) return null
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-[#1a472a] ${
                    isActive(item.href) ? "text-[#1a472a]" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {session ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{session.user.name}</span>
                      <span className="text-xs text-muted-foreground">{session.user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <BarChart className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/auth/signin">Sign in</Link>
              </Button>
              <Button asChild className="bg-[#1a472a] hover:bg-[#1a472a]/90">
                <Link href="/auth/signup">Sign up</Link>
              </Button>
            </div>
          )}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4 bg-background">
          <nav className="flex flex-col space-y-4">
            {allNavItems.map((item) => {
              if (item.auth && !session) return null
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#1a472a] ${
                    isActive(item.href) ? "text-[#1a472a]" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
            {!session && (
              <>
                <Link
                  href="/auth/signin"
                  className="flex items-center gap-2 text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  Sign in
                </Link>
                <Link
                  href="/auth/signup"
                  className="flex items-center gap-2 text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
