'use server'

import axios from 'axios';

interface PaginationOptions {
  page?: number;
  take?: number;
  user?:any
}

export const getPaginatedAllUsers = async ({
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

    
    const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/users?${queryParams}`);

    const { users, totalPages, currentPage } = response.data;

    return {
      currentPage,
      totalPages,
      users:users
    };
  } catch (error) {
    console.error("Error fetching users:");
    return{ users:[]}
  }
};
