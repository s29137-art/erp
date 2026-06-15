export interface AccountRow {
  name: string;
  commission: number; // % эквайринга
}
export interface ServiceRow {
  name: string;
  duration: number; // минуты
  price: number; // ₸
}
export interface CategoryRow {
  name: string;
  group: "Постоянные" | "Переменные" | "Капитальные" | "Доход";
}

export interface Template {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  modules: string[]; // сверх обязательного ядра
  accounts: AccountRow[];
  categories: CategoryRow[];
  services: ServiceRow[];
  stages: string[];
  positions: string[];
}

const BASE_ACCOUNTS: AccountRow[] = [
  { name: "Kaspi Pay", commission: 0.95 },
  { name: "Halyk Bank", commission: 0.5 },
  { name: "Наличные (касса)", commission: 0 },
];

const BASE_CATEGORIES: CategoryRow[] = [
  { name: "Выручка от продаж", group: "Доход" },
  { name: "Аренда", group: "Постоянные" },
  { name: "Зарплата", group: "Постоянные" },
  { name: "Коммунальные услуги", group: "Постоянные" },
  { name: "Закупка материалов", group: "Переменные" },
  { name: "Реклама", group: "Переменные" },
  { name: "Оборудование", group: "Капитальные" },
];

export const TEMPLATES: Template[] = [
  {
    id: "salon",
    name: "Салон / массаж / клиника",
    emoji: "💆‍♀️",
    desc: "Записи клиентов, мастера, KPI-бонусы, сертификаты",
    modules: ["b1", "b3", "b4", "b5", "b6", "b7", "b8", "b2", "s1", "s7", "s8"],
    accounts: BASE_ACCOUNTS,
    categories: [...BASE_CATEGORIES, { name: "Косметика и расходники", group: "Переменные" }],
    services: [
      { name: "Классический массаж 60 мин", duration: 60, price: 12000 },
      { name: "Лечебный массаж 90 мин", duration: 90, price: 18000 },
      { name: "Пилинг", duration: 30, price: 6000 },
    ],
    stages: [],
    positions: ["Массажист", "Администратор", "Управляющий"],
  },
  {
    id: "cafe",
    name: "Кафе / кулинария",
    emoji: "🍽️",
    desc: "Заказы, меню с рецептурами, склад продуктов, закупки",
    modules: ["b1", "b2", "b3", "b4", "b7", "b8", "s3", "s4"],
    accounts: BASE_ACCOUNTS,
    categories: [...BASE_CATEGORIES, { name: "Закупка продуктов", group: "Переменные" }],
    services: [],
    stages: [],
    positions: ["Повар", "Официант", "Администратор"],
  },
  {
    id: "hostel",
    name: "Хостел / аренда помещений",
    emoji: "🛏️",
    desc: "Бронирования номеров и залов, шахматка занятости",
    modules: ["b1", "b3", "b4", "s2"],
    accounts: BASE_ACCOUNTS,
    categories: BASE_CATEGORIES,
    services: [],
    stages: [],
    positions: ["Администратор", "Горничная"],
  },
  {
    id: "construction",
    name: "Стройка / ремонт / озеленение",
    emoji: "🏗️",
    desc: "Проекты, сметы, этапы работ, материалы, график",
    modules: ["b1", "b2", "b3", "b4", "b7", "b8", "s6"],
    accounts: BASE_ACCOUNTS,
    categories: [...BASE_CATEGORIES, { name: "Субподряд", group: "Переменные" }],
    services: [],
    stages: [
      "Проектирование",
      "Договор и предоплата",
      "Закупка материалов",
      "Выполнение работ",
      "Сдача объекта",
      "Финальный расчёт",
      "Гарантия",
    ],
    positions: ["Прораб", "Сметчик", "Менеджер проекта"],
  },
  {
    id: "retail",
    name: "Розница / торговля",
    emoji: "🏪",
    desc: "Товары, продажи, закупки, планы менеджеров",
    modules: ["b1", "b2", "b3", "b6", "b7", "b8", "s3"],
    accounts: BASE_ACCOUNTS,
    categories: [...BASE_CATEGORIES, { name: "Закупка товара", group: "Переменные" }],
    services: [],
    stages: [],
    positions: ["Продавец", "Менеджер", "Кладовщик"],
  },
  {
    id: "finance",
    name: "Только финучёт",
    emoji: "💼",
    desc: "Чистое финансовое ядро: ДДС, ОПиУ, календарь, долги",
    modules: [],
    accounts: BASE_ACCOUNTS,
    categories: BASE_CATEGORIES,
    services: [],
    stages: [],
    positions: [],
  },
];
