
"use client"

import * as React from "react"
import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Droplets, Loader2, ArrowLeft, ShieldAlert, Key, ShieldCheck } from "lucide-react"
import { useAuth, useFirestore, useDoc, useUser } from "@/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const ADMIN_EMAIL = 'aquasaferoworks@gmail.com';

export default function AdminLoginPage() {
  const [email, setEmail] = useState(ADMIN_EMAIL)
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [initLoading, setInitLoading] = useState(false)
  const [isUnauthorized, setIsUnauthorized] = useState(false)
  const [initPassword, setInitPassword] = useState("")
  
  const { auth } = useAuth()
  const { user } = useUser()
  const firestore = useFirestore()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const systemConfigRef = useMemo(() => 
    firestore ? doc(firestore, "system", "config") : null,
  [firestore])
  
  const { data: config, loading: configLoading } = useDoc(systemConfigRef)

  useEffect(() => {
    if (user && user.email === ADMIN_EMAIL) {
      router.push("/admin")
    }
  }, [user, router])

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
      // Force email to be admin email for this specific portal
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password)
      toast({ title: "Welcome back, Admin!", description: "Accessing Technical Hub Dashboard." })
      router.push("/admin")
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

  const handleInitializeAdmin = async () => {
    if (!auth || !firestore || !initPassword) return
    if (initPassword.length < 6) {
      toast({ variant: "destructive", title: "Weak Key", description: "Password must be at least 6 characters." })
      return
    }

    setInitLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, initPassword)
      
      await setDoc(doc(firestore, "users", userCredential.user.uid), {
        email: ADMIN_EMAIL,
        role: "admin",
        createdAt: serverTimestamp()
      })

      await setDoc(doc(firestore, "system", "config"), {
        adminInitialized: true,
        initializedAt: serverTimestamp()
      })

      toast({ title: "Hub Initialized", description: "Admin account created. Accessing Dashboard..." })
      router.push("/admin")
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "Init Failed", 
        description: error.message || "Could not initialize account." 
      })
    } finally {
      setInitLoading(false)
    }
  }

  const isSystemInitialized = config && (config as any).adminInitialized === true

  if (configLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Calibrating Hub...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-6 md:p-12 relative">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-black uppercase text-[10px] tracking-widest z-50">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <div className="w-full max-w-[400px] space-y-8 animate-in fade-in duration-700">
        {isUnauthorized && (
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-900 rounded-3xl overflow-hidden shadow-sm">
            <ShieldAlert className="h-5 w-5" />
            <AlertTitle className="font-black uppercase text-[10px] tracking-widest mb-1">Access Restricted</AlertTitle>
            <AlertDescription className="text-xs font-bold leading-tight">
              Only {ADMIN_EMAIL} is permitted to access the administrative matrix.
            </AlertDescription>
          </Alert>
        )}

        {!isSystemInitialized && (
          <div className="bg-primary/5 border border-primary/20 rounded-[2.5rem] p-10 space-y-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 -skew-x-12 translate-x-8 -translate-y-8" />
            
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-white shadow-sm border border-primary/10">
                <Key className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-black font-headline text-lg uppercase tracking-tight text-slate-900">One-Time Setup</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Register Administrative Master Key</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">Target Account: {ADMIN_EMAIL}</label>
                <input
                  placeholder="Create Master Password"
                  type="password"
                  className="w-full h-14 rounded-2xl border border-primary/20 outline-none px-6 text-sm font-bold bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                  value={initPassword}
                  onChange={(e) => setInitPassword(e.target.value)}
                  autoFocus
                />
              </div>
              <button
                onClick={handleInitializeAdmin}
                disabled={initLoading || !initPassword}
                className="w-full h-14 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center border-none transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100"
              >
                {initLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Finalize Admin Creation"}
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-[3rem] shadow-[rgba(0,0,0,0.1)_0px_40px_80px_-15px] p-12 flex flex-col relative overflow-hidden border border-slate-100">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 -skew-x-12 translate-x-16 -translate-y-16 pointer-events-none" />
          
          <div className="flex flex-col items-center mb-10">
            <div className="flex items-center justify-center w-20 h-20 rounded-3xl bg-slate-50 mb-6 shadow-inner border border-slate-100 relative group overflow-hidden">
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity" />
              <Droplets className="w-10 h-10 text-primary relative z-10" />
            </div>
            
            <h2 className="text-3xl font-black font-headline text-center text-slate-900 leading-tight tracking-tight uppercase">
              Admin <span className="text-primary">Hub</span>
            </h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Technical Authentication Required</p>
          </div>

          <form onSubmit={handleSignIn} className="w-full space-y-5 mb-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-5">Admin Identity</label>
              <input
                disabled
                value={ADMIN_EMAIL}
                className="w-full h-16 rounded-[1.5rem] border border-slate-100 outline-none px-8 text-sm text-slate-400 bg-slate-50 transition-all font-bold opacity-70"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-5">Master Key</label>
              <input
                placeholder="Password"
                type="password"
                required
                value={password}
                className="w-full h-16 rounded-[1.5rem] border border-slate-100 outline-none px-8 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-16 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-sm rounded-[1.5rem] shadow-2xl shadow-slate-900/20 transition-all flex items-center justify-center border-none hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100"
            >
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Authenticate Hub Access"}
            </button>
          </form>

          <div className="space-y-4 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Restricted Administrative Portal
            </p>
            <div className="w-12 h-1 bg-primary/10 mx-auto rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
