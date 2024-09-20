'use server';

import axios from 'axios';

async function getData(){
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/countries`)
  return res.data
}


export const getCountries = async() => {

  try {
    
    const countries = await getData()

    return countries;


  } catch (error) {
    console.log(error);
    return [];
  }


}