import React from 'react';
import './money.scss'
import {connect} from "react-redux";
import {selectMoney} from "../../store/selectors";
import {Link} from "react-router-dom";


function Money(props) {
    const {money} = props;
    const MoneyBlock = React.forwardRef((props, ref) => (
        <div className="moneyBlock" ref={ref}>
            <div className="moneyBlock__moneyPic" />
            <span className={'moneyBlock__moneyAmount'}>{money}</span>
            <div className="moneyBlock__addMoney">+</div>
        </div>
    ));
    return (
        <Link to={'/shop'} component={MoneyBlock} />
    );
}

export default connect((store) => ({
        money: selectMoney(store),

    })
)(Money);
