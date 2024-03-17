import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS,
} from "../constants/orderConstants";

import axios from "axios";

// Create Order
export const createOrder = (order) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const { data } = await axios.post("/api/v1/order/new", order, config);

    if (data.success) {
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } else {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: data.message,
        });
    }

};

// My Orders
export const myOrders = () => async (dispatch) => {
    dispatch({ type: MY_ORDERS_REQUEST });

    const { data } = await axios.get("/api/v1/orders/me");
    if (data.success) {
        dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
    } else {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: data.message,
        });
    }
};

// Get All Orders (admin)
export const getAllOrders = () => async (dispatch) => {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await axios.get("/api/v1/admin/orders");
    if (data.success) {
        dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
    } else {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: data.message,
        });
    }


};

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {
        dispatch({ type: UPDATE_ORDER_REQUEST });
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        const { data } = await axios.put(
            `/api/v1/admin/orders/${id}`,
            order,
            config
        );
        if (data.success) {
            dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
        }else{
            dispatch({
                type: UPDATE_ORDER_FAIL,
                payload: data.message,
            });
        }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
        dispatch({ type: DELETE_ORDER_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/orders/${id}`);

        if (data.success) {
            dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
        }else{
            dispatch({
                type: DELETE_ORDER_FAIL,
                payload: data.message,
            });
        }
};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/order/${id}`);
    if (data.success) {
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
    } else {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: data.message,
        });
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};