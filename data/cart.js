export const cart=[{
  productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity:2
},{
  productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
  quantity:2
}];

export function addCart(productId){
  let matchingItem;
    cart.forEach((item)=>{
      if(productId===item.productId){
         matchingItem=item; 
      }
    });

    if(matchingItem){
      matchingItem.quantity+=1;  
    }else{
    cart.push({
      productId:productId,
      quantity:1
     });
    }
};