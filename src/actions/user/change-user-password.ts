'use server';


import axios from 'axios';
import { revalidatePath } from 'next/cache';


export const changeUserPassword = async( userId: any, token:string, currentPassword:string, newPassword:string, confirmPassword:string) => {


    if(newPassword !== confirmPassword){
        return {
            ok:false,
            message:"Las contraseñas no coinciden"
        }
    }
    if((newPassword || confirmPassword).length < 6){
      return {
          ok:false,
          message:"Las contraseñas no coinciden"
      }
  }

  try {
    const updateUser = await axios.put(`${process.env.NEXT_PUBLIC_URL}/users/password/${userId}`,{ currentPassword: currentPassword, newPassword:newPassword
     }, 
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        withCredentials: true, 
      }
    );

    revalidatePath('/admin/users');

    return {
      users:updateUser.data,
      message:"Contraseña actualizada con exito",
      ok: true
      
    }
    
  } catch (error: any) {
    if (error.response) {
       
        return {
            ok:false,
            message:error.response.data.message
        }
    } else {
        return {
            ok:false,
            message:"Error de red"
        }
    }
}
};