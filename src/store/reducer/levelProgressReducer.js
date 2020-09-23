import {CHANGE_LEVEL_PROGRESS, getJSONFromLocalStorage, SELECT_LEVEL} from "../common";
import {createLastLevelGameProgress} from "../../projectCommon";

// Массив, каждые элемент обозначает строку кроссворда:
    // Строки:
        // Массивы с размером в длину слова:
            // 0 - буква закрыта
            // 1 - буква открыта
            // буква - буква вставлена игроком
let levelProgress = getJSONFromLocalStorage('levelProgress', createLastLevelGameProgress(0));

export const levelProgressReducer = (state = levelProgress, action) => {
    if(action.type === CHANGE_LEVEL_PROGRESS){
        localStorage.setItem('levelProgress', JSON.stringify(action.progress));
        return [...action.progress];
    }
    return state;
};