import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import '../data/cart-oop.js';
import {loadProducts} from '../data/product.js';


// import '../data/backend-practice.js';
loadProducts(()=>{
  renderOrderSummary();
  renderPaymentSummary();

});