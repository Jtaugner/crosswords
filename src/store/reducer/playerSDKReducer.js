import {CHANGE_PLAYER_SDK} from "../common";

export const playerSDKReducer = (state = false, action) => {
    if(action.type === CHANGE_PLAYER_SDK){
        return action.player;
    }
    return state;
};