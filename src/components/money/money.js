import React from 'react';
import './money.scss'
import {connect} from "react-redux";
import {selectMoney} from "../../store/selectors";
import {toggleShopOpened} from "../../store/ac";


function Money(props) {
    const {money, toggleShopOpened} = props;
    return (
        <div className="moneyBlock" onClick={toggleShopOpened}>
            <div className="moneyBlock__moneyPic" />
            <span className={'moneyBlock__moneyAmount'}>{money}</span>
            <div className="moneyBlock__addMoney">+</div>
        </div>
    );
}

export default connect(
    (store) => ({
        money: selectMoney(store),
    }),
    (dispatch)=>({
        toggleShopOpened: () => dispatch(toggleShopOpened())
    })
)(Money);
