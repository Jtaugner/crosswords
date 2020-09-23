const fs = require("fs");
const wordsDescriptions = require('./descs').desc;
// const gameLevels = require('./gameLevels').gameLevels;
const allWords = require('./simpleWords').words;

let max = '';
let dd = 0;
Object.keys(wordsDescriptions).forEach((name)=>{
    let arr = wordsDescriptions[name];
    for(let i = 0; i < arr.length; i++){
        if(arr[i].length > 100){
            dd++;
        }
        if(arr[i].length > max.length){
            max = arr[i];
        }
    }
});
console.log(max);
console.log(dd);
// Object.keys(wordsDescriptions).forEach((name)=>{
//     if(name.length > 9){
//         delete wordsDescriptions[name];
//     }
//
// });
// fs.writeFile('descs.js', `module.exports = {desc: ${JSON.stringify(wordsDescriptions)}};`, function (err) {
//     if(err) throw err;
// });
let wordsArray = ["топор", "белка", "овраг", "мороз", "шалаш", "дрова", "пихта", "лодка", "кабан"];
function getLevelFromWords(arr) {
    const levelWordsDescriptions = {};
    wordsArray = wordsArray.map((el)=>el.toUpperCase());
    wordsArray.forEach((word)=>{
        levelWordsDescriptions[word] = wordsDescriptions[word][Math.floor(Math.random()*wordsDescriptions[word].length)];
    });
    return {
        levelWords: wordsArray,
        levelWordsDescriptions
    }
}

fs.writeFile('gameLevels.js',
    `module.exports = {gameLevels: ${JSON.stringify(getLevelFromWords(wordsArray))}};`,
    function (err) {
                if(err) throw err;
            }
);


return;
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
            levelWords.push(word.replace(/Ё/g, 'Е'));
            //Рандомное определение слова
            levelWordsDescriptions[word] =wordsDescriptions[word][Math.floor(Math.random()*wordsDescriptions[word].length)];
            if(levelWords.length === amount) return {
                levelWords, levelWordsDescriptions
            }
        }
    }


}
fs.writeFile('gameLevels.js', `module.exports = {gameLevels: ${JSON.stringify(getLevel(7, 10))}};`, function (err) {
    if(err) throw err;
});


