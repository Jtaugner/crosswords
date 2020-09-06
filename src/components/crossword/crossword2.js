import React, {useEffect} from 'react';
import './crossword.scss'
import {connect} from "react-redux";
import {getLevelWords} from "../../projectCommon";


const pixelsPerLetters = 5;


function Crossword2(props) {
    const {level, changeSelectedWord, selectedWordIndex} = props;
    const levelWords = getLevelWords(level);

    const letterSize = (
        (window.innerWidth - window.innerWidth * 0.03)
        - pixelsPerLetters * (levelWords[0].length - 1) ) / levelWords[0].length;
    const fontLetterSize = Math.floor(letterSize / 1.5);

    const wordOnclick = (wordIndex) => {
        changeSelectedWord(wordIndex);
    };
    const addLetter = (letter) => {
        console.log(letter)
    } ;


    let wordRef;
    useEffect(() => {
        wordRef.scrollIntoView({behavior: 'smooth', block: "center", inline: "center"});
    });
    const selectedWordRef = (div, index) => {
        if (selectedWordIndex === index) wordRef = div;
    };
    return (
        <div className={'crossword-wrapper'}>
            <div className={'crossword'}>
                {
                    levelWords.map((word, wordIndex) => {
                        return <div
                            className={
                                'crossword__word '
                                + (selectedWordIndex === wordIndex ?
                                    'crossword__word_selected' : '')
                            }
                            ref={(div) => selectedWordRef(div, wordIndex)}
                            key={word}
                            onClick={() => wordOnclick(wordIndex)}
                        >
                            {
                                word.split('').map((letter, letterIndex) => {
                                    return <div
                                        className={'crossword__letter'}
                                        key={word + letterIndex}
                                        style={{
                                            width: letterSize,
                                            height: letterSize,
                                            fontSize: fontLetterSize + 'px'
                                        }}
                                    >
                                        {letter.toUpperCase()}
                                    </div>
                                })
                            }
                        </div>
                    })
                }
            </div>
        </div>
    );
}

export default connect((store) => ({})
)(Crossword2);