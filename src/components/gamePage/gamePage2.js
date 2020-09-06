import React, {useState} from 'react';
import './gamePage.scss'
import {connect} from "react-redux";
import TopMenu from "../topMenu/topMenu"
import {showAdv} from "../../store/ac";
import Money from "../money/money";
import Crossword from "../crossword/crossword";
import Tips from '../tips/tips'
import {selectLevel} from "../../store/selectors";
import ActionBlock from "../actionBlock/actionBlock";
import {getLevelWords, getLevelWordsDescription} from "../../projectCommon";

function GamePage2(props) {
    const {
        showAdv,
        level
    } = props;
    const [selectedWordIndex, setSelectedWordIndex] = useState(0);


    const changeSelectedWord = (word) => {
        setSelectedWordIndex(word);
    };
    return (
        <div className={'gamePage'}>
            <TopMenu>
                <Money/>
            </TopMenu>

            <Crossword
                ref={"crossword"}
                level={level}
                selectedWordIndex={selectedWordIndex}
                changeSelectedWord={changeSelectedWord}
            />

            <Tips/>

            <ActionBlock
                level={level}
                selectedWordIndex={selectedWordIndex}
                changeSelectedWord={changeSelectedWord}
            />
        </div>
    );
}

export default connect((store) => ({
    level: selectLevel(store)
    }),
    (dispatch) => ({
        showAdv: () => dispatch(showAdv()),
    })
)(GamePage2);
