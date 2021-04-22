import {CHANGE_GAME_CATALOG} from "../common";

export const gameCatalogReducer = (state = false, action) => {
    if(action.type === CHANGE_GAME_CATALOG){
        return action.catalog;
    }
    return state;
};