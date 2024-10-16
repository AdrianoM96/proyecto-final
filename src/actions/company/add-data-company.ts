'use server';
import axios from 'axios'

export const addCompanyData = async (data:any,token:string ) => {

  try {
    const addData = await axios.post(`${process.env.NEXT_PUBLIC_URL}/seller/addSeller`, data,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
          withCredentials: true, 
        }
      );
    return {
        ok:true,
        verifyTokenRequest:addData.data,
        message:"Se ha agregado la informacio correctamente",
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
        message: "Error al establecer los datos"
      }
    }  
  }
}