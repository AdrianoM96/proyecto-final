'use server';


import axios from 'axios';

  export const generateReport = async (reportType: string, año: number, fechaInicio:string, fechaFin:string) => {
    
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/pdf/generate`, {reportType, año, fechaInicio, fechaFin},{
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/pdf'
        }
      });

   
    const base64 = btoa(
      new Uint8Array(response.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );

    return {
      ok: true,
      data: `data:application/pdf;base64,${base64}`
    };
  } catch (error) {
    console.error('Error generating report:', error);
    return {
      ok: false,
      error: 'Failed to generate report'
    };
  }
};