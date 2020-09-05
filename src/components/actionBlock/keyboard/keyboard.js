import React from 'react';
import './keyboard.scss'
import {connect} from "react-redux";

const letters = [
    ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х"],
    ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э"],
    ["я", "ч", "с", "м", "и", "т", "ь", "б", "ю"]
];
const pixelsPerLetters = 5;
function Keyboard(props) {
    const letterSize = (
        (window.innerWidth - 16) - pixelsPerLetters * (10) ) / 11;
    return (
        <div className={'keyboard'}>
            {
                letters.map((line, index)=>
                    <div
                        className="keyboard__line"
                        key={'line' + index}
                    >
                        {
                            line.map((letter)=>
                                <div
                                    className={'keyboard__letter'}
                                    style={{width: letterSize + 'px'}}
                                    key={'letter'+letter}
                                >
                                    {letter}</div>
                            )
                        }
                        {
                            index === 2 ?
                                <div
                                    className={'keyboard__deleteButton'}
                                    style={{width: letterSize * 2 + pixelsPerLetters + 'px'}}
                                /> : ''
                        }
                    </div>
                )
            }

        </div>
    );
}

export default connect((store) => ({


    })
)(Keyboard);
