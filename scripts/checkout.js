import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import '../data/cart-oop.js';
import {loadProducts} from '../data/product.js';
import {loadCart} from '../data/cart.js';


// import '../data/backend-practice.js';

Promise.all([
  new Promise((resolve)=>{
  
    loadProducts(()=>{
    resolve();
    });
  }),
  new Promise((resolve)=>{
     
    loadCart(()=>{
      resolve()
    });
  })

]).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
})


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