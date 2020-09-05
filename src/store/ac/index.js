import {
    CHANGE_GAME_PAYMENTS,
    CHANGE_GAME_SDK, SELECT_LEVEL,
    SHOW_ADV,
    TOGGLE_SETTINGS,
    TOGGLE_SOUNDS
} from "../common";





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

export const changeGamePayments = (payments) => ({
    type: CHANGE_GAME_PAYMENTS,
    payments
});