import {cart,removeFormCart,updatedeliveryOption} from '../../data/cart.js';
import {product} from '../../data/product.js';
import { formatcurrancy } from '../utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {delivaryOptions} from '../../data/delivaryOptions.js';


hello();
const today=dayjs();
const delivary=today.add(7,'days');
console.log(delivary.format('dddd,MMMM D'));

export function renderOrderSummary(){


    let cartSummaryHTML='';

    cart.forEach((cartItem)=>{

      const productId =cartItem.productId;
      let matchingProducts;
      product.forEach((product)=>{
        if(product.id===productId){
          matchingProducts=product;
        }
      });

      const deliveryOptionId=cartItem.deliveryOptionId;

      let delivaryOption;
      delivaryOptions.forEach((option)=>{
        if(option.id===deliveryOptionId){
          delivaryOption =option;
        }
      });
      const today =dayjs();
      const delivarydate=today.add(delivaryOption.deliveryday, 'days');
      const datestring=delivarydate.format('dddd, MMMM D');


      cartSummaryHTML+=
    `<div class="cart-item-container
          js-cart-item-container-${matchingProducts.id}">
                <div class="delivery-date">
                  Delivery date:${datestring}
                </div>

                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matchingProducts.image}">

                  <div class="cart-item-details">
                    <div class="product-name">
                      ${matchingProducts.name}
                    </div>
                    <div class="product-price">
                      $${formatcurrancy(matchingProducts.priceCents)}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary">
                        Update
                      </span>
                      <span class="delete-quantity-link link-primary js-delete-link"
                        data-product-id="${matchingProducts.id}">
                        Delete
                      </span>
                    </div>
                  </div>

                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    ${delivaryOptionHTML(matchingProducts,cartItem)}
                  </div>
                </div>
              </div>`
    });


    function delivaryOptionHTML(matchingProducts,cartItem){

      let html='';
      delivaryOptions.forEach((delivaryOption)=>{
      const today =dayjs();
      const delivarydate=today.add(delivaryOption.deliveryday, 'days');
      const datestring=delivarydate.format('dddd, MMMM D');

      const isChecked=delivaryOption.id===cartItem.deliveryOptionId;
      const pricestring=delivaryOption.priceCent===0 ? 'FREE':`$${formatcurrancy(delivaryOption.priceCent)}`;
      
      html+=  ` <div class="delivery-option js-delivery-option"
                  data-product-id="${matchingProducts.id}"
                  data-delivery-option-id="${delivaryOption.id}"
                  >
                      <input type="radio"
                      ${isChecked ? 'checked':''}
                        class="delivery-option-input"
                        name="delivery-option-${matchingProducts.id}">
                      <div>
                        <div class="delivery-option-date">
                        ${datestring}
                        </div>
                        <div class="delivery-option-price">
                          ${pricestring} - Shipping
                        </div>
                      </div>
                    </div>
        `
      })
      return html;
    };

    document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;


    document.querySelectorAll('.js-delete-link').forEach((link)=>{
      link.addEventListener('click',()=>{
        const productId=link.dataset.productId;
        removeFormCart(productId);
        
        const container=document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
      });
    });


    document.querySelectorAll('.js-delivery-option')
    .forEach((element)=>{
      element.addEventListener('click',()=>{
          const{productId, deliveryOptionId}=element.dataset;
          updatedeliveryOption(productId, deliveryOptionId);
          renderOrderSummary();
      });
    });
}

