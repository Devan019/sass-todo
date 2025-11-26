"use client"
import React, { useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const page = () => {

  const router = useRouter();
  const {signUp, isLoaded, setActive,} = useSignUp();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isVerificationStep, setisVerificationStep] = useState(false);
  const [message, setmessage] = useState("")
  const [code, setcode] = useState("")

  if(!isLoaded){
    return null;
  }

  const registration = async(e: React.FormEvent) => {
    e.preventDefault();
    if(!isLoaded) return;

    try {
      await signUp.create({
        emailAddress : email,
        password : password
      })

      await signUp.prepareEmailAddressVerification({
        strategy : 'email_code'
      })

      setisVerificationStep(true);
      setmessage("Verification code sent to your email address");
    } catch (error: any) {
      console.log(error)
      setisVerificationStep(false);
      setmessage(error.errors[0]?.message || "Something went wrong");
    }
  }

  const verificationOtp = async(e: React.FormEvent) => {
    e.preventDefault();
    if(!isLoaded) return;
    try {
      const completeSignup = await signUp.attemptEmailAddressVerification({code : code}); 
      
      if(completeSignup.status !== "complete"){
        setmessage("invalid code")
        return;
      }

      if(completeSignup.status === "complete"){
        await setActive({
          session : completeSignup.createdSessionId
        })
        router.push("/dashboard")
      }
    } catch (error: any) {
      console.log(error)
      setmessage(error.errors[0]?.message || "Something went wrong");
    }
  }


  return (
    <div>
      {!isVerificationStep ? (
        <form onSubmit={registration}>
          <h1>Sign Up</h1>
          <input type="email" placeholder='Email' value={email} onChange={(e) => setemail(e.target.value)} required />
          <input type="password" placeholder='Password' value={password} onChange={(e) => setpassword(e.target.value)} required />
          <button type='submit'>Register</button>
          <div id="clerk-captcha"></div>

          {message && <p>{message}</p>}
        </form>
      ) : (
        <form onSubmit={verificationOtp}>
          <h1>Verify Your Email</h1>
          <input type="text" placeholder='Enter Verification Code' value={code} onChange={(e) => setcode(e.target.value)} required />
          <button type='submit'>Verify</button>
          {message && <p>{message}</p>}
        </form>
      )}

    </div>
  )
}


export default page