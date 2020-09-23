import React from 'react';
import './settingsOpen.scss'


function SettingsOpen(props) {
    const {onClick} = props;
    return  <div className="icon settingsOpen" onClick={onClick}/>
}

export default SettingsOpen;
