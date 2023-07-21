import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducer from "./modules";
import { setAuthToken } from "../utils";

const initialState = {};

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)) );

let currentState = store.getState()

store.subscribe(()=> {
    let previousState = currentState
    currentState = store.getState()

    if(previousState.users.token !== currentState.users.token) {
        const token = currentState.users.token
        setAuthToken(token)
    }
})

export default store;