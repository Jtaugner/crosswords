import React, {Component} from 'react';
import './levels.scss'
import {connect} from "react-redux";
import {chooseLevel} from "../../store/ac";
import {selectLastLevel} from "../../store/selectors";


class Levels extends Component {
    levelRef;

    componentDidMount() {
        console.log(this.levelRef);
        this.levelRef.scrollIntoView({behavior: 'smooth', block: "center", inline: "center"});
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
        console.log(lastLevel);
        for (let i = 1000; i >= 0; i--) {
            let LevelComponent =
                <div
                    className={'levels__level ' + (lastLevel < i ? 'levels__level_close' : '')}
                    onClick={() => this.props.chooseLevel(i)}
                    key={'level' + i}
                >
                    {i + 1}
                </div>;

            if (i === lastLevel) {
                LevelComponent =
                    <div
                        className={'levels__level levels__level_last'}
                        onClick={() => this.props.chooseLevel(i)}
                        key={'level' + i}
                        ref={(div) => this.selectLevelRef(div)}
                    >
                        {i + 1}
                    </div>;
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
        lastLevel: selectLastLevel(store)
    }),
    (dispatch) => ({
        chooseLevel: (level) => dispatch(chooseLevel(level))
    }))(Levels);
