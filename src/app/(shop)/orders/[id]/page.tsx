'use client'
import { OrderStatus, PayPalButton, ProductImage, Title, useAuth } from '@/components';

import { getOrderById } from "@/actions/order/get-order-by-id";
import { currencyFormat } from '@/utils';
import { useEffect, useState } from 'react';

import { Order, OrderAddress } from '../../../../interfaces/all.interface'



import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios';


interface Props {
  params: {
    id: string;
  };
}



export default function OrdersByIdPage({ params }: Props) {
  initMercadoPago('APP_USR-86813585-f8a6-47af-a30d-4e7e18a8e149',{
    locale:"es-AR",
  });

  const { id } = params;
  const { user } = useAuth()

  
  const [address, setAddress] = useState<OrderAddress | null>(null);
  const [orderTr, setOrderTr] = useState<Order | null>(null);


  const [preferendeId,setPreferenceId] = useState('')

  const fetchOrder = async () => {
    const { ok, order } = await getOrderById(id, user);
    if(ok){

      setOrderTr(order)
      setAddress(order?.orderAddress || null);
    }
  }

  useEffect(() => {
    fetchOrder();
  }, [id, user])

  if (!orderTr || !address) {

    return <div>Cargando...</div>;
  }
  const handlePaymentSuccess = () => {
    fetchOrder();
  }

  const createPreference = async () => {
    try{
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/mercadopago/create-preference`,{
        title: "asd",
        quantity: 2,
        price: 2,
    })
    const { id } = response.data
    return id
    }catch (error){
      console.log(error)
    }
  }

  const handlePay = async () => {
    const id = await createPreference()
    if(id){
      setPreferenceId(id)
      console.log("id")
      console.log(id)
    }
  }


  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id.split("-").at(-1)}`} />

        {orderTr && address && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

            <div className="flex flex-col mt-5">


              <OrderStatus isPaid={orderTr!.isPaid ?? false} />



              {orderTr!.orderItems.map((item) => (
                <div
                  key={item.product.name + "-" + item.size}
                  className="flex mb-5"
                >
                  {item.product.images.length > 0 && (
                    <ProductImage
                      width={100}
                      height={100}
                      src={item.product.images[0].url}
                      alt={item.product.name}
                      className="mr-5 rounded"
                    />
                  )}

                  <div>
                    <p>{item.product.name}</p>
                    <p>
                      ${item.price} x {item.quantity}
                    </p>
                    <p className="font-bold">
                      Subtotal: {currencyFormat(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>


            <div className="bg-white rounded-xl shadow-xl p-7">
              <h2 className="text-2xl mb-2">Dirección de entrega</h2>
              <div className="mb-10">
                <p className="text-xl">
                  {address!.firstName} {address!.lastName}
                </p>
                <p>{address!.address}</p>
                <p>{address!.address2}</p>
                <p>{address!.postalCode}</p>
                <p>
                  {address!.city}, {address!.country._id}
                </p>
                <p>{address!.phone}</p>
              </div>


              <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

              <h2 className="text-2xl mb-2">Resumen de orden</h2>

              <div className="grid grid-cols-2">
                <span>No. Productos</span>
                <span className="text-right">
                  {orderTr?.itemsInOrder === 1
                    ? "1 artículo"
                    : `${orderTr?.itemsInOrder} artículos`}
                </span>

                <span>Subtotal</span>
                <span className="text-right">
                  {currencyFormat(orderTr!.subTotal)}
                </span>

                <span>Impuestos (15%)</span>
                <span className="text-right">{currencyFormat(orderTr!.tax)}</span>

                <span className="mt-5 text-2xl">Total:</span>
                <span className="mt-5 text-2xl text-right">
                  {currencyFormat(orderTr!.total)}
                </span>
              </div>

              <div className="mt-5 mb-2 w-full">

                {
                  orderTr?.isPaid
                    ? (
                      <OrderStatus isPaid={orderTr!.isPaid ?? false} />
                    ) : (
                      <>
                        <PayPalButton amount={orderTr!.total} orderId={orderTr!._id} onPaymentSuccess={handlePaymentSuccess} />
                        <button className='btn-primary' onClick={() => handlePay()}>Comprar mercado pago</button>
                        {
                          preferendeId && <Wallet initialization={{ preferenceId: preferendeId }} customization={{ texts: { valueProp: 'smart_option' } }} />
                        }
                       
                      </>



                    )
                }

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
