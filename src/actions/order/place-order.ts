'use server'

import { Address } from "@/interfaces";
import axios from "axios";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: string;
  }

  async function getProducts () {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/products`)
    return res.data.products
  }

  async function createOrder(order: any, token: string) {
    
        const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/orders/orderComplete`, order, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true, 
        });
        return res.data; 
    
}

export const placeOrder = async (productIds: ProductToOrder[], address: Address, user: any, token: string) => {
    
    const userId = user._id;
    if (!userId) {
        return {
            ok: false,
            message: "No hay sesión de usuario",
        };
    }

   
    const products = await getProducts();

    
    const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);
    const productsFiltered: any = [];

    const { subTotal, tax, total } = productIds.reduce(
        (totals, item) => {
            const product = products.find((product: any) => product._id === item.productId);
            if (!product) throw new Error(`${item.productId} no existe - 500`);

            productsFiltered.push({ ...product, quantity:item.quantity });

            const subTotal = product.price * item.quantity;
            totals.subTotal += subTotal;
            totals.tax += subTotal * 0.21;
            totals.total += subTotal * 1.21;

            return totals;
        },
        { subTotal: 0, tax: 0, total: 0 }
    );

    const { country, ...restAddress } = address;

    const order = {
        subTotal,
        tax,
        total,
        itemsInOrder,
        userId,
        productIds,
        products: productsFiltered,
        countryId: country,
        restAddress,
    };

  

    try {
       
        const orderTransaction = await createOrder(order, token);
       
        return {
            ok: true,
            order:orderTransaction,
            productsFiltered:productsFiltered,
            message: "Orden creada exitosamente",
        };
    } catch (error: any) {
         
          console.error('Error al crear la ordennn:', error.response?.data?.details || error.message);

        return {
            ok: false,
            message: error.response?.data?.details || 'Error creando la orden'
        };
    }
};


