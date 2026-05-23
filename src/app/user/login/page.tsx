
"use client"

import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Droplets, Loader2, ArrowLeft, User, Key, Mail } from "lucide-react"
import { useAuth } from "@/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useToast } from "@/hooks/use-toast"

export default function UserLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  
  const { auth } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!auth) return

    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast({ title: "Welcome back!", description: "Successfully signed in to your account." })
      router.push("/")
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "Sign In Failed", 
        description: error.message || "Invalid credentials." 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-6 relative">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-black uppercase text-[10px] tracking-widest z-50">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <div className="w-full max-w-[400px] space-y-12">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto text-primary">
            <Droplets className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black font-headline uppercase tracking-tight text-slate-900">Sign <span className="text-primary">In</span></h1>
          <p className="text-slate-500 font-bold">Access your technical purchase history</p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 pl-12 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Password</label>
              <Link href="#" className="text-[10px] font-black uppercase text-primary tracking-widest">Forgot?</Link>
            </div>
            <div className="relative">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 pl-12 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center border-none"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In to Account"}
          </button>
        </form>

        <p className="text-center text-sm font-bold text-slate-500">
          New to AquaSafe? <Link href="/user/signup" className="text-primary font-black uppercase tracking-widest text-xs ml-2 hover:underline">Create Account</Link>
        </p>
      </div>
    </div>
  )
}
