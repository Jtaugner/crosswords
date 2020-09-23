import {CHANGE_LAST_LEVEL, getFromLocalStorage, INCREASE_LAST_LEVEL} from "../common";

let lastLevel = getFromLocalStorage('lastLevel', 0);


export const lastLevelReducer = (state = lastLevel, action) => {
    if(action.type === CHANGE_LAST_LEVEL){
        localStorage.setItem('lastLevel', action.level);
        return action.level;
    }else if(action.type === INCREASE_LAST_LEVEL){
        console.log('lastLevel + 1');
        localStorage.setItem('lastLevel', String(lastLevel + 1));
        return lastLevel + 1
    }
    return state;
};