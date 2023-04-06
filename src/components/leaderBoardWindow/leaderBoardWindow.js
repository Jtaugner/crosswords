import React, {useState} from 'react';
import './leaderBoardWindow.scss'
import popUpBlackout from "../../decorators/pop-up-blackout/PopUpBlackout";
import {connect} from "react-redux";


function getPlayerStyles(player, playerRait){
    let styles = "leaderBoardInfo__player ";
    if(player.rank < 21){
        styles += 'leaderBoardInfo_' + player.rank;
    }
    if(playerRait && playerRait.rank === player.rank) {
        styles += ' leaderBoardInfo_mine ';
    }
    if(player.rank === 20){
        styles += ' lastRang'
    }
    return styles
}



function LeaderBoardWindow(props) {
    const {onClick, leaderBoard, playerRait} = props;


    return (
        <div className={'leaderBoard'}>
            <div className="rules__cross" onClick={onClick}>
                <svg className="svgIcon" width="13" height="13" viewBox="0 0 13 13" fill="#66196C" xmlns="http://www.w3.org/2000/svg"><path d="M0.902787 0.902778C1.40138 0.404188 2.20975 0.404188 2.70834 0.902778L12.0972 10.2917C12.5958 10.7903 12.5958 11.5986 12.0972 12.0972C11.5986 12.5958 10.7903 12.5958 10.2917 12.0972L0.902787 2.70833C0.404198 2.20974 0.404198 1.40137 0.902787 0.902778Z"/><path d="M12.0972 0.90278C12.5958 1.40137 12.5958 2.20974 12.0972 2.70833L2.70833 12.0972C2.20974 12.5958 1.40137 12.5958 0.902776 12.0972C0.404187 11.5986 0.404186 10.7903 0.902776 10.2917L10.2917 0.90278C10.7902 0.40419 11.5986 0.40419 12.0972 0.90278Z"/></svg>
            </div>
            <h2 className="rules__menu black-friday"> Рейтинг</h2>
            {
                leaderBoard ?
                    <div className="leaderBoardInfo">
                            {
                                Object.keys(leaderBoard).map((key)=>{
                                    let player = leaderBoard[key];
                                    return <div
                                        className={getPlayerStyles(player, playerRait)}
                                    >
                                        <div className="leaderBoardInfo__playerInfo">
                                            <div className="leaderBoardInfo__firstBlock">
                                                <div
                                                    className={"leaderBoardInfo__image"}
                                                    style={{background: 'url(' + player.player.getAvatarSrc('medium') + ') center center no-repeat'}}
                                                >
                                                </div>
                                                <div className="leaderBoardInfo__nameAndScore">
                                                    <div className="leaderBoardInfo__name">{ player.player.publicName ? player.player.publicName : 'Нет имени' }</div>
                                                    <div className="leaderBoardInfo__score">Уровень: { player.score }</div>
                                                </div>
                                            </div>
                                            <div
                                                className={"leaderBoardInfo__rank " + (player.rank > 20 ? 'leaderBoardInfo_big' : '')}
                                            >
                                                <div className={"leaderBoardInfo__rankInner " + (player.rank > 99999 ? 'leaderBoardInfo__rankInner_bigRank' : '')}
                                                >
                                                    {player.rank}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                })
                            }

                    </div>
                    :
                    <div className="ratingLoading">
                        Рейтинг загружается, подождите...
                    </div>
            }

        </div>
    );
}


export default connect((store)=>({
}), (dispatch)=>({
}))(popUpBlackout(LeaderBoardWindow));


