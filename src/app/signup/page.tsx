"use client"

import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { UserPlus, Lock, Mail, Phone, Loader2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useToast } from "@/hooks/use-toast"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const { auth } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!auth) return

    setLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      toast({ title: "Account Created", description: "Welcome to the AquaSafe Technical Hub." })
      router.push("/")
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "Signup Failed", 
        description: error.message || "Could not create account." 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-4">
      <Link href="/login" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-black uppercase text-[10px] tracking-widest">
        <ArrowLeft className="h-4 w-4" /> Back to Login
      </Link>

      <div className="w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl p-10 flex flex-col items-center border border-slate-100">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-8 shadow-inner group">
          <UserPlus className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
        </div>
        
        <h2 className="text-2xl font-black font-headline mb-2 text-center uppercase tracking-tight text-slate-900">
          Create <span className="text-primary">Hub Account</span>
        </h2>
        <p className="text-slate-400 text-xs font-bold mb-8 text-center uppercase tracking-widest leading-relaxed">
          Join our network for specialized water treatment support.
        </p>

        <form onSubmit={handleSignUp} className="w-full flex flex-col gap-4">
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
              <Phone className="w-4 h-4" />
            </span>
            <input
              placeholder="PHONE NUMBER"
              type="tel"
              required
              value={phone}
              className="w-full pl-12 pr-4 h-14 rounded-xl border border-slate-100 bg-slate-50 text-slate-900 text-xs font-black placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
              <Lock className="w-4 h-4" />
            </span>
            <input
              placeholder="SECURE PASSWORD"
              type="password"
              required
              value={password}
              className="w-full pl-12 pr-4 h-14 rounded-xl border border-slate-100 bg-slate-50 text-slate-900 text-xs font-black placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-slate-900 hover:bg-primary text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-xl transition-all border-none"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Register & Start"}
            </Button>
          </div>
        </form>

        <p className="mt-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center leading-relaxed">
          By registering, you agree to our <br />
          <button className="text-primary hover:underline">Terms of Service</button>
        </p>

        <p className="mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Already have an account? <Link href="/login" className="text-primary hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  )
}
