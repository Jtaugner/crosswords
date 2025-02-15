import {combineReducers} from 'redux'
import {settingsReducer} from "./settingsReducer";
import {soundsReducer} from "./soundsReducer";
import {gameSDKReducer} from "./gameSDKReducer";
import {gamePaymentsReducer} from "./gamePaymentsReducer";
import {moneyReducer} from "./moneyReducer";
import {levelReducer} from "./levelReducer";
import {levelProgressReducer} from "./levelProgressReducer";
import {lastLevelReducer} from "./lastLevelReducer";
import {deleteWrongWordReducer} from "./deleteWrongWordReducer";
import {startFromFirstCellReducer} from "./startFromFirstCellReducer";
import {shopOpenedReducer} from "./shopOpenedReducer";
import {openedKeyboardWordsReducer} from "./openedKeyboardWordsReducer";
import {gameCatalogReducer} from "./gameCatalogReducer";
import {playerSDKReducer} from "./playerSDKReducer";

const reducer = combineReducers({
    settings: settingsReducer,
    sounds: soundsReducer,
    gameSDK: gameSDKReducer,
    gamePayments: gamePaymentsReducer,
    money: moneyReducer,
    level: levelReducer,
    levelProgress: levelProgressReducer,
    lastLevel: lastLevelReducer,
    deleteWrongWord: deleteWrongWordReducer,
    startFromFirstCell:  startFromFirstCellReducer,
    shopOpened: shopOpenedReducer,
    openedKeyboardWords: openedKeyboardWordsReducer,
    catalog: gameCatalogReducer,
    player: playerSDKReducer

});

export {reducer};