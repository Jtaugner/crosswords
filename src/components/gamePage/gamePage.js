import React, {Component} from 'react';
import './gamePage.scss'
import {connect} from "react-redux";
import TopMenu from "../topMenu/topMenu"
import {
    addOpenedKeyboard,
    changeLastLevel,
    changeLevelProgress,
    clearOpenedKeyboardWords, increaseLastLevel, increaseLevel,
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
import {createLastLevelGameProgress, getLevelWords, tipsCost} from "../../projectCommon";
import MenuLink from "../menuLink/menuLink";
import EndGameWindow from "../endGameWindow/endGameWindow";

const crosswordRef = React.createRef();




class GamePage extends Component {

    levelWords;


    constructor(props) {
        super(props);
        this.state = this.getNewGameState(false);
    }

    getNewGameState = () => {
        let selectedWordIndex = 0;
        let progress = this.props.levelProgress;
        for(let i = 0; i < progress.length; i++){
            if(progress[i] !== true) {
                selectedWordIndex = i;
                break;
            }
        }
        if(this.props.level === this.props.lastLevel &&
            (!this.props.levelProgress
                || this.props.levelProgress.length === 0) ){
            this.props.clearOpenedKeyboardWords();
            this.props.changeLevelProgress(
                createLastLevelGameProgress(this.props.level + 1)
            );
        }
        this.levelWords = getLevelWords(this.props.level);
        return  {
            selectedWordIndex: selectedWordIndex,
            usingTip: false,
            tipType: -1,
            isEnd: false
        };

    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.level !== this.props.level){
            this.setState(this.getNewGameState());
        }
    }

    nextGame = () => {
        console.log('next gmaa');
        this.setState({isEnd: false});
        this.props.increaseLevel();
    };

    endGame = () => {
        this.setState({isEnd: true});
        if(this.props.level === this.props.lastLevel){
            this.props.increaseLastLevel();
            this.props.clearOpenedKeyboardWords();
            this.props.changeLevelProgress(
                createLastLevelGameProgress(this.props.level + 1)
            );
        }
    };

    changeWordRef = (ref) => {
        this.scrollToWord(ref);
    };

    scrollToWord = (ref) => {
        if(ref){
            ref.scrollIntoView({behavior: 'smooth', block: "center", inline: "center"});
        }
    };

    changeSelectedWord = (wordIndex) => {
        this.setState({
            selectedWordIndex: wordIndex
        });

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
    getTip = () => {
        this.props.subtractMoney(tipsCost[this.state.tipType]);
        this.switchOffTip();
    };
    switchOffTip = () => {
        this.setState({
            usingTip: false,
            tipType: -1
        });
    };

    switchOnTip = (type) => {
        const notEnoughMoney = this.props.money < tipsCost[type];

        if (this.state.tipType === type || notEnoughMoney) {
            this.switchOffTip();

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
        const selectedWord = this.levelWords[this.state.selectedWordIndex];
        const openedKeyboard = this.props.openedKeyboardWords.includes(this.state.selectedWordIndex);
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

                    endGame={this.endGame}

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

                    openedKeyboard={openedKeyboard}
                    selectedWord={selectedWord}
                    
                    switchOffTip={this.switchOffTip}
                />
                {this.state.isEnd ? <EndGameWindow nextGame={this.nextGame}/> : ''}
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
        addOpenedKeyboard: (index) => dispatch(addOpenedKeyboard(index)),
        increaseLevel: () => dispatch(increaseLevel()),
        increaseLastLevel: () => dispatch(increaseLastLevel())
    })
)(GamePage);
