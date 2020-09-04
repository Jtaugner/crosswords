import React from 'react';
import './crossword.scss'
import {connect} from "react-redux";


const windowWidth = window.innerWidth - window.innerWidth * 0.03;
const pixelsPerLetters = 5;

function Crossword(props) {
    const levelWords = ["Бананык"];
    const levelWordsDescriptions = {"ГУСЕК":"Архитектурный криволинейный облом.","СЦЕНА":"Картина французского художника Эдгара Дега «Балетная ...».","НЕРПА":"Остров архипелага Земля Франца-Иосифа.","ГРИВА":"Рассказ Конан Дойла о Шерлоке Холмсе «Львиная ...».","САКЛЯ":"Апартаменты горца.","ХОЛСТ":"Живописная материя.","АБВЕР":"Немецкая разведка.","МОЛЯН":"Мордовский религиозный праздник.","КУМЖА":"Рыба из семейства лососёвых.","ГЕТРЫ":"Род тёплых чулок от щиколотки до колен."};

    const letterSize = (windowWidth - pixelsPerLetters * (levelWords[0].length - 1) ) / levelWords[0].length;
    const fontLetterSize = Math.floor(letterSize / 1.5);
    return (
        <div className={'crossword'}>
            {
                levelWords.map((word)=> {
                    return <div
                        className={'crossword__word'}
                        key={word}>
                        {
                            word.split('').map((letter, index) => {
                                return <div
                                    className={'crossword__letter'}
                                    key={word + index}
                                    style={{
                                        width: letterSize,
                                        height: letterSize,
                                        fontSize: fontLetterSize + 'px'
                                    }}
                                >
                                    {letter.toUpperCase()}
                                </div>
                            })
                        }
                    </div>
                })
            }
        </div>
    );
}

export default connect((store) => ({


    })
)(Crossword);
