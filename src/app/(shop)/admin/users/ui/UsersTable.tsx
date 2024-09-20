'use client';

import { changeUserRole } from "@/actions";
import { useAuth } from "@/components";
import Cookies from 'js-cookie';
import { useState } from "react";

interface Props {
  users: any[];
}

export const UsersTable = ({ users }: Props) => {
    
    const {user} = useAuth()
    const cookie = Cookies.get()
    const [isUpdating, setIsUpdating] = useState(false);
    const [allUsers, setAllUsers] = useState<any[]>(users);


    const handleRoleChange = async (userId: string, newRole: string) => {
        setIsUpdating(true);
        try {
          const updatedUser = await changeUserRole(userId, newRole, user, cookie.token);
           setAllUsers(prevUsers => 
             prevUsers.map(u => u._id === updatedUser.users._id ? updatedUser.users : u)
           );
        } catch (error) {
          console.error("Error al cambiar el rol:", error);
         
        } finally {
          setIsUpdating(false);
        }
      };

  return (
    <table className="min-w-full">
      <thead className="bg-gray-200 border-b">
        <tr>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Email
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Nombre completo
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Role
          </th>

        </tr>
      </thead>
      <tbody>
        {allUsers.map((u) => (
          <tr
            key={u._id}
            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              { u.email }
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              { u.name }
            </td>
            <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              
              <select 
                value={u.role}
                onChange={(e) => handleRoleChange(u._id, e.target.value)}
                className="text-sm w-full p-2 text-gray-900"
                disabled={isUpdating === u._id}>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>     
            </td>      
          </tr>
        ))}
      </tbody>
    </table>
  );
};
