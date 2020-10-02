import {INCREASE_LEVEL, SELECT_LEVEL} from "../common";

export const levelReducer = (state = 0, action) => {
    if(action.type === SELECT_LEVEL){
        return action.level;
    }else if(action.type === INCREASE_LEVEL){
        return state + 1;
    }
    return state;
};