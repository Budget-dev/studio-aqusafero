
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RedirectToUserSignup() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace("/user/signup")
  }, [router])

  return null
}
