/* Pure Vanilla JS Data Bundle for «Тёплое с мягким» (Vanilka)
 * Zero dependencies — 85 double-sided definition cards, 60 double-sided task cards,
 * official co-op scoring tables, and complete RU/EN translations.
 */
(function (global) {
  "use strict";

  var BASE_DEFINITION_CARDS = [
  {
    "id": "def-01",
    "sideA": "Тёплое",
    "sideB": "Мягкое",
    "sideAEn": "Warm",
    "sideBEn": "Soft"
  },
  {
    "id": "def-02",
    "sideA": "Железное",
    "sideB": "Воздушное",
    "sideAEn": "Iron",
    "sideBEn": "Airy"
  },
  {
    "id": "def-03",
    "sideA": "Торговое",
    "sideB": "Домашнее",
    "sideAEn": "Commercial",
    "sideBEn": "Homemade"
  },
  {
    "id": "def-04",
    "sideA": "Сладкое",
    "sideB": "Острое",
    "sideAEn": "Sweet",
    "sideBEn": "Spicy"
  },
  {
    "id": "def-05",
    "sideA": "Дорогое",
    "sideB": "Народное",
    "sideAEn": "Expensive",
    "sideBEn": "Folk"
  },
  {
    "id": "def-06",
    "sideA": "Курортное",
    "sideB": "Зимнее",
    "sideAEn": "Resort",
    "sideBEn": "Wintry"
  },
  {
    "id": "def-07",
    "sideA": "Рекламируемое",
    "sideB": "Секретное",
    "sideAEn": "Advertised",
    "sideBEn": "Secret"
  },
  {
    "id": "def-08",
    "sideA": "Прыгучее",
    "sideB": "Тяжёлое",
    "sideAEn": "Bouncy",
    "sideBEn": "Heavy"
  },
  {
    "id": "def-09",
    "sideA": "Нательное",
    "sideB": "Уличное",
    "sideAEn": "Wearable",
    "sideBEn": "Street"
  },
  {
    "id": "def-10",
    "sideA": "Медицинское",
    "sideB": "Праздничное",
    "sideAEn": "Medical",
    "sideBEn": "Festive"
  },
  {
    "id": "def-11",
    "sideA": "Растяжимое",
    "sideB": "Хрупкое",
    "sideAEn": "Stretchy",
    "sideBEn": "Fragile"
  },
  {
    "id": "def-12",
    "sideA": "Молодёжное",
    "sideB": "Старинное",
    "sideAEn": "Youthful",
    "sideBEn": "Antique"
  },
  {
    "id": "def-13",
    "sideA": "Проблемное",
    "sideB": "Приятное",
    "sideAEn": "Problematic",
    "sideBEn": "Pleasant"
  },
  {
    "id": "def-14",
    "sideA": "Блестящее",
    "sideB": "Тёмное",
    "sideAEn": "Shiny",
    "sideBEn": "Dark"
  },
  {
    "id": "def-15",
    "sideA": "Социальное",
    "sideB": "Личное",
    "sideAEn": "Social",
    "sideBEn": "Personal"
  },
  {
    "id": "def-16",
    "sideA": "Красное",
    "sideB": "Квадратное",
    "sideAEn": "Red",
    "sideBEn": "Square"
  },
  {
    "id": "def-17",
    "sideA": "Шумное",
    "sideB": "Тихое",
    "sideAEn": "Noisy",
    "sideBEn": "Quiet"
  },
  {
    "id": "def-18",
    "sideA": "Мокрое",
    "sideB": "Сыпучее",
    "sideAEn": "Wet",
    "sideBEn": "Powdery"
  },
  {
    "id": "def-19",
    "sideA": "Колючее",
    "sideB": "Пушистое",
    "sideAEn": "Prickly",
    "sideBEn": "Fluffy"
  },
  {
    "id": "def-20",
    "sideA": "Липкое",
    "sideB": "Скользкое",
    "sideAEn": "Sticky",
    "sideBEn": "Slippery"
  },
  {
    "id": "def-21",
    "sideA": "Древнее",
    "sideB": "Цифровое",
    "sideAEn": "Ancient",
    "sideBEn": "Digital"
  },
  {
    "id": "def-22",
    "sideA": "Вкусное",
    "sideB": "Опасное",
    "sideAEn": "Tasty",
    "sideBEn": "Dangerous"
  },
  {
    "id": "def-23",
    "sideA": "Страшное",
    "sideB": "Смешное",
    "sideAEn": "Scary",
    "sideBEn": "Funny"
  },
  {
    "id": "def-24",
    "sideA": "Круглое",
    "sideB": "Длинное",
    "sideAEn": "Round",
    "sideBEn": "Long"
  },
  {
    "id": "def-25",
    "sideA": "Зелёное",
    "sideB": "Золотое",
    "sideAEn": "Green",
    "sideBEn": "Golden"
  },
  {
    "id": "def-26",
    "sideA": "Быстрое",
    "sideB": "Сонное",
    "sideAEn": "Fast",
    "sideBEn": "Sleepy"
  },
  {
    "id": "def-27",
    "sideA": "Горячее",
    "sideB": "Ледяное",
    "sideAEn": "Hot",
    "sideBEn": "Icy"
  },
  {
    "id": "def-28",
    "sideA": "Звонкое",
    "sideB": "Шелестящее",
    "sideAEn": "Ringing",
    "sideBEn": "Rustling"
  },
  {
    "id": "def-29",
    "sideA": "Яркое",
    "sideB": "Прозрачное",
    "sideAEn": "Bright",
    "sideBEn": "Transparent"
  },
  {
    "id": "def-30",
    "sideA": "Полезное",
    "sideB": "Вредное",
    "sideAEn": "Healthy",
    "sideBEn": "Harmful"
  },
  {
    "id": "def-31",
    "sideA": "Детское",
    "sideB": "Деловое",
    "sideAEn": "Childish",
    "sideBEn": "Business"
  },
  {
    "id": "def-32",
    "sideA": "Сказочное",
    "sideB": "Научное",
    "sideAEn": "Fairy-tale",
    "sideBEn": "Scientific"
  },
  {
    "id": "def-33",
    "sideA": "Спортивное",
    "sideB": "Диванное",
    "sideAEn": "Sporty",
    "sideBEn": "Couch-potato"
  },
  {
    "id": "def-34",
    "sideA": "Музыкальное",
    "sideB": "Кухонное",
    "sideAEn": "Musical",
    "sideBEn": "Kitchen"
  },
  {
    "id": "def-35",
    "sideA": "Съедобное",
    "sideB": "Ядовитое",
    "sideAEn": "Edible",
    "sideBEn": "Poisonous"
  },
  {
    "id": "def-36",
    "sideA": "Бумажное",
    "sideB": "Каменное",
    "sideAEn": "Paper",
    "sideBEn": "Stone"
  },
  {
    "id": "def-37",
    "sideA": "Деревянное",
    "sideB": "Пластиковое",
    "sideAEn": "Wooden",
    "sideBEn": "Plastic"
  },
  {
    "id": "def-38",
    "sideA": "Стеклянное",
    "sideB": "Резиновое",
    "sideAEn": "Glass",
    "sideBEn": "Rubber"
  },
  {
    "id": "def-39",
    "sideA": "Космическое",
    "sideB": "Подземное",
    "sideAEn": "Cosmic",
    "sideBEn": "Underground"
  },
  {
    "id": "def-40",
    "sideA": "Морское",
    "sideB": "Лесное",
    "sideAEn": "Marine",
    "sideBEn": "Forest"
  },
  {
    "id": "def-41",
    "sideA": "Городское",
    "sideB": "Деревенское",
    "sideAEn": "Urban",
    "sideBEn": "Rural"
  },
  {
    "id": "def-42",
    "sideA": "Летнее",
    "sideB": "Осеннее",
    "sideAEn": "Summer",
    "sideBEn": "Autumn"
  },
  {
    "id": "def-43",
    "sideA": "Утреннее",
    "sideB": "Ночное",
    "sideAEn": "Morning",
    "sideBEn": "Nocturnal"
  },
  {
    "id": "def-44",
    "sideA": "Романтичное",
    "sideB": "Военное",
    "sideAEn": "Romantic",
    "sideBEn": "Military"
  },
  {
    "id": "def-45",
    "sideA": "Уютное",
    "sideB": "Экстремальное",
    "sideAEn": "Cozy",
    "sideBEn": "Extreme"
  },
  {
    "id": "def-46",
    "sideA": "Скучное",
    "sideB": "Загадочное",
    "sideAEn": "Boring",
    "sideBEn": "Mysterious"
  },
  {
    "id": "def-47",
    "sideA": "Драгоценное",
    "sideB": "Одноразовое",
    "sideAEn": "Precious",
    "sideBEn": "Disposable"
  },
  {
    "id": "def-48",
    "sideA": "Огромное",
    "sideB": "Крошечное",
    "sideAEn": "Huge",
    "sideBEn": "Tiny"
  },
  {
    "id": "def-49",
    "sideA": "Плоское",
    "sideB": "Объёмное",
    "sideAEn": "Flat",
    "sideBEn": "Bulky"
  },
  {
    "id": "def-50",
    "sideA": "Полосатое",
    "sideB": "Пятнистое",
    "sideAEn": "Striped",
    "sideBEn": "Spotted"
  },
  {
    "id": "def-51",
    "sideA": "Ароматное",
    "sideB": "Едкое",
    "sideAEn": "Fragrant",
    "sideBEn": "Pungent"
  },
  {
    "id": "def-52",
    "sideA": "Кислое",
    "sideB": "Солёное",
    "sideAEn": "Sour",
    "sideBEn": "Salty"
  },
  {
    "id": "def-53",
    "sideA": "Горькое",
    "sideB": "Нежное",
    "sideAEn": "Bitter",
    "sideBEn": "Tender"
  },
  {
    "id": "def-54",
    "sideA": "Хрустящее",
    "sideB": "Жидкое",
    "sideAEn": "Crunchy",
    "sideBEn": "Liquid"
  },
  {
    "id": "def-55",
    "sideA": "Твёрдое",
    "sideB": "Тающее",
    "sideAEn": "Solid",
    "sideBEn": "Melting"
  },
  {
    "id": "def-56",
    "sideA": "Электрическое",
    "sideB": "Ручное",
    "sideAEn": "Electric",
    "sideBEn": "Manual"
  },
  {
    "id": "def-57",
    "sideA": "Механическое",
    "sideB": "Волшебное",
    "sideAEn": "Mechanical",
    "sideBEn": "Magical"
  },
  {
    "id": "def-58",
    "sideA": "Карманное",
    "sideB": "Настольное",
    "sideAEn": "Pocket-sized",
    "sideBEn": "Tabletop"
  },
  {
    "id": "def-59",
    "sideA": "Пляжное",
    "sideB": "Походное",
    "sideAEn": "Beach",
    "sideBEn": "Camping"
  },
  {
    "id": "def-60",
    "sideA": "Школьное",
    "sideB": "Офисное",
    "sideAEn": "School",
    "sideBEn": "Office"
  },
  {
    "id": "def-61",
    "sideA": "Театральное",
    "sideB": "Цирковое",
    "sideAEn": "Theatrical",
    "sideBEn": "Circus"
  },
  {
    "id": "def-62",
    "sideA": "Музейное",
    "sideB": "Массовое",
    "sideAEn": "Museum",
    "sideBEn": "Mainstream"
  },
  {
    "id": "def-63",
    "sideA": "Историческое",
    "sideB": "Будущее",
    "sideAEn": "Historical",
    "sideBEn": "Futuristic"
  },
  {
    "id": "def-64",
    "sideA": "Модное",
    "sideB": "Забытое",
    "sideAEn": "Trendy",
    "sideBEn": "Forgotten"
  },
  {
    "id": "def-65",
    "sideA": "Запретное",
    "sideB": "Официальное",
    "sideAEn": "Forbidden",
    "sideBEn": "Official"
  },
  {
    "id": "def-66",
    "sideA": "Экзотическое",
    "sideB": "Привычное",
    "sideAEn": "Exotic",
    "sideBEn": "Familiar"
  },
  {
    "id": "def-67",
    "sideA": "Редкое",
    "sideB": "Повседневное",
    "sideAEn": "Rare",
    "sideBEn": "Everyday"
  },
  {
    "id": "def-68",
    "sideA": "Творческое",
    "sideB": "Логическое",
    "sideAEn": "Creative",
    "sideBEn": "Logical"
  },
  {
    "id": "def-69",
    "sideA": "Эмоциональное",
    "sideB": "Спокойное",
    "sideAEn": "Emotional",
    "sideBEn": "Calm"
  },
  {
    "id": "def-70",
    "sideA": "Бодрое",
    "sideB": "Ленивое",
    "sideAEn": "Energetic",
    "sideBEn": "Lazy"
  },
  {
    "id": "def-71",
    "sideA": "Грубое",
    "sideB": "Вежливое",
    "sideAEn": "Rough",
    "sideBEn": "Polite"
  },
  {
    "id": "def-72",
    "sideA": "Хитрое",
    "sideB": "Честное",
    "sideAEn": "Clever",
    "sideBEn": "Honest"
  },
  {
    "id": "def-73",
    "sideA": "Капризное",
    "sideB": "Надёжное",
    "sideAEn": "Fickle",
    "sideBEn": "Reliable"
  },
  {
    "id": "def-74",
    "sideA": "Храброе",
    "sideB": "Пугливое",
    "sideAEn": "Brave",
    "sideBEn": "Timid"
  },
  {
    "id": "def-75",
    "sideA": "Заразное",
    "sideB": "Целебное",
    "sideAEn": "Contagious",
    "sideBEn": "Healing"
  },
  {
    "id": "def-76",
    "sideA": "Реальное",
    "sideB": "Выдуманное",
    "sideAEn": "Real",
    "sideBEn": "Fictional"
  },
  {
    "id": "def-77",
    "sideA": "Светящееся",
    "sideB": "Дымящееся",
    "sideAEn": "Glowing",
    "sideBEn": "Smoking"
  },
  {
    "id": "def-78",
    "sideA": "Вращающееся",
    "sideB": "Неподвижное",
    "sideAEn": "Spinning",
    "sideBEn": "Still"
  },
  {
    "id": "def-79",
    "sideA": "Летающее",
    "sideB": "Плавающее",
    "sideAEn": "Flying",
    "sideBEn": "Floating"
  },
  {
    "id": "def-80",
    "sideA": "Ползучее",
    "sideB": "Бегущее",
    "sideAEn": "Crawling",
    "sideBEn": "Running"
  },
  {
    "id": "def-81",
    "sideA": "Растущее",
    "sideB": "Горючее",
    "sideAEn": "Growing",
    "sideBEn": "Flammable"
  },
  {
    "id": "def-82",
    "sideA": "Магнитное",
    "sideB": "Пустое",
    "sideAEn": "Magnetic",
    "sideBEn": "Hollow"
  },
  {
    "id": "def-83",
    "sideA": "Семейное",
    "sideB": "Одиночное",
    "sideAEn": "Family",
    "sideBEn": "Solo"
  },
  {
    "id": "def-84",
    "sideA": "Дружеское",
    "sideB": "Государственное",
    "sideAEn": "Friendly",
    "sideBEn": "National"
  },
  {
    "id": "def-85",
    "sideA": "Срочное",
    "sideB": "Вечное",
    "sideAEn": "Urgent",
    "sideBEn": "Eternal"
  }
];

  var BASE_TASK_CARDS = [
  {
    "id": "task-01",
    "sideA": [
      "Крем",
      "Горизонт",
      "Жаба",
      "Торт",
      "Кастрюля"
    ],
    "sideB": [
      "Сахар",
      "Паста",
      "Фольга",
      "Бык",
      "Карате"
    ],
    "sideAEn": [
      "Cream",
      "Horizon",
      "Toad",
      "Cake",
      "Pot"
    ],
    "sideBEn": [
      "Sugar",
      "Pasta",
      "Foil",
      "Bull",
      "Karate"
    ]
  },
  {
    "id": "task-02",
    "sideA": [
      "Кактус",
      "Плед",
      "Ракета",
      "Сыр",
      "Будильник"
    ],
    "sideB": [
      "Зонт",
      "Пингвин",
      "Пароль",
      "Шоколад",
      "Якорь"
    ],
    "sideAEn": [
      "Cactus",
      "Blanket",
      "Rocket",
      "Cheese",
      "Alarm Clock"
    ],
    "sideBEn": [
      "Umbrella",
      "Penguin",
      "Password",
      "Chocolate",
      "Anchor"
    ]
  },
  {
    "id": "task-03",
    "sideA": [
      "Компас",
      "Мёд",
      "Вулкан",
      "Подушка",
      "Трамвай"
    ],
    "sideB": [
      "Скрипка",
      "Снежинка",
      "Чемодан",
      "Лимон",
      "Дракон"
    ],
    "sideAEn": [
      "Compass",
      "Honey",
      "Volcano",
      "Pillow",
      "Tram"
    ],
    "sideBEn": [
      "Violin",
      "Snowflake",
      "Suitcase",
      "Lemon",
      "Dragon"
    ]
  },
  {
    "id": "task-04",
    "sideA": [
      "Маяк",
      "Мыло",
      "Кофе",
      "Паутина",
      "Корона"
    ],
    "sideB": [
      "Батут",
      "Чеснок",
      "Тень",
      "Гитара",
      "Одеяло"
    ],
    "sideAEn": [
      "Lighthouse",
      "Soap",
      "Coffee",
      "Cobweb",
      "Crown"
    ],
    "sideBEn": [
      "Trampoline",
      "Garlic",
      "Shadow",
      "Guitar",
      "Duvet"
    ]
  },
  {
    "id": "task-05",
    "sideA": [
      "Фонарик",
      "Осьминог",
      "Пицца",
      "Зеркало",
      "Парашют"
    ],
    "sideB": [
      "Карандаш",
      "Облако",
      "Пельмень",
      "Рыцарь",
      "Светофор"
    ],
    "sideAEn": [
      "Flashlight",
      "Octopus",
      "Pizza",
      "Mirror",
      "Parachute"
    ],
    "sideBEn": [
      "Pencil",
      "Cloud",
      "Dumpling",
      "Knight",
      "Traffic Light"
    ]
  },
  {
    "id": "task-06",
    "sideA": [
      "Чайник",
      "Пчела",
      "Паспорт",
      "Мороженое",
      "Мост"
    ],
    "sideB": [
      "Гамак",
      "Молния",
      "Барабан",
      "Ключ",
      "Арбуз"
    ],
    "sideAEn": [
      "Kettle",
      "Bee",
      "Passport",
      "Ice Cream",
      "Bridge"
    ],
    "sideBEn": [
      "Hammock",
      "Lightning",
      "Drum",
      "Key",
      "Watermelon"
    ]
  },
  {
    "id": "task-07",
    "sideA": [
      "Батарейка",
      "Ковёр",
      "Акула",
      "Зефир",
      "Бинокль"
    ],
    "sideB": [
      "Свеча",
      "Верблюд",
      "Ножницы",
      "Туман",
      "Билет"
    ],
    "sideAEn": [
      "Battery",
      "Carpet",
      "Shark",
      "Marshmallow",
      "Binoculars"
    ],
    "sideBEn": [
      "Candle",
      "Camel",
      "Scissors",
      "Fog",
      "Ticket"
    ]
  },
  {
    "id": "task-08",
    "sideA": [
      "Лифт",
      "Клубника",
      "Сова",
      "Шарф",
      "Магнит"
    ],
    "sideB": [
      "Термос",
      "Медуза",
      "Диван",
      "Ураган",
      "Шахматы"
    ],
    "sideAEn": [
      "Elevator",
      "Strawberry",
      "Owl",
      "Scarf",
      "Magnet"
    ],
    "sideBEn": [
      "Thermos",
      "Jellyfish",
      "Sofa",
      "Hurricane",
      "Chess"
    ]
  },
  {
    "id": "task-09",
    "sideA": [
      "Холодильник",
      "Бабочка",
      "Гвоздь",
      "Борщ",
      "Радуга"
    ],
    "sideB": [
      "Велосипед",
      "Гриб",
      "Сейф",
      "Попкорн",
      "Призрак"
    ],
    "sideAEn": [
      "Fridge",
      "Butterfly",
      "Nail",
      "Borscht",
      "Rainbow"
    ],
    "sideBEn": [
      "Bicycle",
      "Mushroom",
      "Safe",
      "Popcorn",
      "Ghost"
    ]
  },
  {
    "id": "task-10",
    "sideA": [
      "Микрофон",
      "Черепаха",
      "Перец",
      "Варежка",
      "Остров"
    ],
    "sideB": [
      "Робот",
      "Кокос",
      "Свисток",
      "Лабиринт",
      "Снег"
    ],
    "sideAEn": [
      "Microphone",
      "Turtle",
      "Pepper",
      "Mitten",
      "Island"
    ],
    "sideBEn": [
      "Robot",
      "Coconut",
      "Whistle",
      "Maze",
      "Snow"
    ]
  },
  {
    "id": "task-11",
    "sideA": [
      "Скейтборд",
      "Ёжик",
      "Варенье",
      "Колокол",
      "Спутник"
    ],
    "sideB": [
      "Блендер",
      "Павлин",
      "Спичка",
      "Суп",
      "Пирамида"
    ],
    "sideAEn": [
      "Skateboard",
      "Hedgehog",
      "Jam",
      "Bell",
      "Satellite"
    ],
    "sideBEn": [
      "Blender",
      "Peacock",
      "Matchstick",
      "Soup",
      "Pyramid"
    ]
  },
  {
    "id": "task-12",
    "sideA": [
      "Рюкзак",
      "Хамелеон",
      "Круассан",
      "Топор",
      "Эхо"
    ],
    "sideB": [
      "Пылесос",
      "Фламинго",
      "Огурец",
      "Медаль",
      "Водопад"
    ],
    "sideAEn": [
      "Backpack",
      "Chameleon",
      "Croissant",
      "Axe",
      "Echo"
    ],
    "sideBEn": [
      "Vacuum",
      "Flamingo",
      "Cucumber",
      "Medal",
      "Waterfall"
    ]
  },
  {
    "id": "task-13",
    "sideA": [
      "Коньки",
      "Краб",
      "Кетчуп",
      "Флаг",
      "Сон"
    ],
    "sideB": [
      "Тостер",
      "Слон",
      "Жвачка",
      "Замок",
      "Комета"
    ],
    "sideAEn": [
      "Ice Skates",
      "Crab",
      "Ketchup",
      "Flag",
      "Dream"
    ],
    "sideBEn": [
      "Toaster",
      "Elephant",
      "Chewing Gum",
      "Castle",
      "Comet"
    ]
  },
  {
    "id": "task-14",
    "sideA": [
      "Наушники",
      "Белка",
      "Блин",
      "Меч",
      "Пустыня"
    ],
    "sideB": [
      "Утюг",
      "Дельфин",
      "Морковь",
      "Маска",
      "Закат"
    ],
    "sideAEn": [
      "Headphones",
      "Squirrel",
      "Pancake",
      "Sword",
      "Desert"
    ],
    "sideBEn": [
      "Iron",
      "Dolphin",
      "Carrot",
      "Mask",
      "Sunset"
    ]
  },
  {
    "id": "task-15",
    "sideA": [
      "Термометр",
      "Кот",
      "Пряник",
      "Парус",
      "Фейерверк"
    ],
    "sideB": [
      "Калькулятор",
      "Тигр",
      "Сметана",
      "Ящик",
      "Гроза"
    ],
    "sideAEn": [
      "Thermometer",
      "Cat",
      "Gingerbread",
      "Sail",
      "Fireworks"
    ],
    "sideBEn": [
      "Calculator",
      "Tiger",
      "Sour Cream",
      "Crate",
      "Thunderstorm"
    ]
  },
  {
    "id": "task-16",
    "sideA": [
      "Гиря",
      "Попугай",
      "Мармелад",
      "Свитер",
      "Туннель"
    ],
    "sideB": [
      "Фен",
      "Волк",
      "Ананас",
      "Трон",
      "Роса"
    ],
    "sideAEn": [
      "Kettlebell",
      "Parrot",
      "Gummy",
      "Sweater",
      "Tunnel"
    ],
    "sideBEn": [
      "Hairdryer",
      "Wolf",
      "Pineapple",
      "Throne",
      "Dew"
    ]
  },
  {
    "id": "task-17",
    "sideA": [
      "Качели",
      "Муравей",
      "Омлет",
      "Плащ",
      "Вулкан"
    ],
    "sideB": [
      "Штопор",
      "Кенгуру",
      "Банан",
      "Щит",
      "Айсберг"
    ],
    "sideAEn": [
      "Swing",
      "Ant",
      "Omelette",
      "Cloak",
      "Volcano"
    ],
    "sideBEn": [
      "Corkscrew",
      "Kangaroo",
      "Banana",
      "Shield",
      "Iceberg"
    ]
  },
  {
    "id": "task-18",
    "sideA": [
      "Кассета",
      "Улитка",
      "Грецкий орех",
      "Шляпа",
      "Пляж"
    ],
    "sideB": [
      "Дрель",
      "Лиса",
      "Халва",
      "Кольцо",
      "Лес"
    ],
    "sideAEn": [
      "Cassette",
      "Snail",
      "Walnut",
      "Hat",
      "Beach"
    ],
    "sideBEn": [
      "Drill",
      "Fox",
      "Halva",
      "Ring",
      "Forest"
    ]
  },
  {
    "id": "task-19",
    "sideA": [
      "Самокат",
      "Панда",
      "Горчица",
      "Куртка",
      "Пещера"
    ],
    "sideB": [
      "Насос",
      "Крокодил",
      "Йогурт",
      "Браслет",
      "Болото"
    ],
    "sideAEn": [
      "Scooter",
      "Panda",
      "Mustard",
      "Jacket",
      "Cave"
    ],
    "sideBEn": [
      "Pump",
      "Crocodile",
      "Yogurt",
      "Bracelet",
      "Swamp"
    ]
  },
  {
    "id": "task-20",
    "sideA": [
      "Глобус",
      "Комар",
      "Печенье",
      "Сапог",
      "Океан"
    ],
    "sideB": [
      "Степлер",
      "Медведь",
      "Изюм",
      "Галстук",
      "Река"
    ],
    "sideAEn": [
      "Globe",
      "Mosquito",
      "Cookie",
      "Boot",
      "Ocean"
    ],
    "sideBEn": [
      "Stapler",
      "Bear",
      "Raisin",
      "Necktie",
      "River"
    ]
  },
  {
    "id": "task-21",
    "sideA": [
      "Телескоп",
      "Лягушка",
      "Сухарь",
      "Носок",
      "Гора"
    ],
    "sideB": [
      "Отвёртка",
      "Жираф",
      "Кефир",
      "Ремень",
      "Поле"
    ],
    "sideAEn": [
      "Telescope",
      "Frog",
      "Crouton",
      "Sock",
      "Mountain"
    ],
    "sideBEn": [
      "Screwdriver",
      "Giraffe",
      "Kefir",
      "Belt",
      "Field"
    ]
  },
  {
    "id": "task-22",
    "sideA": [
      "Микроскоп",
      "Воробей",
      "Пирожок",
      "Кепка",
      "Степь"
    ],
    "sideB": [
      "Молоток",
      "Зебра",
      "Творог",
      "Брошь",
      "Парк"
    ],
    "sideAEn": [
      "Microscope",
      "Sparrow",
      "Pie",
      "Cap",
      "Steppe"
    ],
    "sideBEn": [
      "Hammer",
      "Zebra",
      "Cottage Cheese",
      "Brooch",
      "Park"
    ]
  },
  {
    "id": "task-23",
    "sideA": [
      "Песочные часы",
      "Хомяк",
      "Пончик",
      "Тапок",
      "Сад"
    ],
    "sideB": [
      "Пила",
      "Страус",
      "Кисель",
      "Серьга",
      "Каньон"
    ],
    "sideAEn": [
      "Hourglass",
      "Hamster",
      "Donut",
      "Slipper",
      "Garden"
    ],
    "sideBEn": [
      "Saw",
      "Ostrich",
      "Berry Jelly",
      "Earring",
      "Canyon"
    ]
  },
  {
    "id": "task-24",
    "sideA": [
      "Секундомер",
      "Бобёр",
      "Вафля",
      "Халат",
      "Тайга"
    ],
    "sideB": [
      "Лопата",
      "Енот",
      "Компот",
      "Зеркальце",
      "Тундра"
    ],
    "sideAEn": [
      "Stopwatch",
      "Beaver",
      "Waffle",
      "Bathrobe",
      "Taiga"
    ],
    "sideBEn": [
      "Shovel",
      "Raccoon",
      "Compote",
      "Hand Mirror",
      "Tundra"
    ]
  },
  {
    "id": "task-25",
    "sideA": [
      "Диктофон",
      "Барсук",
      "Бублик",
      "Пижама",
      "Джунгли"
    ],
    "sideB": [
      "Грабли",
      "Выдра",
      "Квас",
      "Расчёска",
      "Саванна"
    ],
    "sideAEn": [
      "Recorder",
      "Badger",
      "Bagel",
      "Pajamas",
      "Jungle"
    ],
    "sideBEn": [
      "Rake",
      "Otter",
      "Kvass",
      "Comb",
      "Savanna"
    ]
  },
  {
    "id": "task-26",
    "sideA": [
      "Проектор",
      "Сурок",
      "Кекс",
      "Фартук",
      "Оазис"
    ],
    "sideB": [
      "Лейка",
      "Лось",
      "Какао",
      "Зубная щётка",
      "Ледник"
    ],
    "sideAEn": [
      "Projector",
      "Marmot",
      "Muffin",
      "Apron",
      "Oasis"
    ],
    "sideBEn": [
      "Watering Can",
      "Moose",
      "Cocoa",
      "Toothbrush",
      "Glacier"
    ]
  },
  {
    "id": "task-27",
    "sideA": [
      "Принтер",
      "Олень",
      "Чизкейк",
      "Жилет",
      "Гейзер"
    ],
    "sideB": [
      "Ведро",
      "Кабан",
      "Лимонад",
      "Полотенце",
      "Фьорд"
    ],
    "sideAEn": [
      "Printer",
      "Deer",
      "Cheesecake",
      "Vest",
      "Geyser"
    ],
    "sideBEn": [
      "Bucket",
      "Boar",
      "Lemonade",
      "Towel",
      "Fjord"
    ]
  },
  {
    "id": "task-28",
    "sideA": [
      "Сканер",
      "Рысь",
      "Тирамису",
      "Комбинезон",
      "Атолл"
    ],
    "sideB": [
      "Метла",
      "Заяц",
      "Смузи",
      "Губка",
      "Кратер"
    ],
    "sideAEn": [
      "Scanner",
      "Lynx",
      "Tiramisu",
      "Overalls",
      "Atoll"
    ],
    "sideBEn": [
      "Broom",
      "Hare",
      "Smoothie",
      "Sponge",
      "Crater"
    ]
  },
  {
    "id": "task-29",
    "sideA": [
      "Клавиатура",
      "Куница",
      "Эклер",
      "Кардиган",
      "Лагуна"
    ],
    "sideB": [
      "Швабра",
      "Крот",
      "Глинтвейн",
      "Мочалка",
      "Дельта"
    ],
    "sideAEn": [
      "Keyboard",
      "Marten",
      "Eclair",
      "Cardigan",
      "Lagoon"
    ],
    "sideBEn": [
      "Mop",
      "Mole",
      "Mulled Wine",
      "Loofah",
      "River Delta"
    ]
  },
  {
    "id": "task-30",
    "sideA": [
      "Джойстик",
      "Суслик",
      "Безе",
      "Пальто",
      "Бухта"
    ],
    "sideB": [
      "Таз",
      "Мышь",
      "Эспрессо",
      "Шампунь",
      "Мыс"
    ],
    "sideAEn": [
      "Joystick",
      "Gopher",
      "Meringue",
      "Coat",
      "Bay"
    ],
    "sideBEn": [
      "Basin",
      "Mouse",
      "Espresso",
      "Shampoo",
      "Cape"
    ]
  },
  {
    "id": "task-31",
    "sideA": [
      "Флешка",
      "Коала",
      "Хлеб",
      "Джинсы",
      "Шторм"
    ],
    "sideB": [
      "Корзина",
      "Ленивец",
      "Лапша",
      "Духи",
      "Бриз"
    ],
    "sideAEn": [
      "USB Drive",
      "Koala",
      "Bread",
      "Jeans",
      "Storm"
    ],
    "sideBEn": [
      "Basket",
      "Sloth",
      "Noodles",
      "Perfume",
      "Breeze"
    ]
  },
  {
    "id": "task-32",
    "sideA": [
      "Роутер",
      "Сурикат",
      "Плов",
      "Пиджак",
      "Смерч"
    ],
    "sideB": [
      "Чайная ложка",
      "Броненосец",
      "Салат",
      "Помада",
      "Иней"
    ],
    "sideAEn": [
      "Router",
      "Meerkat",
      "Pilaf",
      "Blazer",
      "Tornado"
    ],
    "sideBEn": [
      "Teaspoon",
      "Armadillo",
      "Salad",
      "Lipstick",
      "Frost"
    ]
  },
  {
    "id": "task-33",
    "sideA": [
      "Антенна",
      "Утконос",
      "Окрошка",
      "Юбка",
      "Град"
    ],
    "sideB": [
      "Вилка",
      "Лама",
      "Рагу",
      "Пудра",
      "Оттепель"
    ],
    "sideAEn": [
      "Antenna",
      "Platypus",
      "Cold Soup",
      "Skirt",
      "Hail"
    ],
    "sideBEn": [
      "Fork",
      "Llama",
      "Stew",
      "Powder",
      "Thaw"
    ]
  },
  {
    "id": "task-34",
    "sideA": [
      "Светильник",
      "Морж",
      "Шашлык",
      "Рубашка",
      "Засуха"
    ],
    "sideB": [
      "Половник",
      "Тюлень",
      "Котлета",
      "Лак",
      "Прилив"
    ],
    "sideAEn": [
      "Lamp",
      "Walrus",
      "Barbecue",
      "Shirt",
      "Drought"
    ],
    "sideBEn": [
      "Ladle",
      "Seal",
      "Cutlet",
      "Nail Polish",
      "High Tide"
    ]
  },
  {
    "id": "task-35",
    "sideA": [
      "Люстра",
      "Кит",
      "Стейк",
      "Футболка",
      "Полнолуние"
    ],
    "sideB": [
      "Сковорода",
      "Касатка",
      "Блины",
      "Крем-брюле",
      "Затмение"
    ],
    "sideAEn": [
      "Chandelier",
      "Whale",
      "Steak",
      "T-shirt",
      "Full Moon"
    ],
    "sideBEn": [
      "Frying Pan",
      "Orca",
      "Crepes",
      "Creme Brulee",
      "Eclipse"
    ]
  },
  {
    "id": "task-36",
    "sideA": [
      "Торшер",
      "Скат",
      "Роллы",
      "Шорты",
      "Рассвет"
    ],
    "sideB": [
      "Дуршлаг",
      "Кальмар",
      "Лазанья",
      "Гель",
      "Сумерки"
    ],
    "sideAEn": [
      "Floor Lamp",
      "Stingray",
      "Sushi Rolls",
      "Shorts",
      "Dawn"
    ],
    "sideBEn": [
      "Colander",
      "Squid",
      "Lasagna",
      "Gel",
      "Twilight"
    ]
  },
  {
    "id": "task-37",
    "sideA": [
      "Камин",
      "Креветка",
      "Тако",
      "Кроссовки",
      "Мираж"
    ],
    "sideB": [
      "Тёрка",
      "Устрица",
      "Бургер",
      "Бальзам",
      "Северное сияние"
    ],
    "sideAEn": [
      "Fireplace",
      "Shrimp",
      "Taco",
      "Sneakers",
      "Mirage"
    ],
    "sideBEn": [
      "Grater",
      "Oyster",
      "Burger",
      "Balm",
      "Aurora"
    ]
  },
  {
    "id": "task-38",
    "sideA": [
      "Батарея",
      "Морская звезда",
      "Хот-дог",
      "Кеды",
      "Штиль"
    ],
    "sideB": [
      "Скалка",
      "Омар",
      "Сэндвич",
      "Лосьон",
      "Муссон"
    ],
    "sideAEn": [
      "Radiator",
      "Starfish",
      "Hot Dog",
      "Canvas Shoes",
      "Calm Sea"
    ],
    "sideBEn": [
      "Rolling Pin",
      "Lobster",
      "Sandwich",
      "Lotion",
      "Monsoon"
    ]
  },
  {
    "id": "task-39",
    "sideA": [
      "Вентилятор",
      "Конёк",
      "Наггетсы",
      "Туфли",
      "Метель"
    ],
    "sideB": [
      "Шумовка",
      "Сардина",
      "Хачапури",
      "Скраб",
      "Лавина"
    ],
    "sideAEn": [
      "Fan",
      "Seahorse",
      "Nuggets",
      "Dress Shoes",
      "Blizzard"
    ],
    "sideBEn": [
      "Skimmer",
      "Sardine",
      "Cheese Bread",
      "Scrub",
      "Avalanche"
    ]
  },
  {
    "id": "task-40",
    "sideA": [
      "Кондиционер",
      "Форель",
      "Чебурек",
      "Ботинки",
      "Землетрясение"
    ],
    "sideB": [
      "Венчик",
      "Щука",
      "Хинкали",
      "Пенка",
      "Цунами"
    ],
    "sideAEn": [
      "Air Conditioner",
      "Trout",
      "Pastie",
      "Boots",
      "Earthquake"
    ],
    "sideBEn": [
      "Whisk",
      "Pike",
      "Khinkali",
      "Foam",
      "Tsunami"
    ]
  },
  {
    "id": "task-41",
    "sideA": [
      "Гармонь",
      "Чайка",
      "Мандарин",
      "Ракетка",
      "Карнавал"
    ],
    "sideB": [
      "Флейта",
      "Аист",
      "Гранат",
      "Шайба",
      "Аукцион"
    ],
    "sideAEn": [
      "Accordion",
      "Seagull",
      "Tangerine",
      "Racket",
      "Carnival"
    ],
    "sideBEn": [
      "Flute",
      "Stork",
      "Pomegranate",
      "Hockey Puck",
      "Auction"
    ]
  },
  {
    "id": "task-42",
    "sideA": [
      "Саксофон",
      "Голубь",
      "Вишня",
      "Мяч",
      "Экскурсия"
    ],
    "sideB": [
      "Арфа",
      "Ворона",
      "Персик",
      "Штанга",
      "Ярмарка"
    ],
    "sideAEn": [
      "Saxophone",
      "Pigeon",
      "Cherry",
      "Ball",
      "Guided Tour"
    ],
    "sideBEn": [
      "Harp",
      "Crow",
      "Peach",
      "Barbell",
      "Fair"
    ]
  },
  {
    "id": "task-43",
    "sideA": [
      "Пианино",
      "Дятел",
      "Слива",
      "Скакалка",
      "Концерт"
    ],
    "sideB": [
      "Труба",
      "Ласточка",
      "Абрикос",
      "Обруч",
      "Парад"
    ],
    "sideAEn": [
      "Piano",
      "Woodpecker",
      "Plum",
      "Jump Rope",
      "Concert"
    ],
    "sideBEn": [
      "Trumpet",
      "Swallow",
      "Apricot",
      "Hula Hoop",
      "Parade"
    ]
  },
  {
    "id": "task-44",
    "sideA": [
      "Балалайка",
      "Синица",
      "Груша",
      "Лыжи",
      "Фестиваль"
    ],
    "sideB": [
      "Виолончель",
      "Снегирь",
      "Яблоко",
      "Ласты",
      "Пикник"
    ],
    "sideAEn": [
      "Balalaika",
      "Blue Tit",
      "Pear",
      "Skis",
      "Festival"
    ],
    "sideBEn": [
      "Cello",
      "Bullfinch",
      "Apple",
      "Flippers",
      "Picnic"
    ]
  },
  {
    "id": "task-45",
    "sideA": [
      "Бубен",
      "Скворец",
      "Виноград",
      "Шлем",
      "Марафон"
    ],
    "sideB": [
      "Ксилофон",
      "Лебедь",
      "Малина",
      "Боксёрская перчатка",
      "Репетиция"
    ],
    "sideAEn": [
      "Tambourine",
      "Starling",
      "Grapes",
      "Helmet",
      "Marathon"
    ],
    "sideBEn": [
      "Xylophone",
      "Swan",
      "Raspberry",
      "Boxing Glove",
      "Rehearsal"
    ]
  },
  {
    "id": "task-46",
    "sideA": [
      "Аккордеон",
      "Утка",
      "Черника",
      "Клюшка",
      "Свадьба"
    ],
    "sideB": [
      "Маракасы",
      "Пеликан",
      "Ежевика",
      "Сноуборд",
      "Выпускной"
    ],
    "sideAEn": [
      "Concertina",
      "Duck",
      "Blueberry",
      "Hockey Stick",
      "Wedding"
    ],
    "sideBEn": [
      "Maracas",
      "Pelican",
      "Blackberry",
      "Snowboard",
      "Prom"
    ]
  },
  {
    "id": "task-47",
    "sideA": [
      "Трамплин",
      "Гусь",
      "Клюква",
      "Сёрф",
      "Юбилей"
    ],
    "sideB": [
      "Колокольчик",
      "Индюк",
      "Смородина",
      "Байдарка",
      "Премьера"
    ],
    "sideAEn": [
      "Springboard",
      "Goose",
      "Cranberry",
      "Surfboard",
      "Anniversary"
    ],
    "sideBEn": [
      "Handbell",
      "Turkey",
      "Currant",
      "Kayak",
      "Premiere"
    ]
  },
  {
    "id": "task-48",
    "sideA": [
      "Матрёшка",
      "Петух",
      "Крыжовник",
      "Стрела",
      "Командировка"
    ],
    "sideB": [
      "Юла",
      "Цыплёнок",
      "Инжир",
      "Мишень",
      "Отпуск"
    ],
    "sideAEn": [
      "Nesting Doll",
      "Rooster",
      "Gooseberry",
      "Arrow",
      "Business Trip"
    ],
    "sideBEn": [
      "Spinning Top",
      "Chick",
      "Fig",
      "Target",
      "Vacation"
    ]
  },
  {
    "id": "task-49",
    "sideA": [
      "Конструктор",
      "Конь",
      "Финик",
      "Трофей",
      "Экзамен"
    ],
    "sideB": [
      "Пазл",
      "Овца",
      "Хурма",
      "Свисток судьи",
      "Собеседование"
    ],
    "sideAEn": [
      "Building Blocks",
      "Horse",
      "Date Fruit",
      "Trophy",
      "Exam"
    ],
    "sideBEn": [
      "Jigsaw Puzzle",
      "Sheep",
      "Persimmon",
      "Referee Whistle",
      "Job Interview"
    ]
  },
  {
    "id": "task-50",
    "sideA": [
      "Кубик Рубика",
      "Коза",
      "Киви",
      "Пьедестал",
      "Дежурство"
    ],
    "sideB": [
      "Домино",
      "Корова",
      "Манго",
      "Медальон",
      "Субботник"
    ],
    "sideAEn": [
      "Rubik's Cube",
      "Goat",
      "Kiwi",
      "Podium",
      "Night Shift"
    ],
    "sideBEn": [
      "Dominoes",
      "Cow",
      "Mango",
      "Locket",
      "Clean-up Day"
    ]
  },
  {
    "id": "task-51",
    "sideA": [
      "Воздушный шар",
      "Вертолёт",
      "Марка",
      "Книга",
      "Цирк"
    ],
    "sideB": [
      "Дирижабль",
      "Поезд",
      "Конверт",
      "Газета",
      "Театр"
    ],
    "sideAEn": [
      "Hot Air Balloon",
      "Helicopter",
      "Stamp",
      "Book",
      "Circus"
    ],
    "sideBEn": [
      "Airship",
      "Train",
      "Envelope",
      "Newspaper",
      "Theater"
    ]
  },
  {
    "id": "task-52",
    "sideA": [
      "Подводная лодка",
      "Автобус",
      "Печать",
      "Комикс",
      "Кинотеатр"
    ],
    "sideB": [
      "Яхта",
      "Троллейбус",
      "Открытка",
      "Словарь",
      "Музей"
    ],
    "sideAEn": [
      "Submarine",
      "Bus",
      "Wax Seal",
      "Comic Book",
      "Cinema"
    ],
    "sideBEn": [
      "Yacht",
      "Trolleybus",
      "Postcard",
      "Dictionary",
      "Museum"
    ]
  },
  {
    "id": "task-53",
    "sideA": [
      "Ледокол",
      "Метро",
      "Чек",
      "Дневник",
      "Библиотека"
    ],
    "sideB": [
      "Катер",
      "Такси",
      "Визитка",
      "Атлас",
      "Обсерватория"
    ],
    "sideAEn": [
      "Icebreaker",
      "Subway",
      "Receipt",
      "Diary",
      "Library"
    ],
    "sideBEn": [
      "Speedboat",
      "Taxi",
      "Business Card",
      "Atlas",
      "Observatory"
    ]
  },
  {
    "id": "task-54",
    "sideA": [
      "Паровоз",
      "Мотоцикл",
      "Монета",
      "Энциклопедия",
      "Зоопарк"
    ],
    "sideB": [
      "Трактор",
      "Фуникулёр",
      "Купюра",
      "Блокнот",
      "Ботанический сад"
    ],
    "sideAEn": [
      "Locomotive",
      "Motorcycle",
      "Coin",
      "Encyclopedia",
      "Zoo"
    ],
    "sideBEn": [
      "Tractor",
      "Funicular",
      "Banknote",
      "Notebook",
      "Botanical Garden"
    ]
  },
  {
    "id": "task-55",
    "sideA": [
      "Экскаватор",
      "Карета",
      "Жетон",
      "Календарь",
      "Аквариум"
    ],
    "sideB": [
      "Бульдозер",
      "Сани",
      "Купон",
      "Закладка",
      "Планетарий"
    ],
    "sideAEn": [
      "Excavator",
      "Carriage",
      "Token",
      "Calendar",
      "Aquarium"
    ],
    "sideBEn": [
      "Bulldozer",
      "Sleigh",
      "Coupon",
      "Bookmark",
      "Planetarium"
    ]
  },
  {
    "id": "task-56",
    "sideA": [
      "Пожарная машина",
      "Лодка",
      "Квитанция",
      "Альбом",
      "Вокзал"
    ],
    "sideB": [
      "Скорая помощь",
      "Плот",
      "Справка",
      "Тетрадь",
      "Аэропорт"
    ],
    "sideAEn": [
      "Fire Truck",
      "Rowboat",
      "Invoice",
      "Photo Album",
      "Train Station"
    ],
    "sideBEn": [
      "Ambulance",
      "Raft",
      "Certificate",
      "Exercise Book",
      "Airport"
    ]
  },
  {
    "id": "task-57",
    "sideA": [
      "Космонавт",
      "Пират",
      "Сфинкс",
      "Сокровище",
      "Секрет"
    ],
    "sideB": [
      "Детектив",
      "Ниндзя",
      "Единорог",
      "Карта",
      "Загадка"
    ],
    "sideAEn": [
      "Astronaut",
      "Pirate",
      "Sphinx",
      "Treasure",
      "Secret"
    ],
    "sideBEn": [
      "Detective",
      "Ninja",
      "Unicorn",
      "Map",
      "Riddle"
    ]
  },
  {
    "id": "task-58",
    "sideA": [
      "Фокусник",
      "Викинг",
      "Феникс",
      "Компас",
      "Слух"
    ],
    "sideB": [
      "Археолог",
      "Ковбой",
      "Кентавр",
      "Телеграмма",
      "Комплимент"
    ],
    "sideAEn": [
      "Magician",
      "Viking",
      "Phoenix",
      "Compass",
      "Rumor"
    ],
    "sideBEn": [
      "Archaeologist",
      "Cowboy",
      "Centaur",
      "Telegram",
      "Compliment"
    ]
  },
  {
    "id": "task-59",
    "sideA": [
      "Повар",
      "Самурай",
      "Русалка",
      "Рецепт",
      "Шутка"
    ],
    "sideB": [
      "Художник",
      "Астроном",
      "Грифон",
      "Черновик",
      "Мечта"
    ],
    "sideAEn": [
      "Chef",
      "Samurai",
      "Mermaid",
      "Recipe",
      "Joke"
    ],
    "sideBEn": [
      "Painter",
      "Astronomer",
      "Griffin",
      "Rough Draft",
      "Wish"
    ]
  },
  {
    "id": "task-60",
    "sideA": [
      "Дирижёр",
      "Капитан",
      "Домовой",
      "Автограф",
      "Воспоминание"
    ],
    "sideB": [
      "Садовник",
      "Алхимик",
      "Джинн",
      "Памятник",
      "Сюрприз"
    ],
    "sideAEn": [
      "Conductor",
      "Captain",
      "House Spirit",
      "Autograph",
      "Memory"
    ],
    "sideBEn": [
      "Gardener",
      "Alchemist",
      "Genie",
      "Monument",
      "Surprise"
    ]
  }
];

  var COOP_TALK_TABLE = {
  "2": [
    {
      "rank": 1,
      "title": "Печально... Может, в другой раз получится?",
      "minScore": 0,
      "maxScore": 21
    },
    {
      "rank": 2,
      "title": "Могло быть хуже! Попробуем ещё?",
      "minScore": 22,
      "maxScore": 28
    },
    {
      "rank": 3,
      "title": "Недурно, но есть к чему стремиться!",
      "minScore": 29,
      "maxScore": 36
    },
    {
      "rank": 4,
      "title": "Отличный результат!",
      "minScore": 37,
      "maxScore": 43
    },
    {
      "rank": 5,
      "title": "Ого! Вы что, телепаты?!",
      "minScore": 44,
      "maxScore": null
    }
  ],
  "3": [
    {
      "rank": 1,
      "title": "Печально... Может, в другой раз получится?",
      "minScore": 0,
      "maxScore": 16
    },
    {
      "rank": 2,
      "title": "Могло быть хуже! Попробуем ещё?",
      "minScore": 17,
      "maxScore": 21
    },
    {
      "rank": 3,
      "title": "Недурно, но есть к чему стремиться!",
      "minScore": 22,
      "maxScore": 27
    },
    {
      "rank": 4,
      "title": "Отличный результат!",
      "minScore": 28,
      "maxScore": 32
    },
    {
      "rank": 5,
      "title": "Ого! Вы что, телепаты?!",
      "minScore": 33,
      "maxScore": null
    }
  ],
  "4": [
    {
      "rank": 1,
      "title": "Печально... Может, в другой раз получится?",
      "minScore": 0,
      "maxScore": 21
    },
    {
      "rank": 2,
      "title": "Могло быть хуже! Попробуем ещё?",
      "minScore": 22,
      "maxScore": 28
    },
    {
      "rank": 3,
      "title": "Недурно, но есть к чему стремиться!",
      "minScore": 29,
      "maxScore": 36
    },
    {
      "rank": 4,
      "title": "Отличный результат!",
      "minScore": 37,
      "maxScore": 43
    },
    {
      "rank": 5,
      "title": "Ого! Вы что, телепаты?!",
      "minScore": 44,
      "maxScore": null
    }
  ],
  "5": [
    {
      "rank": 1,
      "title": "Печально... Может, в другой раз получится?",
      "minScore": 0,
      "maxScore": 13
    },
    {
      "rank": 2,
      "title": "Могло быть хуже! Попробуем ещё?",
      "minScore": 14,
      "maxScore": 18
    },
    {
      "rank": 3,
      "title": "Недурно, но есть к чему стремиться!",
      "minScore": 19,
      "maxScore": 22
    },
    {
      "rank": 4,
      "title": "Отличный результат!",
      "minScore": 23,
      "maxScore": 27
    },
    {
      "rank": 5,
      "title": "Ого! Вы что, телепаты?!",
      "minScore": 28,
      "maxScore": null
    }
  ],
  "6": [
    {
      "rank": 1,
      "title": "Печально... Может, в другой раз получится?",
      "minScore": 0,
      "maxScore": 16
    },
    {
      "rank": 2,
      "title": "Могло быть хуже! Попробуем ещё?",
      "minScore": 17,
      "maxScore": 21
    },
    {
      "rank": 3,
      "title": "Недурно, но есть к чему стремиться!",
      "minScore": 22,
      "maxScore": 27
    },
    {
      "rank": 4,
      "title": "Отличный результат!",
      "minScore": 28,
      "maxScore": 32
    },
    {
      "rank": 5,
      "title": "Ого! Вы что, телепаты?!",
      "minScore": 33,
      "maxScore": null
    }
  ],
  "7": [
    {
      "rank": 1,
      "title": "Печально... Может, в другой раз получится?",
      "minScore": 0,
      "maxScore": 18
    },
    {
      "rank": 2,
      "title": "Могло быть хуже! Попробуем ещё?",
      "minScore": 19,
      "maxScore": 25
    },
    {
      "rank": 3,
      "title": "Недурно, но есть к чему стремиться!",
      "minScore": 26,
      "maxScore": 31
    },
    {
      "rank": 4,
      "title": "Отличный результат!",
      "minScore": 32,
      "maxScore": 37
    },
    {
      "rank": 5,
      "title": "Ого! Вы что, телепаты?!",
      "minScore": 38,
      "maxScore": null
    }
  ],
  "8": [
    {
      "rank": 1,
      "title": "Печально... Может, в другой раз получится?",
      "minScore": 0,
      "maxScore": 21
    },
    {
      "rank": 2,
      "title": "Могло быть хуже! Попробуем ещё?",
      "minScore": 22,
      "maxScore": 28
    },
    {
      "rank": 3,
      "title": "Недурно, но есть к чему стремиться!",
      "minScore": 29,
      "maxScore": 36
    },
    {
      "rank": 4,
      "title": "Отличный результат!",
      "minScore": 37,
      "maxScore": 43
    },
    {
      "rank": 5,
      "title": "Ого! Вы что, телепаты?!",
      "minScore": 44,
      "maxScore": null
    }
  ]
};

  var COOP_MIND_TABLE = {
  "2": [
    {
      "rank": 1,
      "title": "Печально... Может, в другой раз получится?",
      "minScore": 0,
      "maxScore": 7
    },
    {
      "rank": 2,
      "title": "Могло быть хуже! Попробуем ещё?",
      "minScore": 8,
      "maxScore": 9
    },
    {
      "rank": 3,
      "title": "Недурно, но есть к чему стремиться!",
      "minScore": 10,
      "maxScore": 12
    },
    {
      "rank": 4,
      "title": "Отличный результат!",
      "minScore": 13,
      "maxScore": 14
    },
    {
      "rank": 5,
      "title": "Ого! Вы что, телепаты?!",
      "minScore": 15,
      "maxScore": null
    }
  ],
  "3": [
    {
      "rank": 1,
      "title": "Печально... Может, в другой раз получится?",
      "minScore": 0,
      "maxScore": 8
    },
    {
      "rank": 2,
      "title": "Могло быть хуже! Попробуем ещё?",
      "minScore": 9,
      "maxScore": 10
    },
    {
      "rank": 3,
      "title": "Недурно, но есть к чему стремиться!",
      "minScore": 11,
      "maxScore": 13
    },
    {
      "rank": 4,
      "title": "Отличный результат!",
      "minScore": 14,
      "maxScore": 16
    },
    {
      "rank": 5,
      "title": "Ого! Вы что, телепаты?!",
      "minScore": 17,
      "maxScore": null
    }
  ],
  "4": [
    {
      "rank": 1,
      "title": "Печально... Может, в другой раз получится?",
      "minScore": 0,
      "maxScore": 21
    },
    {
      "rank": 2,
      "title": "Могло быть хуже! Попробуем ещё?",
      "minScore": 22,
      "maxScore": 28
    },
    {
      "rank": 3,
      "title": "Недурно, но есть к чему стремиться!",
      "minScore": 29,
      "maxScore": 36
    },
    {
      "rank": 4,
      "title": "Отличный результат!",
      "minScore": 37,
      "maxScore": 43
    },
    {
      "rank": 5,
      "title": "Ого! Вы что, телепаты?!",
      "minScore": 44,
      "maxScore": null
    }
  ],
  "5": [
    {
      "rank": 1,
      "title": "Печально... Может, в другой раз получится?",
      "minScore": 0,
      "maxScore": 22
    },
    {
      "rank": 2,
      "title": "Могло быть хуже! Попробуем ещё?",
      "minScore": 23,
      "maxScore": 30
    },
    {
      "rank": 3,
      "title": "Недурно, но есть к чему стремиться!",
      "minScore": 31,
      "maxScore": 37
    },
    {
      "rank": 4,
      "title": "Отличный результат!",
      "minScore": 38,
      "maxScore": 45
    },
    {
      "rank": 5,
      "title": "Ого! Вы что, телепаты?!",
      "minScore": 46,
      "maxScore": null
    }
  ],
  "6": [
    {
      "rank": 1,
      "title": "Печально... Может, в другой раз получится?",
      "minScore": 0,
      "maxScore": 40
    },
    {
      "rank": 2,
      "title": "Могло быть хуже! Попробуем ещё?",
      "minScore": 41,
      "maxScore": 54
    },
    {
      "rank": 3,
      "title": "Недурно, но есть к чему стремиться!",
      "minScore": 55,
      "maxScore": 67
    },
    {
      "rank": 4,
      "title": "Отличный результат!",
      "minScore": 68,
      "maxScore": 81
    },
    {
      "rank": 5,
      "title": "Ого! Вы что, телепаты?!",
      "minScore": 82,
      "maxScore": null
    }
  ],
  "7": [
    {
      "rank": 1,
      "title": "Печально... Может, в другой раз получится?",
      "minScore": 0,
      "maxScore": 66
    },
    {
      "rank": 2,
      "title": "Могло быть хуже! Попробуем ещё?",
      "minScore": 67,
      "maxScore": 88
    },
    {
      "rank": 3,
      "title": "Недурно, но есть к чему стремиться!",
      "minScore": 89,
      "maxScore": 110
    },
    {
      "rank": 4,
      "title": "Отличный результат!",
      "minScore": 111,
      "maxScore": 132
    },
    {
      "rank": 5,
      "title": "Ого! Вы что, телепаты?!",
      "minScore": 133,
      "maxScore": null
    }
  ],
  "8": [
    {
      "rank": 1,
      "title": "Печально... Может, в другой раз получится?",
      "minScore": 0,
      "maxScore": 100
    },
    {
      "rank": 2,
      "title": "Могло быть хуже! Попробуем ещё?",
      "minScore": 101,
      "maxScore": 134
    },
    {
      "rank": 3,
      "title": "Недурно, но есть к чему стремиться!",
      "minScore": 135,
      "maxScore": 168
    },
    {
      "rank": 4,
      "title": "Отличный результат!",
      "minScore": 169,
      "maxScore": 201
    },
    {
      "rank": 5,
      "title": "Ого! Вы что, телепаты?!",
      "minScore": 202,
      "maxScore": null
    }
  ]
};

  var PLAYER_COLORS = [
  {
    "id": "magenta",
    "hex": "#D9387E",
    "label": "Малиновый"
  },
  {
    "id": "cobalt",
    "hex": "#2563EB",
    "label": "Синий"
  },
  {
    "id": "emerald",
    "hex": "#059669",
    "label": "Зелёный"
  },
  {
    "id": "amber",
    "hex": "#D97706",
    "label": "Янтарный"
  },
  {
    "id": "violet",
    "hex": "#7C3AED",
    "label": "Фиолетовый"
  },
  {
    "id": "crimson",
    "hex": "#DC2626",
    "label": "Красный"
  },
  {
    "id": "teal",
    "hex": "#0D9488",
    "label": "Бирюзовый"
  },
  {
    "id": "slate",
    "hex": "#475569",
    "label": "Графитовый"
  }
];

  var PLURAL_FORMS = {
    ru: {
      round: ["раунд", "раунда", "раундов"],
      turn: ["ход", "хода", "ходов"],
      player: ["игрок", "игрока", "игроков"],
      point: ["очко", "очка", "очков"],
      card: ["карта", "карты", "карт"],
      side: ["сторона", "стороны", "сторон"],
      word: ["слово", "слова", "слов"]
    },
    en: {
      round: ["round", "rounds", "rounds"],
      turn: ["turn", "turns", "turns"],
      player: ["player", "players", "players"],
      point: ["point", "points", "points"],
      card: ["card", "cards", "cards"],
      side: ["side", "sides", "sides"],
      word: ["word", "words", "words"]
    }
  };

  function pluralize(count, key, language) {
    var lang = language === "en" ? "en" : "ru";
    var n = Math.abs(Math.trunc(Number(count) || 0));
    var forms = PLURAL_FORMS[lang][key];
    if (!forms) return "";
    if (lang === "en") {
      return n === 1 ? forms[0] : forms[1];
    }
    var mod10 = n % 10;
    var mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return forms[0];
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms[1];
    return forms[2];
  }

  var TRANSLATIONS = {
    "ru": {
      "brand": "Тёплое с мягким",
      "rulesBtn": "Правила",
      "backToGameBtn": "В игру",
      "soundOn": "Звук вкл.",
      "soundOff": "Звук выкл.",
      "sideLabel": "Сторона",
      "sideA": "А",
      "sideB": "Б",
      "round": "Раунд",
      "turn": "Ход",
      "presenter": "Ведущий",
      "teamScore": "Счёт команды",
      "exitModalTitle": "Выйти из игры?",
      "exitModalBody": "Вы вернётесь на экран настройки партии. Вы можете просто вернуться в меню или сбросить текущий прогресс и начать заново.",
      "exitToMenu": "Выйти в меню",
      "exitAndReset": "Сбросить и выйти",
      "stayInGame": "Остаться в игре",
      "installAppBtn": "Установить на устройство",
      "installIOSBtn": "Установить на iPhone / iPad",
      "iosInstallTitle": "Установка на iPhone / iPad",
      "iosInstallStep1": "Нажмите кнопку «Поделиться» в нижней панели Safari.",
      "iosInstallStep2": "Пролистайте вниз и выберите «На экран «Домой»».",
      "iosInstallStep3": "Нажмите «Добавить» — приложение будет работать полностью офлайн.",
      "closeBtn": "Понятно",
      "offlineReadyText": "Офлайн-режим · Работает автономно",
      "modes": {
        "competitive": {
          "title": "Соревновательный",
          "playersHint": "3–8 игроков",
          "summary": "Каждый сам за себя. Ошибочные жетоны убираются, а нижние сдвигаются вверх на больший бонус."
        },
        "coop_talk": {
          "title": "Давай поговорим!",
          "playersHint": "2–8 игроков · Кооператив",
          "summary": "После объяснения команда вслух обсуждает и расставляет все 5 слов от самого вероятного к наименее вероятному."
        },
        "coop_mind": {
          "title": "Сила мысли!",
          "playersHint": "2–8 игроков · Кооператив",
          "summary": "Игроки голосуют молча и самостоятельно. Ошибки не сдвигают жетоны; верные ответы идут в общую копилку."
        }
      },
      "setupTitle": "Настройка партии",
      "continueTurn": "К текущему ходу",
      "startGame": "Начать партию",
      "startNewGameBtn": "Начать новую партию",
      "activeGameLockHint": "Идёт активная партия — имена и цвета можно менять, а для смены режима или состава сбросьте партию.",
      "resetMatchBtn": "Сбросить партию",
      "gameModeHeading": "Режим игры",
      "playersHeading": "Игроки",
      "addPlayer": "Добавить",
      "playerPlaceholder": "Игрок",
      "colorTip": "Нажмите на цветной номер, чтобы сменить цвет игрока",
      "yellowBoardBonuses": "Бонусы жёлтого поля",
      "blueBoardBonuses": "Бонусы синего поля: 6 · 4 · 2 · 1 · 0",
      "flipSideBtn": "Сторона",
      "otherCardBtn": "Другая карта",
      "secretTokenTitle": "Секретный жетон ведущего",
      "secretTokenHintPrefix": "Только для игрока",
      "drawRandomBtn": "Вытянуть случайный номер",
      "youExplainLabel": "Вы объясняете слово",
      "tokenFaceDownTitle": "Жетон лежит лицом вниз",
      "hideWordBtn": "Скрыть слово",
      "peekWordBtn": "Подсмотреть",
      "redrawBtn": "Перетянуть",
      "manualPickToggleShow": "Выбрать номер вручную (если тянули физический жетон)",
      "manualPickToggleHide": "Скрыть ручной выбор",
      "secretPickedBadge": "Загадано",
      "goToBoardBtn": "Перейти к планшету объяснений",
      "hideShort": "Скрыть",
      "boardTitle": "Планшет для объяснений",
      "lockedLabel": "Зафиксировано",
      "centeredLabel": "В центре",
      "rowLabel": "Ряд",
      "distributePrompt": "Распределите 6 дисков (нельзя оставить в центре)",
      "lockRowPrefix": "Зафиксировать ряд",
      "lockRowSuffix": "и перейти дальше",
      "lockLastRow": "Зафиксировать 5-й ряд и завершить",
      "undoLastRowBtn": "Отменить последний ряд",
      "all5Filled": "Все 5 прорезей заполнены",
      "peekPresenterWord": "Подсмотреть слово ведущего",
      "hidePresenterWord": "Скрыть слово ведущего",
      "goToScoringBtn": "Перейти к подсчёту очков",
      "backToTaskBtn": "К карточке задания",
      "backToBoardBtn": "К планшету",
      "revealSecretTitle": "Слово ведущего",
      "revealSecretBtn": "Открыть загаданное слово",
      "secretNotChosen": "Ведущий ещё не выбрал номер слова (вы можете открыть карточку задания или просто начислить очки вручную).",
      "scoringRulesTitle": "Правила подсчёта очков",
      "compRule1": "Откройте жетон ведущего и проверьте жетоны игроков на жёлтом поле сверху вниз.",
      "compRule2": "Ошибочный жетон убирается с поля, а все жетоны ниже сдвигаются вверх на клетку с большим бонусом.",
      "compRule3": "Верный ответ приносит очки той клетки, на которой оказался жетон после сдвига.",
      "compRule4": "Ведущий получает +1 очко за каждого угадавшего. Если угадали все — ещё +1 бонусное очко. Если не угадал никто — ведущий теряет 1 очко (но не ниже 0).",
      "coopTalkRule1": "Обсудите вслух и разложите 5 жетонов на синем поле от самого вероятного к наименее вероятному (6 · 4 · 2 · 1 · 0).",
      "coopTalkRule2": "Откройте слово ведущего: команда получает очки той клетки, где лежит совпавший номер.",
      "coopTalkRule3": "За роль ведущего отдельные очки не начисляются — всё идёт в общий счёт команды.",
      "coopMindRule1": "Откройте все жетоны на жёлтом поле. Ошибочные жетоны НЕ убираются и остальные НЕ сдвигаются.",
      "coopMindRule2": "Сложите очки всех верных ответов в общий счёт команды.",
      "coopMindRule3": "Ведущий в этом режиме не получает бонусов и не теряет очки.",
      "scoreTableTitle": "Таблица очков",
      "thisTurnCol": "За этот ход",
      "totalCol": "Всего",
      "teamPanelTitle": "Очки команды",
      "currentRankLabel": "Текущий ранг по таблице правил",
      "turnCompleteHintFlipPrefix": "В следующем ходе карточки определений и задания автоматически перевернутся на сторону",
      "turnCompleteHintDraw": "Обе стороны карт сыграны — в следующем ходе раздадутся новые 10 определений и новая карточка задания.",
      "turnCompleteHintFinal": "Это был заключительный ход партии.",
      "nextTurnBtn": "Следующий ход",
      "finishGameBtn": "Показать итоги игры",
      "confirmNextTurnUnrevealed": "Загаданное слово ещё не открыто. Завершить ход без открытия?",
      "confirmNextTurnNoPoints": "За этот ход не начислено ни одного очка. Завершить ход?",
      "confirmNextTurnBoth": "Слово не открыто и очки за ход не начислены. Точно завершить ход?",
      "confirmNextTurnBtn": "Да, завершить ход",
      "cancelBtn": "Отмена",
      "historyTitle": "История ходов",
      "resetTurnDeltasBtn": "Обнулить ход",
      "gameFinishedBadge": "Партия завершена",
      "winnerPrefix": "Победитель —",
      "tiePrefix": "Ничья:",
      "andWord": "и",
      "leaderResultPrefix": "Итоговый результат лидера:",
      "teamScoredPrefix": "Команда набрала",
      "playAgainBtn": "Сыграть ещё раз",
      "changeSettingsBtn": "Изменить настройки",
      "finalTableTitle": "Итоговая таблица",
      "coopResultTitle": "Оценка результата",
      "rulesPageTitle": "Правила и колоды",
      "tabRules": "Памятка правил",
      "tabTables": "Таблицы коопа",
      "tabDecks": "Свои карты",
      "rulesSec1Title": "1. Четыре фазы хода",
      "rulesSec1Items": [
        {
          "label": "Подготовка:",
          "text": "На планшете выложены 10 случайных карточек определений (5 пар) и 1 карточка задания (5 слов). Ведущий тайно вытягивает номер от 1 до 5."
        },
        {
          "label": "Объяснение:",
          "text": "Ведущий последовательно сверху вниз распределяет 6 дисков в каждой прорези между левым и правым определением. Оставить диски в центре или вернуться к пропущенному ряду нельзя. Комментировать вслух запрещено."
        },
        {
          "label": "Голосование:",
          "text": "Остальные игроки выкладывают свои физические жетоны с номером слова лицом вниз на верхнюю свободную клетку с наибольшим бонусом — не обязательно ждать конца объяснения."
        },
        {
          "label": "Подсчёт и смена хода:",
          "text": "Жетоны открываются сверху вниз. После хода те же карточки переворачиваются на сторону Б, а через ход заменяются на новые."
        }
      ],
      "rulesSec2Title": "2. Подсчёт очков и «Задняя мысль»",
      "rulesSec2Items": [
        {
          "label": "Сдвиг в соревновательном режиме:",
          "text": "Если игрок ошибся, его жетон убирается с поля, а все жетоны ниже сдвигаются вверх на освободившуюся клетку с большим бонусом."
        },
        {
          "label": "Жетон «Задняя мысль»:",
          "text": "Есть 1 раз за всю партию у каждого игрока. Позволяет проголосовать второй раз в том же ходе, если на поле осталась хотя бы 1 свободная клетка."
        },
        {
          "label": "Очки ведущего:",
          "text": "+1 очко за каждого угадавшего игрока. Если угадали все — дополнительно +1 бонусное очко. Если не угадал никто — ведущий теряет 1 очко (но не ниже 0)."
        },
        {
          "label": "Длительность партии:",
          "text": "2 игрока (кооп) — 4 раунда; 3–4 игрока — 2 раунда; 5–8 игроков — 1 раунд."
        }
      ],
      "rulesSec3Title": "3. Кооперативные режимы (2–8 игроков)",
      "rulesCoopTalkTitle": "«Давай поговорим!»",
      "rulesCoopTalkDesc": "Используется синяя сторона поля (6, 4, 2, 1, 0) без «Задней мысли». После объяснения игроки вслух обсуждают догадки и выстраивают все 5 слов от самого вероятного к наименее вероятному. Команда получает очки той клетки, где оказалось слово ведущего.",
      "rulesCoopMindTitle": "«Сила мысли!»",
      "rulesCoopMindDesc": "Игроки голосуют молча на жёлтом поле, как в соревновательном режиме (с «Задней мыслью»). При проверке ошибочные жетоны не убираются и остальные не сдвигаются. Очки всех верных ответов складываются в общий счёт команды; ведущий не получает ни бонусов, ни штрафов.",
      "tableTalkTitle": "Таблица оценок · «Давай поговорим!»",
      "tableMindTitle": "Таблица оценок · «Сила мысли!»",
      "tableResultCol": "Результат",
      "tablePlayersShort": "игр.",
      "defDeckCardTitle": "Карточек определений",
      "taskDeckCardTitle": "Карточек заданий",
      "customWord": "своих",
      "addDefTitle": "Добавить карточку определений",
      "addDefDesc": "Двусторонняя карточка с двумя прилагательными",
      "sideAInput": "Сторона А",
      "sideBInput": "Сторона Б",
      "defPlaceholderA": "Например: Пушистое",
      "defPlaceholderB": "Например: Электронное",
      "addDefBtn": "Добавить в колоду определений",
      "addTaskTitle": "Добавить карточку задания",
      "addTaskDesc": "По 5 слов на сторону А и сторону Б",
      "wordPlaceholder": "Слово",
      "addTaskBtn": "Добавить в колоду заданий",
      "defSavedToast": "Карточка определений добавлена в колоду",
      "taskSavedToast": "Карточка задания добавлена в колоду",
      "coopRanks": [
        "Печально... Может, в другой раз получится?",
        "Могло быть хуже! Попробуем ещё?",
        "Недурно, но есть к чему стремиться!",
        "Отличный результат!",
        "Ого! Вы что, телепаты?!"
      ],
      "reinstallTitle": "Переустановка программы",
      "reinstallDesc": "Очистит кэш только этого приложения и загрузит свежую версию. Сохранения, очки и свои карты останутся.",
      "reinstallOfflineHint": "Нет подключения к интернету — переустановка доступна только онлайн, чтобы не потерять офлайн-копию.",
      "reinstallBtn": "Переустановить программу",
      "reinstallConfirmBtn": "Подтвердить переустановку",
      "reinstallCancelBtn": "Отмена",
      "reinstallProgress": "Переустановка..."
    },
    "en": {
      "brand": "Warm & Soft",
      "rulesBtn": "Rules",
      "backToGameBtn": "Back to Game",
      "soundOn": "Sound On",
      "soundOff": "Sound Off",
      "sideLabel": "Side",
      "sideA": "A",
      "sideB": "B",
      "round": "Round",
      "turn": "Turn",
      "presenter": "Presenter",
      "teamScore": "Team Score",
      "exitModalTitle": "Exit current game?",
      "exitModalBody": "You will return to the game setup screen. You can simply go back to the menu or reset all current progress.",
      "exitToMenu": "Go to Menu",
      "exitAndReset": "Reset & Exit",
      "stayInGame": "Stay in Game",
      "installAppBtn": "Install App",
      "installIOSBtn": "Install on iPhone / iPad",
      "iosInstallTitle": "Install on iPhone / iPad",
      "iosInstallStep1": "Tap the Share button in the Safari toolbar.",
      "iosInstallStep2": "Scroll down and tap \"Add to Home Screen\".",
      "iosInstallStep3": "Tap \"Add\" — the app works completely offline.",
      "closeBtn": "Got it",
      "offlineReadyText": "Offline Mode · Working locally",
      "modes": {
        "competitive": {
          "title": "Competitive",
          "playersHint": "3–8 players",
          "summary": "Every player for themselves. Wrong tokens are removed and lower tokens shift up to higher bonus slots."
        },
        "coop_talk": {
          "title": "Let's Talk!",
          "playersHint": "2–8 players · Co-op",
          "summary": "After the explanation, the team discusses aloud and ranks all 5 words from most likely to least likely."
        },
        "coop_mind": {
          "title": "Power of Thought!",
          "playersHint": "2–8 players · Co-op",
          "summary": "Players vote silently and independently. Wrong tokens do not shift; all correct answers add to the team score."
        }
      },
      "setupTitle": "Game Setup",
      "continueTurn": "Resume Turn",
      "startGame": "Start Game",
      "startNewGameBtn": "Start New Game",
      "activeGameLockHint": "Match in progress — names and colors stay editable; reset the match to change mode or player count.",
      "resetMatchBtn": "Reset Match",
      "gameModeHeading": "Game Mode",
      "playersHeading": "Players",
      "addPlayer": "Add Player",
      "playerPlaceholder": "Player",
      "colorTip": "Tap the colored number to change player token color",
      "yellowBoardBonuses": "Yellow board bonuses",
      "blueBoardBonuses": "Blue board bonuses: 6 · 4 · 2 · 1 · 0",
      "flipSideBtn": "Side",
      "otherCardBtn": "Draw New Card",
      "secretTokenTitle": "Presenter Secret Token",
      "secretTokenHintPrefix": "Only for",
      "drawRandomBtn": "Draw Random Number",
      "youExplainLabel": "You are explaining word",
      "tokenFaceDownTitle": "Token is face-down",
      "hideWordBtn": "Hide Word",
      "peekWordBtn": "Peek Secret",
      "redrawBtn": "Redraw",
      "manualPickToggleShow": "Pick number manually (if using physical tokens)",
      "manualPickToggleHide": "Hide manual picker",
      "secretPickedBadge": "Secret",
      "goToBoardBtn": "Go to Explanation Board",
      "hideShort": "Hide",
      "boardTitle": "Explanation Board",
      "lockedLabel": "Locked",
      "centeredLabel": "Centered",
      "rowLabel": "Row",
      "distributePrompt": "Distribute all 6 discs (cannot leave in center)",
      "lockRowPrefix": "Lock Row",
      "lockRowSuffix": "& Continue",
      "lockLastRow": "Lock Row 5 & Finish",
      "undoLastRowBtn": "Undo Last Row",
      "all5Filled": "All 5 slots completed",
      "peekPresenterWord": "Peek Presenter Word",
      "hidePresenterWord": "Hide Presenter Word",
      "goToScoringBtn": "Go to Scoring",
      "backToTaskBtn": "Back to Task Card",
      "backToBoardBtn": "Back to Board",
      "revealSecretTitle": "Presenter Secret Word",
      "revealSecretBtn": "Reveal Secret Word",
      "secretNotChosen": "No secret number was drawn in the app (you can pick one on the Task Card or simply enter points below).",
      "scoringRulesTitle": "Scoring Rules",
      "compRule1": "Reveal the presenter token and check player tokens on the yellow board from top to bottom.",
      "compRule2": "Each wrong token is removed and all tokens below it shift UP into higher bonus slots.",
      "compRule3": "Correct answers score the bonus value of the slot they occupy after shifting.",
      "compRule4": "Presenter scores +1 per correct guesser. If everyone guesses right, +1 extra bonus. If nobody guesses right, presenter loses 1 point (min 0).",
      "coopTalkRule1": "Discuss aloud and place all 5 tokens on the blue board from most likely to least likely (6 · 4 · 2 · 1 · 0).",
      "coopTalkRule2": "Reveal the presenter word: the team scores the points of the slot matching that number.",
      "coopTalkRule3": "No separate points for the presenter — everything goes to the shared team score.",
      "coopMindRule1": "Reveal all tokens on the yellow board. Wrong tokens are NOT removed and tokens do NOT shift.",
      "coopMindRule2": "Add the bonus points of all correct answers to the shared team score.",
      "coopMindRule3": "The presenter receives no bonuses or penalties in this mode.",
      "scoreTableTitle": "Scoreboard",
      "thisTurnCol": "This Turn",
      "totalCol": "Total",
      "teamPanelTitle": "Team Score",
      "currentRankLabel": "Current rank on official chart",
      "turnCompleteHintFlipPrefix": "On the next turn, definition and task cards will automatically flip to Side",
      "turnCompleteHintDraw": "Both sides played — on the next turn, 10 fresh definitions and a new task card will be dealt.",
      "turnCompleteHintFinal": "This was the final turn of the match.",
      "nextTurnBtn": "Next Turn",
      "finishGameBtn": "Show Final Results",
      "confirmNextTurnUnrevealed": "The secret word has not been revealed yet. Finish this turn anyway?",
      "confirmNextTurnNoPoints": "No points were entered for this turn. Finish this turn anyway?",
      "confirmNextTurnBoth": "The secret word is still hidden and no points were entered. Finish this turn anyway?",
      "confirmNextTurnBtn": "Yes, Finish Turn",
      "cancelBtn": "Cancel",
      "historyTitle": "Turn History",
      "resetTurnDeltasBtn": "Clear Turn",
      "gameFinishedBadge": "Game Over",
      "winnerPrefix": "Winner —",
      "tiePrefix": "Tie:",
      "andWord": "&",
      "leaderResultPrefix": "Winning score:",
      "teamScoredPrefix": "The team scored",
      "playAgainBtn": "Play Again",
      "changeSettingsBtn": "Change Settings",
      "finalTableTitle": "Final Standings",
      "coopResultTitle": "Result Evaluation",
      "rulesPageTitle": "Rules & Decks",
      "tabRules": "Rules Guide",
      "tabTables": "Co-op Tables",
      "tabDecks": "Custom Cards",
      "rulesSec1Title": "1. Four Turn Phases",
      "rulesSec1Items": [
        {
          "label": "Setup:",
          "text": "Place 10 random definition cards (5 pairs) on the board and 1 task card (5 words). The presenter secretly draws a number from 1 to 5."
        },
        {
          "label": "Explanation:",
          "text": "Working strictly top-to-bottom, the presenter distributes all 6 discs in each slot between left and right definitions. Discs cannot stay in the center, and skipped rows cannot be revisited. No talking during the explanation."
        },
        {
          "label": "Voting:",
          "text": "Other players place their physical voting tokens face-down onto the highest available bonus slot on the table whenever they think they know the word."
        },
        {
          "label": "Scoring & Next Turn:",
          "text": "Tokens are revealed top-to-bottom. After the turn, cards flip to Side B; after Side B, they are discarded and fresh cards are drawn."
        }
      ],
      "rulesSec2Title": "2. Scoring & Second Thought",
      "rulesSec2Items": [
        {
          "label": "Competitive Shift:",
          "text": "If a player guessed wrong, their token is removed and all tokens below shift up to higher bonus spaces."
        },
        {
          "label": "Second Thought Token:",
          "text": "Each player has 1 per game. Discard it to vote a second time in the same turn if at least 1 bonus space is still free."
        },
        {
          "label": "Presenter Points:",
          "text": "+1 point per player who guessed correctly. +1 extra bonus if everyone guessed right. Lose 1 point if nobody guessed right (never below 0)."
        },
        {
          "label": "Game Length:",
          "text": "2 players (co-op) — 4 rounds; 3–4 players — 2 rounds; 5–8 players — 1 round."
        }
      ],
      "rulesSec3Title": "3. Cooperative Modes (2–8 Players)",
      "rulesCoopTalkTitle": "\"Let's Talk!\"",
      "rulesCoopTalkDesc": "Use the blue board (6, 4, 2, 1, 0) without Second Thought tokens. After the explanation, discuss aloud and rank all 5 words from most likely to least likely. The team scores the points of the slot matching the secret word.",
      "rulesCoopMindTitle": "\"Power of Thought!\"",
      "rulesCoopMindDesc": "Players vote silently on the yellow board (with Second Thought tokens). Wrong tokens are NOT removed and other tokens do NOT shift. All correct votes add to the team score; the presenter gets no bonus or penalty.",
      "tableTalkTitle": "Score Table · \"Let's Talk!\"",
      "tableMindTitle": "Score Table · \"Power of Thought!\"",
      "tableResultCol": "Rating",
      "tablePlayersShort": "pl.",
      "defDeckCardTitle": "Definition Cards",
      "taskDeckCardTitle": "Task Cards",
      "customWord": "custom",
      "addDefTitle": "Add Definition Card",
      "addDefDesc": "Double-sided card with two descriptive traits",
      "sideAInput": "Side A",
      "sideBInput": "Side B",
      "defPlaceholderA": "e.g. Fluffy",
      "defPlaceholderB": "e.g. Electronic",
      "addDefBtn": "Add to Definition Deck",
      "addTaskTitle": "Add Task Card",
      "addTaskDesc": "5 words for Side A and 5 words for Side B",
      "wordPlaceholder": "Word",
      "addTaskBtn": "Add to Task Deck",
      "defSavedToast": "Definition card added to deck",
      "taskSavedToast": "Task card added to deck",
      "coopRanks": [
        "Ouch... Better luck next time!",
        "Could be worse! Try again?",
        "Not bad, room to improve!",
        "Great result!",
        "Whoa! Are you telepaths?!"
      ],
      "reinstallTitle": "Reinstall App",
      "reinstallDesc": "Clears only this app's cache and reloads a fresh copy. Your saved game, scores, and custom cards will stay intact.",
      "reinstallOfflineHint": "No internet connection — reinstall is only available online so your offline copy is not lost.",
      "reinstallBtn": "Reinstall App",
      "reinstallConfirmBtn": "Confirm Reinstall",
      "reinstallCancelBtn": "Cancel",
      "reinstallProgress": "Reinstalling..."
    }
  };

  function getDefinitionText(card, side, language) {
    if (!card) return "";
    if (language === "en") {
      return side === "A" ? (card.sideAEn || card.sideA) : (card.sideBEn || card.sideB);
    }
    return side === "A" ? card.sideA : card.sideB;
  }

  function getTaskWords(card, side, language) {
    if (!card) return ["", "", "", "", ""];
    if (language === "en") {
      return side === "A" ? (card.sideAEn || card.sideA) : (card.sideBEn || card.sideB);
    }
    return side === "A" ? card.sideA : card.sideB;
  }

  function getRoundsForGame(mode, playerCount) {
    if (playerCount <= 2) {
      return mode === "competitive" ? 2 : 4;
    }
    if (playerCount <= 4) {
      return 2;
    }
    return 1;
  }

  function getYellowBoardBonuses(playerCount) {
    var base = [2, 1, 1, 1, 1];
    if (playerCount <= 3) return base;
    var extras = [];
    for (var p = playerCount; p >= 4; p--) {
      extras.push(p - 1);
    }
    return extras.concat(base);
  }

  function getCoopRank(mode, playerCount, score) {
    var clamped = Math.max(2, Math.min(8, playerCount));
    var table = mode === "coop_talk" ? COOP_TALK_TABLE[clamped] : COOP_MIND_TABLE[clamped];
    for (var i = 0; i < table.length; i++) {
      var tier = table[i];
      if (score >= tier.minScore && (tier.maxScore === null || score <= tier.maxScore)) {
        return tier;
      }
    }
    return table[table.length - 1];
  }

  function getTranslations(language) {
    return language === "en" ? TRANSLATIONS.en : TRANSLATIONS.ru;
  }

  global.TSM_DATA = {
    BASE_DEFINITION_CARDS: BASE_DEFINITION_CARDS,
    BASE_TASK_CARDS: BASE_TASK_CARDS,
    COOP_TALK_TABLE: COOP_TALK_TABLE,
    COOP_MIND_TABLE: COOP_MIND_TABLE,
    PLAYER_COLORS: PLAYER_COLORS,
    TRANSLATIONS: TRANSLATIONS,
    pluralize: pluralize,
    getDefinitionText: getDefinitionText,
    getTaskWords: getTaskWords,
    getRoundsForGame: getRoundsForGame,
    getYellowBoardBonuses: getYellowBoardBonuses,
    getCoopRank: getCoopRank,
    getTranslations: getTranslations
  };
})(window);
