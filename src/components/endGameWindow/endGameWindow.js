import React from 'react';
import './endGameWindow.scss'
import popUpBlackout from "../../decorators/pop-up-blackout/PopUpBlackout";
import MenuLink from "../menuLink/menuLink";
import {gameLevels} from "../../projectCommon";

//[[0,0,0,0,0,0,0,0],true,true,true,true,true,true,true,true,true]
let goodGames = ["ХОРОШАЯ РАБОТА!", "ОТЛИЧНАЯ ИГРА!", "ТЫ МОЛОДЕЦ!", "ВОСХИТИТЕЛЬНО!"]
function getGoodGame(){
    return goodGames[Math.floor(Math.random() * goodGames.length)];
}
function EndGameWindow(props) {
    const {nextGame, level} = props;
    console.log('end game window');
    return (
        <div className="endGame__wrapper">
            <div className="endGame__header">
                <div className="endGame__icon" />
                <p className="endGame__goodGame">{getGoodGame()}</p>
                <p>Уровень {level+1} пройден!</p>
            </div>
            <div className="endGame">
                <div className="endGame__prize">
                    Награда
                    <div className="endGame__prizeMoney">
                        <div className="endGame__moneyCount">
                            <div className="endGame__moneyCount__count">
                                {props.addMoney ? '+5' : 0}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="endGame__actions">
                    <MenuLink endGame={true}/>
                    {level !== gameLevels.length-1 ?
                        <div
                            className="endGame__nextLevel"
                            onClick={nextGame}
                        >Продолжить</div> : ''}

                </div>
            </div>
        </div>

    );
}

export default popUpBlackout(EndGameWindow);
