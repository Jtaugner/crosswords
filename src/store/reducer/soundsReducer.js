import {getBoolFromLocalStorage, setElementToLocalStorage, TOGGLE_SOUNDS} from "../common";

let isSounds = getBoolFromLocalStorage('sounds');

export const soundsReducer = (state = isSounds, action) => {
    if(action.type === TOGGLE_SOUNDS){
        setElementToLocalStorage('sounds',  !state);
        return !state;
    }
    return state;
};