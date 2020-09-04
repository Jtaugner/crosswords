import {applyMiddleware, createStore} from 'redux'
import {reducer} from './reducer'
import thunk from 'redux-thunk'
import {advertMiddleware} from "./middlewares/advOperation";
const enhancer = applyMiddleware(
    thunk,
    advertMiddleware
    );



export const store = createStore(reducer, enhancer);