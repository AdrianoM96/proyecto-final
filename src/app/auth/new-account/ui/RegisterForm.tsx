"use client";

import clsx from 'clsx';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useEffect, useState } from 'react';

import {useAuth} from '../../../../components/providers/Providers'
import Image from 'next/image';


type FormInputs = {
  name: string;
  email: string;
  password: string;  
}


export const RegisterForm = () => {

   
  const {signUp,isAuthenticated,errorsProvider} = useAuth()
  
  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit, formState: {errors} } = useForm<FormInputs>({
    mode: 'onSubmit' 
  });
  const [pending, setPending] = useState(false)
  
 
  const onSubmit: SubmitHandler<FormInputs> = async(data) => {
    setErrorMessage('');
    
    const resp = await signUp(data) 
  }
  useEffect(() => {
  
     if (isAuthenticated) window.location.replace('/');
     else {setPending(false)}
  }, [isAuthenticated]);

 
  return (
    <div className="max-w-xl w-full mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <h1 className="text-4xl font-medium">Registro</h1>



    <form onSubmit={ handleSubmit( onSubmit ) }  className="my-10">
    <div className="flex flex-col space-y-5">

          <label htmlFor="usuario">
            <p className="font-medium text-slate-700 pb-2">Usuario</p>
            <input
              className={clsx(
                "w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow",
                { 'border-red-500': errors.email }
              )}
              placeholder="Enter your user"
              autoFocus
              type="text"
              { ...register('name', { required: true }) }
            />
            {
        errors.name && (<p className='text-red-500'>El nombre es requerido</p>)
      }
          </label>


          <label htmlFor="email">
            <p className="font-medium text-slate-700 pb-2">Correo electrónico</p>
            <input
              className={clsx(
                "w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow",
                { 'border-red-500': errors.email }
              )}
              placeholder="Enter your email"
              type="email"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />
            {
        errors.email && (<p className='text-red-500'>El email es requerido</p>)
      }
          </label>

      

          <label htmlFor="password">
            <p className="font-medium text-slate-700 pb-2">Contraseña</p>
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
     
        <span className="text-red-500">{ errorsProvider } </span>
  
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
            <span>Crear cuenta</span>
          </button>

          <p className="text-center">
            No te has registrado?{' '}

            <Link href="/auth/login" >
              <button
                className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
                onClick={() => setErrorMessage("")}>
                Ingresar
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </button>
            </Link>
          </p>

 
      </div >
    </form>
    </div>
  );
};
