//Jtaugner (yotik123@yandex.ru) Copyright © 2020
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import {store} from "./store";
import {MemoryRouter} from "react-router-dom";
import {
    changeGamePayments,
    changeGameSDK,
} from "./store/ac";

var playerGame, ysdkGame;


function getState() {
    const state = store.getState();
    return {
        /*
        Пример, что должно быть в объекте
        level: selectPlayerLevel(state),

         */
    }
}

// Сохранение данных в аккаунт пользователя Яндекса
export function saveData() {
    try{
        if (playerGame) {
            const state = {gameProgress: getState()};
            if(playerGame) playerGame.setData(state).then((ignored) => {}).catch(()=>{});
        }
    }catch (ignored) {}
}

export function initPlayer(ysdk, fromShop) {
    ysdk.getPlayer().then(_player => {
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

        playerGame.getData(['gameProgress'], false).then((data) => {
            const gp = data.gameProgress;
            if(gp){
                /*
                    Пример измененеия данных
                        store.dispatch(changeExp(gp.exp));
                 */
            }else{
                saveData();
            }
            createApp();
        }).catch((e) => {
            createApp();
        });
        ysdk.getPayments({signed: false}).then(_payments => {
            // Покупки доступны.
            store.dispatch(changeGamePayments(_payments));
        }).catch(err => {
            console.log(err);
        });
    }).catch((e) => {
        console.log(e);
        createApp();
    });
}

function createApp() {
    ReactDOM.render(
        <Provider store={store}>
            <MemoryRouter
                initialEntries={['/home']}
                initialIndex={0}
            >
                <App
                    ysdkGame={ysdkGame}
                />
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

                ysdkGame = ysdk;
                initPlayer(ysdk);
            });
} else {
    createApp();
}

