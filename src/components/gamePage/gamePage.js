import React, {Component, useState} from 'react';
import './gamePage.scss'
import {connect} from "react-redux";
import TopMenu from "../topMenu/topMenu"
import {
    addOpenedKeyboard,
    changeLastLevel,
    changeLevelProgress,
    clearOpenedKeyboardWords,
    showAdv,
    subtractMoney,
    toggleShopOpened
} from "../../store/ac";
import Money from "../money/money";
import Crossword from "../crossword/crossword";
import Tips from '../tips/tips'
import {
    selectIsDeleteWrongWord,
    selectLastLevel,
    selectLevel,
    selectLevelProgress, selectMoney, selectOpenedKeyboardWords,
    selectStartFromFirstCell
} from "../../store/selectors";
import ActionBlock from "../actionBlock/actionBlock";
import {getLevelWords, getLevelWordsDescription, shopItems, tipsCost} from "../../projectCommon";
import MenuLink from "../menuLink/menuLink";

const crosswordRef = React.createRef();

function createGameProgress(length, wordLength) {
    const levelProgress = [];
    const arrayRow = [];
    for (let i = 0; i < wordLength; i++) {
        arrayRow.push(0);
    }
    for (let i = 0; i < length; i++) {
        levelProgress.push(arrayRow.slice());
    }
    return levelProgress;
}

class GamePage extends Component {

    levelWords = getLevelWords(this.props.level);
    openedKeyboard;
    selectedWord;
    wordRef;

    constructor(props) {
        super(props);
        let selectedWordIndex;
        let progress = this.props.levelProgress;
        if (this.props.level > this.props.lastLevel || progress.length === 0 || !progress) {
            this.props.changeLastLevel(this.props.level);
            this.props.clearOpenedKeyboardWords();

            progress = createGameProgress(this.levelWords.length, this.levelWords[0].length);
            this.props.changeLevelProgress(progress);
        }

        for(let i = 0; i < progress.length; i++){
            if(progress[i] !== true) {
                selectedWordIndex = i;
                break;
            }
        }
        this.openedKeyboard = this.props.openedKeyboardWords.includes(selectedWordIndex);
        this.selectedWord = this.levelWords[selectedWordIndex];

        this.state = {
            selectedWordIndex: selectedWordIndex,
            usingTip: false,
            tipType: -1
        };


    }
    changeWordRef = (ref) => {
        this.wordRef = ref;
        this.scrollToWord();
    };

    scrollToWord = () => {
        if(this.wordRef){
            this.wordRef.scrollIntoView({behavior: 'smooth', block: "center", inline: "center"});
        }
    };

    changeSelectedWord = (wordIndex) => {
        this.setState({
            selectedWordIndex: wordIndex
        });
        this.openedKeyboard = this.props.openedKeyboardWords.includes(wordIndex);

        this.selectedWord = this.levelWords[wordIndex];
    };
    changeSelectedWordFromAction = (word) => {
        this.changeSelectedWord(word);
        if (crosswordRef.current) {
            crosswordRef.current.wordIndexChangedTrigger(word);
        }
    };

    addLetterToCrossWord = (letter) => {
        if (crosswordRef.current) {
            crosswordRef.current.addLetter(letter);
        }
    };
    getTip = (type, index) => {
        console.log('d111sd');
        this.props.subtractMoney(tipsCost[this.state.tipType]);
        this.setState({
            usingTip: false,
            tipType: -1
        });
        if(type === 2){
            this.openedKeyboard = true;
            this.selectedWord = this.levelWords[index];
        }
    };

    switchOnTip = (type) => {
        console.log(type, this.state.tipType);
        const notEnoughMoney = this.props.money < tipsCost[type];

        if (this.state.tipType === type || notEnoughMoney) {
            this.setState({
                usingTip: false,
                tipType: -1
            });

            if (notEnoughMoney) {
                //Открыть магазин при нехватке денег
                this.props.toggleShop();
            }

        }else{
            this.setState({
                usingTip: true,
                tipType: type
            })
        }
    };

    render() {
        return (
            <div className={'gamePage'}>
                <TopMenu
                    usingTip={this.state.usingTip}
                    tipType={this.state.tipType}
                >
                    <MenuLink/>
                    <Money/>
                </TopMenu>

                <Crossword
                    ref={crosswordRef}

                    levelWords={this.levelWords}

                    deleteWrongWord={this.props.deleteWrongWord}
                    startFromFirstCell={this.props.startFromFirstCell}

                    levelProgress={this.props.levelProgress}
                    changeLevelProgress={this.props.changeLevelProgress}

                    selectedWordIndex={this.state.selectedWordIndex}
                    changeSelectedWord={this.changeSelectedWord}

                    usingTip={this.state.usingTip}
                    tipType={this.state.tipType}
                    getTip={this.getTip}

                    addOpenedKeyboard={this.props.addOpenedKeyboard}

                    changeWordRef={this.changeWordRef}

                />

                <Tips
                    getTip={this.switchOnTip}
                />

                <ActionBlock
                    usingTip={this.state.usingTip}

                    levelProgress={this.props.levelProgress}

                    level={this.props.level}

                    selectedWordIndex={this.state.selectedWordIndex}
                    changeSelectedWord={this.changeSelectedWordFromAction}

                    addLetterToCrossWord={this.addLetterToCrossWord}

                    openedKeyboard={this.openedKeyboard}
                    selectedWord={this.selectedWord}
                />
            </div>
        );
    }

}

export default connect((store) => ({
        level: selectLevel(store),
        lastLevel: selectLastLevel(store),
        levelProgress: selectLevelProgress(store),
        deleteWrongWord: selectIsDeleteWrongWord(store),
        startFromFirstCell: selectStartFromFirstCell(store),
        money: selectMoney(store),
        openedKeyboardWords: selectOpenedKeyboardWords(store)
    }),
    (dispatch) => ({
        showAdv: () => dispatch(showAdv()),
        changeLevelProgress: (progress) => {
            dispatch(changeLevelProgress(progress))
        },
        changeLastLevel: (level) => dispatch(changeLastLevel(level)),
        toggleShop: () => dispatch(toggleShopOpened()),
        subtractMoney: (money) => dispatch(subtractMoney(money)),
        clearOpenedKeyboardWords: () => dispatch(clearOpenedKeyboardWords()),
        addOpenedKeyboard: (index) => dispatch(addOpenedKeyboard(index))
    })
)(GamePage);
