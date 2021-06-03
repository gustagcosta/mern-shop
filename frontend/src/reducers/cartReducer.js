import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItens: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItens.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItens: state.cartItens.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItens: [...state.cartItens, item] };
      }
    default:
      return state;
  }
};
