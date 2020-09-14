import React, {Component} from 'react';
import './root.css'
import './App.css';
import {connect} from "react-redux";
import MainPage from "./components/mainPage/mainPage";
import {Route, Switch, withRouter} from "react-router-dom";
import Settings from "./components/settings";
import {selectSettings} from "./store/selectors";
import GamePage from "./components/gamePage/gamePage";
import ErrorMessage from "./components/errorMessage/errorMessage";

import {YM_METRIKA_ID} from './projectCommon'
import {CSSTransition, SwitchTransition, TransitionGroup} from "react-transition-group";

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

        const location = this.props.location;
        return (
            <>

                <TransitionGroup
                    className={'transGroup ' + (location.pathname === '/game' ? 'transGroupMenu' : '')}

                >
                    <CSSTransition
                        key={location.key}
                        timeout={1000}
                        classNames="slide"
                    >
                        <Switch location={location}>
                            <Route path={'/home'} component={MainPage}/>
                            <Route path={'/game'} component={GamePage}/>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>


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

)(withRouter(App));
