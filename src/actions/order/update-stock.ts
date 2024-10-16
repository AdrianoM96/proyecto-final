'use server'

import axios from "axios";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: string;
  }

export const updateStock = async (productIds: ProductToOrder[], user: any, token: string, update?:boolean) => {
 
    
    const userId = user?._id;

    if (!userId) {
        return {
          ok: false,
          message: 'Debe de estar autenticado'
        };
      }

      const dataSend = {
        productIds,
        update
      }

    try {
       
        const orderTransaction = await axios.put(`${process.env.NEXT_PUBLIC_URL}/orders/stock`, dataSend, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true, 
        });
      
  

        return {
            ok: orderTransaction.data.ok,
            outStock:orderTransaction.data.errors
         };
    } catch (error: any) {
         
          console.error('Error al acutalizar el stock:', error.response?.data?.details || error.message);


        return {
            ok: false,
            message: error.response?.data?.details || 'Error actualizado stock'
        };
    }
};


