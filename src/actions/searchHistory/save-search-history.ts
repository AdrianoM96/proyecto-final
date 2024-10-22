'use server';
import axios from 'axios'

export const addSearchHistory = async (userId:any,search:string,token:string ) => {

  try {
    

    const addData = await axios.post(`${process.env.NEXT_PUBLIC_URL}/search-history/save-search-history?search=${encodeURIComponent(search)}`, {userId},
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
          withCredentials: true, 
        }
      );

    return {
        ok:true,
        searchHistory:addData.data,
        message:"Se ha agregado la informacio correctamente",
    }

  } catch (error: unknown) {
      return {
        ok: false,
        message: "Error al guardar el historial"
    }  
  }
}