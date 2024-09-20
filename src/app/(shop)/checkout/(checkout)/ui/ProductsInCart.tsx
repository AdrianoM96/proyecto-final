'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import { ProductImage } from '@/components';



export const ProductsInCart = () => {



  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore( state => state.cart );


  useEffect(() => {
    setLoaded(true) ;
  }, []);

  if( !loaded ) {
    return <p>Loading...</p>
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={ `${ product.name }-${ product.size }`  } className="flex mb-5">
     
           <ProductImage
                width={100}
                height={100}
                src={product.image}
                alt={product.name}
                className="mr-5 rounded"
              />

          <div>
            <span>
              { product.size } - {product.name} ({ product.quantity })
            </span>
            
            <p className="font-bold">{ currencyFormat(product.price * product.quantity )  }</p>

          </div>
        </div>
      ))}
    </>
  );
};
