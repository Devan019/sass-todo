"use client"
import { SignInForm } from '@/components/sign-in';
import { SignedIn, useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'



const SignInPage = () => {
  const router = useRouter()
  const { isLoaded, signIn, setActive } = useSignIn()
  const [message, setMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mx-auto"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  const formHandler = async (e:any) => {
    e.preventDefault()

    try {
      const result = await signIn?.create({
        identifier: userData.email,
        password: userData.password
      })

      if (result?.status === "complete") {
        if (setActive) {
          await setActive({
            session: result.createdSessionId
          })
        }
        router.push("/dashboard")
      }

      console.log(result)
    } catch (error:any) {
      setMessage(error.errors[0]?.message || "Something went wrong")
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <SignInForm
        userData={userData}
        setUserData={setUserData}
        onSubmit={formHandler}
        message={message}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      <style jsx global>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default SignInPage