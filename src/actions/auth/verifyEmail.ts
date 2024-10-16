'use server';
import axios from 'axios'

export const verifyEmail = async (email:string, token:string  ) => {


  try {
    const verifyTokenRequest = await axios.post(`${process.env.NEXT_PUBLIC_URL}/email/send-verification`, {email},
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
          withCredentials: true, 
        }
      );
    return {
        ok:true,
        verifyTokenRequest:verifyTokenRequest.data,
        message:"Se ha enviado un correo de verificación a tu dirección de email. Por favor, revisa tu bandeja de entrada y sigue las instrucciones para completar la verificación.",
    }

  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        ok: false,
        message: error.response.data.message
      }
    } else {
      return {
        ok: false,
        message: "Error al enviar el correo de verificación. Por favor, inténtalo de nuevo más tarde."
      }
    }  
  }
}