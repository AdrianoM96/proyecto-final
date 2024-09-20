'use client'

import Link from "next/link"
import { SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../components/providers/Providers'

type FormInputs = {
  email: string;
  password: string;  
}

export const LoginForm = () => {
  const { register, handleSubmit, formState: {errors} } = useForm<FormInputs>({
    mode: 'onSubmit'
  });
  const { signIn, isAuthenticated, errorsProvider, setErrors } = useAuth()
  const [pending, setPending] = useState(false)

  const onSubmit: SubmitHandler<FormInputs> = async(data) => {
    setPending(true);
    setErrors(null); 
    await signIn(data);
    setPending(false);
  }

  useEffect(() => {
    if (isAuthenticated) window.location.replace('/');
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <label htmlFor="email">Correo electrónico</label>
        <input
          className={clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
            { 'border-red-500': errors.email }
          )}
          type="email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />

        <label htmlFor="password">Contraseña</label>
        <input
          className={clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
            { 'border-red-500': errors.password }
          )}
          type="password"
          {...register('password', { required: true, minLength: 6 })}
        />

        { <span className="text-red-500 mb-7">{errorsProvider}</span>}

        <button
          className={clsx({
            "btn-primary": !pending,
            "btn-disabled": pending,
          })}
          disabled={pending}
        >
          Ingresar
        </button>

        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/new-account"  className="btn-secondary text-center">
        <button onClick={ () => setErrors("") }>
          Crear cuenta
        </button>
        </Link>
      </form>
    </div>
  )
}