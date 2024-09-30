'use client'
import { createCategory, getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductImage, Title, useAuth } from '@/components';


import Link from 'next/link';
import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { currencyFormat } from '@/utils';
import { revalidate } from '../../page';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import { IoSearchOutline } from 'react-icons/io5';

interface Props {
  searchParams: {
    page?: string;
    search?: string;
  }
}

export default function OrdersPage({ searchParams }: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const search = searchParams.search || '';

  const router = useRouter(); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { user } = useAuth()
  const cookie = Cookies.get()

  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true)

  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const [searchQuery, setSearchQuery] = useState(''); 

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/admin/products?search=${searchQuery.trim()}`);  
    }  else {
      router.push('/admin/products');
    }
  };

  const filteredProducts = search
  ? products.filter((product: { name: string; description: string; }) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
  )
  : products;
  console.log("filteredProducts")
  console.log(filteredProducts)
  useEffect(() => {

    const onOrderPage = async () => {
      try {
        if (!user) return
        setIsLoading(true)
        const { productsAdmin, currentPage, totalPages } = await getPaginatedProductsWithImages({ page,search });
        setProducts(productsAdmin);
        setCurrentPage(currentPage);
        setTotalPages(totalPages);

      } catch (error) {
        console.error("Failed to fetch orders:", error)
      } finally {
        setIsLoading(false)
      }
    }
    onOrderPage()
  }, [user, page,search])

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const {ok, message} = await createCategory(newCategory,cookie.token)  
      setMessage(message)
      setStatus(ok)
      setNewCategory('')

  };


  if (isLoading) {
    return <p>Loading...</p>
  }


  return (
    <>
      <Title title="Mantenimiento de productos" />
      <div className="flex justify-end space-x-4 mb-5">
        <Link href="/admin/product/new" className="btn-primary">
          Nuevo producto
        </Link>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary"
        >
          <span className="mr-2 h-4 w-4" /> Nueva categoría
        </button>
      </div>
      
      <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            className="border rounded-md p-1 mb-2"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="ml-2">
            <IoSearchOutline className="w-5 h-5" />
          </button>
        </form>
      <div className="mb-10 overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Imagen
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Titulo
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Precio
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Género
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Inventario y Tallas
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                 Publicacion pausada
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/product/${product.name}`}>
                    <ProductImage
                      src={product.images[0]?.url}
                      width={80}
                      height={80}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link href={`/admin/product/${product.name}`} className="hover:underline">
                    {product.name}
                  </Link>
                </td>
                <td className="text-sm font-bold text-gray-900 px-6 py-4 whitespace-nowrap">
                  {currencyFormat(product.price)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {product.gender}
                </td>
                <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  <div className="text-xs text-gray-600">
                    {product.stocks.map((stock: any) => (
                      <span
                        key={stock.size.name}
                        className={`
                          ${stock.quantity === 0 ? 'text-red-800 font-bold' : ''} 
                          ${stock.quantity === 1 || stock.quantity === 2 ? 'text-yellow-700 font-bold' : ''} 
                          ${stock.quantity > 2 ? 'text-black' : ''}
                        `}
                      >
                        {`${stock.size.name}:${stock.quantity}`}
                        {stock.size.name !== product.stocks[product.stocks.length - 1].size.name && ', '}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <div className="inline-flex items-center mb-10">
                    <label
                      className="relative flex cursor-pointer items-center rounded-full p-3"
                      htmlFor={`checkbox-${product._id}`}
                    >
                      <input
                        type="checkbox"
                        className="border-gray-500 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                        id={`checkbox-${product._id}`}
                        checked={product.isPaused} 
                        disabled
                      />
                      <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </label>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && <Pagination totalPages={totalPages} />}

        
         {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Nueva categoria</h3>
            {!status ?
              <span className="text-red-600">{message}</span>:
              <span className="text-green-600">{message}</span>
              }
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label htmlFor="newCategory" className="block text-sm font-medium text-gray-700 mb-1">Nueva categoria</label>
                <input
                  type="text"
                  id="newCategory"
                  value={newCategory}
                  onChange={(e) => {
                    const value = e.target.value;
                  
                    if (/^[^\d]*$/.test(value)) {
                      setNewCategory(value);
                    }
                  }}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>   
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);  
                    setNewCategory('');     
                    setMessage('')
                  }}
                  className="px-4 py-2 mt-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-300 ease-in-out"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 mt-2  rounded transition duration-300 ease-in-out
                     ${!newCategory ? 'bg-gray-400 text-gray-800 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}    
                  disabled={!newCategory}
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
  )
}


