'use server';

import axios from "axios";


async function getOrder (userId:string) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/orders/user/${userId}`)
  return res.data
}
export const getOrdersByUser = async(user:any) => {

 
  const userId = user?._id;
  
  
  if ( !userId ) {
    return {
      ok: false,
      message: 'Debe de estar autenticado'
    }
  }


  const orders = await getOrder(userId)
  


  return {
    ok: true,
    orders: orders,
  }


}