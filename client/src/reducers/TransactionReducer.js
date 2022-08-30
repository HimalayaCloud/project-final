export const transactionReducer = (state, action) => {
    const {
      type,
      payload: { transactions },
    } = action;
  
    switch (type) {
      case "TRANSACTION_LOADED_SUCCESS":
        return {
          ...state,
          transactions,
        };
      case "TRANSACTION_CREATE_SUCCESS":
        return {
          ...state,
          transactions,
        };
      case "TRANSACTION_UPDATED_SUCCESS":
        return {
          ...state,
          transactions,
        };
      default:
        return state;
    }
  };
  