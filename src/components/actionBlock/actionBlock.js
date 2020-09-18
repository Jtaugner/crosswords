import React from 'react';
import './actionBlock.scss'
import {connect} from "react-redux";
import {getLevelWords, getLevelWordsDescription} from "../../projectCommon";
import Keyboard from "./keyboard/keyboard";

function getWordDescriptionFontSize(desc) {
    const l = desc.length;
    let font = 17;
    for(let i = 20; i < l; i += 10){
        font--;
    }
    return font;
}

function ActionBlock(props) {
    const {level, changeSelectedWord, selectedWordIndex, addLetterToCrossWord,
        levelProgress} = props;


    const wordDescription = getLevelWordsDescription(level, selectedWordIndex);


    const changeWord = (word) => {
        changeSelectedWord(word);
    };

    const changeWordDownOnclick = () => {
        for(let i = selectedWordIndex + 1; i < levelProgress.length; i++){
            if(levelProgress[i] !== true) return changeWord(i);
        }
        for(let i = 0; i < selectedWordIndex; i++){
            if(levelProgress[i] !== true) return changeWord(i);
        }
    };
    const changeWordUpOnclick = () => {
        for(let i = selectedWordIndex - 1; i >= 0; i--){
            if(levelProgress[i] !== true) return changeWord(i);
        }
        for(let i = levelProgress.length-1; i > selectedWordIndex; i++){
            if(levelProgress[i] !== true) return changeWord(i);
        }
    };

    return (
        <div className={'actionBlock'} >
            <div className="actionBlock__interaction">
                <div
                    className="actionBlock__changeWord actionBlock__changeWord-down"
                    onClick={changeWordDownOnclick}

                />
                <span
                    className="actionBlock__wordDescription"
                    style={{fontSize: getWordDescriptionFontSize(wordDescription)}}
                >
                    {wordDescription}
                </span>
                <div
                    className="actionBlock__changeWord actionBlock__changeWord-up"
                    onClick={changeWordUpOnclick}
                />
            </div>


            <Keyboard
                addLetterToCrossWord={addLetterToCrossWord}
                openedKeyboard={props.openedKeyboard}
                selectedWord={props.selectedWord}
            />

            {props.usingTip ? <div className="innerBlackout" /> : ''}
        </div>
    );
}

export default connect((store) => ({


    })
)(ActionBlock);
