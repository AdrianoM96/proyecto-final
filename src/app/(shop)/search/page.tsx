
import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';

interface Props {
    searchParams: {
        search?: string;
        page?: string;
    };
}

export default async function SearchPage({ searchParams }: Props) {

    const search = searchParams.search || '';
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
  
   
    const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page, search });

   
    
    const filteredProducts = search
    ? products.filter((product: { name: string; description: string; }) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
    )
    : products;


    return (
        <div>
            <Title title="Resultados de la búsqueda" subtitle={`Buscaste: "${search}"`} className="mb-2" />

            {filteredProducts.length === 0 ? (
                <p>No se encontraron productos que coincidan con tu búsqueda.</p>
            ) : (
                <ProductGrid products={filteredProducts} />
            )}
             <Pagination totalPages={ totalPages } />
        </div>
    );
}
