"use client"

import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Droplets, Loader2, ArrowLeft } from "lucide-react"
import { useAuth, useFirestore } from "@/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useToast } from "@/hooks/use-toast"
import { errorEmitter } from "@/firebase/error-emitter"
import { FirestorePermissionError } from "@/firebase/errors"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
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

      // Create user profile in Firestore
      if (firestore) {
        const userDocRef = doc(firestore, "users", user.uid);
        const userData = {
          email: user.email,
          phone: phone,
          role: "user"
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
    <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-slate-50 p-4 overflow-hidden">
      <Link href="/login" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-black uppercase text-[10px] tracking-widest">
        <ArrowLeft className="h-4 w-4" /> Back to Login
      </Link>

      <div className="w-[350px] bg-white rounded-xl shadow-[rgba(0,0,0,0.35)_0px_5px_15px] p-[20px_30px] flex flex-col">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white mb-6 shadow-[rgba(0,0,0,0.05)_0px_3px_8px]">
            <Droplets className="w-7 h-7 text-primary" />
          </div>
          
          <h2 className="text-[28px] font-extrabold font-headline mb-[30px] text-center text-slate-900 leading-tight">
            Create Account
          </h2>
        </div>

        <form onSubmit={handleSignUp} className="w-full flex flex-col gap-[18px] mb-[15px]">
          <input
            placeholder="Email"
            type="email"
            required
            value={email}
            className="w-full rounded-[20px] border border-[#c0c0c0] outline-0 p-[12px_15px] text-sm text-slate-900 bg-white"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Phone Number"
            type="tel"
            required
            value={phone}
            className="w-full rounded-[20px] border border-[#c0c0c0] outline-0 p-[12px_15px] text-sm text-slate-900 bg-white"
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            placeholder="Password"
            type="password"
            required
            value={password}
            className="w-full rounded-[20px] border border-[#c0c0c0] outline-0 p-[12px_15px] text-sm text-slate-900 bg-white"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-primary hover:brightness-110 text-white font-bold text-sm rounded-[20px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] transition-all flex items-center justify-center"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Register"}
          </button>
        </form>

        <p className="text-[10px] text-[#747474] font-medium">
          Already have an account? <Link href="/login" className="text-[11px] font-extrabold text-primary underline ml-1">Sign In</Link>
        </p>
      </div>
    </div>
  )
}
