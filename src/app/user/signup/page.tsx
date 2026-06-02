
"use client"

import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Droplets, Loader2, ArrowLeft, Mail, Key, Phone, Calendar } from "lucide-react"
import { useAuth, useFirestore } from "@/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { useToast } from "@/hooks/use-toast"
import { errorEmitter } from "@/firebase/error-emitter"
import { FirestorePermissionError } from "@/firebase/errors"

export default function UserSignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [age, setAge] = useState("")
  const [loading, setLoading] = useState(false)
  
  const { auth } = useAuth()
  const firestore = useFirestore()
  const router = useRouter()
  const { toast } = useToast()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!auth) return

    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      if (firestore) {
        const userDocRef = doc(firestore, "users", user.uid);
        const userData = {
          email: user.email,
          phone: phone,
          age: parseInt(age),
          role: "user",
          createdAt: serverTimestamp()
        };

        setDoc(userDocRef, userData)
          .catch(async (serverError) => {
            const permissionError = new FirestorePermissionError({
              path: userDocRef.path,
              operation: 'create',
              requestResourceData: userData,
            });
            errorEmitter.emit('permission-error', permissionError);
          });
      }

      toast({ title: "Account Created!", description: "Welcome to AquaSafe." })
      router.push("/")
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "Sign up failed", 
        description: error.message || "We couldn't create your account right now." 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-6 relative">
      <Link href="/user/login" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-bold uppercase text-[10px] tracking-widest z-50">
        <ArrowLeft className="h-4 w-4" /> Back to Login
      </Link>

      <div className="w-full max-w-[450px] space-y-10">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
            <Droplets className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black font-headline uppercase tracking-tight text-slate-900">Join <span className="text-primary">AquaSafe</span></h1>
          <p className="text-slate-500 font-medium">Create an account to track your orders and get support.</p>
        </div>

        <form onSubmit={handleSignUp} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 pl-12 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-semibold"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Password</label>
            <div className="relative">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 pl-12 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-semibold"
                placeholder="At least 6 characters"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Age</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
              <input
                type="number"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full h-14 pl-12 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-semibold"
                placeholder="Years"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Phone</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-14 pl-12 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-semibold"
                placeholder="Phone number"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 w-full h-14 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-xl shadow-slate-900/10 transition-all flex items-center justify-center border-none mt-2"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create Account"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm font-medium text-slate-500">
            Already have an account? <Link href="/user/login" className="text-primary font-black uppercase tracking-widest text-xs ml-1 hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
