import { Product } from '@/interfaces';
import { ProductGridItem } from './ProductGridItem';

interface Props {
  products: Product[];
}

export const ProductGrid = ( { products }: Props ) => {
  


  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
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