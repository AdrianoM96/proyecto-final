'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie'
import { addCompanyData, getCompanyData } from '@/actions'

type FormData = {
  name: string
  address: string
  city: string
  phone: string
  email: string
  condition: string
  cuit: string
  iibb: string
  activityStart: string
}

export default function CompanyData() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const cookie = Cookies.get()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    mode: 'onChange',
  });

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await getCompanyData(cookie.token)
        if (response.ok) {
          reset(response.dataCompany)
        }
      } catch (error) {
        console.error('Error fetching company data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCompanyData()
  }, [cookie.token, reset])

  const onSubmit = async (data: FormData) => {
    try {
      console.log(data)
      const response = await addCompanyData(data, cookie.token)
      if (response.ok) {
        router.push('/admin/company')
      } else {
        console.error('Error saving company data:', response.message)
        // You might want to show an error message to the user here
      }
    } catch (error) {
      console.error('Error submitting company data:', error)
      // You might want to show an error message to the user here
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Datos Fiscales de la Empresa
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {Object.keys(errors).length > 0 && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> Por favor, complete todos los campos requeridos.</span>
              </div>
            )}
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                id="name"
                {...register('name', { required: true })}
                type="text"
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección</label>
              <input
                id="address"
                {...register('address', { required: true })}
                type="text"
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ciudad</label>
              <input
                id="city"
                {...register('city', { required: true })}
                type="text"
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
              <input
                id="phone"
                {...register('phone', { required: true })}
                type="text"
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                {...register('email', { required: true })}
                type="email"
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Condición</label>
              <input
                id="condition"
                {...register('condition', { required: true })}
                type="text"
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="cuit" className="block text-sm font-medium text-gray-700">CUIT</label>
              <input
                id="cuit"
                {...register('cuit', { required: true })}
                type="text"
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="iibb" className="block text-sm font-medium text-gray-700">IIBB</label>
              <input
                id="iibb"
                {...register('iibb', { required: true })}
                type="text"
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="activityStart" className="block text-sm font-medium text-gray-700">Inicio de Actividad</label>
              <input
                id="activityStart"
                {...register('activityStart', { required: true })}
                type="text"
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Guardar Datos Fiscales
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}