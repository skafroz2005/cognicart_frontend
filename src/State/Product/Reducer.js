import {
    SEARCH_PRODUCT_REQUEST,
    SEARCH_PRODUCT_SUCCESS,
    SEARCH_PRODUCT_FAILURE,
    CREATE_PRODUCT_FAILURE,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    FIND_PRODUCTS_REQUEST,
    FIND_PRODUCTS_SUCCESS,
    FIND_PRODUCTS_FAILURE,
    FIND_PRODUCT_BY_ID_REQUEST,
    FIND_PRODUCT_BY_ID_SUCCESS,
    FIND_PRODUCT_BY_ID_FAILURE
} from "./ActionType";

const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null,
    searchResults: [], // <--- ADD THIS LINE
};

export const customerProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_PRODUCTS_REQUEST:
        case FIND_PRODUCT_BY_ID_REQUEST:
        case CREATE_PRODUCT_REQUEST:
        case DELETE_PRODUCT_REQUEST:
            return { ...state, loading: true, error: null };
            
        case FIND_PRODUCTS_SUCCESS:
            return { ...state, loading: false, error: null, products: action.payload };
            
        case FIND_PRODUCT_BY_ID_SUCCESS:
            return { ...state, loading: false, error: null, product: action.payload };

        
        case CREATE_PRODUCT_SUCCESS:
            return { ...state, loading: false, error: null, products: { ...state.products, content: [...(state.products.content || []), action.payload] } };

        case DELETE_PRODUCT_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                error: null, 
                deletedProduct: action.payload,
                products: {
                    ...state.products,
                    // Remove the deleted product from the array instantly
                    content: state.products.content.filter((item) => item.id !== action.payload)  //not include
                } 
            };

        // 1. When the search starts, show a loading state
        case SEARCH_PRODUCT_REQUEST:
            return { ...state, loading: true, error: null };

        // 2. When the backend successfully returns the data, save it into 'searchResults'
        case SEARCH_PRODUCT_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                error: null, 
                searchResults: action.payload // <--- Here is where the data is saved!
            };

        // 3. If the backend crashes or there is an error, save the error message
        case SEARCH_PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.payload };
            
        case FIND_PRODUCTS_FAILURE:
        case FIND_PRODUCT_BY_ID_FAILURE:
        case CREATE_PRODUCT_FAILURE:
        case DELETE_PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.payload };
            
        default:
            return state;
    }
};