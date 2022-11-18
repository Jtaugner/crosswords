import React, {useState} from 'react';
import './mainPage.scss'
import {connect} from "react-redux";

import TopMenu from "../topMenu/topMenu";
import Money from "../money/money";
import Settings from "../settings";
import SettingsOpen from "../settingsOpen/settingsOpen";
import Levels from "../levels/levels";
import LeaderBoardWindow from "../leaderBoardWindow/leaderBoardWindow";
import LeaderBoardOpen from "../leaderBoardOpen/leaderBoardOpen";
import {selectGameSDK} from "../../store/selectors";

function goToUserInLb(){
    setTimeout(()=>{
        try{
            let scrollEl = document.querySelector('.leaderBoardInfo_my');
            scrollEl.scrollIntoView({behavior: 'auto', block: "center", inline: "center"});
        }catch(ignored){}
    }, 300);
}


function MainPage(props) {
    const {gameSDK} = props;
    const [isSettingsOpen, changeSettingsOpen] = useState(false);

    const settingsOpenOnClick = () => {changeSettingsOpen(true)};
    const settingsCloseOnClick = () => {changeSettingsOpen(false)};

    const [isLeaderBoardOpen, changeLeaderBoardOpen] = useState(false);
    const [leaderBoard, changeLeaderBoard] = useState(false);
    const [playerRait, changePlayerRait] = useState(false);

    const leaderBoardOpenOnClick = () => {
        try{
            gameSDK.getLeaderboards()
                .then(lb => {
                    console.log(lb);

                    lb.getLeaderboardPlayerEntry('lvl')
                        .then(player => {changePlayerRait(player);})

                    function getLbByName(name){
                        // Получение 10 топов
                        lb.getLeaderboardEntries(name, { quantityTop: 20, includeUser: true, quantityAround: 10}).then(res => {
                            changeLeaderBoard(res.entries);
                            goToUserInLb();
                        }).catch((error)=>{
                            console.log('er', error);
                            //Пробуем без юзера
                            lb.getLeaderboardEntries(name, { quantityTop: 20}).then(res => {
                                changeLeaderBoard(res.entries);
                            });
                        });
                    }
                    getLbByName('lvl');
                    // let lbInGame = [
                    //     {rank: 1, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
                    //     {rank: 2, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
                    //     {rank: 3, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
                    //     {rank: 4, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
                    //     {rank: 5, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
                    //     {rank: 6, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
                    //     {rank: 7, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
                    //     {rank: 8, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
                    //     {rank: 9, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
                    //     {rank: 10, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
                    //     {rank: 11, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
                    //     {rank: 12, score: 23, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
                    //     {rank: 13, score: 21, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
                    //     {rank: 14, score: 19, player: {uniqueID: 123, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
                    //     {rank: 15, score: 18, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
                    //     {rank: 16, score: 17, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
                    //     {rank: 17, score: 17, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
                    //     {rank: 18, score: 17, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
                    //     {rank: 19, score: 17, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
                    //     {rank: 20, score: 17, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
                    //     {rank: 21, score: 15, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
                    //     {rank: 22, score: 15, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
                    //     {rank: 23, score: 15, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
                    //     {rank: 24, score: 15, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
                    //     {rank: 25, score: 15, player: {uniqueID: 1, getAvatarSrc: () => "https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium"}},
                    // ];
                    // changeLeaderBoard(lbInGame);
                })
                .catch(e => {
                    changeLeaderBoard(false);
                    console.log(e);
                });
        }catch(e){console.log(e)}
        changeLeaderBoardOpen(true);
    };
    const leaderBoardCloseOnClick = () => {changeLeaderBoardOpen(false)};
    return (
        <div className={'mainPage'}>
            <TopMenu>
                <SettingsOpen onClick={settingsOpenOnClick}/>
                <Money/>

            </TopMenu>

            <Levels canSwitchPage={props.canSwitchPage}/>
            <LeaderBoardOpen onClick={leaderBoardOpenOnClick}/>

            {isSettingsOpen ? <Settings closeSettings={settingsCloseOnClick}/> : ''}
            {isLeaderBoardOpen ?
                <LeaderBoardWindow
                    onClick={leaderBoardCloseOnClick}
                    leaderBoard={leaderBoard}
                    playerRait={playerRait}

                />
                : ''}
        </div>
    );
}

export default connect(
    (store)=>({
        gameSDK: selectGameSDK(store)
    })
    ,
    (dispatch)=>({

    })

)(MainPage);
