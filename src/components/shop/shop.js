import React from 'react';
import './shop.scss'
import {connect} from "react-redux";
import {selectCatalog, selectGameSDK, selectMoney, selectPayments, selectPlayer} from "../../store/selectors";
import {addMoney, toggleShopOpened} from "../../store/ac";
import popUpBlackout from "../../decorators/pop-up-blackout/PopUpBlackout";
import {shopItems} from "../../projectCommon";
import {initPlayer, saveData} from "../../index";
import {giveParams} from "../../App";


let videoTime = true;

function Shop(props) {
    const {onClick, payments, gameSDK, addMoney, catalog, player} = props;
    const buyThing = (id) => {
        if(id === 'free'){
            if(!videoTime) return;
            gameSDK.adv.showRewardedVideo({
                callbacks: {
                    onRewarded: () => {
                        giveParams({'free': 1});
                        addMoney(10);
                        onClick();
                        videoTime = false;
                        setTimeout(()=>{
                            videoTime = true;
                        }, 70000);
                    }
                }
            });
            return;
        }
        try{
            console.log(payments, player);
            if(payments && player){
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
                        setTimeout(()=>{
                            saveData();
                        }, 1000);
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
        if(item.id === 'free'){
            return 'Реклама'
        }
        try{
            console.log(catalog[index].price);
            return catalog[index].price;
        }catch(e){
            return item.price + ' YAN';
        }
    }
    return (

        <div className="shop popUp">
            <div className="popUp__header">
                <div className="popUp__title">Магазин</div>
                <div className="popUp__close" onClick={onClick} />
            </div>
            <div className="popUp__elements">
                {
                    shopItems.map((item, index) => {
                        return (item.id !== 'free'
                            || (item.id === 'free' && videoTime)) ?
                            <div className="shop__cart__item"
                                    onClick={()=>buyThing(item.id)}
                            >
                                <div className="shop__cart__card">
                                    <div className={'shop__cart__item_' + (index+1)}/>
                                    <div className="shop__cart__name">
                                        <div className="shop__tipsCount">{item.amount}</div>
                                        подсказок
                                    </div>
                                </div>
                                <div className={"shop__cart__buy-button "
                                + (item.id === 'free' ? 'shop__cart__free' : '')}>
                                    {item.id === 'free' ?
                                        <div className="shop__cart__advert" /> : ''
                                    }

                                    {getPrice(item, index)}
                                </div>
                            </div> : ''
                    })
                }
                <div className="empty__item" />
            </div>
        </div>
    );
}

export default connect(
    (store) => ({
        money: selectMoney(store),
        gameSDK: selectGameSDK(store),
        payments: selectPayments(store),
        catalog: selectCatalog(store),
        player: selectPlayer(store)
    }),
    (dispatch) => ({
        onClick: () => dispatch(toggleShopOpened()),
        addMoney: (money) => dispatch(addMoney(money))
    })
)(popUpBlackout(Shop));
