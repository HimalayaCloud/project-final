export const guestReducer = (state, action) => {
    const {
      type,
      payload: { isAuthenticated, guest },
    } = action;
  
    switch (type) {
      case "SET_AUTH":
        return {
          ...state,
          isAuthenticated,
          guest
        };
  
        default:
          return state
    }
  };
  