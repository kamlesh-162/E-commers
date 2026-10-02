export const delivaryOptions=[{
  id:'1',
  deliveryday:7,
  priceCent:0
},{
  id:'2',
  deliveryday:3,
  priceCent:499
},{
  id:'3',
  deliveryday:1,
  priceCent:999
},
]

export function getDeliveryOption(deliveryOptionId){
  let delivaryOption;
      delivaryOptions.forEach((option)=>{
        if(option.id===deliveryOptionId){
          delivaryOption =option;
        }
      });
      return delivaryOption || delivaryOptions[0];
}