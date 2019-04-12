import rootReducer from "../../reducers";

export interface IAuthState {
  token: string;
  userId: string;
  error: string;
  loading: boolean;
  isAuthenticated: boolean;
}

export type IAppState = ReturnType<typeof rootReducer>;
// @TODO: Move this

export const AUTH_START = "AUTH_START";

export interface IActionAuthStart {
  type: typeof AUTH_START;
}

export const AUTH_SUCCESS = "AUTH_SUCCESS";

export interface IActionAuthSuccess {
  type: typeof AUTH_SUCCESS;
  payload: {
    token: IAuthState["token"];
    userId: IAuthState["userId"];
    isAuthenticated: IAuthState["isAuthenticated"];
  };
}

export const AUTH_FAIL = "AUTH_FAIL";

export interface IActionAuthFail {
  type: typeof AUTH_FAIL;
  payload: {
    error: IAuthState["error"];
  };
}

export const AUTH_LOGOUT = "AUTH_LOGOUT";

export interface IActionAuthLogout {
  type: typeof AUTH_LOGOUT;
  payload: {
    token: IAuthState["token"];
    userId: IAuthState["userId"];
    isAuthenticated: IAuthState["isAuthenticated"];
  };
}

export type AuthActionTypes =
  | IActionAuthStart
  | IActionAuthSuccess
  | IActionAuthFail
  | IActionAuthLogout;
