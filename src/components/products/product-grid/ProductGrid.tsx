import { Product } from '@/interfaces';
import { ProductGridItem } from './ProductGridItem';

interface Props {
  products: Product[];
}

export const ProductGrid = ( { products }: Props ) => {
  


  return (
  
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {
        products
          .filter(product => !product.isPaused) 
          .map(product => (
            <ProductGridItem
              key={product._id}
              product={product}
            />
          ))
      }

    </div>
  );
};