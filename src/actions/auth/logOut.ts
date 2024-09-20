'use server';

import axios from "axios";


export const logOut = async() => {

  
    try {
        const logOutRequest = await axios.post(`${process.env.NEXT_PUBLIC_URL}/auth/logout`, {}, { withCredentials: true });
 
        return  { 
          ok:true,
          logOutRequest:logOutRequest,
          message:"Usuario deslogueado"}
        
    
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          message: 'Hubo un error al desloguear'
        }
      }
}