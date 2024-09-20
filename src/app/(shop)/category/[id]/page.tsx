import { ProductGrid, Title } from '@/components';
import { Category } from '@/interfaces';



interface Props {
  params: {
    id: Category;
  }
}


export default function({ params }: Props) {

  const { id } = params;
  

  const labels: Record<Category, string>  = {
    'men': 'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos'
  }

  // if ( id === 'kids' ) {
  //   notFound();
  // }


  return (
    <>
      <Title
        title={`Artículos de ${ labels[id] }`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid 
        products={ products }
      />
      
    </>
  );
}