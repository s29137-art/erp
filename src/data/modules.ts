import type { LucideIcon } from "lucide-react";
import {
  Landmark,
  Receipt,
  ArrowLeftRight,
  TrendingUp,
  CalendarDays,
  Scale,
  Building2,
  Users,
  Briefcase,
  UserCog,
  Banknote,
  Target,
  BarChart3,
  Package,
  ShoppingCart,
  CalendarClock,
  BedDouble,
  ShoppingBag,
  ChefHat,
  Factory,
  Ruler,
  Megaphone,
  Gift,
} from "lucide-react";

export type Layer = "finance" | "business" | "industry";

export interface ModuleDef {
  id: string;
  name: string;
  icon: LucideIcon;
  layer: Layer;
  desc: string;
  deps: string[]; // id модулей, которые требуются
  locked?: boolean; // входит в обязательное ядро
}

export const LAYER_TITLES: Record<Layer, string> = {
  finance: "Финансовое ядро — включено всегда",
  business: "Бизнес-модули — включайте нужные",
  industry: "Отраслевые модули — под ваш тип бизнеса",
};

export const MODULES: ModuleDef[] = [
  // ── Финансовое ядро (locked) ──
  { id: "f1", name: "Счета и кассы", icon: Landmark, layer: "finance", locked: true, deps: [], desc: "Kaspi, Halyk, наличные. Комиссии эквайринга считаются сами." },
  { id: "f2", name: "Журнал операций", icon: Receipt, layer: "finance", locked: true, deps: [], desc: "Все доходы, расходы и переводы в одном месте." },
  { id: "f4", name: "Отчёт ДДС", icon: ArrowLeftRight, layer: "finance", locked: true, deps: [], desc: "Движение денег по дням, месяцам и году." },
  { id: "f5", name: "Отчёт ОПиУ", icon: TrendingUp, layer: "finance", locked: true, deps: [], desc: "Прибыль и убытки: выручка → себестоимость → чистая прибыль." },
  { id: "f6", name: "Платёжный календарь", icon: CalendarDays, layer: "finance", locked: true, deps: [], desc: "Плановые платежи и прогноз кассовых разрывов." },
  { id: "f7", name: "Долги (дебиторка/кредиторка)", icon: Scale, layer: "finance", locked: true, deps: [], desc: "Кто должен вам и кому должны вы." },
  { id: "f8", name: "Основные средства", icon: Building2, layer: "finance", deps: [], desc: "Оборудование и техника, амортизация для ОПиУ." },

  // ── Бизнес-модули ──
  { id: "b1", name: "Клиенты (CRM)", icon: Users, layer: "business", deps: [], desc: "База клиентов, история визитов и покупок." },
  { id: "b2", name: "Контрагенты", icon: Briefcase, layer: "business", deps: [], desc: "Поставщики, арендодатели, подрядчики." },
  { id: "b3", name: "Сотрудники", icon: UserCog, layer: "business", deps: [], desc: "Персонал: должности, смены, контакты." },
  { id: "b4", name: "Зарплата", icon: Banknote, layer: "business", deps: ["b3"], desc: "Месячные ведомости: оклад + бонус − штраф." },
  { id: "b5", name: "Мотивация и KPI", icon: Target, layer: "business", deps: ["b4"], desc: "Конструктор бонусов без программиста." },
  { id: "b6", name: "Планы продаж", icon: BarChart3, layer: "business", deps: ["b3"], desc: "План/факт по менеджерам, % выполнения." },
  { id: "b7", name: "Склад", icon: Package, layer: "business", deps: [], desc: "Остатки, движения, минимальные остатки, FIFO." },
  { id: "b8", name: "Закупки", icon: ShoppingCart, layer: "business", deps: ["b2", "b7"], desc: "Заказы поставщикам. Приход на склад и долги — сами." },

  // ── Отраслевые модули ──
  { id: "s1", name: "Записи на услуги", icon: CalendarClock, layer: "industry", deps: ["b1", "b3"], desc: "Расписание мастеров: календарь, канбан, таймлайн." },
  { id: "s2", name: "Бронирования", icon: BedDouble, layer: "industry", deps: ["b1"], desc: "Залы по часам, номера по ночам, шахматка." },
  { id: "s3", name: "Заказы и продажи", icon: ShoppingBag, layer: "industry", deps: ["b1"], desc: "Заказы в зале, навынос, доставка. Экран кухни." },
  { id: "s4", name: "Меню и рецептуры", icon: ChefHat, layer: "industry", deps: ["b7"], desc: "Блюда из ингредиентов, себестоимость по FIFO." },
  { id: "s5", name: "Производство", icon: Factory, layer: "industry", deps: ["b7"], desc: "Сырьё → переработка → продукция. Нормы выхода." },
  { id: "s6", name: "Проекты и сметы", icon: Ruler, layer: "industry", deps: ["b1"], desc: "Объекты, сметы, этапы, задачи, график работ." },
  { id: "s7", name: "Маркетинг (РНП)", icon: Megaphone, layer: "industry", deps: [], desc: "Рекламный бюджет, лиды, конверсия, CPL — каждый день." },
  { id: "s8", name: "Сертификаты и абонементы", icon: Gift, layer: "industry", deps: ["b1"], desc: "Предоплаченные сертификаты и пакеты посещений." },
];

export const MODULE_MAP: Record<string, ModuleDef> = Object.fromEntries(
  MODULES.map((m) => [m.id, m])
);

export const CORE_IDS = MODULES.filter((m) => m.locked).map((m) => m.id);

/** Рекурсивно собрать все зависимости модуля */
export function collectDeps(id: string, acc: Set<string> = new Set()): Set<string> {
  const m = MODULE_MAP[id];
  if (!m) return acc;
  for (const dep of m.deps) {
    if (!acc.has(dep)) {
      acc.add(dep);
      collectDeps(dep, acc);
    }
  }
  return acc;
}

/** Какие включённые модули зависят от данного (прямо или косвенно) */
export function dependents(id: string, enabled: string[]): string[] {
  return enabled.filter((other) => other !== id && collectDeps(other).has(id));
}
