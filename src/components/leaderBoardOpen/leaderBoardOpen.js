import React from 'react';
import './leaderBoardOpen.scss'


function LeaderBoardOpen(props) {
    const {onClick} = props;
    return <div className="icon leaderBoardIcon" onClick={onClick}>
    </div>
}

export default LeaderBoardOpen;
