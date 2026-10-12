import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import '../data/cart-oop.js';
import {loadProducts,loadProductFetch} from '../data/product.js';
import {loadCart} from '../data/cart.js';


// import '../data/backend-practice.js';

async function laodpage() {
  try {await loadProductFetch();

  const value=await new Promise((resolve)=>{
     
       loadCart(()=>{
          resolve('value3');
       });
     });
   } catch(error){
    console.log('unexpected error, please try again');
   }

    renderOrderSummary();
    renderPaymentSummary();
  
}
laodpage();





// Promise.all([
//   loadProductFetch(),
//   new Promise((resolve)=>{
     
//     loadCart(()=>{
//       resolve()
//     });
//   })

// ]).then(()=>{
//     renderOrderSummary();
//     renderPaymentSummary();
// })


// new Promise((resolve)=>{
 
//   loadProducts(()=>{
//    resolve();
//   });
// }).then(()=>{
//   return new Promise((resolve)=>{
     
//     loadCart(()=>{
//       resolve()
//     });
//   });
// }).then(()=>{
//     renderOrderSummary();
//     renderPaymentSummary();

// });


// loadProducts(()=>{
//   loadCart(()=>{

//     renderOrderSummary();
//     renderPaymentSummary();

//   })

// });