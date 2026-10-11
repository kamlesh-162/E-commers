function Cart(localStoragekey){
  const cart={
   cartItems:undefined,

   loadFromeStaorage(){
      let cart=JSON.parse(localStorage.getItem(localStoragekey)  );
   
    if(!this.cartItems){
      this.cartItems=[{
        productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:2,
        deliveryOptionId:'1'
      },{
        productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        quantity:2,
        deliveryOptionId:'2'
      }];
    }
  },

  saveToStorage(){
    localStorage.setItem(localStoragekey,JSON.stringify(this.cartItems));
  },

  addCart(productId){
  let matchingItem;
    this.cartItems.forEach((item)=>{
      if(productId===item.productId){
         matchingItem=item; 
      }
    });

    if(matchingItem){
      matchingItem.quantity+=1;  
    }else{
    this.cartItems.push({
      productId:productId,
      quantity:1,
      deliveryOptionId:'1'
     });
    }
     this.saveToStorage();
    },

   removeFormCart(productId){
    const newCart=[];
    this.cartItems.forEach((cartItem)=>{
    if(cartItem.productId!== productId){
      newCart.push(cartItem);
    }
    });
    this.cartItems=newCart;
    this.saveToStorage();
  },

 updatedeliveryOption(productId,deliveryOptionId){
  
  let matchingItem;
    this.cartItems.forEach((item)=>{
      if(productId===item.productId){
         matchingItem=item; 
      }
    });

    matchingItem.deliveryOptionId=deliveryOptionId;
    this.saveToStorage();
   }

  };

  return cart;
}








const cart=Cart('cart-oop');
const businessCart=Cart('cart-business');

cart.loadFromeStaorage();
businessCart.loadFromeStaorage();
// console.log(cart);
// console.log(businessCart);
