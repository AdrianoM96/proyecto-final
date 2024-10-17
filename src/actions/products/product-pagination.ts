import axios from 'axios';


interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: string;
  search?: string;
  category?:string;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender,
  search,
  category,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;
  try {
    
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: take.toString(),
      ...(gender && { gender }),
      ...(search && { search }), 
      ...(category && { category }), 
    }).toString();

   
    const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/products?${queryParams}`);

    
    const { products, totalPages, currentPage, productsAdmin } = response.data;

    
    return {
      currentPage,
      totalPages,
      products,
      productsAdmin
    };
  
  } catch (error) {
   
    return{ products:[]}
    
  }
};
