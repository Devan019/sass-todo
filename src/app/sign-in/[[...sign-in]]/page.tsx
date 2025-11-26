"use client"
import { SignedIn, useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'

const page = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [message, setmessage] = useState("");


  const [UserData, setUserData] = useState({
    email: '',
    password: ''
  })

  const router = useRouter();

  const formHandeler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const result = await signIn?.create({
        identifier: UserData.email,
        password: UserData.password
      })

      if (result?.status === "complete") {
        if (setActive) {
          await setActive({
            session: result.createdSessionId
          });
        }
        router.push("/dashboard");
      }

      console.log(result)
    } catch (error:any) {
      setmessage(error.errors[0]?.message || "Something went wrong");
      console.log(error);
    }

  }

  if (!isLoaded) {
    return <>
      <h1>Loading...</h1>
    </>
  }


  return (
    <div>
      <h1>Sign In Page</h1>
      <form onSubmit={formHandeler}>
        <label>
          Email:
          <input
            type="email"
            value={UserData.email}
            onChange={(e) => setUserData({ ...UserData, email: e.target.value })}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={UserData.password}
            onChange={(e) => setUserData({ ...UserData, password: e.target.value })}
          />
        </label>
        <br />
        <button type="submit">Sign In</button>
         {message && <p>{message}</p>}
      </form>
    </div>
  )
}

export default page