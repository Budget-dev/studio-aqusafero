
"use client"

import * as React from "react"
import { useState, useEffect, useMemo, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Droplets, Loader2, ArrowLeft, ShieldAlert, Key, ShieldCheck, Mail } from "lucide-react"
import { useAuth, useFirestore, useDoc, useUser } from "@/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const ADMIN_EMAIL = 'aquasaferoworks@gmail.com';

function AdminLoginForm() {
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
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password)
      toast({ title: "Welcome back", description: "Loading your dashboard..." })
      router.push("/admin")
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "Sign In Failed", 
        description: "Invalid login credentials." 
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInitializeAdmin = async () => {
    if (!auth || !firestore || !initPassword) return
    if (initPassword.length < 6) {
      toast({ variant: "destructive", title: "Weak Password", description: "Password must be at least 6 characters." })
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

      toast({ title: "Admin Setup Done", description: "Your account is ready." })
      router.push("/admin")
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "Setup Failed", 
        description: error.message || "Could not initialize admin account." 
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
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-6 md:p-12 relative">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-bold uppercase text-[10px] tracking-widest z-50">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <div className="w-full max-w-[400px] space-y-8 animate-in fade-in duration-700">
        {isUnauthorized && (
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-900 rounded-2xl overflow-hidden shadow-sm">
            <ShieldAlert className="h-5 w-5" />
            <AlertTitle className="font-black uppercase text-[10px] tracking-widest mb-1">Access Denied</AlertTitle>
            <AlertDescription className="text-xs font-bold leading-tight">
              Only authorized administrators can access this portal.
            </AlertDescription>
          </Alert>
        )}

        {!isSystemInitialized && (
          <div className="bg-primary/5 border border-primary/20 rounded-[2rem] p-10 space-y-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white shadow-sm border border-primary/10">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-black font-headline text-lg uppercase tracking-tight text-slate-900">Admin Setup</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Create the first admin account</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">Email: {ADMIN_EMAIL}</label>
                <input
                  placeholder="Create Password"
                  type="password"
                  className="w-full h-14 rounded-xl border border-primary/20 outline-none px-6 text-sm font-bold bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                  value={initPassword}
                  onChange={(e) => setInitPassword(e.target.value)}
                  autoFocus
                />
              </div>
              <button
                onClick={handleInitializeAdmin}
                disabled={initLoading || !initPassword}
                className="w-full h-14 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-xl shadow-primary/20 flex items-center justify-center border-none transition-all"
              >
                {initLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Complete Setup"}
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-[2.5rem] shadow-xl p-10 flex flex-col relative overflow-hidden border border-slate-100">
          <div className="flex flex-col items-center mb-10">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-50 mb-4 border border-slate-100">
              <Droplets className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-black font-headline text-center text-slate-900 leading-tight tracking-tight uppercase">
              Admin <span className="text-primary">Portal</span>
            </h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Staff Sign In Required</p>
          </div>

          <form onSubmit={handleSignIn} className="w-full space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                <input
                  disabled
                  value={ADMIN_EMAIL}
                  className="w-full h-14 pl-12 rounded-xl border border-slate-100 outline-none text-sm text-slate-400 bg-slate-50 font-semibold opacity-70"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Password</label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                <input
                  placeholder="Enter password"
                  type="password"
                  required
                  value={password}
                  className="w-full h-14 pl-12 rounded-xl border border-slate-100 outline-none text-sm text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all font-semibold"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-xl shadow-slate-900/10 transition-all flex items-center justify-center border-none mt-2"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Portal...</p>
      </div>
    }>
      <AdminLoginForm />
    </Suspense>
  )
}
