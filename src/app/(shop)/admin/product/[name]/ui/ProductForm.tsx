"use client";

import { createUpdateProduct, deleteProductImage } from '@/actions';
import { ProductImage } from '@/components';
import { Category, Product } from '@/interfaces';
import { useEffect, useCallback, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface Props {
  product: Product | null;
  categories: Category[]
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const cookie = Cookies.get();

interface FormInputs {
  name: string;
  description: string;
  price: number;
  sizes: string;
  currentStock: number;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  category: string;
  stocks: any;
  images?: FileList;
  isPaused: boolean;
}

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      name: product?.name ?? '',
      description: product?.description ?? '',
      price: product?.price ?? 0,
      sizes: product?.sizes?.[0] ?? sizes[0],
      currentStock: product?.stocks?.[0]?.quantity ?? 0,
      gender: product?.gender ?? 'men',
      category: product?.category?._id ?? [],
      stocks: product?.stocks ?? [],
      images: undefined,
      isPaused: product?.isPaused ?? false,
    }
  });

  const watchSizes = useWatch({ control, name: 'sizes' });
  const watchCurrentStock = useWatch({ control, name: 'currentStock' });

  const updateCurrentStock = useCallback((size: string) => {
    const stockForSize = product?.stocks?.find((stock: any) => stock.size.name === size);
    setValue('currentStock', stockForSize ? stockForSize.quantity : 0);
  }, [product, setValue]);

  useEffect(() => {
    if (watchSizes) {
      updateCurrentStock(watchSizes);
    }
  }, [watchSizes, updateCurrentStock]);

  useEffect(() => {
    const updatedStocks = product?.stocks?.map((stock: any) => {
      if (stock.size.name === watchSizes) {
        return { ...stock, quantity: watchCurrentStock };
      }
      return stock;
    }) ?? [];
    setValue('stocks', updatedStocks);
  }, [watchCurrentStock, watchSizes, setValue, product?.stocks]);

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();

    const { images, ...productToSave } = data;

    if (product?._id) {
      formData.append("_id", product._id);
    }

    formData.append("name", productToSave.name);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price.toString());
    formData.append("sizes", productToSave.sizes.toString());
    formData.append("category", productToSave.category);
    formData.append("gender", productToSave.gender);
    formData.append('stocks', JSON.stringify(data.stocks));
    formData.append("currentStock", productToSave.currentStock.toString());
    formData.append("isPaused", productToSave.isPaused.toString());

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    const { ok, product: updatedProduct } = await createUpdateProduct(formData, cookie.token);

    if (!ok) {
      return;
    }else{
     
      setMessage("Guardado con éxito")
    }

    router.replace(`/admin/product/${updatedProduct?.name}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Nombre</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('name', {
            required: 'El nombre es obligatorio',
            minLength: {
              value: 6,
              message: 'El nombre debe tener al menos 6 caracteres'
            }
          })} />
          {errors.name && <p className='text-base text-red-500'>{errors.name.message}</p>}
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
              ))
            }
          </select>
        </div>

        <div className="inline-flex items-center mb-10 ">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="checkbox"
          >
            <input
              type="checkbox"
              className="border-gray-500 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
              id="checkbox"
              {...register('isPaused')}
            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </label>
          <span>¿Pausar publicación?</span>
        </div>

        <button className="btn-primary w-full">
          Guardar
        </button>
        <span className='text-lg text-green-500' >
          {message && message}
          </span>
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
              {...register('images', {
                validate: {
                  required: (value: any) => {
                    if (!product?.images || product.images.length === 0) {
                      return value.length > 0 || 'Debes subir al menos una imagen';
                    }
                    return true;
                  }
                }
              })}
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
            />
            {errors.images && <p className='text-lg text-red-500'>{errors.images.message}</p>}
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
            {
              product?.images?.map((image: any) => (
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