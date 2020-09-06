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
    const {level, changeSelectedWord, selectedWordIndex, addLetterToCrossWord} = props;


    const wordDescription = getLevelWordsDescription(level, selectedWordIndex);
    const wordsLength = getLevelWords(level).length;


    const changeWordDownOnclick = () => {
        if(selectedWordIndex !== (wordsLength-1)){
            changeSelectedWord(selectedWordIndex + 1);
        }else{
            changeSelectedWord(0);
        }
    };
    const changeWordUpOnclick = () => {
        if(selectedWordIndex !== 0){
            changeSelectedWord(selectedWordIndex - 1);
        }else{
            changeSelectedWord(wordsLength-1);
        }
    };

    return (
        <div className={'actionBlock'}>
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
            />


        </div>
    );
}

export default connect((store) => ({


    })
)(ActionBlock);
