
import axios from "axios"

export const getCategories = async () => {

try{

    const categories = await axios.get(`${process.env.NEXT_PUBLIC_URL}/categories`)


    return categories.data
   

}catch(error){
    console.log(error)
    return []
}

}