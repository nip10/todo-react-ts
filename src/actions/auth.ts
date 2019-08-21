import axios from "../utils/config";
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
  IActionAuthLogout,
  IActionAuthLogoutSuccess,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAIL
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
      userId
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
    const res = await axios.post("/users/login", {
      email,
      password
    });
    const userId = res.data._id;
    const token = res.headers["x-auth"];
    dispatch(loginSuccess(userId, token));
  } catch (err) {
    // TODO: I believe this is wrong ! 400 erros are not thrown to catch, only 500
    if (err.response && err.response.status === 400) {
      console.log("Invalid credentials");
      dispatch(loginFail("Invalid credentials"));
    } else {
      console.log("Server error");
      dispatch(loginFail("Server error"));
    }
  }
};

export const logout = (): ThunkAction<
  void,
  IAppState,
  null,
  Action<string>
> => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    if (!token) {
      dispatch(logoutFail("You are not authenticated"));
    }
    const res = await axios.delete(`/me/${token}`, {
      headers: { "x-auth": token }
    });
    // TODO: Check if status is 200
  } catch (error) {
    console.log("Server error");
    dispatch(logoutFail("Server error"));
  }
};

export const logoutSuccess = (): IActionAuthLogoutSuccess => {
  return {
    type: AUTH_LOGOUT_SUCCESS,
    payload: {
      token: "",
      userId: ""
    }
  };
};

export const logoutFail = (error: string): IActionAuthFail => {
  return {
    type: AUTH_FAIL,
    payload: {
      error
    }
  };
};

export const registerStart = (): IActionAuthStart => {
  return {
    type: AUTH_START
  };
};

export const registerSuccess = (
  userId: string,
  token: string
): IActionAuthSuccess => {
  return {
    type: AUTH_SUCCESS,
    payload: {
      token,
      userId
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
    const res = await axios.post("/users/", {
      email,
      password
    });
    const userId = res.data._id;
    const token = res.headers["x-auth"];
    dispatch(registerSuccess(userId, token));
  } catch (err) {
    // TODO: Add correct http codes and errors
    // TODO: I believe this is wrong ! 400 erros are not thrown to catch, only 500
    if (err.response && err.response.status === 400) {
      console.log("Duplicated email");
      dispatch(registerFail("Email is already registred"));
    } else {
      console.log("Server error");
      dispatch(registerFail("Server error"));
    }
  }
};
