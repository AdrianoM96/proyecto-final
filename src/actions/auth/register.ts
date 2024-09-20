'use server';

import { User } from '@/interfaces/user';

import axios from 'axios'



export const registerUser = async ( user: User ) => {

  try {
    user.email = user.email.toLowerCase().trim()
    const registerRequest = await axios.post(`${process.env.NEXT_PUBLIC_URL}/auth/register`,user,{withCredentials:true})

   
    return {
        ok:true,
        
        registerRequest:registerRequest.data,
        message:"Usuario creado",
    }

  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      
      const errorMessage = error.response.data.message || 'Error desconocido';
      return {
        ok: false,
        message: error.response.data.message
      }
    } else {
      console.error('Error desconocido:', error);
      return {
        ok: false,
        message: "Error al registar un usuario"
      }
    }

    
  }

  

}