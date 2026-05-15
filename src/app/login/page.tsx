"use client"

import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogIn, Lock, Mail, Loader2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/firebase"
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
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
      toast({ title: "Welcome back!", description: "Successfully signed in to Technical Hub." })
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

  const handleGoogleSignIn = async () => {
    if (!auth) return
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      router.push("/")
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message })
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-4">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-black uppercase text-[10px] tracking-widest">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <div className="w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl p-10 flex flex-col items-center border border-slate-100">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-8 shadow-inner group">
          <LogIn className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
        </div>
        
        <h2 className="text-2xl font-black font-headline mb-2 text-center uppercase tracking-tight text-slate-900">
          Technical <span className="text-primary">Sign In</span>
        </h2>
        <p className="text-slate-400 text-xs font-bold mb-8 text-center uppercase tracking-widest leading-relaxed">
          Access your technical assets, orders, and specialized configurations.
        </p>

        <form onSubmit={handleSignIn} className="w-full flex flex-col gap-4 mb-6">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
              <Mail className="w-4 h-4" />
            </span>
            <input
              placeholder="EMAIL ADDRESS"
              type="email"
              required
              value={email}
              className="w-full pl-12 pr-4 h-14 rounded-xl border border-slate-100 bg-slate-50 text-slate-900 text-xs font-black placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
              <Lock className="w-4 h-4" />
            </span>
            <input
              placeholder="PASSWORD"
              type="password"
              required
              value={password}
              className="w-full pl-12 pr-4 h-14 rounded-xl border border-slate-100 bg-slate-50 text-slate-900 text-xs font-black placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-full flex justify-end">
            <button type="button" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-slate-900 hover:bg-primary text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-xl transition-all border-none"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Authorize Entry"}
          </Button>
        </form>

        <div className="flex items-center w-full my-4">
          <div className="flex-grow border-t border-slate-100"></div>
          <span className="mx-4 text-[9px] font-black text-slate-300 uppercase tracking-widest">Or connect via</span>
          <div className="flex-grow border-t border-slate-100"></div>
        </div>

        <div className="flex gap-4 w-full justify-center">
          <button 
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full h-14 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 transition-all shadow-sm"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
          </button>
        </div>

        <p className="mt-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          New to the hub? <Link href="/signup" className="text-primary hover:underline">Create Account</Link>
        </p>
      </div>
    </div>
  )
}
