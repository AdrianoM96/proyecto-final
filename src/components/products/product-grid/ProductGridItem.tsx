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

 function formatProductName(name:string) {
  const formattedName = name
    .split('-') 
    .map(word => word.toLowerCase()) 
    .join(' '); 

  
  return formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
}

  return (
    <div className="group overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
      <Link href={`/product/${product.name}`} className="block aspect-square overflow-hidden">
      { product.images[0] ?
           <ProductImage
           src={`${displayImage}`}
           width={500}
           height={500}
           alt={product.name}
         
           className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
         
           className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onMouseEnter={() => setDisplayImage(defaultValue )}
          onMouseLeave={() => setDisplayImage(defaultValue )}
        />
      }  
      </Link>

      <div className="p-4 bg-white">
        <Link 
          href={`/product/${product.name}`} 
          className="block text-lg font-semibold text-gray-800 hover:text-blue-600 truncate"
        >
          {formatProductName(product.name)}
        </Link>
        <span className="mt-2 block text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
      </div>
    </div>
  );
};