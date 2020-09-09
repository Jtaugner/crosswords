import React, {useState} from 'react';
import './keyboard.scss'
import {connect} from "react-redux";
import {isPhone} from "../../../projectCommon";

const letters = [
    ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х"],
    ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э"],
    ["я", "ч", "с", "м", "и", "т", "ь", "б", "ю"]
];
const pixelsPerLetters = 5;
const softSign = 'ь';
const hardSign = 'ъ';

let rememberedLetter;

let isLetterStarted = false;

let letterTimeout;

function Keyboard(props) {
    const {addLetterToCrossWord} = props;
    const letterSize = (
        (window.innerWidth - 16) - pixelsPerLetters * (10)) / 11;

    const [isLetterClicked, changeIsLetterClicked] = useState('');
    const [isChangedSoftSign, changeSoftSign] = useState(false);


    const letterOnStart = (letter) => {
        isLetterStarted = true;

        changeIsLetterClicked(letter);
        rememberedLetter = letter;

        //Для твёрдого знака
        //При удерживании мягкого знака он заменяется на твёрдый
        if (letter === softSign) {
            letterTimeout = setTimeout(()=>{
                rememberedLetter = hardSign;
                changeSoftSign(true);

            }, 450);
        }

    };
    const letterOnStartDesktop = (letter) => {
        if (!isPhone) letterOnStart(letter);
    };
    const letterOnStartPhone = (letter) => {
        if (isPhone) letterOnStart(letter);
    };

    const letterOnEnd = () => {
        clearTimeout(letterTimeout);
        changeIsLetterClicked('');
        changeSoftSign(false);

        if(!isLetterStarted) return;
        isLetterStarted = false;
        addLetterToCrossWord(rememberedLetter);
    };

    const deleteLetter = () => {
      addLetterToCrossWord(0);
    };

    const chooseSoftLetter = () => {
        return isChangedSoftSign ? hardSign : softSign;
    };

    return (
        <div className={'keyboard'}>
            {
                letters.map((line, index) =>
                    <div
                        className="keyboard__line"
                        key={'line' + index}
                    >
                        {
                            line.map((letter) =>
                                <div
                                    className={'keyboard__letter '
                                    + (isLetterClicked === letter ? 'keyboard__letter_selected' : '')}


                                    onTouchStart={() => letterOnStartPhone(letter)}
                                    onMouseDown={() => letterOnStartDesktop(letter)}

                                    onMouseUp={letterOnEnd}
                                    onTouchEnd={letterOnEnd}
                                    onTouchCancel={letterOnEnd}

                                    style={{width: letterSize + 'px'}}
                                    key={'letter' + letter}
                                >
                                    {letter}
                                    <div
                                        className="keyboard__letter keyboard__letterTip"
                                        style={{width: letterSize * 1.5 + 'px'}}
                                    >{letter === softSign ? chooseSoftLetter(letter) : letter}</div>
                                </div>
                            )
                        }
                        {
                            index === 2 ?
                                <div
                                    className={'keyboard__deleteButton'}
                                    onClick={deleteLetter}
                                    style={{width: letterSize * 2 + pixelsPerLetters + 'px'}}
                                /> : ''
                        }
                    </div>
                )
            }

        </div>
    );
}

export default connect((store) => ({})
)(Keyboard);
