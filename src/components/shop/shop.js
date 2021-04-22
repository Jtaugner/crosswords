import React from 'react';
import './shop.scss'
import {connect} from "react-redux";
import {selectCatalog, selectGameSDK, selectMoney, selectPayments} from "../../store/selectors";
import {addMoney, toggleShopOpened} from "../../store/ac";
import popUpBlackout from "../../decorators/pop-up-blackout/PopUpBlackout";
import {shopItems} from "../../projectCommon";
import {initPlayer, saveData} from "../../index";
import {giveParams} from "../../App";


let videoTime = true;

function Shop(props) {
    const {onClick, payments, gameSDK, addMoney, catalog} = props;
    const buyThing = (id) => {
        if(id === 'free'){
            if(!videoTime) return;
            gameSDK.adv.showRewardedVideo({
                callbacks: {
                    onRewarded: () => {
                        giveParams({'free': 1});
                        addMoney(5);
                        onClick();
                        videoTime = false;
                        setTimeout(()=>{
                            videoTime = true;
                        }, 300000);
                    }
                }
            });
            return;
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
    const getPrice = (item, index) => {
        try{
            console.log(catalog[index].price);
            return catalog[index].price;
        }catch(e){
            return item.price + '₽';
        }
    }
    return (
        <div className="shop popUp">
            <div className="popUp__header">
                Магазин
                <div className="shop__cross icon" onClick={onClick}/>
            </div>
            {
                shopItems.map((item, index) => {
                        return (item.id !== 'free'
                            || (item.id === 'free' && videoTime)) ?
                            <div
                                className={'shop__item shop__item_' + index}
                                key={'shop' + index}
                            >
                                <div className="shop__icon"/>
                                <div className="shop__name">
                                    {item.amount} подсказок
                                </div>
                                <div
                                    className="shop__button_buy"
                                    onClick={()=>buyThing(item.id)}
                                >
                                    {getPrice(item, index)}
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
        catalog: selectCatalog(store)
    }),
    (dispatch) => ({
        onClick: () => dispatch(toggleShopOpened()),
        addMoney: (money) => dispatch(addMoney(money))
    })
)(popUpBlackout(Shop));
