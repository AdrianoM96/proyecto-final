import axios from 'axios';

interface PaginationOptions {
  page?: number;
  take?: number;
  user?:any
}

export const getPaginatedOrders = async ({
  page = 1,
  take = 12,
  user
  
}: PaginationOptions) => {
 
  try {
    
    const queryParams = new URLSearchParams({
      id:user?._id,
      page: page.toString(),
      limit: take.toString()
    }).toString();

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
