//Jtaugner (yotik123@yandex.ru) Copyright © 2020
import React from 'react';
import ReactDOM from 'react-dom';
import App, {giveParams} from './App';
import {Provider} from 'react-redux'
import {store} from "./store";
import {MemoryRouter} from "react-router-dom";
import {
    addMoney, changeFromPlayerData, changeGameCatalog,
    changeGamePayments,
    changeGameSDK, changePlayer, chooseLevel,
} from "./store/ac";
import {gameLevels, shopItems} from "./projectCommon";
import {
    selectLastLevel,
    selectLevelProgress,
    selectMoney,
    selectOpenedKeyboardWords
} from "./store/selectors";
import {getFromLocalStorage, getSec} from "./store/common";

var playerGame;


let recentData = '';

function getState() {
    const state = store.getState();
    return {
        money: selectMoney(state),
        lastLevel: selectLastLevel(state),
        levelProgress: selectLevelProgress(state),
        openedKeyboardWords: selectOpenedKeyboardWords(state),
        time: getSec()
    }
}

// Сохранение данных в аккаунт пользователя Яндекса
export function saveData() {
    try{
        console.log('saveData');
        if (playerGame) {
            const state = {gameProgress: getState()};
            const newData = JSON.stringify(state);
            if(newData === recentData) return;
            recentData = newData;
            if(playerGame) playerGame.setData(state).then((ignored) => {}).catch(()=>{});
        }
    }catch (ignored) {}
}

function consumePurchase(purchase, payments) {
    try{
        for(let i = 0; i < shopItems.length; i++){
            if(shopItems[i].id === purchase.productID){
                store.dispatch(addMoney(shopItems[i].amount));
                break;
            }
        }
        giveParams({[purchase.productID]: 1});
        payments.consumePurchase(purchase.purchaseToken);
        saveData();
    }catch(e){}
}

export function initPlayer(ysdk) {
    ysdk.getPlayer().then(_player => {
        console.log('INIT PLAYER');
        // Игрок авторизован.
        playerGame = _player;

        //Сохранение данных на серверах Яндекса при закрытии, смене вкладке, обновлении
        window.onblur = saveData;
        window.onunload= saveData;
        window.onbeforeunload = saveData;
        window.onpagehide = saveData;

        // Сохранение данных каждые 60 сек
        setInterval(()=>{
            saveData();
        }, 60000);

        store.dispatch(changePlayer( _player));

        playerGame.getData(['gameProgress'], false).then((data) => {
            const gp = data.gameProgress;
            console.log('date', gp);
            //Вовзврат прогресса
            try{
                let llsmz = localStorage.getItem('llsmz');
                if(!llsmz){
                    const ss = new URLSearchParams(window.location.search);
                    let lvl = Number(ss.get('llsmz'));
                    if(lvl >= gp.lastLevel){
                        gp.lastLevel = lvl;
                    }
                }
                localStorage.setItem('llsmz', 'true');
                let time = localStorage.getItem('time');


                if(time){
                    time = Number(time);
                    if(gp.time && time > gp.time){
                        let lastLevel = getFromLocalStorage('lastLevel', 0);
                        if(lastLevel > gp.lastLevel){
                            gp.lastLevel = lastLevel;
                        }
                    }
                }


            }catch(e){
                console.log(e);
            }
            if(gp){
                if(gp.money) store.dispatch(changeFromPlayerData('money', gp.money));
                if(gp.levelProgress) store.dispatch(changeFromPlayerData('levelProgress', gp.levelProgress));
                if(gp.openedKeyboardWords) store.dispatch(changeFromPlayerData('openedKeyboardWords', gp.openedKeyboardWords));
                if(gp.lastLevel) {
                    store.dispatch(changeFromPlayerData('lastLevel', gp.lastLevel));
                    store.dispatch(
                        chooseLevel(gp.lastLevel >= gameLevels.length ? gameLevels.length-1 : gp.lastLevel)
                    );
                }
            }else{
                saveData();
            }
            createApp();
        }).catch((e) => {
            createApp();
        });
    }).catch((e) => {
        console.log(e);
        createApp();
    });

    ysdk.getPayments({signed: false}).then(_payments => {
        _payments.getCatalog().then(catalog => store.dispatch(changeGameCatalog(catalog)) );
        // Покупки доступны.
        store.dispatch(changeGamePayments(_payments));
        _payments.getPurchases().then(purchases => purchases.forEach((id)=>{
            consumePurchase(id, _payments);
        }));
    }).catch(err => {
        console.log(err);
    });
}

function createApp() {
    ReactDOM.render(
        <Provider store={store}>
            <MemoryRouter
                initialEntries={['/game']}
                initialIndex={0}
            >
                <App/>
            </MemoryRouter>
        </Provider>

        ,
        document.getElementById('root')
    );
}

if (window.YaGames) {
        window.YaGames.init()
            .then(ysdk => {
                store.dispatch(changeGameSDK(ysdk));
                var isNativeCache = ysdk.yandexApp && ysdk.yandexApp.enabled;


                if ('serviceWorker' in navigator && !isNativeCache) {
                    window.onload = function () {
                        navigator.serviceWorker
                            .register('sw.js')
                            .then(function (reg) {
                                console.log('Registration succeeded. Scope is ' + reg.scope);
                            })
                            .catch(function (error) {
                                console.error('Trouble with sw: ', error);
                            });
                    };
                }

                initPlayer(ysdk);
            });
} else {
    createApp();
}

