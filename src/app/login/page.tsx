"use client"

import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogIn, Loader2, ArrowLeft } from "lucide-react"
import { useAuth } from "@/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
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

  return (
    <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-slate-50 p-4 overflow-hidden">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-black uppercase text-[10px] tracking-widest">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <div className="w-[350px] bg-white rounded-xl shadow-[rgba(0,0,0,0.35)_0px_5px_15px] p-[20px_30px] flex flex-col">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white mb-6 shadow-[rgba(0,0,0,0.05)_0px_3px_8px]">
            <LogIn className="w-7 h-7 text-black" />
          </div>
          
          <h2 className="text-[28px] font-extrabold font-headline mb-[30px] text-center text-slate-900 leading-tight">
            Welcome back
          </h2>
        </div>

        <form onSubmit={handleSignIn} className="w-full flex flex-col gap-[18px] mb-[15px]">
          <input
            placeholder="Email"
            type="email"
            required
            value={email}
            className="w-full rounded-[20px] border border-[#c0c0c0] outline-0 p-[12px_15px] text-sm text-slate-900 bg-white"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Password"
            type="password"
            required
            value={password}
            className="w-full rounded-[20px] border border-[#c0c0c0] outline-0 p-[12px_15px] text-sm text-slate-900 bg-white"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="w-full flex justify-end">
            <button type="button" className="text-[9px] font-bold text-[#747474] underline hover:text-black transition-colors">
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-[teal] hover:brightness-110 text-white font-bold text-sm rounded-[20px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] transition-all flex items-center justify-center"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Log in"}
          </button>
        </form>

        <p className="text-[10px] text-[#747474] font-medium">
          Don't have an account? <Link href="/signup" className="text-[11px] font-extrabold text-[teal] underline ml-1">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
