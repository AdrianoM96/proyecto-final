'use client';


import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { CreateOrderData, CreateOrderActions, OnApproveActions, OnApproveData } from '@paypal/paypal-js';
import { setTransactionId, paypalCheckPayment, updateStock } from '@/actions';
import Cookies from 'js-cookie';

interface Props {
  orderId: string;
  amount: number;
  onPaymentSuccess: () => void;
  productsToStock:any
  token:any
  user:any
}



export const PayPalButton = ({ orderId, amount, onPaymentSuccess, productsToStock, token, user  }: Props) => {

const cookies = Cookies.get();
  const [{ isPending }] = usePayPalScriptReducer();

  const rountedAmount = (Math.round(amount * 100)) / 100; 


  if ( isPending ) {
    return (
      <div className="animate-pulse mb-16">
        <div className="h-11 bg-gray-300 rounded" />
        <div className="h-11 bg-gray-300 rounded mt-2" />
      </div>
    )
  }


  const createOrder = async(data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: `${ rountedAmount }`,
          }

        }
      ]
    });
    

    const { ok } = await setTransactionId( orderId,transactionId,cookies.token );
    await updateStock(productsToStock,user, token )

    
    if ( !ok ) {
      throw new Error('No se pudo actualizar la orden');
    }

    return transactionId;
  }

  const onApprove = async(data: OnApproveData, actions: OnApproveActions) => {
    
    const details = await actions.order?.capture();
    if ( !details ) return;

    await paypalCheckPayment( details.id, cookies.token );
    onPaymentSuccess();
  }


  return (
    <div className='relative z-0'>

      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </div>
  )
}