import axios from "axios";

async function getData() {
  
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/products`)

    if (Array.isArray(res.data) && res.data.length === 0) {
       
        return null;
    } else {
    
        return res.data
    }
}


export const getProductAdm = async (name: string) => {

    try {
      
        const products = await getData()
    
        let product = null
        if(products){
        
           
            product = products.productsAdmin.find((product: { name: string; }) => product.name === name)
          
        }

        if (!product) return null;

        return {
            ...product
        }
    } catch (error) {
        console.log(error)
        throw new Error('Error al obtener un producto por nombre')
    }

}