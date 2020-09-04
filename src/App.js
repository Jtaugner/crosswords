import React, {Component} from 'react';
import './root.css'
import './App.css';
import {connect} from "react-redux";
import MainPage from "./components/mainPage/mainPage";
import {Route, Switch} from "react-router-dom";
import Settings from "./components/settings";
import {selectSettings} from "./store/selectors";
import GamePage from "./components/gamePage/gamePage";
import ErrorMessage from "./components/errorMessage/errorMessage";

import {YM_METRIKA_ID} from './projectCommon'

export function giveParams(data) {
    try{
        window.ym(YM_METRIKA_ID, 'params', data);
    }catch(ignored){}
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isError: false
        };

    }

    componentDidCatch(error, info) {
        // Послать ошибку в яндекс метрику
        try{
            const str = error.toString() + '---' + info.componentStack.slice(0, 150);
            giveParams({[str]: 1})
        }catch(ignored){}
        this.setState({
            isError: true
        })
    }

    render() {
        if (this.state.isError) {
            return (
                <>
                    <ErrorMessage
                        getHome={true}
                        onClick={
                            () => {
                                this.setState({
                                    isError: false
                                })
                            }
                        }/>
                </>
            )
        }
        return (
            <>
                <Switch
                >
                    <Route path={'/home'}
                           render={() => <MainPage/>}
                    />
                    <Route path={'/game'}
                           render={() => <GamePage/>}/>
                </Switch>
                {this.props.settings ? <Settings/> : ''}

            </>
        );
    }

}

export default connect(
    (store) =>
    ({
        settings: selectSettings(store),
    }),
    (dispatch) =>
        ({
        })

)(App);
