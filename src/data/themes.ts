export interface Theme {
  id: string;
  name: string;
  swatch: string; // цвет кружка в выборе темы
  sidebar: string; // фон сайдбара
  border: string; // разделители сайдбара
  text: string; // обычный текст меню
  muted: string; // подписи групп
  hover: string; // ховер пункта меню
  activeBg: string; // активный пункт
  header: string; // название компании
  accentBtn: string; // основная кнопка в системе
}

export const THEMES: Theme[] = [
  {
    id: "graphite",
    name: "Графит",
    swatch: "bg-slate-800",
    sidebar: "bg-slate-900",
    border: "border-slate-800",
    text: "text-slate-300",
    muted: "text-slate-500",
    hover: "hover:bg-slate-800",
    activeBg: "bg-blue-600 text-white",
    header: "text-white",
    accentBtn: "bg-blue-600 hover:bg-blue-700",
  },
  {
    id: "navy",
    name: "Синий",
    swatch: "bg-blue-900",
    sidebar: "bg-blue-950",
    border: "border-blue-900",
    text: "text-blue-200",
    muted: "text-blue-400/60",
    hover: "hover:bg-blue-900",
    activeBg: "bg-blue-500 text-white",
    header: "text-white",
    accentBtn: "bg-blue-600 hover:bg-blue-700",
  },
  {
    id: "emerald",
    name: "Изумруд",
    swatch: "bg-emerald-800",
    sidebar: "bg-emerald-950",
    border: "border-emerald-900",
    text: "text-emerald-100",
    muted: "text-emerald-400/60",
    hover: "hover:bg-emerald-900",
    activeBg: "bg-emerald-600 text-white",
    header: "text-white",
    accentBtn: "bg-emerald-600 hover:bg-emerald-700",
  },
  {
    id: "violet",
    name: "Фиолет",
    swatch: "bg-violet-800",
    sidebar: "bg-violet-950",
    border: "border-violet-900",
    text: "text-violet-200",
    muted: "text-violet-400/60",
    hover: "hover:bg-violet-900",
    activeBg: "bg-violet-600 text-white",
    header: "text-white",
    accentBtn: "bg-violet-600 hover:bg-violet-700",
  },
  {
    id: "bordeaux",
    name: "Бордо",
    swatch: "bg-rose-900",
    sidebar: "bg-rose-950",
    border: "border-rose-900",
    text: "text-rose-200",
    muted: "text-rose-400/60",
    hover: "hover:bg-rose-900",
    activeBg: "bg-rose-600 text-white",
    header: "text-white",
    accentBtn: "bg-rose-600 hover:bg-rose-700",
  },
  {
    id: "sky",
    name: "Голубой",
    swatch: "bg-sky-500",
    sidebar: "bg-sky-600",
    border: "border-sky-500",
    text: "text-sky-50",
    muted: "text-sky-200",
    hover: "hover:bg-sky-700",
    activeBg: "bg-white text-sky-700",
    header: "text-white",
    accentBtn: "bg-sky-600 hover:bg-sky-700",
  },
  {
    id: "lime",
    name: "Зелёный",
    swatch: "bg-lime-500",
    sidebar: "bg-lime-600",
    border: "border-lime-500",
    text: "text-lime-50",
    muted: "text-lime-100",
    hover: "hover:bg-lime-700",
    activeBg: "bg-white text-lime-700",
    header: "text-white",
    accentBtn: "bg-lime-600 hover:bg-lime-700",
  },
  {
    id: "beige",
    name: "Бежевый",
    swatch: "bg-amber-200",
    sidebar: "bg-amber-50 border-r border-amber-200",
    border: "border-amber-200",
    text: "text-amber-900",
    muted: "text-amber-600",
    hover: "hover:bg-amber-100",
    activeBg: "bg-amber-600 text-white",
    header: "text-amber-900",
    accentBtn: "bg-amber-600 hover:bg-amber-700",
  },
  {
    id: "yellow",
    name: "Жёлтый",
    swatch: "bg-yellow-400",
    sidebar: "bg-yellow-50 border-r border-yellow-200",
    border: "border-yellow-200",
    text: "text-yellow-900",
    muted: "text-yellow-700",
    hover: "hover:bg-yellow-100",
    activeBg: "bg-yellow-500 text-white",
    header: "text-yellow-900",
    accentBtn: "bg-yellow-500 hover:bg-yellow-600",
  },
  {
    id: "light",
    name: "Светлая",
    swatch: "bg-white border border-slate-300",
    sidebar: "bg-white border-r border-slate-200",
    border: "border-slate-200",
    text: "text-slate-700",
    muted: "text-slate-400",
    hover: "hover:bg-slate-100",
    activeBg: "bg-blue-600 text-white",
    header: "text-slate-900",
    accentBtn: "bg-blue-600 hover:bg-blue-700",
  },
];

export const THEME_MAP: Record<string, Theme> = Object.fromEntries(
  THEMES.map((t) => [t.id, t])
);

/** Режим рабочей области (контент справа от сайдбара) */
export interface WorkMode {
  id: "light" | "dark";
  name: string;
  main: string; // фон рабочей области
  card: string; // фон и рамка карточек
  title: string; // заголовки
  text: string; // обычный текст
  muted: string; // вторичный текст
  tableHead: string; // шапка таблиц
  rowBorder: string; // границы строк
  input: string; // поля и плейсхолдеры
}

export const MODES: Record<"light" | "dark", WorkMode> = {
  light: {
    id: "light",
    name: "Светлая",
    main: "bg-slate-50",
    card: "bg-white border-slate-200",
    title: "text-slate-900",
    text: "text-slate-700",
    muted: "text-slate-400",
    tableHead: "bg-slate-50 text-slate-500",
    rowBorder: "border-slate-100",
    input: "text-slate-300",
  },
  dark: {
    id: "dark",
    name: "Тёмная",
    main: "bg-slate-950",
    card: "bg-slate-900 border-slate-800",
    title: "text-white",
    text: "text-slate-300",
    muted: "text-slate-500",
    tableHead: "bg-slate-900 text-slate-400",
    rowBorder: "border-slate-800",
    input: "text-slate-600",
  },
};

/* ── Тёмная рабочая область, подкрашенная под цвет меню ──
   Классы прописаны статически (целиком), иначе Tailwind их вырежет. */
const DARK_SLATE: WorkMode = MODES.dark;
const DARK_BLUE: WorkMode = {
  id: "dark",
  name: "Тёмная",
  main: "bg-blue-950",
  card: "bg-blue-900 border-blue-800",
  title: "text-white",
  text: "text-blue-200",
  muted: "text-blue-400",
  tableHead: "bg-blue-900 text-blue-300",
  rowBorder: "border-blue-800",
  input: "text-blue-700",
};
const DARK_EMERALD: WorkMode = {
  id: "dark",
  name: "Тёмная",
  main: "bg-emerald-950",
  card: "bg-emerald-900 border-emerald-800",
  title: "text-white",
  text: "text-emerald-100",
  muted: "text-emerald-400",
  tableHead: "bg-emerald-900 text-emerald-300",
  rowBorder: "border-emerald-800",
  input: "text-emerald-700",
};
const DARK_VIOLET: WorkMode = {
  id: "dark",
  name: "Тёмная",
  main: "bg-violet-950",
  card: "bg-violet-900 border-violet-800",
  title: "text-white",
  text: "text-violet-200",
  muted: "text-violet-400",
  tableHead: "bg-violet-900 text-violet-300",
  rowBorder: "border-violet-800",
  input: "text-violet-700",
};
const DARK_ROSE: WorkMode = {
  id: "dark",
  name: "Тёмная",
  main: "bg-rose-950",
  card: "bg-rose-900 border-rose-800",
  title: "text-white",
  text: "text-rose-200",
  muted: "text-rose-400",
  tableHead: "bg-rose-900 text-rose-300",
  rowBorder: "border-rose-800",
  input: "text-rose-700",
};

const DARK_SKY: WorkMode = {
  id: "dark",
  name: "Тёмная",
  main: "bg-sky-950",
  card: "bg-sky-900 border-sky-800",
  title: "text-white",
  text: "text-sky-200",
  muted: "text-sky-400",
  tableHead: "bg-sky-900 text-sky-300",
  rowBorder: "border-sky-800",
  input: "text-sky-700",
};
const DARK_LIME: WorkMode = {
  id: "dark",
  name: "Тёмная",
  main: "bg-lime-950",
  card: "bg-lime-900 border-lime-800",
  title: "text-white",
  text: "text-lime-200",
  muted: "text-lime-400",
  tableHead: "bg-lime-900 text-lime-300",
  rowBorder: "border-lime-800",
  input: "text-lime-700",
};
const DARK_AMBER: WorkMode = {
  id: "dark",
  name: "Тёмная",
  main: "bg-amber-950",
  card: "bg-amber-900 border-amber-800",
  title: "text-white",
  text: "text-amber-200",
  muted: "text-amber-400",
  tableHead: "bg-amber-900 text-amber-300",
  rowBorder: "border-amber-800",
  input: "text-amber-700",
};
const DARK_YELLOW: WorkMode = {
  id: "dark",
  name: "Тёмная",
  main: "bg-yellow-950",
  card: "bg-yellow-900 border-yellow-800",
  title: "text-white",
  text: "text-yellow-200",
  muted: "text-yellow-400",
  tableHead: "bg-yellow-900 text-yellow-300",
  rowBorder: "border-yellow-800",
  input: "text-yellow-700",
};

/** Тёмный режим для каждого цвета меню */
export const THEME_DARK: Record<string, WorkMode> = {
  graphite: DARK_SLATE,
  navy: DARK_BLUE,
  emerald: DARK_EMERALD,
  violet: DARK_VIOLET,
  bordeaux: DARK_ROSE,
  sky: DARK_SKY,
  lime: DARK_LIME,
  beige: DARK_AMBER,
  yellow: DARK_YELLOW,
  light: DARK_SLATE,
};

/** Рабочая область: светлая — общая, тёмная — под цвет меню */
export function workMode(themeId: string, modeId: "light" | "dark"): WorkMode {
  if (modeId === "light") return MODES.light;
  return THEME_DARK[themeId] ?? MODES.dark;
}
