import axios from "axios";

async function getData(){
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/products`)
    return res.data
  }
  

export const getProductBySlug = async (name:string) =>{

    try{

        const products = await getData()
  
        const product= products.products.find((product: { name: string; })  => product.name===name)
      

        return{
            ...product
        }

    }catch(error){
        console.log(error)
        throw new Error('Error al obtener un producto por nombre')
    }

   
}