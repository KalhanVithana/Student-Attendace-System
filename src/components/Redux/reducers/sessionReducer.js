import { ERROR_SESSION, ERROR_SESSION_DATA, ERROR_SESSION_DATA_UPDATE, LOAD_SESSION, LOAD_SESSION_DATA, LOAD_SESSION_DATA_UPDATE, REQUERST_SESSION, REQUERST_SESSION_DATA, REQUERST_SESSION_DATA_UPDATE, SUCCESS_SESSION, SUCCESS_SESSION_DATA, SUCCESS_SESSION_DATA_UPDATE } from "../action/constants";

const initialState = {
    session: null,
    loading: false,
    error:null,
    initalRequest:false,
    sessionData:[],
    updateSession:null
  };

export const sessionReducers  =(state = initialState,action) =>{

    switch (action.type) {
        case REQUERST_SESSION:
          return { initalRequest: true };
    
        case LOAD_SESSION:
          return {
            ...state,
            loading: true,
          };
    
        case SUCCESS_SESSION:
          return {
            ...state,
            loading: false,
            session: action.payload,
          };
    
        case ERROR_SESSION:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
    
        default:
          return state;

        }

}


export const getSessionReducers  =(state = initialState,action) =>{

  switch (action.type) {
      case REQUERST_SESSION_DATA:
        return { initalRequest: true };
  
      case LOAD_SESSION_DATA:
        return {
          ...state,
          loading: true,
        };
  
      case SUCCESS_SESSION_DATA:
        return {
          ...state,
          loading: false,
          sessionData : action.payload

        };
  
      case ERROR_SESSION_DATA:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;

      }

}


export const UpdateSessionReducers  =(state = initialState,action) =>{

  switch (action.type) {
      case REQUERST_SESSION_DATA_UPDATE:
        return { initalRequest: true };
  
      case LOAD_SESSION_DATA_UPDATE:
        return {
          ...state,
          loading: true,
        };
  
      case SUCCESS_SESSION_DATA_UPDATE:
        return {
          ...state,
          loading: false,
          updateSession : action.payload

        };
  
      case ERROR_SESSION_DATA_UPDATE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;

      }

}