
"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Droplets, Loader2, ArrowLeft, ShieldAlert, Key, ShieldCheck } from "lucide-react"
import { useAuth, useFirestore, useDoc } from "@/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [initLoading, setInitLoading] = useState(false)
  const [isUnauthorized, setIsUnauthorized] = useState(false)
  
  // Initialization state
  const [initPassword, setInitPassword] = useState("")
  
  const { auth } = useAuth()
  const firestore = useFirestore()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  // Check if system is initialized
  const systemConfigRef = firestore ? doc(firestore, "system", "config") : null
  const { data: config, loading: configLoading } = useDoc(systemConfigRef)

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
      await signInWithEmailAndPassword(auth, email, password)
      
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

  const handleInitializeAdmin = async () => {
    if (!auth || !firestore || !initPassword) return
    if (initPassword.length < 6) {
      toast({ variant: "destructive", title: "Weak Key", description: "Password must be at least 6 characters." })
      return
    }

    setInitLoading(true)
    const adminEmail = 'aquasaferoworks@gmail.com'

    try {
      // 1. Create the Auth User
      const userCredential = await createUserWithEmailAndPassword(auth, adminEmail, initPassword)
      
      // 2. Create the User Profile
      await setDoc(doc(firestore, "users", userCredential.user.uid), {
        email: adminEmail,
        role: "admin",
        createdAt: serverTimestamp()
      })

      // 3. Mark system as initialized
      await setDoc(doc(firestore, "system", "config"), {
        adminInitialized: true,
        initializedAt: serverTimestamp()
      })

      toast({ title: "Hub Initialized", description: "Admin account created. You can now sign in." })
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

        {/* One-Time Initialization Block */}
        {!configLoading && !isSystemInitialized && (
          <div className="bg-primary/5 border border-primary/20 rounded-[2.5rem] p-8 mb-4 animate-in fade-in zoom-in duration-700">
            <div className="flex items-center gap-3 mb-4">
              <Key className="h-5 w-5 text-primary" />
              <h3 className="font-black font-headline text-sm uppercase tracking-tight text-slate-900">One-Time Setup</h3>
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Set Master Password for aquasaferoworks@gmail.com</p>
            <div className="space-y-4">
              <input
                placeholder="Secure Master Key"
                type="password"
                className="w-full h-12 rounded-xl border border-primary/20 outline-none px-4 text-sm font-bold bg-white"
                value={initPassword}
                onChange={(e) => setInitPassword(e.target.value)}
              />
              <button
                onClick={handleInitializeAdmin}
                disabled={initLoading}
                className="w-full h-12 bg-primary text-white font-black uppercase tracking-widest text-[10px] rounded-xl shadow-lg flex items-center justify-center border-none"
              >
                {initLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm Initialization"}
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-[2.5rem] shadow-[rgba(0,0,0,0.2)_0px_25px_50px_-12px] p-10 flex flex-col relative overflow-hidden">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center border-none"
            >
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Authenticate Access"}
            </button>
          </form>

          <p className="text-[10px] text-slate-400 font-bold text-center tracking-wide">
            Official Administrative Portal for AquaSafe RO Works
          </p>
        </div>
      </div>
    </div>
  )
}
