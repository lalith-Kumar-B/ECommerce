import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    CLEAR_ERRORS,
} from "../constants/userConstants.js";
import axios from "axios";

// Login
export const login = (email, password) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
        `/api/v1/login`, 
        { email, password },
        config
    );
    if (data.success) {
        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } else {
        dispatch({ type: LOGIN_FAIL, payload: data.message });
    }
};

// Register
export const register = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(`/api/v1/register`, userData, config);
    if (data.success) {
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } else {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: data.message,
        });
    }
};

// Load User
export const loadUser = () => async (dispatch) => {
    dispatch({ type: LOAD_USER_REQUEST });
    const { data } = await axios.get(`/api/v1/me`);
    if (data.success) {
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } else {
        dispatch({ type: LOAD_USER_FAIL, payload: data.message });
    }
};

// Logout User
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`/api/v1/logout`);
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.put(`/api/v1/me/update`, userData, config);
    if (data.success) {
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } else {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: data.message,
        });
    }
};

// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
        `/api/v1/password/update`,
        passwords,
        config
    );
    if (data.success) {
        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    } else {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: data.message,
        });
    }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {

    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1/password/fergotpassword`, email, config);

    if (data.success) {
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    } else {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: data.message,
        });
    }

};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
        `/api/v1/password/reset/${token}`,
        passwords,
        config
    );
    if (data.success) {
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
    } else {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: data.message,
        });
    }

};

// get All Users
export const getAllUsers = () => async (dispatch) => {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/users`);
    if (data.success) {
        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } else {
        dispatch({ type: ALL_USERS_FAIL, payload: data.message });
    }
};

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/user/${id}`);
    if (data.success) {
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } else {
        dispatch({ type: USER_DETAILS_FAIL, payload: data.message });
    }
};

// Update User
export const updateUser = (id, userData) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
        `/api/v1/admin/user/${id}`,
        userData,
        config
    );
    if (data.success) {
        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } else {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: data.message,
        })
    }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
    
        dispatch({ type: DELETE_USER_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
        if (data.success) {
            dispatch({ type: DELETE_USER_SUCCESS, payload: data });
        } else {
            dispatch({
                type: DELETE_USER_FAIL,
                payload: data.message,
            });
        }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};