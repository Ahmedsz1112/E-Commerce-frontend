"use client"
import React, { useRef, useState } from "react";
import { BASE_URL } from "./constants/url";
import { useAuth } from "./context/Auth/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const[error , setError]= useState("")
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const {login} = useAuth()
    const router = useRouter()

    async function onSubmit(){
      const firstName = firstNameRef.current?.value
      const lastName = lastNameRef.current?.value
      const email = emailRef.current?.value
      const password = passwordRef.current?.value

      if(!firstName || !lastName || !email || !password){
        return;
      }

      const person = {
        firstName,
        lastName,
        email,
        password
      }

      // fetching
      
      const response = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(person)
      })

      if(!response.ok){
        setError("error!!!!!!!!!!!!!!!!!!!!!!!")
        return;
      }

      const token = await response.json()

      if(!token){
        setError("Iconrect token")
        return;
      }
      
      login(email , token)
      router.push("/")
    }

    

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 mb-7 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign Up to your account
        </h2>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-3" action="#" method="POST">
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm/6 font-medium text-gray-900"
            >
              First Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="firstname"
                ref={firstNameRef}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Last Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="lastname"
                ref={lastNameRef}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                ref={emailRef}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                ref={passwordRef}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
            onClick={onSubmit}
              type="button"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
            {error && <p className="text-amber-600">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
