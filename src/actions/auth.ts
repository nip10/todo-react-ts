import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import {
  AUTH_START,
  IActionAuthStart,
  AUTH_SUCCESS,
  IActionAuthSuccess,
  AUTH_FAIL,
  IActionAuthFail,
  AUTH_LOGOUT,
  IActionAuthLogout
} from "../store/types/auth";
import { IAppState } from "../store";

export const loginStart = (): IActionAuthStart => {
  return {
    type: AUTH_START
  };
};

export const loginSuccess = (
  userId: string,
  token: string
): IActionAuthSuccess => {
  return {
    type: AUTH_SUCCESS,
    payload: {
      token,
      userId,
      isAuthenticated: true
    }
  };
};

export const loginFail = (error: string): IActionAuthFail => {
  return {
    type: AUTH_FAIL,
    payload: {
      error
    }
  };
};

export const login = (
  email: string,
  password: string
): ThunkAction<void, IAppState, null, Action<string>> => async dispatch => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:3001/users/login", {
      email,
      password
    });
    const userId = res.data._id;
    const token = res.headers["x-auth"];
    dispatch(loginSuccess(userId, token));
  } catch (err) {
    if (err.response.status === 400) {
      console.log("Invalid credentials");
      dispatch(loginFail("Invalid credentials"));
    } else {
      console.log("Server error");
      dispatch(loginFail("Server error"));
    }
  }
};

export const logout = (): IActionAuthLogout => {
  return {
    type: AUTH_LOGOUT,
    payload: {
      token: "",
      userId: "",
      isAuthenticated: false
    }
  };
};

export const registerStart = (): IActionAuthStart => {
  return {
    type: AUTH_START
  };
};

export const registerSuccess = (
  token: string,
  userId: string
): IActionAuthSuccess => {
  return {
    type: AUTH_SUCCESS,
    payload: {
      token,
      userId,
      isAuthenticated: true
    }
  };
};

export const registerFail = (error: string): IActionAuthFail => {
  return {
    type: AUTH_FAIL,
    payload: {
      error
    }
  };
};

export const register = (
  email: string,
  password: string
): ThunkAction<void, IAppState, null, Action<string>> => async dispatch => {
  dispatch(registerStart());
  try {
    const res = await axios.post("http://localhost:3001/users/", {
      email,
      password
    });
    const userId = res.data._id;
    const token = res.headers["x-auth"];
    dispatch(registerSuccess(userId, token));
  } catch (err) {
    // TODO: Add correct http codes and errors
    if (err.response.status === 400) {
      console.log("Duplicated email");
      dispatch(registerFail("Email is already registred"));
    } else {
      console.log("Server error");
      dispatch(registerFail("Server error"));
    }
  }
};
