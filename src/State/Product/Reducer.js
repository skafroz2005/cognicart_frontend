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
    FIND_PRODUCT_BY_ID_FAILURE,
    EXTRACT_ATTRIBUTES_REQUEST,
    EXTRACT_ATTRIBUTES_SUCCESS,
    EXTRACT_ATTRIBUTES_FAILURE,
    CLEAR_EXTRACTION_RESULT,
    CLEAR_PRODUCT_MESSAGES
} from "./ActionType";

const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null,
    searchResults: [], // <--- ADD THIS LINE
    extractionResult: null,
    extractionLoading: false,
    extractionError: null,
    createSuccessMessage: null,
};

export const customerProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_PRODUCTS_REQUEST:
        case FIND_PRODUCT_BY_ID_REQUEST:
        case CREATE_PRODUCT_REQUEST:
        case DELETE_PRODUCT_REQUEST:
            return { ...state, loading: true, error: null, createSuccessMessage: null };
            
        case FIND_PRODUCTS_SUCCESS:
            return { ...state, loading: false, error: null, products: action.payload };
            
        case FIND_PRODUCT_BY_ID_SUCCESS:
            return { ...state, loading: false, error: null, product: action.payload };

        
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                product: action.payload.product,
                createSuccessMessage: action.payload.message,
                products: {
                    ...state.products,
                    content: [...(state.products.content || []), action.payload.product],
                },
            };

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

        case EXTRACT_ATTRIBUTES_REQUEST:
            return { ...state, extractionLoading: true, extractionError: null };

        case EXTRACT_ATTRIBUTES_SUCCESS:
            return { ...state, extractionLoading: false, extractionError: null, extractionResult: action.payload };

        case EXTRACT_ATTRIBUTES_FAILURE:
            return { ...state, extractionLoading: false, extractionError: action.payload };

        case CLEAR_EXTRACTION_RESULT:
            return { ...state, extractionResult: null, extractionError: null };

        case CLEAR_PRODUCT_MESSAGES:
            return { ...state, createSuccessMessage: null, error: null };
            
        case FIND_PRODUCTS_FAILURE:
        case FIND_PRODUCT_BY_ID_FAILURE:
        case CREATE_PRODUCT_FAILURE:
        case DELETE_PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.payload, createSuccessMessage: null };
            
        default:
            return state;
    }
};