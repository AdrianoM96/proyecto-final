'use server';

import axios from "axios";


export const createPreference = async (orderTr:any, orderId:string): Promise<string | null> => {
    
    const items = orderTr.orderItems.map((item:any) => ({
      title: item.product.name,      
      quantity: item.quantity,       
      price: item.price                     
    }));
 
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/mercadopago/create-preference`, {
       items,
       orderId: orderId
      })
   
      const { id } = response.data

      return id
    } catch (error) {
      console.error("Error creating preference:", error)
      return null
    }
  }