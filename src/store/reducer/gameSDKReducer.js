import {CHANGE_GAME_SDK} from "../common";

export const gameSDKReducer = (state = false, action) => {
    if(action.type === CHANGE_GAME_SDK){
        console.log('change');
        return action.gameSDK;
    }
    return state;
};