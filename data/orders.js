export const orders=JSON.parse(localStorage.getItem('orders'))||[];

export function addOrder(order){
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage(order){
  localStorage.setItem('orders',JSON.stringify(orders));
}