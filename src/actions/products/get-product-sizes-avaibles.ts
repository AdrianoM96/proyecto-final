import axios from "axios";

async function getData(){
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/sizes`)
    return res.data
  }
  

export const getProductSizesAvaibles = async () =>{

    try{

        const sizes = await getData()

        const allSizes = sizes.map((size: { name: any; }) => size.name);

        return{
            allSizes
        }

    }catch(error){
        console.log(error)
        throw new Error('Error al obtener un producto por nombre')
    }

   
}