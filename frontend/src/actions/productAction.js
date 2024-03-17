import axios from "axios";

import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants.js";

// Get All Products
export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
    async (dispatch) => {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
      }
      const { data } = await axios.get(link);
      if (!data.success) {
        dispatch({
          type: ALL_PRODUCT_FAIL,
          payload: data.message,
        });
      } else {
        dispatch({
          type: ALL_PRODUCT_SUCCESS,
          payload: data,
        });
      }
    };

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
  dispatch({ type: ADMIN_PRODUCT_REQUEST });

  const { data } = await axios.get("/api/v1/admin/products");

  if (data.success) {
    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } else {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: data.message,
    });
  }
};

// Create Product
export const createProduct = (productData) => async (dispatch) => {
  dispatch({ type: NEW_PRODUCT_REQUEST });

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  

  const { data } = await axios.post(
    `/api/v1/admin/product/new`,
    productData,
    config
  );
  if (data.success) {
    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } else {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: data.message,
    });
  }
};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {

  dispatch({ type: UPDATE_PRODUCT_REQUEST });

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  const { data } = await axios.put(
    `/api/v1/admin/product/${id}`,
    productData,
    config
  );
  if (data.success) {
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } else {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: data.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST });
  const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

  if (data.success) {
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } else {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: data.message,
    });
  }
};

// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {

  dispatch({ type: PRODUCT_DETAILS_REQUEST });

  const { data } = await axios.get(`/api/v1/product/${id}`);

  if (data.success) {
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } else {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: data.message,
    });
  }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  dispatch({ type: NEW_REVIEW_REQUEST });

  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const { data } = await axios.put(`/api/v1/review`, reviewData, config);

  if (data.success) {
    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } else {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: data.message,
    });
  }

};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {

  dispatch({ type: ALL_REVIEW_REQUEST });

  const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
  if (data.success) {
    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } else {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/reviews?id=${reviewId}&productId=${productId}`
    );

    if (data.success) {
      dispatch({
        type: DELETE_REVIEW_SUCCESS,
        payload: data.success,
      });
    }else{
      dispatch({
        type: DELETE_REVIEW_FAIL,
        payload: data.message,
      });
    }
};


export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
