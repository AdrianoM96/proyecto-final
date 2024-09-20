'use server';

import axios from "axios";

async function updateOrder(orderId: string, transactionId: string, token: string) {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_URL}/orders/${orderId}`, 
    { transactionId },  
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, 
    }
  );
  return res.data; 
}


export const setTransactionId = async( orderId: string, transactionId: string, token:string ) => {

  try {
    
    const order = await updateOrder(orderId,transactionId,token)

    if ( !order ) {
      return {
        ok:false,
        message: `No se encontró una orden con el ${ orderId }`,
      }
    }
   

    return { ok: true }


  } catch (error) {
    
    console.log(error);

    return {
      ok: false,
      message: 'No se pudo actualizar el id de la transacción'
    }

  }

}