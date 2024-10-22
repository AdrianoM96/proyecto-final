'use server';
import axios from 'axios'

export const recoveryPassword = async (email:string, token:string  ) => {


  try {
    const verifyTokenRecovery = await axios.post(`${process.env.NEXT_PUBLIC_URL}/email/send-recovery`, {email},
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
          withCredentials: true, 
        }
      );
    return {
        ok:true,
        verifyTokenRecovery:verifyTokenRecovery.data,
        message:"Se ha enviado un correo para recuperar tu contraseña a tu dirección de email. Por favor, revisa tu bandeja de entrada.",
    }

  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      
      return {
        ok: false,
        message: error.response.data.error
      }
    } else {
      return {
        ok: false,
        message: "Error al enviar el correode recuperacíon. Por favor, inténtalo de nuevo más tarde."
      }
    }  
  }
}