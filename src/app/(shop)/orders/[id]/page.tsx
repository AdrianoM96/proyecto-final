'use client'
import { OrderStatus, PayPalButton, ProductImage, Title, useAuth } from '@/components';
import { getOrderById } from "@/actions/order/get-order-by-id";
import { currencyFormat } from '@/utils';
import { useCallback, useEffect, useState, useRef } from 'react';
import { Order, OrderAddress } from '../../../../interfaces/all.interface'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useSearchParams } from 'next/navigation';
import { createPreference, setTransactionId, updateStock } from '@/actions';
import Cookies from 'js-cookie'
import { useCartStore } from '@/store';

interface Props {
  params: {
    id: string;
  };
}

export default function OrdersByIdPage({ params }: Props) {
  initMercadoPago('APP_USR-86813585-f8a6-47af-a30d-4e7e18a8e149', {
    locale: "es-AR",
  });

  const { id } = params;
  const { user } = useAuth()
  const searchParams = useSearchParams()

  const [address, setAddress] = useState<OrderAddress | null>(null);
  const [orderTr, setOrderTr] = useState<any>(null);

  const [preferenceId, setPreferenceId] = useState('')
  const [messageError, setMessageError] = useState('')
 
  const clearCart = useCartStore( state => state.clearCart );
  const cart = useCartStore( state => state.cart );

  const token = Cookies.get('token');
  const hasUpdatedStock = useRef(false);

  const productsToStock = cart.map( product => ({
    productId: product.id,
    quantity: product.quantity,
    size: product.size,
  }))

  const handlePay = async () => {
    const verifyStock = await updateStock(productsToStock, user, token || "", false)
   
    if(verifyStock.ok){
      const preferenceId = await createPreference(orderTr, params.id)
      if (preferenceId) {
        setPreferenceId(preferenceId)
      }
    } else {
      verifyStock.outStock.forEach((error:any) => {
        setMessageError(`${error.productName} talle ${error.size} no hay suficiente stock`);
      });
    }
  }

  const fetchOrder = useCallback(async () => {
    const { ok, order } = await getOrderById(id, user);
    
    if (ok) {
      setOrderTr(order)
      setAddress(order?.orderAddress || null);
    }
  }, [id, user]);

  useEffect(() => {
    const status = searchParams.get('status')
    const payment_id = searchParams.get('payment_id')
  
    if (status && payment_id && status === 'approved' && !orderTr?.isPaid && !hasUpdatedStock.current) {
      const completeTrasaccion = async () => {
        if (token) {
          const response = await setTransactionId(id, payment_id, token, "mercadopago")
         
          if(response.ok === true) {
            
            if (!hasUpdatedStock.current) {
              const updateStocks = await updateStock(productsToStock, user, token, true);
   
              if(updateStocks.ok){
                fetchOrder();
                clearCart();
                hasUpdatedStock.current = true;
              }
            }
          }
        }
      }

      completeTrasaccion();
    } else if (!orderTr) {
      fetchOrder();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchOrder]);




  if (!orderTr || !address) {

    return <div>Cargando...</div>;
  }
  const handlePaymentSuccess = () => {
    fetchOrder();
  }


  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id.split("-").at(-1)}`} />

        {orderTr && address && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

            <div className="flex flex-col mt-5">


              <OrderStatus isPaid={orderTr!.isPaid ?? false} />



              {orderTr!.orderItems.map((item:any) => (
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
                      ${item.price} x {item.quantity} {item.size}
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

                <span>Impuestos (21%)</span>
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
                        <PayPalButton amount={orderTr!.total} orderId={orderTr!._id} onPaymentSuccess={handlePaymentSuccess} productsToStock={productsToStock} token={token} user={user} />

                        <button
                           className={`w-full h-full border-none px-5 py-2 rounded cursor-pointer ${preferenceId ? 'bg-gray-400 text-gray-200' : 'bg-[#009ee3] text-white'}`}
                          onClick={handlePay}
                          disabled={!!preferenceId} 
                        >
                          Pagar con MercadoPago
                        </button>
                        { messageError &&

                          <p className='text-red-600 text-center text-base'> {messageError}</p>
                        }

                        {preferenceId && (
                          <Wallet
                            initialization={{ preferenceId: preferenceId }}
                            customization={{ texts: { valueProp: 'smart_option' } }}
                          />
                        )}

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

