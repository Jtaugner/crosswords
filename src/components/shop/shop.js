import React from 'react';
import './shop.scss'
import {connect} from "react-redux";
import {selectMoney} from "../../store/selectors";
import {toggleShopOpened} from "../../store/ac";
import popUpBlackout from "../../decorators/pop-up-blackout/PopUpBlackout";
import {shopItems} from "../../projectCommon";


function Shop(props) {
    const {money, onClick} = props;
    return (
        <div className="shop popUp">
            <div className="popUp__header">
                Магазин
                <div className="shop__cross" onClick={onClick}/>
            </div>
            {
                shopItems.map((item, index) => (
                    <div
                        className={'shop__item shop__item_' + index}
                        key={'shop' + index}
                    >
                        <div className="shop__icon"/>
                        <div className="shop__name">
                            {item.amount} флажков
                        </div>
                        <div className="shop__button_buy">
                            {item.price} ₽
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default connect(
    (store) => ({
        money: selectMoney(store),
    }),
    (dispatch) => ({
        onClick: () => dispatch(toggleShopOpened())
    })
)(popUpBlackout(Shop));
