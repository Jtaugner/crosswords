import {TOGGLE_SHOP_OPENED} from "../common";


export const shopOpenedReducer = (state = false, action) => {
    if(action.type === TOGGLE_SHOP_OPENED){
        return !state;
    }
    return state;
};