import React from 'react';
import './shop.scss'
import {connect} from "react-redux";
import {selectGameSDK, selectMoney, selectPayments} from "../../store/selectors";
import {addMoney, toggleShopOpened} from "../../store/ac";
import popUpBlackout from "../../decorators/pop-up-blackout/PopUpBlackout";
import {shopItems} from "../../projectCommon";
import {initPlayer, saveData} from "../../index";
import {giveParams} from "../../App";


function Shop(props) {
    const {onClick, payments, gameSDK, addMoney, advTime, showAdv} = props;
    const buyThing = (id) => {
        if(id === 'free'){
            if(!advTime) return;
            showAdv();
            giveParams({'free': 1});
            addMoney(5);
        }
        try{
            if(payments){
                payments.purchase(id).then(purchase => {
                    if(purchase.productID === id){
                        for(let i = 0; i < shopItems.length; i++){
                            if(shopItems[i].id === id){
                                addMoney(shopItems[i].amount);
                                break;
                            }
                        }
                        giveParams({[id]: 1});
                        payments.consumePurchase(purchase.purchaseToken);
                        saveData();
                    }
                }).catch((e)=>{
                    console.log("PAYMENTS ERROR: " + e);
                });
            }else{
                if(gameSDK){
                    gameSDK.auth.openAuthDialog().then(() => {
                        initPlayer(gameSDK, true);
                    }).catch((ignored) => {// Игрок не авторизован.
                    });
                }

            }
        }catch (ignored) {}

    };
    return (
        <div className="shop popUp">
            <div className="popUp__header">
                Магазин
                <div className="shop__cross icon" onClick={onClick}/>
            </div>
            {
                shopItems.map((item, index) => {
                        return (item !== 'free' || (item === 'free' && advTime)) ?
                            <div
                                className={'shop__item shop__item_' + index}
                                key={'shop' + index}
                                onClick={()=>buyThing(item.id)}
                            >
                                <div className="shop__icon"/>
                                <div className="shop__name">
                                    {item.amount} подсказок
                                </div>
                                <div className="shop__button_buy">
                                    {item.price} ₽
                                </div>
                            </div> : ''

                })
            }
        </div>
    );
}

export default connect(
    (store) => ({
        money: selectMoney(store),
        gameSDK: selectGameSDK(store),
        payments: selectPayments(store),
    }),
    (dispatch) => ({
        onClick: () => dispatch(toggleShopOpened()),
        addMoney: (money) => dispatch(addMoney(money))
    })
)(popUpBlackout(Shop));
