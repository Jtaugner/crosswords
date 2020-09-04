import {TOGGLE_SOUNDS} from "../common";

let isSounds = localStorage.getItem('sounds');
if(isSounds) isSounds = isSounds === 'true';
else isSounds = true;

export const soundsReducer = (state = isSounds, action) => {
    if(action.type === TOGGLE_SOUNDS){
        localStorage.setItem('sounds', !state);
        return !state;
    }
    return state;
};