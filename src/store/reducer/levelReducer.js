import {getFromLocalStorage, INCREASE_LEVEL, SELECT_LEVEL} from "../common";
import {gameLevels} from "../../projectCommon";

let lastLevel = getFromLocalStorage('lastLevel', 0);
if(lastLevel >= gameLevels.length) lastLevel = gameLevels.length-1;

export const levelReducer = (state = lastLevel, action) => {
    if(action.type === SELECT_LEVEL){
        return action.level;
    }else if(action.type === INCREASE_LEVEL){
        return state + 1;
    }
    return state;
};