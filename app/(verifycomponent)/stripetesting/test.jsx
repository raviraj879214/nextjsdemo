
import { stripe } from '../../../lib/stripe';  
import CheckoutForm from '../stripetesting/checkoutstripe';




export default async function Test({data,UserID }){

    const calculateOrderAmount = (items) => {
        // Replace this constant with a calculation of the order's amount
        // Calculate the order total on the server to prevent
        // people from directly manipulating the amount on the client
        return data;
      };

    
      // Create PaymentIntent as soon as the page loads
      const { client_secret: clientSecret } = await stripe.paymentIntents.create({
        amount: calculateOrderAmount([{ id: 'check-out' }]),
        currency: 'eur',
        description: 'Export of software development services',
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        }
       
      })
    
      return (
        <div id="checkout">
         
          <CheckoutForm clientSecret={clientSecret} />
        </div>
      )


}

