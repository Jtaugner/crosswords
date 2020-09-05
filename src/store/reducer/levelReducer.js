import {getFromLocalStorage, SELECT_LEVEL} from "../common";

let playerLevel = getFromLocalStorage('playerLevel', 0);


export const levelReducer = (state = playerLevel, action) => {
    if(action.type === SELECT_LEVEL){
        return action.level;
    }
    return state;
};