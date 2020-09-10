import React from 'react';
import './menuLink.scss'
import {Link} from "react-router-dom";


function MenuLink() {
    const MenuBlock = React.forwardRef((props, ref) => (
        <div className="menu" ref={ref} />
    ));
    return (
        <Link to={'/home'} component={MenuBlock} />
    );
}

export default MenuLink;
