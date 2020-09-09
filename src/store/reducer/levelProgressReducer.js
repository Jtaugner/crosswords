import {CHANGE_LEVEL_PROGRESS, getFromLocalStorage, SELECT_LEVEL} from "../common";

// Массив, каждые элемент обозначает строку кроссворда:
    // Строки:
        // Массивы с размером в длину слова:
            // 0 - буква закрыта
            // 1 - буква открыта
            // буква - буква вставлена игроком
let levelProgress = getFromLocalStorage('levelProgress', []);


export const levelProgressReducer = (state = levelProgress, action) => {
    if(action.type === CHANGE_LEVEL_PROGRESS){
        return [...action.progress];
    }
    return state;
};