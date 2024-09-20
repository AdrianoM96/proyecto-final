'use server';

import axios from 'axios';
import {v2 as cloudinary} from 'cloudinary';
import { revalidatePath } from 'next/cache';

cloudinary.config( process.env.CLOUDINARY_URL ?? '' );

export const deleteProductImage = async( imageId: number, imageUrl: string, token:string ) => {

  if ( !imageUrl.startsWith('http') ) {
    return {
      ok: false,
      error: 'No se pueden borrar imagenes de FS'
    }
  }

  const imageName = imageUrl
    .split('/')
    .pop()
    ?.split('.')[0] ?? '';

 

  try {
    

    await cloudinary.uploader.destroy( imageName );
    const deletedImage = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/product-images/${imageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
          withCredentials: true, 
        }
      );



   
    revalidatePath(`/admin/products`)
    revalidatePath(`/admin/product/${ deletedImage.data.product.name }`);
    revalidatePath(`/product/${ deletedImage.data.product.name }`);

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo eliminar la imagen'
    }
  }




}
