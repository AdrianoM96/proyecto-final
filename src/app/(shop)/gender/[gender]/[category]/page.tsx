export const revalidate = 60; 
import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';




interface Props {
  params: {
    category: string;
    gender:string
  },
  searchParams: {
    page?: string; 
  }
}


export default async function CategoryByPage({ params, searchParams }: Props) {
console.log("paramssss")
console.log(params)
  const { category, gender } = params;
  console.log("category")
  console.log(category)
  console.log("gender")
  console.log(gender)
  const page = searchParams.page ? parseInt( searchParams.page ) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({ 
    page, 
    gender:gender as any,
    category: category as any,
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


  return (
    <>
      <Title
        title={`Artículos de ${ labels[category] }`}
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