import { updateObject } from "../utils";
import {
  IAuthState,
  AuthActionTypes,
  AUTH_START,
  IActionAuthStart,
  AUTH_SUCCESS,
  IActionAuthSuccess,
  AUTH_FAIL,
  IActionAuthFail,
  AUTH_LOGOUT,
  IActionAuthLogout
} from "../store/types/auth";

const initialState: IAuthState = {
  token: "",
  userId: "",
  error: "",
  loading: false,
  isAuthenticated: false
};

const authStart = (state: IAuthState, action: IActionAuthStart) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state: IAuthState, action: IActionAuthSuccess) => {
  return updateObject(state, {
    token: action.payload.token,
    userId: action.payload.userId,
    error: null,
    loading: false,
    isAuthenticated: true
  });
};

const authFail = (state: IAuthState, action: IActionAuthFail) => {
  return updateObject(state, {
    error: action.payload.error,
    loading: false
  });
};

const authLogout = (state: IAuthState, action: IActionAuthLogout) => {
  return updateObject(state, {
    token: null,
    userId: null,
    isAuthenticated: false
  });
};

const reducer = (state = initialState, action: AuthActionTypes): IAuthState => {
  switch (action.type) {
    case AUTH_START:
      return authStart(state, action);
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case AUTH_FAIL:
      return authFail(state, action);
    case AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
