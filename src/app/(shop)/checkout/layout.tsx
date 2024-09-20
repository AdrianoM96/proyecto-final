import { redirect } from 'next/navigation';
import { useAuth } from '@/components';
import { verifyToken } from '@/actions';
import Cookies from 'js-cookie';
import { cookies } from 'next/headers'

export default async function CheckoutLayout({children}: {
 children: React.ReactNode;
}) {
    const cookieStore = cookies()
    const token = (cookieStore.get('token')?.value)


    const user = await verifyToken(token || "");
    
     if (!token) {

        redirect("/auth/login?redirectTo=/checkout/address");
     }

  
  return (
    <>
    { children }
    </>
  );
}