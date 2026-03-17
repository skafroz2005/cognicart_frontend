import { api } from "../../config/apiConfig";
import {
    SEARCH_PRODUCT_REQUEST,
    SEARCH_PRODUCT_SUCCESS,
    SEARCH_PRODUCT_FAILURE,
    FIND_PRODUCTS_REQUEST,
    FIND_PRODUCTS_SUCCESS,
    FIND_PRODUCTS_FAILURE,
    FIND_PRODUCT_BY_ID_REQUEST,
    FIND_PRODUCT_BY_ID_SUCCESS,
    FIND_PRODUCT_BY_ID_FAILURE,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE
} from "./ActionType";

export const findProducts = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCTS_REQUEST });
    
    // Add searchQuery to your destructured variables
    const { colors, sizes, minPrice, maxPrice, minDiscount, category, topLevelCategory, searchQuery, stock, sort, pageNumber, pageSize } = reqData;

    try {
        // Append &searchQuery=${searchQuery || ''} to your API string
        const { data } = await api.get(`/api/products?color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category || ''}&topLevelCategory=${topLevelCategory || ''}&searchQuery=${searchQuery || ''}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
        
        dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
    } // ... catch block stays the same
     catch (error) {
        dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
    }
};

export const findProductsById = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
    
    const { productId } = reqData;
    
    try {
        const { data } = await api.get(`/api/products/id/${productId}`);
        
        console.log("product details ", data);
        dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
    }
};


export const createProduct = (product) => async (dispatch) => {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    try {
        const { data } = await api.post(`/api/admin/products/`, product);
        console.log("Created product: ", data);
        dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
    }
};

export const deleteProduct = (productId) => async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    try {
        const { data } = await api.delete(`/api/admin/products/${productId}/delete`);
        console.log("Deleted product data: ", data);
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
    } catch (error) {
        dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
    }
};


export const searchProduct = (keyword) => async (dispatch) => {
    dispatch({ type: SEARCH_PRODUCT_REQUEST });
    try {
        const { data } = await api.get(`/api/products/search?q=${keyword}`);
        console.log("Search results: ", data);
        dispatch({ type: SEARCH_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: SEARCH_PRODUCT_FAILURE, payload: error.message });
    }
};