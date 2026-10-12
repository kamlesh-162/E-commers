import {cart} from '../../data/cart.js';
import {getProduct} from '../../data/product.js';
import { getDeliveryOption } from '../../data/delivaryOptions.js';
import {formatcurrancy} from '../utils/money.js';
import { renderOrderSummary } from './orderSummary.js';
import { addOrder } from '../../data/orders.js';

export function renderPaymentSummary(){
  let productPriceCents=0; 
  let shippingPriceCents=0; 
  cart.forEach((cartItem) => {
    const product =getProduct(cartItem.productId);
    productPriceCents+= product.priceCents*cartItem.quantity;

  const deliveryOption= getDeliveryOption(cartItem.deliveryOptionId);
  shippingPriceCents+= deliveryOption.priceCent;
  });
  
  const totalBeforTaxCents=shippingPriceCents+productPriceCents;
  const taxCents=totalBeforTaxCents*0.1;
  const totalCents=totalBeforTaxCents+taxCents;

  const paymentSummaryHTML=`
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">
            $${formatcurrancy(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
             <div class="payment-summary-money">
              $${formatcurrancy(shippingPriceCents)}
             </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
             $${formatcurrancy(totalBeforTaxCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatcurrancy(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatcurrancy(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary
           js-placed-order">
            Place your order
          </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;
  document.querySelector('.js-placed-order')
   .addEventListener('click',async()=>{
    
   try{
     const response=await fetch('https://supersimplebackend.dev/orders',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        cart:cart
      })
     });

     const order =await response.json();
     addOrder(order);
   }catch(error){
      console.log('unexpected error. try again later.');
   }


   window.location.href='orders.html';
  });
}