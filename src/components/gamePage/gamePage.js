import React, {Component, useState} from 'react';
import './gamePage.scss'
import {connect} from "react-redux";
import TopMenu from "../topMenu/topMenu"
import {showAdv} from "../../store/ac";
import Money from "../money/money";
import Crossword from "../crossword/crossword";
import Tips from '../tips/tips'
import {selectLevel} from "../../store/selectors";
import ActionBlock from "../actionBlock/actionBlock";
import {getLevelWords, getLevelWordsDescription} from "../../projectCommon";

const crosswordRef = React.createRef();

class GamePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedWordIndex: 0
        }
    }
    changeSelectedWord = (word) => {
        console.log(crosswordRef);
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
                    <Money/>
                </TopMenu>

                <Crossword
                    ref={crosswordRef}
                    level={this.props.level}
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
    level: selectLevel(store)
    }),
    (dispatch) => ({
        showAdv: () => dispatch(showAdv()),
    })
)(GamePage);
