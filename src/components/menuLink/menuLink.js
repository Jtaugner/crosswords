import React from 'react';
import './menuLink.scss'
import {Link} from "react-router-dom";
import {goMainPageSound} from "../../sounds";
import {connect} from "react-redux";
import {selectSounds} from "../../store/selectors";


function MenuLink(props) {
    const {isSounds, endGame} = props;
    const onClick = () => {
        if(isSounds){
            goMainPageSound.play();
        }
    };
    return (
        <Link
            to={'/home'}
            className={'menu' + (endGame ? ' menu__endGame' : '')}
            onClick={onClick}/>
    );
}

export default connect(
    (store)=>({
        isSounds: selectSounds(store)})
)(MenuLink);
