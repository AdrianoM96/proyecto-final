'use client'

import { useAuth } from "@/components";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { changeUserPassword, verifyEmail } from "@/actions";

export default function ProfilePage() {
  const { isAuthenticated, user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const cookie = Cookies.get()
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(user?.emailVerified || false);
  const [messageEmail, setMessageEmail] = useState('')
  const [showEmailMessage, setShowEmailMessage] = useState(false);

  useEffect(() => {
    if (messageEmail) {
      setShowEmailMessage(true);
    }
  }, [messageEmail]);

  if (!isAuthenticated || !user) {
    redirect('/');
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const {ok, message} = await changeUserPassword(user._id, cookie.token, currentPassword, newPassword, confirmPassword)  
    setMessage(message)
    setStatus(ok)
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleEmailVerification = async () => {
    const data = await verifyEmail(user.email, cookie.token)
    if (data.ok) {
      setMessageEmail(data.message);
      setStatus(true);
    } else {
      setMessageEmail(data.message);
      setStatus(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Perfil de Usuario</h2>
          <div className="space-y-6">
            <div className="flex items-center space-x-4 bg-white p-3 rounded-lg shadow-sm">
              <span className="text-gray-600 font-medium">Nombre:</span>
              <span className="text-gray-800 font-semibold">{user.name}</span>
            </div>
            <div className="flex items-center space-x-4 bg-white p-3 rounded-lg shadow-sm">
              <span className="text-gray-600 font-medium">Email:</span>
              <span className="text-gray-800 font-semibold">{user.email}</span>
            </div>
            <div className="flex items-center space-x-4 bg-white p-3 rounded-lg shadow-sm">
              <span className="text-gray-600 font-medium">Estado del email:</span>
              <span className={`font-semibold ${isEmailVerified ? 'text-green-600' : 'text-red-600'}`}>
                {isEmailVerified ? 'Verificado' : 'No verificado'}
              </span>
            </div>
            {!isEmailVerified && (
              <button
                onClick={handleEmailVerification}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md"
              >
                Verificar Email
              </button>
            )}
            {showEmailMessage && (
              <div className={`mt-4 p-4 rounded-lg ${status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} transition-all duration-300 ease-in-out`}>
                <p className="text-sm">{messageEmail}</p>
              </div>
            )}
          </div>
        </div>
        <div className="px-8 py-6 bg-gray-100 space-y-4 border-t border-gray-200">
          <Link 
            href="/orders" 
            className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 shadow-md"
          >
            Ver Órdenes
          </Link>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="flex items-center justify-center w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-4 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Cambiar Contraseña
          </button>
        </div>
      </div>
      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>Proyecto final © 2024</p>
        <div className="mt-2 space-x-4">
          <Link href="/" className="hover:underline">Privacidad & Legal</Link>
        </div>
      </footer>
  
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Cambiar Contraseña</h3>
            {message && (
              <p className={`mb-4 ${status ? 'text-green-600' : 'text-red-600'} bg-gray-50 p-3 rounded-lg`}>
                {message}
              </p>
            )}
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
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md"
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