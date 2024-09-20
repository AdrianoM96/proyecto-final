"use client";

import { useState } from "react";

import { QuantitySelector, SizeSelector } from "@/components";
import type { CartProduct, Product } from "@/interfaces";
import { useCartStore } from '@/store';

interface Props {
  product: Product;
  allSizes: string[]
}

export const AddToCart = ({ product }: Props) => {

   const addProductToCart = useCartStore( state => state.addProductTocart );

  const [size, setSize] = useState<string | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);

    if (!size) return;

    const cartProduct: CartProduct = {
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0]
    }

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);


  };


  return (
    <>
      {posted && !size && (
        <span className="mt-2 text-red-500 fade-in">
          Debe de seleccionar una talla*
        </span>
      )}

     
      <SizeSelector
        selectedSize={size}
        availableSizes={product.stocks}
        onSizeChanged={setSize}
      />
  
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      <button onClick={addToCart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};