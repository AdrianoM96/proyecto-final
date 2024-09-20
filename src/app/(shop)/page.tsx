export const revalidate = 60;



import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';



interface Props {
  searchParams: {
    page?: string; 
  }
}


export default async function Home({ searchParams }: Props) {

  const page = searchParams.page ? parseInt( searchParams.page ) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({ page });

  
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


  return (
   
    <>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid 
        products={ products }
      />


      <Pagination totalPages={ totalPages } />
      
    </>
  );
}
