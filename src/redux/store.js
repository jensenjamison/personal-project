import {createStore, applyMiddleware, combineReducers} from "redux";
// import {createStore, applyMiddleware, combineReducers, compose} from "redux";
import promise from "redux-promise-middleware";
import userReducer from "./reducers/userReducer";
import surveysReducer from "./reducers/surveysReducer";
 

const rootReducer = combineReducers({
    user: userReducer,
    surveys: surveysReducer
})

// const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null;

// export default createStore(rootReducer, compose(applyMiddleware(promise), devTools));
export default createStore(rootReducer, applyMiddleware(promise));