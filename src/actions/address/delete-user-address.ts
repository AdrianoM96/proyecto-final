'use server';

import axios from "axios";


export const deleteUserAddress = async( userId: string, token:string ) => {

  try {

    const getuserAddress = await axios.get(`${process.env.NEXT_PUBLIC_URL}/user-addresses/user/${userId}`);
    
    const deleted = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/user-addresses/${getuserAddress.data._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        withCredentials: true, 
      }
    );
    

    return { ok: true };
    
  } catch (error) {
    console.log(error);
  
    return {
      ok: false,
      message: 'No se pudo eliminar la direccion'
    }


}
}