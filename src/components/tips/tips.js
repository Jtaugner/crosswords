import React from 'react';
import './tips.scss'
import {connect} from "react-redux";


function Tips(props) {

    return (
        <div className={'tips'}>
            <div className="tip tip1" />
            <div className="tip tip2" />
            <div className="tip tip3" />
            <div className="tip tip4"/>
        </div>
    );
}

export default connect((store) => ({


    })
)(Tips);
