'use server';

import axios from 'axios';

async function getData(userId:string){
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/search-history/get-search-history`, {
    params: { userId } });
  return res.data
}


export const getSearchHistory = async(userId:string) => {

  try {
   
    
    const searchHistory = await getData(userId)

    return searchHistory.history;


  } catch (error) {
    console.log(error);
    return [];
  }


}