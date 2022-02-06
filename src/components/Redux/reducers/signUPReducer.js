import {
  ERROR_SIGNUP,
  LOAD_SIGNUP,
  REQUERST_SIGNUP,
  SUCCESS_SIGNUP,
  REQUERST_LOGIN,
  LOAD_LOGIN,
  SUCCESS_LOGIN,
  ERROR_LOGIN,
  REQUERST_USER_UPDATE,
  LOAD_USER_UPDATE,

  SUCCESS_USER_UPDATE_DATA,
  ERROR_USER_UPDATE_DATA,
} from "../action/constants";

const initialState = {
  users: null,
  loading: false,
  error: null,
  initalRequest: false,
  auth: false,
  updateData:null
};

export const signUpReducers = (state = initialState, action) => {
  switch (action.type) {
    case REQUERST_SIGNUP:
      return { initalRequest: true };

    case LOAD_SIGNUP:
      return {
        ...state,
        loading: true,
      };

    case SUCCESS_SIGNUP:
      return {
        ...state,
        loading: false,
        users: action.payload,
        auth:true
      };

    case ERROR_SIGNUP:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUERST_LOGIN:
      return { initalRequest: true };

    case LOAD_LOGIN:
      return {
        ...state,
        loading: true,
      };

    case SUCCESS_LOGIN:
      return {
        ...state,
        loading: false,
        users: action.payload,
        auth:true
        
        
      };

    case ERROR_LOGIN:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const updateUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUERST_USER_UPDATE:
      return { initalRequest: true };

    case LOAD_USER_UPDATE:
      return {
        ...state,
        loading: true,
      };

    case SUCCESS_USER_UPDATE_DATA:
      return {
        ...state,
        loading: false,
        updateData: action.payload,
        auth: true,
      };

    case ERROR_USER_UPDATE_DATA:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
