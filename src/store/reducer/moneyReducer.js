import {CHANGE_FROM_PLAYER_DATA, getFromLocalStorage, setElementToLocalStorage, SUBTRACT_MONEY} from "../common";
import {ADD_MONEY} from "../common";

let gameMoney = getFromLocalStorage('gameMoney', 15);
if(isNaN(gameMoney)) gameMoney = 15;

export const moneyReducer = (state = gameMoney, action) => {
    if(action.type === SUBTRACT_MONEY){
        const subtract = state - action.money;
        setElementToLocalStorage('gameMoney', subtract);
        return subtract;
    }else if(action.type === ADD_MONEY){
        const sum = state + action.money;
        setElementToLocalStorage('gameMoney', sum);
        return sum;
    }else if(action.type === CHANGE_FROM_PLAYER_DATA && action.id === 'money'){
        return action.data;
    }
    return state;
};