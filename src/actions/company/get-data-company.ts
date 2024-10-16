'use server';
import axios from 'axios'

export const getCompanyData = async (token:string ) => {

  try {
    const getData = await axios.get(`${process.env.NEXT_PUBLIC_URL}/seller/getData`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
          withCredentials: true, 
        }
      );
    return {
        ok:true,
        dataCompany:getData.data,
        message:"Se ha cargado la informacion correctamente",
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