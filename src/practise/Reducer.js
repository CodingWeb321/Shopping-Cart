  export default function ProductReducer(state, action) {
    switch (action.type) {
      case 'SET_PRODUCTS':
        return { ...state, product: action.payload };
      case 'ERROR':
        return {...state, error: action.payload}
      case"SET_LOADING":
       return {...state, loading:action.payload}
      default :
      return state;
    }
  }

export function CartReducer(state, action) {
  switch (action.type) {
    case 'ADD_CART':{
      const exist = state.some((item) => item.id === action.payload.id); 

      if (exist) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
  }
  case 'INCREASE':
    return state.map(item=>item.id === action.payload ? {...item, quantity : item.quantity+1}: item)
 case 'DECREASE':
    {           
        const out = state.map(item=>item.id === action.payload ? {...item, quantity : item.quantity-1}:item);
        return out.filter(item=>item.quantity>0);
    }

}
}