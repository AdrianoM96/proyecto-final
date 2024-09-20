'use server';


import axios from 'axios';
import { revalidatePath } from 'next/cache';


export const changeUserRole = async( userId: string, role: string, session:any, token:string ) => {

 

  if ( session.role !== 'admin' ) {
    return {  
      ok: false,
      message: 'Debe de estar autenticado como admin'
    }
  }

  try {

    const newRole = role === 'admin' ? 'admin':'user';

    const updateUser = await axios.put(`${process.env.NEXT_PUBLIC_URL}/users/role/${userId}`,{ role: newRole }, 
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
      ok: true
    }
    
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo actualizar el role, revisar logs'
    }
  }



}