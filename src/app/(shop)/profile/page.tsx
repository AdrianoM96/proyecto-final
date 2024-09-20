'use client'

import { useAuth } from "@/components";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import Cookies from 'js-cookie'
import { changeUserPassword } from "@/actions";

export default function ProfilePage() {
  const { isAuthenticated, user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const cookie = Cookies.get()
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(false);

  if (!isAuthenticated || !user) {
    redirect('/');
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const {ok, message} = await changeUserPassword(user._id,cookie.token,currentPassword,newPassword,confirmPassword)  
      setMessage(message)
      setStatus(ok)
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Perfil de Usuario</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-700">Nombre:</span>
              <span className="text-gray-600">{user.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-700">Email:</span>
              <span className="text-gray-600">{user.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-700">Rol:</span>
              <span className="capitalize text-gray-600">{user.role}</span>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 space-y-2">
          <Link 
            href="/orders" 
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Ver Órdenes
          </Link>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="flex items-center justify-center w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow transition duration-300 ease-in-out"
          >
            <span className="mr-2 h-4 w-4" /> Cambiar Contraseña
          </button>
        </div>
      </div>
      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>Proyecto final | shop © 2024</p>
        <div className="mt-2 space-x-4">
          <Link href="/privacy" className="hover:underline">Privacidad & Legal</Link>
          <Link href="/locations" className="hover:underline">Ubicaciones</Link>
        </div>
      </footer>

      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Cambiar Contraseña</h3>
            {!status ?
              <span className="text-red-600">{message}</span>:
              <span className="text-green-600">{message}</span>
              }
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Contraseña Actual</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmar Nueva Contraseña</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-300 ease-in-out"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}