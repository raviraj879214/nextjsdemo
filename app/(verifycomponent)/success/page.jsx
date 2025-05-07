// app/success/page.jsx

import { redirect } from 'next/navigation'
import { stripe } from '../../../lib/stripe'
import SuccessClient from "../../(verifycomponent)/success/SuccessClient";



export default async function SuccessPage({ searchParams }) {
  try {

 
 

    const paymentIntentId = searchParams.payment_intent
    if (!paymentIntentId) {
      throw new Error('Missing payment_intent in query parameters.')
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ['charges']
    })

    const status = paymentIntent.status
    const charge = paymentIntent.charges?.data?.[0]
    const customerEmail = charge?.billing_details?.email || paymentIntent.receipt_email

    if (status !== 'succeeded')
    {



      
    
        redirect('/')
    }
    else
    {
      




    }

    return <SuccessClient customerEmail={customerEmail} />
  } catch (error) {
    console.error('Error in SuccessPage:', error)
    // redirect('/error') // redirect to your custom error page
  }
}
