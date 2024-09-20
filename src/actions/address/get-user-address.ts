'use server';

import axios from "axios";




export const getUserAddress = async( userId: string ) => {
 
  try {

 
    const address = await axios.get(`${process.env.NEXT_PUBLIC_URL}/user-addresses/user/${userId}`);
   

     if ( !address ) return null;

    

     const { address2, ...rest } = address.data;

    return {
       ...rest,
      address2: address2 ? address2 : '',
    };


  } catch (error) {
    console.log(error );
    return null;
  }
}




