export const revalidate = 60; 
import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';




interface Props {
  params: {
    gender: string;
  },
  searchParams: {
    page?: string; 
  }
}


export default async function GenderByPage({ params, searchParams }: Props) {

  const { gender } = params;
 

  const page = searchParams.page ? parseInt( searchParams.page ) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({ 
    page, 
    gender: gender as any,
  });

  if (!products || products.length === 0) {
    
    return (
      <div>
        <Title
          title="Tienda"
          subtitle="No hay productos disponibles"
          className="mb-2"
        />
        <p>No se encontraron productos para la página solicitada.</p>
     
      </div>
    );
  }

  const labels: Record<string, string>  = {
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
        title={`Artículos de ${ labels[gender] }`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid 
        products={ products }
      />

      <Pagination totalPages={ totalPages }  />
      
    </>
  );
}