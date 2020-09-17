import {ADD_OPENED_KEYBOARD, CLEAR_OPENED_KEYBOARD, getJSONFromLocalStorage} from "../common";
let keyboardProgress = getJSONFromLocalStorage('keyboardProgress', []);


export const openedKeyboardWordsReducer = (state = keyboardProgress, action) => {
    if(action.type === ADD_OPENED_KEYBOARD){
        state.push(action.index);
        return [...state];
    }else if(action.type === CLEAR_OPENED_KEYBOARD){
        localStorage.setItem('keyboardProgress', '[]');
        return [];
    }
    return state;
};