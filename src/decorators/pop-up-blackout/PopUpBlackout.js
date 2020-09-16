import React from 'react'
import './index.scss'
import {Link} from "react-router-dom";

function popUpBlackout(OriginalComponent) {
    //В onClick должна приходить функция закрытия модального окна
    return (props) => {
        return <div className={'pop-up-anim'}>
            <div className={'blackout'} onClick={props.onClick}/>
            <OriginalComponent
                {...props}
                style={{fontSize: 20}}
            />

        </div>;
    }

}

export default popUpBlackout