import React from 'react';
import './errorMessage.scss'
import popUpBlackout from "../../decorators/pop-up-blackout/PopUpBlackout";
import {Link} from "react-router-dom";

function ErrorMessage(props) {
    const {changeErrorToFalse} = props;
    return (
        <Link to={'/home'}>
            <div className={'error-message'}>
                <div className="close" onClick={() => changeErrorToFalse()}/>
                <p>Извините, произошла неизвестная ошибка.
                    Отчёт об ошибке уже отправлен разработчикам, скоро она будет исправлена.</p>
            </div>
        </Link>
    );
}

export default popUpBlackout(ErrorMessage);
