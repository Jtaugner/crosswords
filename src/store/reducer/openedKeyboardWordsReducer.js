import {ADD_OPENED_KEYBOARD, CLEAR_OPENED_KEYBOARD, getJSONFromLocalStorage} from "../common";
let keyboardProgress = getJSONFromLocalStorage('keyboardProgress',
    {0: []});


export const openedKeyboardWordsReducer = (state = keyboardProgress, action) => {
    if(action.type === ADD_OPENED_KEYBOARD){
        if(!state[action.level]){
            state[action.level] = [];
        }
        state[action.level].push(action.index);
        localStorage.setItem('keyboardProgress', JSON.stringify(state));
        return {...state};
    }else if(action.type === CLEAR_OPENED_KEYBOARD){
        delete state[action.level];
        localStorage.setItem('keyboardProgress', JSON.stringify(state));
        return {...state};
    }
    return state;
};