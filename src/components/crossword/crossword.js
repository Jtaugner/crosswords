import React, {Component, useEffect} from 'react';
import './crossword.scss'
import {getLevelWords} from "../../projectCommon";


const pixelsPerLetters = 5;

function getLetterSize(length) {
    return (
                window.innerWidth - window.innerWidth * 0.03 - pixelsPerLetters * (length - 1)
            ) / length;
}

class Crossword extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedCell: [0, 0]
        }
    }

    levelWords = getLevelWords(this.props.level);
    letterSize = getLetterSize(this.levelWords[0].length);
    fontLetterSize = Math.floor(this.letterSize / 1.5);

    wordOnclick = (wordIndex) => {
        this.props.changeSelectedWord(wordIndex);
    };
    addLetter = (letter) => {
        console.log(letter)
    } ;


    selectLetter = (wordIndex, letterIndex) => {
        this.setState({
            selectedCell: [wordIndex, letterIndex]
        })
    };

    wordRef;
    componentDidUpdate() {
        this.wordRef.scrollIntoView({behavior: 'smooth', block: "center", inline: "center"});
    }

    selectedWordRef = (div, index) => {
        if (this.props.selectedWordIndex === index) this.wordRef = div;
    };
    render(){

        return (
            <div className={'crossword-wrapper'}>
                <div className={'crossword'}>
                    {
                        this.levelWords.map((word, wordIndex) => {
                            return <div
                                className={
                                    'crossword__word '
                                    + (this.props.selectedWordIndex === wordIndex ?
                                        'crossword__word_selected' : '')
                                }
                                ref={(div) => this.selectedWordRef(div, wordIndex)}
                                key={word}
                                onClick={() => this.wordOnclick(wordIndex)}
                            >
                                {
                                    word.split('').map((letter, letterIndex) => {
                                        return <div
                                            onClick={()=>this.selectLetter(wordIndex, letterIndex)}


                                            className={'crossword__letter '
                                            + (
                                                (this.state.selectedCell[0] === wordIndex &&
                                                this.state.selectedCell[1] === letterIndex) ?
                                                'crossword__letter_selected' : '')}
                                            key={word + letterIndex}
                                            style={{
                                                width: this.letterSize,
                                                height: this.letterSize,
                                                fontSize: this.fontLetterSize + 'px'
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

}

export default Crossword;