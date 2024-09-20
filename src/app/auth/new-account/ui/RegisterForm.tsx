"use client";

import clsx from 'clsx';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useEffect, useState } from 'react';

import {useAuth} from '../../../../components/providers/Providers'



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
    <form onSubmit={ handleSubmit( onSubmit ) }  className="flex flex-col">


      <label htmlFor="email">Nombre completo</label>
      <input
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
            {
              'border-red-500': errors.name
            }
          )
        }
        type="text"
        autoFocus
        { ...register('name', { required: true }) }
      />{
        errors.name && (<p className='text-red-500'>El nombre es requerido</p>)
      }

      <label htmlFor="email">Correo electrónico</label>
      <input
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
            {
              'border-red-500': errors.email
            }
          )
        }
        type="email"
        { ...register('email', { required: true, pattern: /^\S+@\S+$/i }) }
      />{
        errors.email && (<p className='text-red-500'>El email es requerido</p>)
      }

      <label htmlFor="email">Contraseña</label>
      <input
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
            {
              'border-red-500': errors.password
            }
          )
        }
        type="password"
        { ...register('password', { required: true, minLength: 6 }) }
      />
{
        errors.password && (<p className='text-red-500'>La contraseña es requerida y debe tener mas de 6 caracteres</p>)
      }
      
        <span className="text-red-500">{ errorsProvider } </span>
        
      <button className="btn-primary" >Crear cuenta</button>

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
      <button onClick={ () => setErrorMessage("") }>

        Ingresar
      </button>
      </Link>
    </form>
  );
};
