export const transactionReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "TRANSACTION_LOADED_SUCCESS":
      return {
        ...state,
        transactions: payload,
      };
    case "TRANSACTION_CREATE_SUCCESS":
      return {
        ...state,
        transactions: payload,
      };
    case "TRANSACTION_UPDATED_SUCCESS":
      return {
        ...state,
        transactions: payload,
      };
    case "FIND_ORDER":
      return {
        ...state,
        order_details: payload,
      };
      case "REVENUE":
      return {
        ...state,
        transactions: payload.items,
        totalAmount: payload.totalAmount
      };
    default:
      return state;
  }
};
