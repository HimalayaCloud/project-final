export const cartReducer = (state, action) => {
  const {
    type,
    payload: { cart },
  } = action;

  switch (type) {
    case "CART_LOADED_SUCCESS":
      return {
        ...state,
        cart,
      };

    default:
      return state;
  }
};
