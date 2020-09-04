import {CHANGE_MONEY_FROM_PLAYER_DATA, getFromLocalStorage, SUBTRACT_MONEY} from "../common";
import {ADD_MONEY} from "../common";

let gameMoney = getFromLocalStorage('gameMoney', 10);


export const moneyReducer = (state = gameMoney, action) => {
    if(action.type === SUBTRACT_MONEY){
        const subtract = state - action.money;
        localStorage.setItem('gameMoney', subtract);
        return subtract;
    }else if(action.type === ADD_MONEY){
        const sum = state + action.money;
        localStorage.setItem('gameMoney', sum);
        return sum;
    }else if(action.type === CHANGE_MONEY_FROM_PLAYER_DATA){
        return action.money;
    }
    return state;
};