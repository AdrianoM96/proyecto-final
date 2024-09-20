"use client";

import { createUpdateProduct, deleteProductImage } from '@/actions';
import { ProductImage } from '@/components';
import { Category } from '@/interfaces';

import { useEffect,useCallback  } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';

interface Props {
  product: any;
  categories: Category[]
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const cookie = Cookies.get()
interface FormInputs {
  name: string,
  description: string,
  quantity: number,
  price: number,
  sizes: any;
  currentStock: number;
  gender: 'men' | 'women' | 'kid',
  category: string,
  stocks: any
  images?: FileList

}

export const ProductForm = ({ product , categories }: Props) => {
  
   const router = useRouter();
 
  const {
    handleSubmit, register, control, formState: { errors,isValid },
    setValue,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      category: product.category?._id ?? [],
   
      sizes: sizes[0] , 
      currentStock: product?.stocks?.length > 0 ? product.stocks[0].quantity : 0,
      images:undefined,

    }
  })
  const watchSizes = useWatch({ control, name: 'sizes' });
  const watchCurrentStock = useWatch({ control, name: 'currentStock' });

  
  const updateCurrentStock = useCallback((size: string) => {
    const stockForSize = product?.stocks?.find((stock: any) => stock.size.name === size)
    setValue('currentStock', stockForSize ? stockForSize.quantity : 0)
  }, [product, setValue])

  
  useEffect(() => {
    if (watchSizes) {
      updateCurrentStock(watchSizes)
    }
  }, [watchSizes, updateCurrentStock])

  useEffect(() => {
    const updatedStocks = product?.stocks?.map((stock: any) => {
      if (stock.size.name === watchSizes) {
        return { ...stock, quantity: watchCurrentStock };
      }
      return stock;
    });
    setValue('stocks', updatedStocks);
  }, [watchCurrentStock, watchSizes,setValue,product?.stocks]);



  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();

    const { images, ...productToSave } = data;

    if (product._id) {
      formData.append("_id", product._id ?? "");
    }
   

    formData.append("name", productToSave.name);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price.toString());
    formData.append("sizes", productToSave.sizes.toString());
    formData.append("category", productToSave.category);
    formData.append("gender", productToSave.gender);
    formData.append('stocks', JSON.stringify(data.stocks));
    formData.append("currentStock",productToSave.currentStock.toString());

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

     const { ok, product:updatedProduct } = await createUpdateProduct(formData, cookie.token)
    

     if ( !ok ) {
         return;
     }

     router.replace(`/admin/product/${updatedProduct?.name }`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
    
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Nombre</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('name', { required: true })} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200" {...register('description', { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input type="number" className="p-2 border rounded-md bg-gray-200" {...register('price', { required: true, min: 0 })} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select className="p-2 border rounded-md bg-gray-200" {...register('gender', { required: true })} >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select className="p-2 border rounded-md bg-gray-200" {...register('category', { required: true })}>
            <option value="">[Seleccione]</option>
            {
              categories.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
              )
              )
            }
          </select>
        </div>

        <button className="btn-primary w-full">
          Guardar
        </button>
      </div>

    
      <div className="w-full">



    
        <div className="flex flex-col">

     

          <div className="flex flex-col mb-2">
            <span>Talla</span>
            <select
              className="p-2 border rounded-md bg-gray-200"
              {...register('sizes', { required: true })}
            >
              <option value="">[Seleccione]</option>
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col mb-2">
            <span>Stock Actual</span>
            <input
              type="number"
              className="p-2 border rounded-md bg-gray-200"
              {...register('currentStock', {
                required: true,
                min: 0,
                valueAsNumber: true
              })}
            />
          </div>


          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              type="file"
              {...register('images', { required: 'Debes subir al menos una imagen' })}
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
            />
            {errors.images && <p className='text-lg text-red-500'>{errors.images.message}</p>}

          </div>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
            {
              product.images?.map((image: any) => (
                <div key={image._id}>
                  <ProductImage
                    alt={product.name ?? ""}
                    src={image.url}
                    width={300}
                    height={300}
                    className="rounded-t shadow-md"
                  />

                  <button
                    type="button"
                    onClick={() => deleteProductImage(image._id, image.url, cookie.token)}
                    className="btn-danger w-full rounded-b-xl"
                  >
                    Eliminar
                  </button>
                </div>
              ))

            }

          </div>

        </div>
      </div>
    </form>
  );
};