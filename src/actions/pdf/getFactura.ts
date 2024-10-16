'use server';

import axios from 'axios';

export const getFactura = async (orderId: string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/pdf/factura/${orderId}`, {
      responseType: 'arraybuffer',
      headers: {
        'Accept': 'application/pdf'
      }
    });

    const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );

   
    const contentType = response.headers['content-type'];
    if (contentType && contentType.includes('application/pdf')) {
      return {
        ok: true,
         data: `data:application/pdf;base64,${base64}`
      };
    } else {
      throw new Error('La respuesta no es un PDF válido');
    }
  } catch (error: any) {
    console.error('Error generating factura:', error);
    if (error.response) {
      if (error.response.status === 404) {
        return {
          ok: false,
          error: 'Factura no disponible.'
        };
      }
    
    }
    return {
      ok: false,
      error: 'Hubo un error al generar la factura. Por favor, intente de nuevo más tarde.'
    };
  }
};