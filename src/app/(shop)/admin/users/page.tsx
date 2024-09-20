'use client'


import { getPaginatedAllUsers } from '@/actions';
import { Pagination, Title, useAuth } from '@/components';


import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { UsersTable } from './ui/UsersTable';

interface Props {
  searchParams: {
    page?: string; 
  }
}

export default function UsersPage({ searchParams }: Props) {

  const page = searchParams.page ? parseInt( searchParams.page ) : 1;
  

  const [currentPage, setCurrentPage] = useState<number>(1); 
  const [totalPages, setTotalPages] = useState<number>(1); 

  const {user} = useAuth()

  
  const [users, setUsers] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    
    const onUserPage= async () => {
      try {
      if (!user) return
      setIsLoading(true)
       const { users, currentPage, totalPages } = await getPaginatedAllUsers({ page, user });
       setUsers(users); 
        setCurrentPage(currentPage); 
        setTotalPages(totalPages); 
       
        
      } catch (error) {
        console.error("Failed to fetch users:", error)
      } finally {
        setIsLoading(false)
      }
    }
    onUserPage()
}, [user,page])


if (isLoading) {
  return <p>Loading...</p>
}


return (
  <>
    <Title title="Mantenimiento de usuarios" />

    <div className="mb-10">
      {users.length === 0 ? (
        <p>No tienes usuarios para ver</p>
      ) : (
        <UsersTable users={users}/>
      )}
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  </>
)
}