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
    {"levelWords":["ТОПОР","БЕЛКА"],"levelWordsDescriptions":{"ТОПОР":"Сырьё для солдатской каши.","БЕЛКА":"Небольшой зверёк с большим пушистым хвостом, грызун.","ОВРАГ":"Буерак.","МОРОЗ":"Российская актриса, исполнившая роль горничной Кати в телесериале «Гибель империи».","ШАЛАШ":"«Райская» постройка из веток.","ДРОВА":"Деревенское топливо.","ПИХТА":"Хвойное дерево, чьи шишки растут вверх.","ЛОДКА":"Военное судно определённого класса.","КАБАН":"Взрослый Пятачок."}},
    {"levelWords":["ПРАКТИК","НЕДОТКА","ОКУЧНИК","ОБОЛТУС","ЩИТОВКА","СЫТОСТЬ","РИВАНОЛ","МАЛЬБЕК","ШЛИХТИК","ИЗДЕЛИЕ"],"levelWordsDescriptions":{"ПРАКТИК":"АААфАаыфвафыДеловой человек.","НЕДОТКА":"Рыболовное орудие из редко вытканного холста, сшитого в два полотнища.","ОКУЧНИК":"«Собрат» культиватора.","ОБОЛТУС":"Слоняющийся бездельник.","ЩИТОВКА":"Насекомое, отряд клопов.","СЫТОСТЬ":"Удовлетворённость желудка.","РИВАНОЛ":"Лекарственный препарат из группы антисептических средств.","МАЛЬБЕК":"Сорт столового винограда.","ШЛИХТИК":"Рубанок с двойным лезвием для чистого строгания.","ИЗДЕЛИЕ":"Выделка, производство."}}

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

export const tipsCost = [1, 2, 5, 5];
export const shopItems = [
    {amount: 10, price: 25},
    {amount: 50, price: 75},
    {amount: 100, price: 199},
    {amount: 5, price: 0},
];

export const tipsDescription = ['Открывает выбранную букву', 'Открывает 5 случайных букв', 'Подсвечивает на клавиатуре буквы из слова', 'Открывает выбранное слово'];