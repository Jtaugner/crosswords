export const TOGGLE_SETTINGS = "TOGGLE_SETTINGS";
export const TOGGLE_SOUNDS = "TOGGLE_SOUNDS";


export const CHANGE_GAME_SDK = "CHANGE_GAME_SDK";
export const CHANGE_PLAYER_SDK = "CHANGE_PLAYER_SDK";
export const CHANGE_GAME_PAYMENTS = "CHANGE_GAME_PAYMENTS";
export const CHANGE_GAME_CATALOG = "CHANGE_GAME_CATALOG";

//Покупки за монеты
export const SUBTRACT_MONEY = "SUBTRACT_MONEY";
export const ADD_MONEY = "ADD_MONEY";
export const CHANGE_FROM_PLAYER_DATA = "CHANGE_FROM_PLAYER_DATA";


//Уровни
export const SELECT_LEVEL = "SELECT_LEVEL";
export const INCREASE_LEVEL = "INCREASE_LEVEL";
export const INCREASE_LAST_LEVEL = "INCREASE_LAST_LEVEL";

export const CHANGE_LEVEL_PROGRESS = "CHANGE_LEVEL_PROGRESS";
export const CLEAR_LEVEL_FROM_PROGRESS = "CLEAR_LEVEL_FROM_PROGRESS";


export const ADD_OPENED_KEYBOARD = "ADD_OPENED_KEYBOARD";
export const CLEAR_OPENED_KEYBOARD = "CLEAR_OPENED_KEYBOARD";

//Игра
export const TOGGLE_DELETE_WRONG_WORD = "TOGGLE_DELETE_WRONG_WORD";
export const TOGGLE_START_FROM_FIRST_CELL = "TOGGLE_START_FROM_FIRST_CELL";

export const TOGGLE_SHOP_OPENED = "TOGGLE_SHOP_OPENED";



export const getFromLocalStorage = (name, defaultVal) => {
    try {
        let val = localStorage.getItem(name);
        if (val) return Number(val);
        localStorage.setItem(name, defaultVal);
    } catch (e) {}

    return defaultVal;

};
export const getBoolFromLocalStorage = (name) => {
    try {
        let val = localStorage.getItem(name);
        if (val) return val === 'true';
    } catch (e) {}

    return true;
};
export const getJSONFromLocalStorage = (name, defaultVal) => {
    try {
        let val = localStorage.getItem(name);
        if (val) return JSON.parse(val);
    } catch (e) {}

    return defaultVal;

};

export const getSec = () => {
    let date = new Date();
    return date.getTime()
}

export const setElementToLocalStorage = (name, val) => {
    try {
        if(name === 'lastLevel'){
            localStorage.setItem('time', getSec());
        }
        localStorage.setItem(name, val);
    } catch (e) {}
}