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
        openedKeyboardWords: selectOpenedKeyboardWords(state)
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

        setInterval(()=>{
            saveData();
        }, 10000);

        store.dispatch(changePlayer( _player));

        playerGame.getData(['gameProgress'], false).then((data) => {
            let gp = data.gameProgress;
            //Вовзврат прогресса

            try {
                let r = getFromLocalStorage("lastLevel", 0);
                if(gp){
                    if(r > gp.lastLevel) gp.lastLevel = r;
                }else{
                    gp = {lastLevel: r};
                }

                let o = ysdk.environment.payload;
                if (o) {
                    let lvl = o.match(/lvl\d+/);
                    if(lvl){
                        gp.lastLevel = Number(lvl[0].replace("lvl", ""));
                    }
                    let tps = o.match(/tps\d+/);
                    if(tps){
                        gp.money = Number(tps[0].replace("tps", ""));
                    }
                }
            } catch (d) {
                console.log(d)
            }
            if(gp){
                if(gp.money) store.dispatch(changeFromPlayerData('money', gp.money));
                if(gp.levelProgress) store.dispatch(changeFromPlayerData('levelProgress', gp.levelProgress));
                if(gp.openedKeyboardWords) store.dispatch(changeFromPlayerData('openedKeyboardWords', gp.openedKeyboardWords));
                store.dispatch(changeFromPlayerData('lastLevel', gp.lastLevel));
                if(gp.lastLevel){
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
function isHidden() {
    try{
        return document.querySelector('.gamePage').offsetParent === null;
    }catch(e){
        return false;
    }

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
        document.getElementById('homeID'),
        function (){
            console.log('App done');
            setTimeout(()=>{
                if(isHidden()) {
                    giveParams({'hidden': 1});
                    window.location.reload();
                }
            }, 700);

        }
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

