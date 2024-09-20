'use server';
import { User } from '@/interfaces/user';
import axios from 'axios'

export const verifyToken = async (token:string  ) => {

  try {
    const verifyTokenRequest = await axios.get(`${process.env.NEXT_PUBLIC_URL}/auth/verify`, {
        headers: {
          Authorization: `${token}`,
        }, withCredentials: true,
      });
    
   token=""
    return {
        ok:true,
        verifyTokenRequest:verifyTokenRequest.data,
        message:"Token verificado",
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