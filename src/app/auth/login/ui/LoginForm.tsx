'use client'

import Link from "next/link"
import { SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../components/providers/Providers'

import Cookies from 'js-cookie'
import { recoveryPassword } from "@/actions";




type FormInputs = {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    mode: 'onSubmit'
  });
  const { signIn, isAuthenticated, errorsProvider, setErrors } = useAuth()
  const [pending, setPending] = useState(false)

  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const cookie = Cookies.get()
  const [error, setError] = useState('')


  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setPending(true);
    setErrors(null);
    await signIn(data);
    setPending(false);
  }

  useEffect(() => {
    if (isAuthenticated ) window.location.replace('/');
  }, [isAuthenticated]);


  const handleForgotPassword = async () => {
 
    if (email) {
      const response = await recoveryPassword(email, cookie.token)
      if (response.ok) {
        setError(response.message)
        setEmailSent(true);
      } else {
        setError(response.message)
      }
    }

  };
  return (
    <div className="max-w-xl w-full mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <h1 className="text-4xl font-medium">Login</h1>

  

      <form onSubmit={handleSubmit(onSubmit)} className="my-10">
        <div className="flex flex-col space-y-5">
          <label htmlFor="email">
            <p className="font-medium text-slate-700 pb-2">Email</p>
            <input
              className={clsx(
                "w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow",
                { 'border-red-500': errors.email }
              )}
              placeholder="Enter email address"
              type="email"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />
          </label>


          <label htmlFor="password">
            <p className="font-medium text-slate-700 pb-2">Password</p>
            <input

              className={clsx(
                "w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow",
                { 'border-red-500': errors.password }
              )}
              placeholder="Enter your password"
              type="password"
              {...register('password', { required: true, minLength: 6 })}
            />
              {
        errors.password && (<p className='text-red-500'>La contraseña es requerida y debe tener mas de 6 caracteres</p>)
      }
          </label>

          <div className="flex flex-row justify-between">
            <button
              type="button"
              className="font-medium text-indigo-600"
              onClick={() => setShowModal(true)}
            >
              ¿Olvidaste tu contraseña?
            </button>

          </div>
          {<span className="text-red-500 mb-5">{errorsProvider}</span>}

          <button
            type="submit"
            className={clsx({
              "w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center": !pending,
              "w-full py-3 font-medium text-white bg-gray-700 border-indigo-500 inline-flex space-x-2 items-center justify-center": pending,
            })}
            disabled={pending}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span>Login</span>
          </button>

          <p className="text-center">
            No te has registrado?{' '}

            <Link href="/auth/new-account" >
              <button
                className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
                onClick={() => setErrors("")}>
                Registrate ahora
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </button>
            </Link>
          </p>
        </div>
      </form>

      {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
      <h2 className="text-lg font-semibold mb-4">Reestablecer contraseña</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
      />

      
      <div className="min-h-[1.5rem] mt-2">
        {error && <span className="text-red-500 block">{error}</span>}
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => {
            setShowModal(false);
            setError('');
            setEmail('');
          }}
          className="w-full py-3 font-medium text-white bg-red-500 hover:bg-red-400 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
        >
          Cancelar
        </button>
        <button
          onClick={() => {
            handleForgotPassword();
            setEmail('');
          }}
          className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
        >
          Recuperar contraseña
        </button>
      </div>
    </div>
  </div>
)}
    </div>

  )
}