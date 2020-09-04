import React from 'react'
import './index.scss'
import { disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';
import {Link} from "react-router-dom";

function popUpBlackout(OriginalComponent) {
    //В onClick должна приходить функция закрытия модального окна
    return (props) => {
        let cannotClose = true;
        setTimeout(()=>{
            cannotClose = false;
        }, 400);
        disableBodyScroll();
        const enableScrollAndExit = () => {
            if(cannotClose) return;
            enableBodyScroll();
            props.onClick();
        };
        let Component = <div className={'pop-up-anim'}>
            <canvas id="show-confetti" onClick={enableScrollAndExit}/>
            <div className={'blackout'} onClick={enableScrollAndExit}/>
            <div className={"pop-up " +(props.bigForm ? 'big-form' : '')}>
                <OriginalComponent
                    {...props}
                    onClick={enableScrollAndExit}
                />
            </div>

        </div>;
        if(props.getHome){
            return <Link to={'/home'}>
                {Component}
            </Link>
        }
        return Component;
    }

}

export default popUpBlackout