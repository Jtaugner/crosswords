import React from 'react';
import './endGameWindow.scss'
import popUpBlackout from "../../decorators/pop-up-blackout/PopUpBlackout";
import MenuLink from "../menuLink/menuLink";

//[[0,0,0,0,0,0,0,0],true,true,true,true,true,true,true,true,true]
function EndGameWindow(props) {
    const {nextGame} = props;
    return (
        <div className="endGame popUp">
            <div className="popUp__header">
                Уровень пройден!
            </div>
            <div className="endGame__prize">
                Ваша награда:
                <div className="endGame__prizeMoney">
                    +1
                    <div className="endGame__money" />
                </div>
            </div>

            <div className="endGame__actions">
                    <MenuLink endGame={true}/>
                    <div
                        className="menu endGame__nextLevel icon"
                        onClick={nextGame}
                    />
            </div>
        </div>
    );
}

export default popUpBlackout(EndGameWindow);
