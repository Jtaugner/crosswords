import React, {Component} from 'react';
import './levels.scss'
import {connect} from "react-redux";
import {chooseLevel} from "../../store/ac";
import {selectLastLevel, selectSounds} from "../../store/selectors";
import {Link} from "react-router-dom";
import {clickSound} from "../../sounds";


class Levels extends Component {
    levelRef;

    componentDidMount() {
        this.levelRef.scrollIntoView({behavior: 'auto', block: "center", inline: "center"});
    }

    constructor(props) {
        super(props);
    }

    selectLevelRef = (div) => {
        this.levelRef = div;
    };


    render() {
        const levelList = [];

        let lastLevel = this.props.lastLevel;
        if(lastLevel === -1) lastLevel = 0;
        for (let i = 20; i >= 0; i--) {
            const levelOnClick = () => {
                this.props.chooseLevel(i);
                if(this.props.isSounds){
                    clickSound.play();
                }
            };
            let LevelComponent =
                <Link
                    to={'/game'}
                    className={'levels__level'}
                    onClick={levelOnClick}
                    key={'level' + i}
                >
                    {i + 1}
                </Link>;

            if(lastLevel < i){
                LevelComponent =
                    <div
                        className={'levels__level levels__level_close'}
                        key={'level' + i}
                    />
            } else if (i === lastLevel) {
                LevelComponent =
                    <Link
                        to={'/game'}
                        className={'levels__level levels__level_last'}
                        onClick={levelOnClick}
                        key={'level' + i}
                        ref={(div) => this.selectLevelRef(div)}
                    >
                        {i + 1}
                    </Link>;
            }
            levelList.push(LevelComponent);
        }
        return (
            <div className={'levels'}>
                {levelList}
            </div>
        );
    }

}

export default connect(
    (store) => ({
        lastLevel: selectLastLevel(store),
        isSounds: selectSounds(store)
    }),
    (dispatch) => ({
        chooseLevel: (level) => dispatch(chooseLevel(level))
    }))(Levels);
