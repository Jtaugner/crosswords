import {getFromLocalStorage, SELECT_LEVEL} from "../common";

// Массив, каждые элемент обозначает строку кроссворда:
    // Строки:
        // 1) Если true -  то всё слово открыто
        // 2) Если нет, то Массив с размером в длину слова:
            // 0 - буква закрыта
            // 1 - буква открыта
            // 2 - буква вставлена игроком
let levelProgress = getFromLocalStorage('levelProgress', []);


export const levelProgressReducer = (state = levelProgress, action) => {
    if(action.type === SELECT_LEVEL){
        return action.level;
    }
    return state;
};