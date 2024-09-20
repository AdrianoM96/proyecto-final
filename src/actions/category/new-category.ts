'use server';

import axios from 'axios';

async function addCategory(category:string, token:string){
 
  const newCategory = await axios.post(`${process.env.NEXT_PUBLIC_URL}/categories`, {name:category},
    {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
      withCredentials: true, 
    }
  );
  return newCategory.data
}

export const createCategory = async(category:string, token:string) => {

  try {
    
    const newCategory = await addCategory(category, token)

    return {
      ok:true,
      message:"Categoria agregada con exito",
      category:newCategory
    };


  } catch (error:any) {
    console.log(error)
    console.error("Error al crear la categoría:", error.response?.data || error.message || error);
    return {
        ok: false,
        message:"Error al crear la categoria"
    }
  }
}


