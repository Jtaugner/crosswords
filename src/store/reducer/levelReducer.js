import {getFromLocalStorage, INCREASE_LEVEL, SELECT_LEVEL} from "../common";

let playerLevel = getFromLocalStorage('playerLevel', 0);


export const levelReducer = (state = playerLevel, action) => {
    if(action.type === SELECT_LEVEL){
        return action.level;
    }else if(action.type === INCREASE_LEVEL){
        console.log(state + 1, ' - level');
        return state + 1;
    }
    return state;
};