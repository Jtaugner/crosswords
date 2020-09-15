import React, {Component} from 'react';
import './crossword.scss'


const pixelsPerLetters = 5;

function getLetterSize(length) {
    return (
        window.innerWidth - window.innerWidth * 0.03 - pixelsPerLetters * (length - 1)
    ) / length;
}

function compareWords(word1, word2) {
    return word1.toLowerCase() === word2.toLowerCase();
}

let timeout;

class Crossword extends Component {
    letterSize = getLetterSize(this.props.levelWords[0].length);
    wordsLength = this.props.levelWords.length - 1;
    letterStyle = {
        width: this.letterSize + 'px',
        height: this.letterSize + 'px',
        fontSize: Math.floor(this.letterSize / 1.5) + 'px'
    };

    componentDidUpdate() {
        this.wordRef.scrollIntoView({behavior: 'smooth', block: "center", inline: "center"});
    }

    componentWillUnmount() {
        clearTimeout(timeout);
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedCell: -1,
            wrongWord: -1
        };
    }

    wordRef;
    selectedWordRef = (div, index) => {
        if (this.props.selectedWordIndex === index) this.wordRef = div;
    };


    wordOnclick = (wordIndex) => {
        this.props.changeSelectedWord(wordIndex);
    };

    getNextOrPrevLetter = (isNext, cell, wordIndex) => {
        let newIndex = this.state.selectedCell;
        if(cell !== undefined) newIndex = cell;
        let line = this.props.selectedWordIndex;
        if(wordIndex !== undefined) line = wordIndex;
        if (isNext && newIndex < this.wordsLength) {
            for (let i = newIndex + 1; i <= this.wordsLength; i++) {
                if (this.props.levelProgress[line][i] !== undefined && this.props.levelProgress[line][i] !== 1) {
                    console.log('cell ', i);
                    newIndex = i;
                    break;
                }
            }
        } else if (newIndex > 0) {
            for (let i = newIndex - 1; i >= 0; i--) {
                if (this.props.levelProgress[line][i] !== undefined && this.props.levelProgress[line][i] !== 1) {
                    newIndex = i;
                    break;
                }
            }
        }
        console.log(newIndex);
        return newIndex;
    };
    setNextOrPrevLetter = (isNext, cell, wordIndex) => {
        const newIndex = this.getNextOrPrevLetter(isNext, cell, wordIndex);

        if (newIndex !== this.state.selectedCell) {
            this.setState({
                selectedCell: newIndex
            })
        }
    };
    getNextWord = () => {
        let line;
        if (this.props.selectedWordIndex !== this.wordsLength) {
            line = this.props.selectedWordIndex + 1;
        } else {
            line = 0;
        }
        this.props.changeSelectedWord(line);
        this.getFirstFreeCellInLine(line);
    };

    changeLevelProgress = () => {
        this.props.changeLevelProgress(this.props.levelProgress);
    };

    addLetter = (letter) => {
        if ( this.state.selectedCell === -1
            || this.props.levelProgress
                [this.props.selectedWordIndex][this.state.selectedCell] === 1) return;
        if (letter === 0 && this.props.levelProgress
            [this.props.selectedWordIndex]
            [this.state.selectedCell] === 0) {
            this.setNextOrPrevLetter(false);
            return;
        }
        this.props.levelProgress
            [this.props.selectedWordIndex]
            [this.state.selectedCell] = letter;
        this.changeLevelProgress();
        if (letter === 0) return;
        if (this.testWord(this.props.selectedWordIndex)) {
            this.getNextWord();
        } else {
            this.setNextOrPrevLetter(true);
            this.deleteWrongWord(this.props.selectedWordIndex);
        }
    };
    getFirstFreeCellInLine(line){
        if(this.props.levelProgress[line][0] === 1){
            this.setNextOrPrevLetter(true, 0, line);
        }else{
            this.setState({
                selectedCell: 0
            })
        }
    }

    deleteWrongWord(selectedWord) {
        if (this.props.deleteWrongWord) {

            let wordArray = this.props.levelProgress[selectedWord];
            for (let i = 0; i < wordArray.length; i++)
                if (wordArray[i] === 0) return;
            this.setState({
                wrongWord: selectedWord
            });
            timeout = setTimeout(() => {
                this.setState({
                    wrongWord: -1
                });
                wordArray = wordArray.map((el) => {
                    if (el !== 1) return 0;
                    return 1;
                });
                this.props.levelProgress[selectedWord] = wordArray;
                this.changeLevelProgress();
                this.getFirstFreeCellInLine(selectedWord);

            }, 500);


        }
    }

    selectLetter(wordIndex, letterIndex) {
        if (this.props.levelProgress[wordIndex][letterIndex] === 1) {
            this.setState({
                selectedCell: -1
            })
        } else {
            this.setState({
                selectedCell: letterIndex
            })
        }

    };

    addDoneWord(selectedLine) {
        for (let i = 0; i < this.props.levelProgress[selectedLine].length; i++) {
            this.props.levelProgress[selectedLine][i] = 1;
        }
        this.changeLevelProgress();
    }

    testWord(selectedLine) {
        let word = '';
        let wordProgress = this.props.levelProgress[selectedLine];
        for (let i = 0; i < wordProgress.length; i++) {
            if (wordProgress[i] === 0) return false;
            if (wordProgress[i] === 1) word += this.props.levelWords[selectedLine][i];
            else word += wordProgress[i];
        }
        if (compareWords(word, this.props.levelWords[selectedLine])) {
            this.addDoneWord(selectedLine);
            return true;
        }

        return false
    };

    fillCellByIndex(wordIndex, letterIndex, letter) {
        if (this.props.levelProgress.length === 0) return '';
        let cell = this.props.levelProgress[wordIndex][letterIndex];
        if (cell === 0) return '';
        if (cell === 1) return letter;
        return cell;
    }

    getLetterClasses(wordIndex, letterIndex) {
        return 'crossword__letter '
            + ((this.props.selectedWordIndex === wordIndex && this.state.selectedCell === letterIndex) ? ' crossword__letter_selected' : '')
            + (this.props.levelProgress.length !== 0 && this.props.levelProgress[wordIndex][letterIndex] === 1 ? ' crossword__letter_done' : '')
    }

    getWordClasses(wordIndex){
        return 'crossword__word'
        + (this.props.selectedWordIndex === wordIndex ?
            ' crossword__word_selected' : '')
        + (this.state.wrongWord === wordIndex ?
            ' crossword_word_wrong' : '');
    }

    render() {
        return (
            <div className={'crossword-wrapper'}>
                <div className={'crossword'}
                     onDrop={() => {
                         console.log('sd');
                     }}
                >
                    {
                        this.props.levelWords.map((word, wordIndex) => {
                            return <div
                                className={this.getWordClasses(wordIndex)}
                                ref={(div) => this.selectedWordRef(div, wordIndex)}
                                key={word}
                                onClick={() => this.wordOnclick(wordIndex)}
                            >
                                {
                                    word.split('').map((letter, letterIndex) => {
                                        return <div
                                            onClick={() => this.selectLetter(wordIndex, letterIndex)}
                                            className={this.getLetterClasses(wordIndex, letterIndex)}
                                            style={this.letterStyle}
                                            key={word + letterIndex}
                                        >


                                            {this.fillCellByIndex(wordIndex, letterIndex, letter).toUpperCase()}
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