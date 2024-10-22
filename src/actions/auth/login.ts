'use server';
import { User } from '@/interfaces/user';
import axios from 'axios'



export const login = async ( user:User ) => {

  try {
    user.email = user.email.toLowerCase().trim()
    const loginRequest = await axios.post(`${process.env.NEXT_PUBLIC_URL}/auth/login`,user,{withCredentials:true})
    


    return  { 
      ok:true,
      loginRequest:loginRequest.data,
      message:"Usuario logueado"}
    

  } catch (error) {
    console.log(error);


    return {
      ok: false,
      message: 'Los datos son incorrectos'
    }
  }

  

}