import axios from "axios";
import { Action, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  IAppState,
  AUTH_START,
  IActionAuthStart,
  AUTH_SUCCESS,
  IActionAuthSuccess,
  AUTH_FAIL,
  IActionAuthFail,
  AUTH_LOGOUT,
  IActionAuthLogout
} from "../store/types/auth";

export const loginStart = (): IActionAuthStart => {
  return {
    type: AUTH_START
  };
};

export const loginSuccess = (
  token: string,
  userId: string
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

export const logout = (): IActionAuthLogout => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: AUTH_LOGOUT
  };
};

export const login = (
  email: string,
  password: string
): ThunkAction<void, IAppState, null, any> => async dispatch => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:3001/users/login", {
      email,
      password
    });
    console.log("Response from login:", res);
    // localStorage.setItem("token", response.data.idToken);
    // localStorage.setItem("expirationDate", expirationDate.toString());
    // localStorage.setItem("userId", response.data.localId);
    dispatch(loginSuccess(res.data, res.data));
    // dispatch(checkAuthTimeout(response.data.expiresIn));
  } catch (err) {
    console.log("Error from login:", err);
    dispatch(loginFail(err));
  }
};
