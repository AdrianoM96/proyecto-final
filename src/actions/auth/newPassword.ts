'use server';
import axios from 'axios'

export const newPassword = async (tokenPassword:string, data:any  ) => {

  try {
    const addNewPassword = await axios.post(`${process.env.NEXT_PUBLIC_URL}/email/reset-password`, {tokenPassword,data},
        
      );
    return {
        ok:true,
        addNewPassword:addNewPassword.data,
        message:"Se ha establecido la nueva contraseña con éxito",
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
        message: "Error al establecer la nueva contraseña. Vuelva a intentarlo"
      }
    }  
  }
}