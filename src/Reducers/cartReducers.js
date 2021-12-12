import { CART_ADAUGA_ITEM } from '../constants/cartConstants'
import { CART_ELIMINA_ITEM } from '../constants/cartConstants'
import { PRODUCT_LIST_FAIL } from '../constants/productConstants'


export const cartReducer = (state={cartItems:[]}, action) => {
 switch(action.type){
  case CART_ADAUGA_ITEM:
   const item = action.payload
   const existItem = state.cartItems.find(x => x.product === item.product)

   if(existItem){
     return{
      ...state,
      cartItems:state.cartItems.map(x => 
       x.product === existItem.product ? item : x)
     }
   }else{
    return{
     ...state,
     cartItems:[...state.cartItems, item]
    }
   }
  case CART_ELIMINA_ITEM:
    return{
      ...state,
      cartItems:state.cartItems.filter(x => x.product !== action.payload)
    }
  default:
   return state;
 }

}