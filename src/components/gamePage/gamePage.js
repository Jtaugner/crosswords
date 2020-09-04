import React, {useState} from 'react';
import './gamePage.scss'
import {connect} from "react-redux";
import TopMenu from "../topMenu/topMenu"
import {showAdv} from "../../store/ac";
import Money from "../money/money";
import Crossword from "../crossword/crossword";


function GamePage(props) {
    const {
        showAdv
    } = props;



    return (
        <div className={'gamePage'}>
            <TopMenu>
                <Money/>
            </TopMenu>
            <Crossword/>
        </div>
    );
}

export default connect((store) => ({
    }),
    (dispatch) => ({
        showAdv: () => dispatch(showAdv()),
    })
)(GamePage);
