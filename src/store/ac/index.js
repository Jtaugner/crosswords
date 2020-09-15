import {
    CHANGE_GAME_PAYMENTS,
    CHANGE_GAME_SDK, CHANGE_LAST_LEVEL, CHANGE_LEVEL_PROGRESS, SELECT_LEVEL,
    SHOW_ADV, TOGGLE_DELETE_WRONG_WORD,
    TOGGLE_SETTINGS,
    TOGGLE_SOUNDS, TOGGLE_START_FROM_FIRST_CELL
} from "../common";
import {startFromFirstCellReducer} from "../reducer/startFromFirstCellReducer";





export const toggleSettings = () => ({
    type: TOGGLE_SETTINGS,
});
export const toggleSounds = () => ({
    type: TOGGLE_SOUNDS,
});
export const changeGameSDK= (gameSDK) => ({
    type: CHANGE_GAME_SDK,
    gameSDK
});
export const showAdv = () => ({
    type: SHOW_ADV
});

export const chooseLevel = (level) => ({
    type: SELECT_LEVEL,
    level
});
export const changeLastLevel = (level) => ({
    type: CHANGE_LAST_LEVEL,
    level
});
export const changeLevelProgress = (progress) => ({
    type: CHANGE_LEVEL_PROGRESS,
    progress
});
export const changeGamePayments = (payments) => ({
    type: CHANGE_GAME_PAYMENTS,
    payments
});

export const toggleDeleteWrongWord = () => ({
    type: TOGGLE_DELETE_WRONG_WORD,
});
export const toggleStartFromFirstCell = () => ({
    type: TOGGLE_START_FROM_FIRST_CELL,
});