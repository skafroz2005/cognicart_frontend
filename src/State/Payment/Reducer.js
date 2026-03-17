import {
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_FAILURE,
} from "./ActionType";

// We start with an empty state
const initialState = {
  payment: null,
  loading: false,
  error: null,
};

export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    // 1. When the API call starts, turn on the loading spinner
    case UPDATE_PAYMENT_REQUEST:
      return { ...state, loading: true, error: null };

    // 2. When Spring Boot replies "Success!", save the response and turn off loading
    case UPDATE_PAYMENT_SUCCESS:
      return { 
          ...state, 
          loading: false, 
          payment: action.payload, 
          error: null 
      };

    // 3. If Spring Boot throws an error, catch it so the app doesn't crash
    case UPDATE_PAYMENT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};