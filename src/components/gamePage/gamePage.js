import React, {Component} from 'react';
import './gamePage.scss'
import {connect} from "react-redux";
import TopMenu from "../topMenu/topMenu"
import {
    addMoney,
    addOpenedKeyboard,
    changeLevelProgress, clearLevelFromProgress,
    clearOpenedKeyboardWords, increaseLastLevel, increaseLevel,
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
    selectLevelProgress, selectMoney, selectOpenedKeyboardWords, selectSounds,
    selectStartFromFirstCell
} from "../../store/selectors";
import ActionBlock from "../actionBlock/actionBlock";
import {createLastLevelGameProgress, getDoneProgressLevel, getLevelWords, tipsCost} from "../../projectCommon";
import MenuLink from "../menuLink/menuLink";
import EndGameWindow from "../endGameWindow/endGameWindow";
import {winSound} from "../../sounds";
import {giveParams, reachGoal} from "../../App";

const crosswordRef = React.createRef();




class GamePage extends Component {

    levelWords;
    progress;


    constructor(props) {
        super(props);
        this.state = this.getNewGameState();
    }

    getNewGameState = (startGameAgain) => {
        let selectedWordIndex = 0;
        let progress = this.props.levelProgress[this.props.level];
        this.levelWords = getLevelWords(this.props.level);
        let isDoneLevel = false;

        let progressWordLength = 0;
        const newProgress = createLastLevelGameProgress(this.props.level);
        if(progress){
            if(progress.length !== newProgress.length){
                progressWordLength = -1;
            }else{
                for(let i = 0; i < progress.length; i++){
                    if(progress[i] !== true) {
                        progressWordLength = progress[i].length;
                        break;
                    }
                }
            }

        }



        if(!progress && this.props.level < this.props.lastLevel && !startGameAgain){
            isDoneLevel = true;
            progress = getDoneProgressLevel(this.props.level);
        }else if(!progress || progressWordLength !== this.levelWords[0].length){
            progress = newProgress;

            this.props.changeLevelProgress(this.props.level, progress);
        }

        for(let i = 0; i < progress.length; i++){
            if(progress[i] !== true) {
                selectedWordIndex = i;
                break;
            }
        }
        this.progress = progress;


        this.props.showAdv();

        return  {
            selectedWordIndex: selectedWordIndex,
            usingTip: false,
            tipType: -1,
            isEnd: false,
            isDoneLevel,
            addMoney: false
        };

    };

    startLevelAgain = () => {
        this.setState(this.getNewGameState(true));
        if (crosswordRef.current) {
            crosswordRef.current.setNewGameState(this.levelWords);
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.level !== this.props.level){
            this.setState(this.getNewGameState());
            if (crosswordRef.current) {
                crosswordRef.current.setNewGameState(this.levelWords);
            }
        }
    }

    nextGame = () => {
        this.setState({isEnd: false});
        this.props.increaseLevel();
    };

    endGame = () => {
        if(this.state.isEnd) return;
        this.setState({isEnd: true});
        this.props.clearOpenedKeyboardWords(this.props.level);
        this.props.clearLevelFromProgress(this.props.level);
        setTimeout(()=>{
            if(this.props.isSounds) winSound.play();
        }, 400);
        if(this.props.level === this.props.lastLevel){
            this.props.increaseLastLevel();
            this.props.addMoney();
            this.setState({
                addMoney: true
            });
            if(this.props.level === 10){
                reachGoal('level10');
            }else if(this.props.level === 50){
                reachGoal('level50');
            }else if(this.props.level === 199){
                reachGoal('level200');
            } else if(this.props.level === 290){
                reachGoal('level290');
            }
        }else{
            this.setState({
                addMoney: false
            })
        }
    };

    changeWordRef = (ref) => {
        this.scrollToWord(ref);
    };

    scrollToWord = (ref) => {
        if(ref){
            try{
                ref.scrollIntoView({behavior: 'smooth', block: "center", inline: "center"});
            }catch(ignored){
                try{
                    ref.scrollIntoView();
                }catch(ign){}
            }

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

    changeLevelProgress = (progress) => {
        this.props.changeLevelProgress(this.props.level, progress);
    };

    addOpenedKeyboard = (index) => {
        this.props.addOpenedKeyboard(this.props.level, index);
    };

    addLetterToCrossWord = (letter) => {
        if (crosswordRef.current) {
            crosswordRef.current.addLetter(letter);
        }
    };
    getTip = () => {
        this.props.subtractMoney(tipsCost[this.state.tipType]);
        const paramName =  'tip' + this.state.tipType;
        giveParams({[paramName]: 1});
        this.switchOffTip();
    };
    switchOffTip = () => {
        this.setState({
            usingTip: false,
            tipType: -1
        });
    };

    switchOnTip = (type) => {
        if(this.state.isDoneLevel) return;
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
        let openedKeyboard = false;
        const openedKeyboardWords = this.props.openedKeyboardWords[this.props.level];
        if(openedKeyboardWords){
            openedKeyboard = openedKeyboardWords.includes(this.state.selectedWordIndex);
        }



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

                    levelProgress={this.progress}
                    changeLevelProgress={this.changeLevelProgress}

                    selectedWordIndex={this.state.selectedWordIndex}
                    changeSelectedWord={this.changeSelectedWord}
                    openedKeyboardWords={openedKeyboardWords}

                    usingTip={this.state.usingTip}
                    tipType={this.state.tipType}
                    getTip={this.getTip}

                    addOpenedKeyboard={this.addOpenedKeyboard}

                    changeWordRef={this.changeWordRef}

                    endGame={this.endGame}

                    isSounds={this.props.isSounds}

                    showAdv={this.props.showAdv}

                />

                <Tips
                    getTip={this.switchOnTip}
                />

                <ActionBlock
                    usingTip={this.state.usingTip}

                    levelWords={this.levelWords}
                    progress={this.progress}

                    startLevelAgain={this.startLevelAgain}

                    isDoneLevel={this.state.isDoneLevel}

                    level={this.props.level}

                    selectedWordIndex={this.state.selectedWordIndex}
                    changeSelectedWord={this.changeSelectedWordFromAction}

                    addLetterToCrossWord={this.addLetterToCrossWord}

                    openedKeyboard={openedKeyboard}
                    selectedWord={selectedWord}
                    
                    switchOffTip={this.switchOffTip}
                />
                {this.state.isEnd ?
                    <EndGameWindow
                    nextGame={this.nextGame}
                    addMoney={this.state.addMoney}
                    level={this.props.level}
                /> : ''}
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
        openedKeyboardWords: selectOpenedKeyboardWords(store),
        isSounds: selectSounds(store)
    }),
    (dispatch) => ({
        changeLevelProgress: (level, progress) => {
            dispatch(changeLevelProgress(level, progress))
        },
        toggleShop: () => dispatch(toggleShopOpened()),
        subtractMoney: (money) => dispatch(subtractMoney(money)),
        clearOpenedKeyboardWords: (level) => dispatch(clearOpenedKeyboardWords(level)),
        clearLevelFromProgress: (level) => dispatch(clearLevelFromProgress(level)),
        addOpenedKeyboard: (level, index) => dispatch(addOpenedKeyboard(level, index)),
        increaseLevel: () => dispatch(increaseLevel()),
        increaseLastLevel: () => dispatch(increaseLastLevel()),
        addMoney: () => dispatch(addMoney(5))
    })
)(GamePage);
