import React from 'react';
import './menuLink.scss'
import {Link} from "react-router-dom";


function MenuLink() {
    return (
        <Link to={'/home'} className={'menu'}/>
    );
}

export default MenuLink;
