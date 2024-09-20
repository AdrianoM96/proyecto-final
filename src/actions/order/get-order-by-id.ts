'use server';

import axios from 'axios';



async function getOrder (id:string) {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/orders/${id}`)
    return res.data
  }

export const getOrderById = async( id: string, user:any ) => {

    const userId = user?._id;
    const userRole = user?.role

    if (!userId) {
        return {
          ok: false,
          message: 'Debe de estar autenticado'
        };
      }

  try {
    const order = await getOrder(id) ;

    if( !order ) throw `${ id } no existe`;


    if ( userRole === 'user' ) {
      if ( userId !== order.user._id ) {
        throw `${ id } no es de ese usuario`
      }
    }
    return {
      ok: true,
      order: order,
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Orden no existe'
    }
  }
}