
import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';

interface Props {
    searchParams: {
        query?: string;
        page?: string;
    };
}

export default async function SearchPage({ searchParams }: Props) {

    const query = searchParams.query || '';
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    
    const { products, totalPages } = await getPaginatedProductsWithImages({ page });

    
    const filteredProducts = products.filter((product: { name: string; description: string; }) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <Title title="Resultados de la búsqueda" subtitle={`Buscaste: "${query}"`} className="mb-2" />

            {filteredProducts.length === 0 ? (
                <p>No se encontraron productos que coincidan con tu búsqueda.</p>
            ) : (
                <ProductGrid products={filteredProducts} />
            )}
             <Pagination totalPages={ totalPages } />
        </div>
    );
}
