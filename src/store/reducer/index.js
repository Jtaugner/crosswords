import {combineReducers} from 'redux'
import {settingsReducer} from "./settingsReducer";
import {soundsReducer} from "./soundsReducer";
import {gameSDKReducer} from "./gameSDKReducer";
import {gamePaymentsReducer} from "./gamePaymentsReducer";
import {moneyReducer} from "./moneyReducer";
import {levelReducer} from "./levelReducer";

const reducer = combineReducers({
    settings: settingsReducer,
    sounds: soundsReducer,
    gameSDK: gameSDKReducer,
    gamePayments: gamePaymentsReducer,
    money: moneyReducer,
    level: levelReducer

});

export {reducer};