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
  const [dataCompany, setDataCompany] = useState<FormData | null>(null)
  const cookie = Cookies.get()
  const excludedFields = ['_id', 'singleton', 'createdAt','updatedAt', '__v','dateNow'];

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    mode: 'onChange',
  });

  useEffect(() => {
    const fetchCompanyData = async () => {

        const response = await getCompanyData(cookie.token)
        if (response.ok) {
          setDataCompany(response.dataCompany)
        }

    }

    fetchCompanyData()
  }, [cookie.token])

  useEffect(() => {
    if (dataCompany) {
      reset(dataCompany)
    }
  }, [dataCompany, reset])

  const onSubmit = async (data: FormData) => {
  
      await addCompanyData(data, cookie.token)
   
      router.push('/admin/company')
 
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
           {dataCompany &&
              Object.keys(dataCompany)
                .filter(field => !excludedFields.includes(field)) 
                .map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                    {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <div className="mt-1">
                    <input
                      id={field}
                      {...register(field as keyof FormData, { required: true })}
                      type="text"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={dataCompany[field as keyof FormData] || ''}
                    />
                  </div>
                </div>
              ))}
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