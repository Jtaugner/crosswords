import React, {Component, useState} from 'react';
import './gamePage.scss'
import {connect} from "react-redux";
import TopMenu from "../topMenu/topMenu"
import {changeLastLevel, changeLevelProgress, showAdv} from "../../store/ac";
import Money from "../money/money";
import Crossword from "../crossword/crossword";
import Tips from '../tips/tips'
import {selectLastLevel, selectLevel, selectLevelProgress} from "../../store/selectors";
import ActionBlock from "../actionBlock/actionBlock";
import {getLevelWords, getLevelWordsDescription} from "../../projectCommon";
import MenuLink from "../menuLink/menuLink";

const crosswordRef = React.createRef();

function createGameProgress(length, wordLength) {
    const levelProgress = [];
    const arrayRow = [];
    for(let i = 0; i < wordLength; i++){
        arrayRow.push(0);
    }
    for(let i = 0; i < length; i++){
        levelProgress.push(arrayRow.slice());
    }
    return [[1, 1, 1, 1, 1, 1, 1], [0, 1, 0, 1, 0, 1, 1], [0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]]
    return levelProgress
}

class GamePage extends Component{

    levelWords = getLevelWords(this.props.level);


    constructor(props) {

        super(props);
        this.state = {
            selectedWordIndex: 0
        };
        if(this.props.level > this.props.lastLevel){
            changeLastLevel(this.props.level);
            this.props.changeLevelProgress(
                createGameProgress( this.levelWords.length,
                                    this.levelWords[0].length)
            )
        }

    }

    changeSelectedWord = (word) => {
        this.setState({
            selectedWordIndex: word
        })
    };

    addLetterToCrossWord = (letter) => {
        if (crosswordRef.current) {
            crosswordRef.current.addLetter(letter);
        }
    };
    render(){
        return (
            <div className={'gamePage'}>
                <TopMenu>
                    <MenuLink/>
                    <Money/>
                </TopMenu>

                <Crossword
                    ref={crosswordRef}

                    levelWords={this.levelWords}

                    levelProgress={this.props.levelProgress}
                    changeLevelProgress={this.props.changeLevelProgress}

                    selectedWordIndex={this.state.selectedWordIndex}
                    changeSelectedWord={this.changeSelectedWord}
                />

                <Tips/>

                <ActionBlock
                    level={this.props.level}

                    selectedWordIndex={this.state.selectedWordIndex}
                    changeSelectedWord={this.changeSelectedWord}

                    addLetterToCrossWord={this.addLetterToCrossWord}
                />
            </div>
        );
    }

}

export default connect((store) => ({
    level: selectLevel(store),
    lastLevel: selectLastLevel(store),
    levelProgress: selectLevelProgress(store)
    }),
    (dispatch) => ({
        showAdv: () => dispatch(showAdv()),
        changeLevelProgress: (progress) => {dispatch(changeLevelProgress(progress))},
        changeLastLevel: (level) => dispatch(changeLastLevel(level))
    })
)(GamePage);
