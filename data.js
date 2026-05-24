// Football Training Data for Teens 12-16 years old

const programsData = [
    {
        id: 1,
        title: "Основы контроля мяча",
        type: "ball",
        typeName: "Работа с мячом",
        difficulty: "easy",
        difficultyName: "Легкий",
        duration: 15,
        calories: 120,
        description: "Идеально для начинающих. Улучши контроль мяча за 15 минут.",
        exercises: [
            { name: "Ведение мяча внутренней стороной стопы", duration: 180, sets: 2, rest: 30 },
            { name: "Ведение мяча внешней стороной стопы", duration: 180, sets: 2, rest: 30 },
            { name: "Контроль мяча подошвой", duration: 120, sets: 3, rest: 45 },
            { name: "Жонглирование мячом", duration: 180, sets: 2, rest: 30 }
        ]
    },
    {
        id: 2,
        title: "Скоростная работа с мячом",
        type: "ball",
        typeName: "Работа с мячом",
        difficulty: "medium",
        difficultyName: "Средний",
        duration: 20,
        calories: 180,
        description: "Развивай скорость и координацию при работе с мячом.",
        exercises: [
            { name: "Челночный бег с мячом", duration: 240, sets: 3, rest: 60 },
            { name: "Быстрое ведение между конусами", duration: 180, sets: 3, rest: 45 },
            { name: "Резкая смена направления", duration: 180, sets: 2, rest: 45 },
            { name: "Удары по воротам после рывка", duration: 240, sets: 2, rest: 60 }
        ]
    },
    {
        id: 3,
        title: "Точность передач",
        type: "ball",
        typeName: "Работа с мячом",
        difficulty: "medium",
        difficultyName: "Средний",
        duration: 18,
        calories: 150,
        description: "Улучши точность коротких и длинных передач.",
        exercises: [
            { name: "Короткие передачи у стены", duration: 240, sets: 3, rest: 45 },
            { name: "Длинные передачи на точность", duration: 180, sets: 3, rest: 60 },
            { name: "Передачи внутренней стороной стопы", duration: 180, sets: 2, rest: 30 },
            { name: "Передачи в движении", duration: 240, sets: 2, rest: 45 }
        ]
    },
    {
        id: 4,
        title: "Футбольное кардио",
        type: "cardio",
        typeName: "Кардио",
        difficulty: "medium",
        difficultyName: "Средний",
        duration: 25,
        calories: 250,
        description: "Интенсивная кардиотренировка для развития выносливости.",
        exercises: [
            { name: "Бег трусцой", duration: 300, sets: 1, rest: 60 },
            { name: "Интервальный спринт", duration: 240, sets: 4, rest: 90 },
            { name: "Бег с высоким подниманием бедра", duration: 120, sets: 3, rest: 45 },
            { name: "Боковые перемещения", duration: 180, sets: 3, rest: 45 }
        ]
    },
    {
        id: 5,
        title: "HIIT для футболистов",
        type: "cardio",
        typeName: "Кардио",
        difficulty: "hard",
        difficultyName: "Сложный",
        duration: 20,
        calories: 280,
        description: "Высокоинтенсивная интервальная тренировка для максимальной выносливости.",
        exercises: [
            { name: "Спринт 30 секунд / отдых 30 секунд", duration: 300, sets: 5, rest: 60 },
            { name: "Берпи", duration: 120, sets: 3, rest: 60 },
            { name: "Прыжки через барьеры", duration: 180, sets: 3, rest: 45 },
            { name: "Челночный бег", duration: 180, sets: 4, rest: 60 }
        ]
    },
    {
        id: 6,
        title: "Аэробная выносливость",
        type: "cardio",
        typeName: "Кардио",
        difficulty: "easy",
        difficultyName: "Легкий",
        duration: 30,
        calories: 220,
        description: "Базовая аэробная тренировка для развития общей выносливости.",
        exercises: [
            { name: "Непрерывный бег", duration: 600, sets: 1, rest: 120 },
            { name: "Бег зигзагом", duration: 240, sets: 2, rest: 60 },
            { name: "Бег с изменением темпа", duration: 300, sets: 2, rest: 90 },
            { name: "Восстановительный бег", duration: 300, sets: 1, rest: 0 }
        ]
    },
    {
        id: 7,
        title: "Укрепление корпуса",
        type: "core",
        typeName: "Корпус",
        difficulty: "easy",
        difficultyName: "Легкий",
        duration: 15,
        calories: 100,
        description: "Базовые упражнения для укрепления мышц кора.",
        exercises: [
            { name: "Планка", duration: 60, sets: 3, rest: 30 },
            { name: "Скручивания", duration: 90, sets: 3, rest: 45 },
            { name: "Подъем ног лежа", duration: 60, sets: 3, rest: 45 },
            { name: "Русский твист", duration: 90, sets: 2, rest: 30 }
        ]
    },
    {
        id: 8,
        title: "Пресс футболиста",
        type: "core",
        typeName: "Корпус",
        difficulty: "medium",
        difficultyName: "Средний",
        duration: 20,
        calories: 140,
        description: "Специализированная тренировка пресса для футболистов.",
        exercises: [
            { name: "Велосипед", duration: 120, sets: 3, rest: 45 },
            { name: "Планка с касанием плеч", duration: 120, sets: 3, rest: 45 },
            { name: "Подъем ног в висе", duration: 90, sets: 3, rest: 60 },
            { name: "Боковая планка", duration: 120, sets: 2, rest: 30 }
        ]
    },
    {
        id: 9,
        title: "Стабильность корпуса",
        type: "core",
        typeName: "Корпус",
        difficulty: "hard",
        difficultyName: "Сложный",
        duration: 25,
        calories: 180,
        description: "Продвинутые упражнения для стабильности и баланса.",
        exercises: [
            { name: "Планка с подъемом ног", duration: 120, sets: 3, rest: 45 },
            { name: "Динамическая планка", duration: 150, sets: 3, rest: 60 },
            { name: "V-образные скручивания", duration: 90, sets: 3, rest: 45 },
            { name: "Боковая планка с ротацией", duration: 120, sets: 2, rest: 45 }
        ]
    },
    {
        id: 10,
        title: "Техника дриблинга",
        type: "ball",
        typeName: "Работа с мячом",
        difficulty: "easy",
        difficultyName: "Легкий",
        duration: 20,
        calories: 160,
        description: "Основы дриблинга для начинающих футболистов.",
        exercises: [
            { name: "Ведение мяча змейкой", duration: 180, sets: 3, rest: 45 },
            { name: "Ведение вокруг конусов", duration: 180, sets: 3, rest: 45 },
            { name: "Контроль мяча в малом пространстве", duration: 120, sets: 2, rest: 30 },
            { name: "Финты и обманные движения", duration: 180, sets: 2, rest: 45 }
        ]
    },
    {
        id: 11,
        title: "Взрывная сила",
        type: "cardio",
        typeName: "Кардио",
        difficulty: "hard",
        difficultyName: "Сложный",
        duration: 22,
        calories: 300,
        description: "Тренировка взрывной силы и мощности.",
        exercises: [
            { name: "Прыжки в длину с места", duration: 120, sets: 4, rest: 60 },
            { name: "Прыжки на тумбу", duration: 120, sets: 3, rest: 60 },
            { name: "Спринт в гору", duration: 180, sets: 4, rest: 90 },
            { name: "Многоскоки", duration: 120, sets: 3, rest: 60 }
        ]
    },
    {
        id: 12,
        title: "Гибкость и мобильность",
        type: "core",
        typeName: "Корпус",
        difficulty: "easy",
        difficultyName: "Легкий",
        duration: 15,
        calories: 80,
        description: "Растяжка и мобильность для профилактики травм.",
        exercises: [
            { name: "Динамическая растяжка ног", duration: 180, sets: 1, rest: 30 },
            { name: "Растяжка бедер", duration: 120, sets: 2, rest: 30 },
            { name: "Мобилизация позвоночника", duration: 120, sets: 2, rest: 30 },
            { name: "Статическая растяжка", duration: 180, sets: 1, rest: 0 }
        ]
    },
    {
        id: 13,
        title: "Мастер финтов",
        type: "skills",
        typeName: "Финты",
        difficulty: "medium",
        difficultyName: "Средний",
        duration: 18,
        calories: 140,
        description: "Изучи основные футбольные финты для обыгрыша соперников.",
        exercises: [
            { name: "Финт Зидана (разворот)", duration: 180, sets: 3, rest: 45 },
            { name: "Степ-овер (перешагивание)", duration: 180, sets: 3, rest: 45 },
            { name: "Сиссорс (ножницы)", duration: 150, sets: 2, rest: 45 },
            { name: "Крук-over (крюк)", duration: 150, sets: 2, rest: 45 }
        ]
    },
    {
        id: 14,
        title: "Элитные финты",
        type: "skills",
        typeName: "Финты",
        difficulty: "hard",
        difficultyName: "Сложный",
        duration: 22,
        calories: 180,
        description: "Продвинутые финты для профессионального уровня.",
        exercises: [
            { name: "Эластико (резинка)", duration: 180, sets: 3, rest: 60 },
            { name: "Рабио (кролик)", duration: 150, sets: 3, rest: 45 },
            { name: "Марсель разворот", duration: 180, sets: 2, rest: 60 },
            { name: "Комбинация финтов", duration: 240, sets: 2, rest: 60 }
        ]
    },
    {
        id: 15,
        title: "Финты в движении",
        type: "skills",
        typeName: "Финты",
        difficulty: "expert",
        difficultyName: "Эксперт",
        duration: 25,
        calories: 220,
        description: "Выполнение финтов на скорости во время дриблинга.",
        exercises: [
            { name: "Ведение + степ-овер", duration: 240, sets: 3, rest: 60 },
            { name: "Ведение + эластико", duration: 240, sets: 3, rest: 60 },
            { name: "Слалом с финтами", duration: 300, sets: 2, rest: 60 },
            { name: "1v1 Симуляция", duration: 300, sets: 2, rest: 90 }
        ]
    }
];

const exercisesData = [
    {
        id: 1,
        name: "Планка",
        icon: "🧘",
        category: "core",
        description: "Статическое упражнение для укрепления всего корпуса",
        instructions: [
            "Примите положение упора лёжа на предплечьях",
            "Тело должно образовывать прямую линию от головы до пяток",
            "Напрягите мышцы живота и ягодиц",
            "Держите позицию указанное время"
        ],
        muscles: ["Пресс", "Спина", "Ягодицы"],
        difficulty: "easy"
    },
    {
        id: 2,
        name: "Ведение мяча",
        icon: "⚽",
        category: "ball",
        description: "Базовое упражнение для контроля мяча",
        instructions: [
            "Ведите мяч внутренней стороной стопы",
            "Держите мяч близко к ноге",
            "Поднимайте голову периодически",
            "Контролируйте силу толчка"
        ],
        muscles: ["Ноги", "Координация"],
        difficulty: "easy"
    },
    {
        id: 3,
        name: "Берпи",
        icon: "💪",
        category: "cardio",
        description: "Комплексное упражнение для развития выносливости",
        instructions: [
            "Из положения стоя присядьте и положите руки на пол",
            "Прыжком примите положение упора лёжа",
            "Отожмитесь",
            "Прыжком верните ноги к рукам и выпрыгните вверх"
        ],
        muscles: ["Все тело", "Кардио"],
        difficulty: "medium"
    },
    {
        id: 4,
        name: "Скручивания",
        icon: "🔄",
        category: "core",
        description: "Классическое упражнение для пресса",
        instructions: [
            "Лягте на спину, согните ноги в коленях",
            "Руки за головой или на груди",
            "Поднимайте верхнюю часть корпуса",
            "Опускайтесь медленно, не кладя голову на пол"
        ],
        muscles: ["Пресс"],
        difficulty: "easy"
    },
    {
        id: 5,
        name: "Спринт",
        icon: "🏃",
        category: "cardio",
        description: "Бег на максимальной скорости",
        instructions: [
            "Примите стартовое положение",
            "Мощно оттолкнитесь от земли",
            "Работайте руками активно",
            "Держите корпус слегка наклоненным вперед"
        ],
        muscles: ["Ноги", "Кардио"],
        difficulty: "medium"
    },
    {
        id: 6,
        name: "Жонглирование мячом",
        icon: "🎯",
        category: "ball",
        description: "Упражнение для чувства мяча",
        instructions: [
            "Подбросьте мяч ногой вверх",
            "Контролируйте мяч подъёмом стопы",
            "Чередуйте ноги",
            "Стремитесь удержать мяч в воздухе"
        ],
        muscles: ["Ноги", "Координация"],
        difficulty: "medium"
    },
    {
        id: 7,
        name: "Боковая планка",
        icon: "🦎",
        category: "core",
        description: "Упражнение для косых мышц живота",
        instructions: [
            "Лягте на бок, обопритесь на предплечье",
            "Поднимите таз, образуя прямую линию",
            "Держите мышцы напряженными",
            "Поменяйте сторону после выполнения"
        ],
        muscles: ["Косые мышцы", "Спина"],
        difficulty: "medium"
    },
    {
        id: 8,
        name: "Челночный бег",
        icon: "⚡",
        category: "cardio",
        description: "Бег с резкими изменениями направления",
        instructions: [
            "Отметьте две точки на расстоянии 5-10 метров",
            "Бегите от одной точки к другой",
            "Касайтесь земли на каждой точке",
            "Меняйте направление максимально быстро"
        ],
        muscles: ["Ноги", "Кардио", "Координация"],
        difficulty: "medium"
    },
    {
        id: 9,
        name: "Подъем ног лежа",
        icon: "🦵",
        category: "core",
        description: "Упражнение для нижней части пресса",
        instructions: [
            "Лягте на спину, руки вдоль тела",
            "Поднимайте прямые ноги до угла 90 градусов",
            "Медленно опускайте, не касаясь пола",
            "Держите поясницу прижатой к полу"
        ],
        muscles: ["Нижний пресс"],
        difficulty: "medium"
    },
    {
        id: 10,
        name: "Передачи у стены",
        icon: "🧱",
        category: "ball",
        description: "Отработка точности передач",
        instructions: [
            "Встаньте в 3-5 метрах от стены",
            "Делайте передачи внутренней стороной стопы",
            "Контролируйте силу удара",
            "Принимайте мяч и повторяйте"
        ],
        muscles: ["Ноги", "Точность"],
        difficulty: "easy"
    },
    {
        id: 11,
        name: "Прыжки через барьеры",
        icon: "🚧",
        category: "cardio",
        description: "Развитие взрывной силы ног",
        instructions: [
            "Расставьте небольшие барьеры в ряд",
            "Прыгайте двумя ногами одновременно",
            "Приземляйтесь мягко на носки",
            "Минимальный контакт с землей между прыжками"
        ],
        muscles: ["Ноги", "Взрывная сила"],
        difficulty: "hard"
    },
    {
        id: 12,
        name: "Русский твист",
        icon: "🌀",
        category: "core",
        description: "Упражнение для косых мышц",
        instructions: [
            "Сядьте на пол, согните ноги в коленях",
            "Отклоните корпус назад на 45 градусов",
            "Поворачивайте корпус в стороны",
            "Можно использовать мяч или гантель"
        ],
        muscles: ["Косые мышцы", "Пресс"],
        difficulty: "medium"
    },
    {
        id: 13,
        name: "Велосипед",
        icon: "🚴",
        category: "core",
        description: "Динамическое упражнение для всего пресса",
        instructions: [
            "Лягте на спину, руки за головой",
            "Поднимите ноги и выполняйте движения как на велосипеде",
            "Касайтесь локтем противоположного колена",
            "Держите темп постоянным"
        ],
        muscles: ["Пресс", "Косые мышцы"],
        difficulty: "medium"
    },
    {
        id: 14,
        name: "Финты",
        icon: "🎭",
        category: "ball",
        description: "Обманные движения для обыгрыша соперника",
        instructions: [
            "Приблизьтесь к воображаемому защитнику",
            "Сделайте ложное движение корпусом",
            "Резко измените направление",
            "Ускорьтесь после финта"
        ],
        muscles: ["Ноги", "Координация", "Ловкость"],
        difficulty: "hard"
    },
    {
        id: 15,
        name: "Растяжка",
        icon: "🤸",
        category: "core",
        description: "Статическая растяжка для гибкости",
        instructions: [
            "Выполняйте медленные контролируемые движения",
            "Задерживайтесь в каждой позиции 20-30 секунд",
            "Не допускайте болевых ощущений",
            "Дышите глубоко и равномерно"
        ],
        muscles: ["Все тело"],
        difficulty: "easy"
    }
];

const achievementsData = [
    {
        id: 1,
        name: "Первый шаг",
        description: "Выполни первую тренировку",
        icon: "🌟",
        requirement: { type: "workouts", count: 1 }
    },
    {
        id: 2,
        name: "Неделя победителя",
        description: "7 дней тренировок подряд",
        icon: "🔥",
        requirement: { type: "streak", count: 7 }
    },
    {
        id: 3,
        name: "Месяц силы",
        description: "30 дней тренировок подряд",
        icon: "💪",
        requirement: { type: "streak", count: 30 }
    },
    {
        id: 4,
        name: "Мастер мяча",
        description: "Выполни 20 тренировок с мячом",
        icon: "⚽",
        requirement: { type: "ballWorkouts", count: 20 }
    },
    {
        id: 5,
        name: "Железный человек",
        description: "Выполни 50 тренировок",
        icon: "🏆",
        requirement: { type: "workouts", count: 50 }
    },
    {
        id: 6,
        name: "Король кардио",
        description: "Выполни 15 кардио тренировок",
        icon: "❤️",
        requirement: { type: "cardioWorkouts", count: 15 }
    },
    {
        id: 7,
        name: "Стальной пресс",
        description: "Выполни 15 тренировок на корпус",
        icon: "🥇",
        requirement: { type: "coreWorkouts", count: 15 }
    },
    {
        id: 8,
        name: "Наборщик очков",
        description: "Набери 1000 очков",
        icon: "⭐",
        requirement: { type: "points", count: 1000 }
    },
    {
        id: 9,
        name: "Профи",
        description: "Набери 5000 очков",
        icon: "👑",
        requirement: { type: "points", count: 5000 }
    },
    {
        id: 10,
        name: "Легенда",
        description: "Набери 10000 очков",
        icon: "🌈",
        requirement: { type: "points", count: 10000 }
    }
];

// Export data for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { programsData, exercisesData, achievementsData };
}
