"use client";

import clsx from 'clsx';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/Providers'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { newPassword } from '@/actions';

type FormInputs = {
  password: string;
  verifiedPassword: string;
}

interface RecoverPasswordFormProps {
  token: string
}

export function RecoverPasswordForm({ token }: RecoverPasswordFormProps) {
  const { isAuthenticated, errorsProvider } = useAuth()
  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormInputs>({
    mode: 'onSubmit'
  });

  const [pending, setPending] = useState(false)

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');
    const resp = await newPassword(token, data)
    if(resp.ok){
      window.location.replace('/auth/login');
    } else {
      setErrorMessage(resp.message)
    }
  }

  useEffect(() => {
    if (isAuthenticated) window.location.replace('/');
    else { setPending(false) }
  }, [isAuthenticated]);

  return (
    <div className="max-w-xl w-full mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <h1 className="text-4xl font-medium">Establecer contraseña</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="my-10">
        <div className="flex flex-col space-y-5">
          <label htmlFor="password">
            <p className="font-medium text-slate-700 pb-2">Contraseña</p>
            <input
              className={clsx(
                "w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow",
                { 'border-red-500': errors.password }
              )}
              placeholder="Enter your password"
              id="password"
              type="password"
              {...register('password', { 
                required: 'La contraseña es requerida', 
                minLength: { 
                  value: 6, 
                  message: 'La contraseña debe tener al menos 6 caracteres'
                } 
              })}
            />
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
          </label>

          <label htmlFor="verifiedPassword">
            <p className="font-medium text-slate-700 pb-2">Verificar contraseña</p>
            <input
              className={clsx(
                "w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow",
                { 'border-red-500': errors.verifiedPassword }
              )}
              placeholder="Enter your password again"
              type="password"
              {...register('verifiedPassword', {
                required: 'Por favor, confirme su contraseña',
                validate: (val: string) => {
                  if (watch('password') != val) {
                    return "Las contraseñas no coinciden";
                  }
                }
              })}
            />
            {errors.verifiedPassword && <p className='text-red-500'>{errors.verifiedPassword.message}</p>}
          </label>

          <span className="text-red-500">{errorsProvider}</span>
          <span className="text-red-500">{errorMessage}</span>

          <button
            type="submit"
            className={clsx({
              "w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center": !pending,
              "w-full py-3 font-medium text-white bg-gray-700 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center": pending,
            })}
            disabled={pending}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span>Crear Contraseña</span>
          </button>
        </div>
      </form>
    </div>
  );
}