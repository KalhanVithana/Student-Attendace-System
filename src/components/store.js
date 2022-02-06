import { combineReducers,createStore,applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { loginReducer, signUpReducers,updateUserReducer } from "./Redux/reducers/signUPReducer";
import { sessionReducers ,getSessionReducers,UpdateSessionReducers} from "./Redux/reducers/sessionReducer";

const reducers = combineReducers({
    
  signUpReducers:signUpReducers,
  loginReducer:loginReducer,
  sessionReducers:sessionReducers,
  getSessionReducers:getSessionReducers,
  UpdateSessionReducers:UpdateSessionReducers,
  updateUserReducer:updateUserReducer
})


const middleware = [thunk]


const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
    
)


export default store;