'use client';


import Link from 'next/link';

import { Product } from '@/interfaces';
import { useState } from 'react';
import { ProductImage } from '@/components';

interface Props {
  product: Product;
}


export const ProductGridItem = ( { product }: Props ) => {

  const [displayImage, setDisplayImage] = useState(product.images[0]);

 const defaultValue = "/imgs/placeholder.jpg"

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.name}`}>
      { product.images[0] ?
           <ProductImage
           src={`${displayImage}`}
           width={500}
           height={500}
           alt={product.name}
           className="w-full object-cover rounded"
           onMouseEnter={() => {
            if (product.images[1]) {
              setDisplayImage(product.images[1]);
            }
          }}
           onMouseLeave={() => setDisplayImage(product.images[0] )}
         />
       :
        <ProductImage
          src={defaultValue}
          width={500}
          height={500}
          alt={product.name}
          className="w-full object-cover rounded"
          onMouseEnter={() => setDisplayImage(defaultValue )}
          onMouseLeave={() => setDisplayImage(defaultValue )}
        />
      }  
      </Link>

      <div className="p-4 flex flex-col">
        <Link
          className="hover:text-blue-600"
          href={ `/product/${ product.name }` }>
          { product.name }
        </Link>
        <span className="font-bold">${ product.price }</span>
      </div>

    </div>
  );
};