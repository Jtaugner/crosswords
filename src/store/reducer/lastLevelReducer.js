import {CHANGE_LAST_LEVEL, getFromLocalStorage} from "../common";

let lastLevel = getFromLocalStorage('lastLevel', -1);


export const lastLevelReducer = (state = lastLevel, action) => {
    if(action.type === CHANGE_LAST_LEVEL){
        console.log('dasd');
        console.log('change', action.level);
        console.log(action.level);
        localStorage.setItem('lastLevel', action.level);
        return action.level;
    }
    return state;
};