export const revalidate = 86400;


import { notFound } from 'next/navigation';

import { titleFont } from '@/config/fonts';
import { ProductMobileSlideshow, ProductSlideshow} from '@/components';

import { getProductBySlug,getProductSizesAvaibles } from "@/actions";
import { Metadata, ResolvingMetadata } from 'next';
import { AddToCart } from './ui/AddToCart';

interface Props {
  params: {
    name: string;
  };
}


export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
 
  const name = params.name;

  const product = await getProductBySlug(name);


  return {
    title: product?.name ?? "Producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.name ?? "Producto no encontrado",
      description: product?.description ?? "",
     
      images: [ `/products/${ product?.images[1] }`],
    },
  };
}




export default async function ProductBySlugPage( { params }: Props ) {
  
  
  const { name } = params;
  
  const product = await getProductBySlug(name)
  const sizes = await getProductSizesAvaibles()

     if ( !product ) {
       notFound();
     }
  
  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
    
      <div className="col-span-1 md:col-span-2 ">
        
       
         <ProductMobileSlideshow 
          title={ product.name }
          images={ product.images }
          className="block md:hidden"
        /> 
        
       
         <ProductSlideshow 
          title={ product.name }
          images={ product.images }
          className="hidden md:block"
        /> *

        
      </div>

      
      <div className="col-span-1 px-5">

        <h1 className={ ` ${ titleFont.className } antialiased font-bold text-xl` }>
           { product.name } 
        </h1>
         <p className="text-lg mb-5">${ product.price }</p> 

         <AddToCart product={product} allSizes={sizes.allSizes} />


        
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">
           { product.description } 
        </p>

      </div>

    </div>
  );
}