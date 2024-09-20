"use server";

import type { Address } from "@/interfaces";
import axios from "axios";


export const setUserAddress = async (address: Address, userId: string, token:string) => {


  try {
    const newAddress = await createOrReplaceAddress( address, userId, token );

    return {
      ok: true,
      address: newAddress,
    }

  } catch (error:any) {
    console.error("Error al intentar guardar la dirección1 :", error.response?.data || error.message);
    return {
      ok: false,
      message: "No se pudo grabar la dirección",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string, token:string) => {
  try {
    let storedAddress = null;
  
    
    try {
     
      storedAddress = await axios.get(`${process.env.NEXT_PUBLIC_URL}/user-addresses/user/${userId}`);
   
      
    } catch (error:any) {
      
      if (error.response?.status !== 404) {
     
        throw error;
      }
     
  
    }
    
 
    const addressToSave = {
      user: userId,
      address: address.address,
      address2: address.address2,
      country: address.country,
      city: address.city,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone, 
      postalCode: address.postalCode,
    };
   

     if (!storedAddress?.data || "" ) {
 
          const newAddress = await axios.post(`${process.env.NEXT_PUBLIC_URL}/user-addresses`,addressToSave,
         {
           headers: {
             Authorization: `Bearer ${token}`, 
           },
           withCredentials: true, 
         }
       );
       return newAddress.data
     }
  
     const updatedAddress = await axios.put(`${process.env.NEXT_PUBLIC_URL}/user-addresses/${storedAddress.data._id}`,addressToSave,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        withCredentials: true, 
      }
    );
      return updatedAddress.data;



  } catch (error:any) {
    console.error("Error al intentar guardar la dirección:", error.response?.data || error.message);
  }
};
