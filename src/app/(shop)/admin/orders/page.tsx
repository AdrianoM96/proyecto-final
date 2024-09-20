'use client'
import { getPaginatedAllOrders } from '@/actions';
import { Pagination, Title, useAuth } from '@/components';
import { Order } from '@/interfaces/all.interface';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoCardOutline } from 'react-icons/io5';


interface Props {
  searchParams: {
    page?: string; 
  }
}

export default function OrdersPage({ searchParams }: Props) {

  const page = searchParams.page ? parseInt( searchParams.page ) : 1;
  
  const [currentPage, setCurrentPage] = useState<number>(1); 
  const [totalPages, setTotalPages] = useState<number>(1); 

  const {user} = useAuth()
 
  
  
  const [orderss, setOrderss] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    
    const onOrderPage= async () => {
      try {
      if (!user) return
      setIsLoading(true)
    
       const { orderss, currentPage, totalPages } = await getPaginatedAllOrders({ page, user });
        setOrderss(orderss); 
        setCurrentPage(currentPage); 
        setTotalPages(totalPages); 
        
      } catch (error) {
        console.error("Failed to fetch orders:", error)
      } finally {
        setIsLoading(false)
      }
    }
onOrderPage()
}, [user,page])


if (isLoading) {
  return <p>Loading...</p>
}


return (
  <>
    <Title title="Todas las ordenes" />

    <div className="mb-10">
      {orderss.length === 0 ? (
        <p>No tienes ordenes disponibles</p>
      ) : (
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #ID
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Nombre completo
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Estado
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {orderss.map((order) => (
              <tr
                key={order._id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order._id.split("-").at(-1)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.orderAddress?.firstName} {order.orderAddress?.lastName}
                </td>
                <td className="flex items-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.isPaid ? (
                    <>
                      <IoCardOutline className="text-green-800" />
                      <span className="mx-2 text-green-800">Pagada</span>
                    </>
                  ) : (
                    <>
                      <IoCardOutline className="text-red-800" />
                      <span className="mx-2 text-red-800">No Pagada</span>
                    </>
                  )}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  <Link href={`/orders/${order._id}`} className="hover:underline">
                    Ver orden
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  </>
)
}