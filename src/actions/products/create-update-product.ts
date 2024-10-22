'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';

import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');



const productSchema = z.object({
  _id: z.string().optional().nullable(),
  name: z.string().min(6).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform(val => Number(val.toFixed(2))),
  stocks: z.preprocess((val) => {
    if (typeof val === 'string') {
      try {
        return JSON.parse(val);
      } catch (e) {
        return [];
      }
    }
    return val; 
  },
    z.array(
      z.object({
        _id: z.string().optional(),
        size: z.object({
          _id: z.string(),
          name: z.string(),
        }),
        quantity: z.coerce.number().min(0), 
        product: z.string().optional(),
      })
    )
  ),
  category: z.string(),
  sizes: z.coerce.string().transform(val => val.split(',')),
  gender: z.enum(["men", "women", "kid", "unisex"]),
  currentStock: z.coerce.number().transform(val => Number(val.toFixed(2))),
  isPaused: z.string().transform(val => val.toLowerCase() === 'true')
});


async function updateProduct(id: string, product: any, token: string) {


  const res = await axios.put(`${process.env.NEXT_PUBLIC_URL}/products/${id}`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return res.data;

}
async function createProduct(product: any, token: string) {

  const transformedObject = {
    ...product,
    stocks: [{ quantity: parseInt(product.currentStock), size: product.sizes[0] }]
  };

  const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/products/`, transformedObject, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });


  return res.data;

}
async function uploadImagesBd(images: any, productId: any, token: string) {

  const transformedObject = {
    ...images,
    images: images.map((image: any) => ({
      url: image!,
      product: productId,
    }))
  };

  const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/product-images/`, transformedObject, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return res.data;

}

export const createUpdateProduct = async (formData: FormData, token: string) => {

  

  const data = Object.fromEntries(formData);


  const productParsed = productSchema.safeParse(data);
 
  
  if (!productParsed.success) {
    
    return { ok: false }
  }

  let product = productParsed.data;
  
  product.name = product.name.toLowerCase().replace(/ /g, '-').trim();

 

  const { _id, ...rest } = product;

  try {
   

    if (_id) {

      product = await updateProduct(_id, product, token)
   

    } else {
   

     
      product = await createProduct(product, token)
  
    }

  
    if (formData.getAll('images')) {
     
      const images = await uploadImages(formData.getAll('images') as File[]);
      if (!images) {
        throw new Error('No se pudo cargar las imágenes, rollingback');
      }

      if (images.length > 0) {
        await uploadImagesBd(images, product._id, token)
      }
    }

    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${product.name}`);
    revalidatePath(`/products/${product.name}`);

    return {
      ok: true,
      product
    }
   
  } catch (error) {
console.log(error)
    return {
      ok: false,
      message: 'No se pudo actualizar/crear'
    }
  }

}

const uploadImages = async (images: File[]) => {

  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');
        
        return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`)
          .then(r => r.secure_url);
 
      } catch (error) {
        console.log(error);
        return null;
      }
    })

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;

  } catch (error) {

    console.log(error);
    return null;

  }


}
