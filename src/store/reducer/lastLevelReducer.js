import {getFromLocalStorage, INCREASE_LAST_LEVEL} from "../common";

let lastLevel = getFromLocalStorage('lastLevel', 0);


export const lastLevelReducer = (state = lastLevel, action) => {
    if(action.type === INCREASE_LAST_LEVEL){
        localStorage.setItem('lastLevel', String(state + 1));
        return state + 1;
    }
    return state;
};