
"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Droplets, Loader2, ArrowLeft, ShieldAlert } from "lucide-react"
import { useAuth } from "@/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isUnauthorized, setIsUnauthorized] = useState(false)
  const { auth } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    if (searchParams.get('error') === 'unauthorized') {
      setIsUnauthorized(true)
    }
  }, [searchParams])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!auth) return

    setLoading(true)
    setIsUnauthorized(false)
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      
      // CRITICAL: Prevent unauthorized emails from reaching Admin routes
      const adminEmail = 'aquasaferoworks@gmail.com'
      if (email === adminEmail) {
        toast({ title: "Welcome back, Admin!", description: "Accessing Technical Hub Dashboard." })
        router.push("/admin")
      } else {
        toast({ title: "Welcome back!", description: "Successfully signed in to Hub." })
        router.push("/")
      }
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "Sign In Failed", 
        description: error.message || "Invalid credentials. Please verify your identity." 
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

      <div className="w-[380px] space-y-6">
        {isUnauthorized && (
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-900 rounded-2xl animate-in slide-in-from-top-4 duration-500">
            <ShieldAlert className="h-5 w-5" />
            <AlertTitle className="font-black uppercase text-[10px] tracking-widest mb-1">Access Restricted</AlertTitle>
            <AlertDescription className="text-xs font-bold leading-tight">
              Your account does not have permission to access the Technical Admin Hub.
            </AlertDescription>
          </Alert>
        )}

        <div className="bg-white rounded-[2.5rem] shadow-[rgba(0,0,0,0.2)_0px_25px_50px_-12px] p-10 flex flex-col relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 -skew-x-12 translate-x-12 -translate-y-12 pointer-events-none" />
          
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white mb-6 shadow-[rgba(0,0,0,0.1)_0px_10px_20px] border border-slate-50">
              <Droplets className="w-8 h-8 text-primary" />
            </div>
            
            <h2 className="text-3xl font-black font-headline mb-8 text-center text-slate-900 leading-tight tracking-tight uppercase">
              Secure <span className="text-primary">Hub</span> Access
            </h2>
          </div>

          <form onSubmit={handleSignIn} className="w-full space-y-4 mb-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">Credential Identity</label>
              <input
                placeholder="Email Address"
                type="email"
                required
                value={email}
                className="w-full h-14 rounded-2xl border border-slate-100 outline-none px-6 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">System Key</label>
              <input
                placeholder="Password"
                type="password"
                required
                value={password}
                className="w-full h-14 rounded-2xl border border-slate-100 outline-none px-6 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="w-full flex justify-end px-2">
              <button type="button" className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">
                Reset Access Key
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center border-none"
            >
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Authenticate Access"}
            </button>
          </form>

          <p className="text-[10px] text-slate-400 font-bold text-center tracking-wide">
            Don't have a Hub account? <Link href="/signup" className="font-black text-primary hover:underline ml-1">Register Candidate</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
