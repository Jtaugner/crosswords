const fs = require("fs");
const wordsDescriptions = require('./descs').desc;
// const gameLevels = require('./gameLevels').gameLevels;
const allWords = require('./simpleWords').words;



const shuffle = (arr)=> {
    let j, temp;
    for (let i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
};




function getLevel(length, amount){
    const levelWords = [];
    const levelWordsDescriptions = {};
    shuffle(allWords);
    for(let i = 0; i < allWords.length; i++){
        const word = allWords[i].toUpperCase();
        if(word.length === length && wordsDescriptions[word]){
            levelWords.push(word);
            //Рандомное определение слова
            levelWordsDescriptions[word] =wordsDescriptions[word][Math.floor(Math.random()*wordsDescriptions[word].length)];
            if(levelWords.length === amount) return {
                levelWords, levelWordsDescriptions
            }
        }
    }


}
fs.writeFile('gameLevels.js', `module.exports = {gameLevels: ${JSON.stringify(getLevel(5, 10))}};`, function (err) {
    if(err) throw err;
});


