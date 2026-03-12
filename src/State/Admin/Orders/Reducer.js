import {
    CANCELED_ORDER_FAILURE,
    CANCELED_ORDER_REQUEST,
    CANCELED_ORDER_SUCCESS,
    CONFIRMED_ORDER_FAILURE,
    CONFIRMED_ORDER_REQUEST,
    CONFIRMED_ORDER_SUCCESS,
    DELETE_ORDER_FAILURE,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELIVERED_ORDER_FAILURE,
    DELIVERED_ORDER_REQUEST,
    DELIVERED_ORDER_SUCCESS,
    GET_ORDERS_FAILURE,
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    PLACED_ORDER_FAILURE,
    PLACED_ORDER_REQUEST,
    PLACED_ORDER_SUCCESS,
    SHIP_ORDER_FAILURE,
    SHIP_ORDER_REQUEST,
    SHIP_ORDER_SUCCESS,
} from "./ActionType";

const initialState = {
    loading: false,
    orders: [],
    error: "",
};

export const adminOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS_REQUEST:
            return { ...state, loading: true };
            
        case GET_ORDERS_SUCCESS:
            return { ...state, loading: false, orders: action.payload, error: "" };
            
        case GET_ORDERS_FAILURE:
            return { ...state, loading: false, orders: [], error: action.payload };

        // Handle all status updates (Confirm, Ship, Deliver, Cancel) in one block
        case CONFIRMED_ORDER_REQUEST:
        case PLACED_ORDER_REQUEST:
        case DELIVERED_ORDER_REQUEST:
        case CANCELED_ORDER_REQUEST:
        case SHIP_ORDER_REQUEST:
            return { ...state, loading: true };
            
        case CONFIRMED_ORDER_SUCCESS:
        case PLACED_ORDER_SUCCESS:
        case DELIVERED_ORDER_SUCCESS:
        case CANCELED_ORDER_SUCCESS:
        case SHIP_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                // Replace the updated order in the existing array
                orders: state.orders.map((order) =>
                    order.id === action.payload.id ? action.payload : order
                ),
                error: "",
            };
            
        case CONFIRMED_ORDER_FAILURE:
        case PLACED_ORDER_FAILURE:
        case DELIVERED_ORDER_FAILURE:
        case CANCELED_ORDER_FAILURE:
        case SHIP_ORDER_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // Handle order deletion
        case DELETE_ORDER_REQUEST:
            return { ...state, loading: true };
            
        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                deletedOrder: action.payload,
                // Filter the deleted order out of the existing array instantly
                orders: state.orders.filter((order) => order.id !== action.payload),
                error: "",
            };
            
        case DELETE_ORDER_FAILURE:
            return { ...state, loading: false, error: action.payload };
            
        default:
            return state;
    }
};