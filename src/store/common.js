export const SHOW_ADV = "SHOW_ADV";


export const TOGGLE_SETTINGS = "TOGGLE_SETTINGS";
export const TOGGLE_SOUNDS = "TOGGLE_SOUNDS";



export const CHANGE_GAME_SDK = "CHANGE_GAME_SDK";
export const CHANGE_GAME_PAYMENTS = "CHANGE_GAME_PAYMENTS";

//Покупки за монеты
export const SUBTRACT_MONEY = "SUBTRACT_MONEY";
export const ADD_MONEY = "ADD_MONEY";
export const CHANGE_MONEY_FROM_PLAYER_DATA = "CHANGE_MONEY_FROM_PLAYER_DATA";


//Уровни
export const SELECT_LEVEL = "SELECT_LEVEL";
export const CHANGE_LAST_LEVEL = "CHANGE_LAST_LEVEL";
export const CHANGE_LEVEL_PROGRESS = "CHANGE_LEVEL_PROGRESS";

export const getFromLocalStorage = (name, defaultVal) => {
  let val = localStorage.getItem(name);
  if(val) return Number(val);
  localStorage.setItem(name, defaultVal);
  return defaultVal;
};