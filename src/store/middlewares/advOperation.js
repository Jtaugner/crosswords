import {SHOW_ADV} from "../common";
import {selectGameSDK} from "../selectors";

let advTime = true;
export const advertMiddleware  = store => next => action => {
    if(action.type === SHOW_ADV){
        if(advTime){
            let sdk = selectGameSDK(store.getState());
            sdk.adv.showFullscreenAdv({
                callbacks: {
                    onClose: function(wasShown) {
                        if(wasShown){
                            advTime = false;
                            setTimeout(()=>{
                                advTime = true;
                            }, 190000);
                        }
                    }
                }
            });

        }
    } else{
        next(action);
    }

};