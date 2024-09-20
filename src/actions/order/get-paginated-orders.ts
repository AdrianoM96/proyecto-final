import axios from 'axios';

interface PaginationOptions {
  page?: number;
  take?: number;
  user?:any
}

export const getPaginatedAllOrders = async ({
  page = 1,
  take = 12,
  user
  
}: PaginationOptions) => {
 
  try {
   
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: take.toString()
    }).toString();

    if ( user.role !== 'admin'  ) {
      return {
        ok: false,
        message: 'Debe de estar autenticado'
      }
    }

    
    const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/orders?${queryParams}`);

    
    const { orders, totalPages, currentPage } = response.data;
  

   
    return {
      currentPage,
      totalPages,
      orderss:orders
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return{ orders:[]}
  }
};
