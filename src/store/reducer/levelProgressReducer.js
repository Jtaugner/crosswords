import {CHANGE_LEVEL_PROGRESS, CLEAR_LEVEL_FROM_PROGRESS, getJSONFromLocalStorage, SELECT_LEVEL} from "../common";
import {createLastLevelGameProgress} from "../../projectCommon";

// Массив, каждые элемент обозначает строку кроссворда:
    // Строки:
        // Массивы с размером в длину слова:
            // 0 - буква закрыта
            // 1 - буква открыта
            // буква - буква вставлена игроком
const defaultProgress = {0: createLastLevelGameProgress(0)};
let levelProgress = getJSONFromLocalStorage('levelProgress', defaultProgress);
if(Array.isArray(levelProgress)) levelProgress = defaultProgress;
export const levelProgressReducer = (state = levelProgress, action) => {
    if(action.type === CHANGE_LEVEL_PROGRESS){
        state[action.level] = action.progress;
        localStorage.setItem('levelProgress', JSON.stringify(state));
        return {...state};
    }else if(action.type === CLEAR_LEVEL_FROM_PROGRESS){
        delete state[action.level];
        localStorage.setItem('levelProgress', JSON.stringify(state));
        return {...state};
    }
    return state;
};