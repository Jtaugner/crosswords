import React from 'react';
import './topMenu.scss'
import {connect} from "react-redux";
function TopMenu(props) {
    return (
        <div className="top-menu">
            <div className="top-menu__inner">
                {props.children}
            </div>

        </div>
    );
}

export default connect((store) => ({


    })
)(TopMenu);
