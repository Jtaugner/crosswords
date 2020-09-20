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
function createPair(i1, i2){
    return i1 + '-' + i2;
}
let timeout;
let canUseTip1 = true;
function useTip1() {
    canUseTip1 = false;
    setTimeout(()=>{
        canUseTip1 = 1;
    }, 1000);
}
class Crossword extends Component {
    letterSize = getLetterSize(this.props.levelWords[0].length);
    wordsLength = this.props.levelWords.length - 1;
    letterStyle = {
        width: this.letterSize + 'px',
        height: this.letterSize + 'px',
        fontSize: Math.floor(this.letterSize / 1.5) + 'px'
    };



    componentWillUnmount() {
        clearTimeout(timeout);
    }

    constructor(props) {
        super(props);
        let selectedCell = 0;
        if(this.props.levelProgress.length > 0){
            selectedCell = this.getNextOrPrevLetter(true, -1);
        }
        this.state = {
            selectedCell: selectedCell,
            wrongWords: [],
            rightWords: [],
            newLetters: []
        };
    }

    selectedWordRef = (div, index) => {
        if (this.props.selectedWordIndex === index) this.props.changeWordRef(div);
    };


    wordOnclick = (wordIndex) => {
        if(this.props.usingTip){
            if(this.props.tipType === 1) return;
            if(this.props.tipType === 2){
                this.props.addOpenedKeyboard(wordIndex);
                this.props.getTip(2, wordIndex);
            }
            if(this.props.tipType === 3){
                this.props.levelProgress[wordIndex] = true;
                this.changeLevelProgress();
                this.addDoneWord(wordIndex);
                this.setState({
                    rightWords: [wordIndex]
                });
                this.props.getTip();
                timeout = setTimeout(()=>{
                    this.setState({
                        rightWords: []
                    });
                }, 1000);
            }

        }
        this.props.changeSelectedWord(wordIndex);
    };

    getNextOrPrevLetter = (isNext, cell, wordIndex) => {
        let newIndex;
        if(cell !== undefined) newIndex = cell;
        else newIndex  = this.state.selectedCell;
        let line;
        if(wordIndex !== undefined) line = wordIndex;
        else line = this.props.selectedWordIndex;


        if(this.props.levelProgress[line] === true) return -1;

        if (isNext && newIndex < this.wordsLength) {
            for (let i = newIndex + 1; i <= this.wordsLength; i++) {
                if (this.props.levelProgress[line][i] !== undefined && this.props.levelProgress[line][i] === 0) {
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
        let line = this.props.selectedWordIndex;
        const lastLine = this.props.selectedWordIndex;
        for(let i = lastLine+ 1; i <= this.wordsLength; i++) {
            if (this.props.levelProgress[i] !== true) {
                line = i;
                break;
            }
        }
        if(line === lastLine){
            for(let i = 0; i < lastLine; i++){
                console.log(i, this.props.levelProgress[i]);
                if (this.props.levelProgress[i] !== true) {
                    line = i;
                    break;
                }
            }
        }
        console.log('line: ', line);

        this.props.changeSelectedWord(line);
        this.getFirstFreeCellInLine(line);
    };

    changeLevelProgress = () => {
        this.props.changeLevelProgress(this.props.levelProgress);
    };

    testWordAndGetNext = (wordIndex) => {
        let index;
        if(wordIndex !== undefined) index = wordIndex;
        else index = this.props.selectedWordIndex;

        if (this.testWord(index)) {
            this.setState({
                rightWords: [index]
            });
            timeout = setTimeout(()=>{
                this.getNextWord();
                timeout = setTimeout(()=>{
                    this.setState({
                        rightWords: []
                    });
                }, 400)
            }, 600);

        } else {
            this.deleteWrongWord(index);
            if(index === this.props.selectedWordIndex){
                this.setNextOrPrevLetter(true);
            }
        }
    };

    testAllWords = () => {
        const rightWords = [];
        for(let i = 0; i < this.props.levelWords.length; i++){
            if (this.testWord(i)) {
                rightWords.push(i);
            } else {
                this.deleteWrongWord(i);
            }
        }
        this.setState({
            rightWords: rightWords
        });
        timeout = setTimeout(()=>{
            this.setState({
                rightWords: []
            });
        }, 1000);
    };
    testWin = () => {
        const progress = this.props.levelProgress;
        for(let i = 0; i < progress.length; i++){
            if(progress[i] !== true) return;
        }
        return this.props.endGame();
    };

    addLetter = (letter) => {
        if ( this.state.selectedCell === -1
            || this.props.levelProgress[this.props.selectedWordIndex][this.state.selectedCell] === 1)
            return;
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
        this.testWordAndGetNext();
    };
    getFirstFreeCellInLine(line){
        if(this.props.levelProgress[line] === true){
            this.setState({
                selectedCell: -1
            })
        } else if(this.props.levelProgress[line][0] !== 0){
            this.setNextOrPrevLetter(true, -1, line);
        }else{
            this.setState({
                selectedCell: 0
            })
        }
    }
    wordIndexChangedTrigger(line){
        this.getFirstFreeCellInLine(line);
    }
    deleteWrongWord(selectedWord) {
        if (this.props.deleteWrongWord) {

            let wordArray = this.props.levelProgress[selectedWord];
            if(wordArray === true ) return;
            for (let i = 0; i < wordArray.length; i++)
                if (wordArray[i] === 0) return;
            this.setState({
                wrongWords: [selectedWord]
            });
            timeout = setTimeout(() => {
                this.setState({
                    wrongWords: []
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
        /* Подсказки */
        if(this.props.usingTip){
            if(this.props.tipType === 0
                && this.props.levelProgress[wordIndex] !== true
                && !(this.props.levelProgress[wordIndex][letterIndex] === 1)){
                this.props.levelProgress[wordIndex][letterIndex] = 1;


                this.changeLevelProgress();
                this.testWordAndGetNext(wordIndex);

                this.props.getTip();
            }

            return;
        }


        if(this.props.startFromFirstCell){
            this.getFirstFreeCellInLine(wordIndex);
        }else if (this.props.levelProgress[wordIndex] === true || this.props.levelProgress[wordIndex][letterIndex] === 1) {
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
        this.props.levelProgress[selectedLine] = true;
        this.changeLevelProgress();
        this.testWin();
    }

    testWord(selectedLine) {
        if(this.props.levelProgress[selectedLine] === true) return;
        let word = '';
        let wordProgress = this.props.levelProgress[selectedLine];
        for (let i = 0; i < wordProgress.length; i++) {
            if (wordProgress[i] === 0) return false;
            if (wordProgress[i] === 1) word += this.props.levelWords[selectedLine][i];
            else word += wordProgress[i];
        }
        console.log(word, this.props.levelWords[selectedLine]);
        if (compareWords(word, this.props.levelWords[selectedLine])) {
            this.addDoneWord(selectedLine);
            return true;
        }

        return false
    };

    fillCellByIndex(wordIndex, letterIndex, letter) {
        if(this.props.levelProgress[wordIndex] === true) return letter;
        if (this.props.levelProgress.length === 0) return '';
        let cell = this.props.levelProgress[wordIndex][letterIndex];
        if (cell === 0) return '';
        if (cell === 1) return letter;
        return cell;
    }

    getLetterClasses(wordIndex, letterIndex) {
        return 'crossword__letter '
            + ((this.props.selectedWordIndex === wordIndex && this.state.selectedCell === letterIndex) ? ' crossword__letter_selected' : '')
            + (this.props.levelProgress.length !== 0 && (this.props.levelProgress[wordIndex] === true || this.props.levelProgress[wordIndex][letterIndex] === 1) ? ' crossword__letter_done' : '')
            + (this.state.newLetters.includes(createPair(wordIndex, letterIndex)) ? ' crossword__letter_new' : '')
    }

    getWordClasses(wordIndex) {
        return 'crossword__word'
            + (this.props.selectedWordIndex === wordIndex ?
                ' crossword__word_selected' : '')
            + (this.state.wrongWords.includes(wordIndex) ?
                ' crossword_word_wrong' : '')
            + (this.state.rightWords.includes(wordIndex) ?
                ' crossword__word_right' : '') ;
    }
    addNewLetters(array){
        console.log(array);
        for(let i = 0; i < array.length; i++){
            this.props.levelProgress[array[i][0]][array[i][1]] = 1;
            array[i] = createPair(array[i][0], array[i][1]);
        }
        this.changeLevelProgress();
        this.testAllWords();


        this.setState({
            newLetters: array
        });
        timeout = setTimeout( ()=>{
            this.setState({
                newLetters: []
            })
        }, 1000)
    }
    crosswordOnClick = () => {
        if(this.props.usingTip && this.props.tipType === 1 && canUseTip1){
            const progress = this.props.levelProgress;
            //Ищем все свободные клетки
            let allFreeCells = [];
            for(let i = 0; i < progress.length; i++){
                if(progress[i] === true) continue;
                for(let q = 0; q < progress[i].length; q++){
                    if(progress[i][q] !== 1){
                        allFreeCells.push([i, q]);
                    }
                }
            }


            let newLetters = [];
            if(allFreeCells.length <= 5){
                newLetters = allFreeCells;
            }else{
                for(let i = 0; i < 5; i++){
                    const randCell = Math.floor(Math.random()*allFreeCells.length);

                    newLetters.push(allFreeCells[randCell]);

                    allFreeCells.splice(randCell, 1);
                }
            }
            this.addNewLetters(newLetters);
            this.props.getTip();
            useTip1();
        }

    };

    render() {
        return (
            <div className={'crossword-wrapper'} onClick={this.crosswordOnClick}>
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