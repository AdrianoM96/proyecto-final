import { RecoverPasswordForm } from './ui/RecoverPasswordForm'

interface Props {
  searchParams: { 
    token?: string
   }
}

export default function RecoverPasswordPage({ searchParams }: Props) {
  const { token } = searchParams

  return (
    <div className="antialiased bg-slate-100 min-h-screen flex items-center justify-center">
      {token ? (
        <RecoverPasswordForm token={token} />
      ) : (
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Invalid Token</h1>
          <p className="text-gray-600">
            The password recovery link is invalid or has expired. Please request a new password reset.
            El link para recuperar la contraseña es invalido o ha expirado. Por favor pide una recuperacion de contraseña nuevamente
          </p>
        </div>
      )}
    </div>
  )
}