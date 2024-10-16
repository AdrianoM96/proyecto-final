'use server';

import axios from "axios";

    async function updateOrder(orderId: string, transactionId: string, token: any,  paymentMethod?: string) {
      let isPaid;
      let paidAt ;
    
      if (paymentMethod === "mercadopago") {
        isPaid = true;
        paidAt = new Date();
      }
    
      const res = await axios.put(`${process.env.NEXT_PUBLIC_URL}/orders/${orderId}`,
        {transactionId,isPaid,paidAt,paymentMethod},  
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      
      return res.data;
    }


export const setTransactionId = async( orderId: string, transactionId: string, token:any, paymentMethod?: string ) => {

  try {
    console.log("EMPEZO LA TRANSACTION")


    const order = await updateOrder(orderId,transactionId,token, paymentMethod)
    console.log("TERMINO LA TRRANSACION")

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