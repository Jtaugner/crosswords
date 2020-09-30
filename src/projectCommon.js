export const YM_METRIKA_ID = 0;

// Алгоритм случайного перемешивания массива
export const shuffle = (arr)=> {
    let j, temp;
    for (let i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
};
export const isPhone = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export const gameLevels = [
    {"levelWords":["ТОПОР","БЕЛКА","ОВРАГ","МОРОЗ","ШАЛАШ","ДРОВА","ПИХТА","ЛОДКА","КАБАН"],"levelWordsDescriptions":{"ТОПОР":"Инструмент для рубки деревьев.","БЕЛКА":"Небольшой грызун с большим пушистым хвостом, грызун.","ОВРАГ":"Глубокая длинная впадина.","МОРОЗ":"Дед из Великого Устюга.","ШАЛАШ":"«Райская» постройка из веток.","ДРОВА":"Топливо для сжигания в печи.","ПИХТА":"Хвойное дерево, чьи шишки растут вверх.","ЛОДКА":"Небольшое судно.","КАБАН":"Взрослый Пятачок."}},
    {"levelWords":["АПТЕКА","АВГУСТ","ГЛОБУС","ДОКЛАД","ЖЕЛТОК","ЗАБОТА","ИЗМЕНА","КУРИЦА","ЛОПАТА"],"levelWordsDescriptions":{"АПТЕКА":"Учреждение, где изготавливаются и продаются лекарства.","АВГУСТ":"Месяц под знаком Льва.","ГЛОБУС":"Планета Земля на палочке.","ДОКЛАД":"Составляющая конференции.","ЖЕЛТОК":"Основа гоголь-моголя.","ЗАБОТА":"Беспокойство за другого.","ИЗМЕНА":"Продажа родины.","КУРИЦА":"Птица, утверждающая, что она появилась раньше яйца.","ЛОПАТА":"Инструмент для копания."}},
    {"levelWords":["ЛАГЕРЬ","МОДЕЛЬ","МЯКОТЬ","ОСАДОК","ПОРЦИЯ","РОСТОК","УРАГАН","ШТОПОР","ЭМОЦИЯ"],"levelWordsDescriptions":{"ЛАГЕРЬ":"Военный, детский, пионерский...","МОДЕЛЬ":"Образец, натура, с которой рисуют картину.","МЯКОТЬ":"Плодово-ягодная нетвёрдость.","ОСАДОК":"Успокоившаяся муть.","ПОРЦИЯ":"Съедобная доза.","РОСТОК":"Проклюнувшееся растение.","УРАГАН":"Ветер-хулиган.","ШТОПОР":"Пробко-выниматель.","ЭМОЦИЯ":"Живое проявление чувства."}}


    ];

export const getLevelWords = (level) => {
    return gameLevels[level].levelWords;
};

export const createGameProgress = (length, wordLength) => {
    const levelProgress = [];
    const arrayRow = [];
    for (let i = 0; i < wordLength; i++) {
        arrayRow.push(0);
    }
    for (let i = 0; i < length; i++) {
        levelProgress.push(arrayRow.slice());
    }
    return levelProgress;
};
export const getDoneProgressLevel = (level) => {
    const length = gameLevels[level].levelWords.length;
    const progress = [];
    for(let i = 0; i < length; i++) progress.push(true);
    return progress;;
};
export const createLastLevelGameProgress = (level) => {
    const words = gameLevels[level].levelWords;
    return createGameProgress(words.length, words[0].length);
};

export const getLevelWordsDescription = (level, wordIndex) => {
    if(wordIndex === -1) return  '';
    return gameLevels[level].levelWordsDescriptions
        [
            getLevelWords(level)[wordIndex]
                .toUpperCase()
        ];
};

export const tipsCost = [1, 3, 2, 4];
export const shopItems = [
    {amount: 10, price: 25},
    {amount: 50, price: 75},
    {amount: 100, price: 199},
    {amount: 5, price: 0},
];

export const tipsDescription = ['Открывает выбранную букву', 'Открывает 5 случайных букв', 'Подсвечивает на клавиатуре буквы из слова', 'Открывает выбранное слово'];