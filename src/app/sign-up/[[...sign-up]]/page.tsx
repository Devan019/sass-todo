"use client"
import  { useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { RegistrationForm } from '@/components/register-form'
import { VerificationForm } from '@/components/validation-form'


const SignUpPage = () => {
  const router = useRouter()
  const { signUp, isLoaded, setActive } = useSignUp()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isVerificationStep, setIsVerificationStep] = useState(false)
  const [message, setMessage] = useState("")
  const [code, setCode] = useState("")

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    )
  }

  const registration = async (e:any) => {
    e.preventDefault()
    if (!isLoaded) return

    try {
      await signUp.create({
        emailAddress: email,
        password: password
      })
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code'
      })
      setIsVerificationStep(true)
      setMessage("Verification code sent to your email address")
    } catch (error:any) {
      console.log(error)
      setIsVerificationStep(false)
      setMessage(error.errors[0]?.message || "Something went wrong")
    }
  }

  const verificationOtp = async (e:any) => {
    e.preventDefault()
    if (!isLoaded) return

    try {
      const completeSignup = await signUp.attemptEmailAddressVerification({ code: code })

      if (completeSignup.status !== "complete") {
        setMessage("Invalid verification code")
        return
      }
      if (completeSignup.status === "complete") {
        await setActive({
          session: completeSignup.createdSessionId
        })
        router.push("/dashboard")
      }
    } catch (error:any) {
      console.log(error)
      setMessage(error.errors[0]?.message || "Something went wrong")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {!isVerificationStep ? (
        <RegistrationForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={registration}
          message={message}
        />
      ) : (
        <VerificationForm
          code={code}
          setCode={setCode}
          onSubmit={verificationOtp}
          message={message}
        />
      )}

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

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
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

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
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

export default SignUpPage