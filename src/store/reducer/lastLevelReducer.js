import {CHANGE_LAST_LEVEL, getFromLocalStorage} from "../common";

let lastLevel = getFromLocalStorage('lastLevel', -1);


export const lastLevelReducer = (state = lastLevel, action) => {
    if(action.type === CHANGE_LAST_LEVEL){
        return action.level;
    }
    return state;
};