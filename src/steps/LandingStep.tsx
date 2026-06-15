import { useEffect, useId, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Landmark,
  TrendingUp,
  ArrowLeftRight,
  CalendarDays,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Users,
  Package,
  ShoppingBag,
  Target,
  Settings,
  ArrowUpRight,
  Receipt,
  Scale,
  BarChart3,
  ShoppingCart,
  LayoutDashboard,
} from "lucide-react";

const FEATURES = [
  {
    icon: Landmark,
    title: "Финансы по уму",
    text: "ДДС, ОПиУ и платёжный календарь по методологии профессионального финансиста — в каждом шаблоне.",
  },
  {
    icon: Users,
    title: "CRM и продажи",
    text: "Клиенты, сделки, воронка и планы по менеджерам — вся работа отдела продаж в одном месте.",
  },
  {
    icon: Package,
    title: "Склад и закупки",
    text: "Остатки по FIFO, контроль минимальных остатков и закупки без пересортицы и хаоса.",
  },
];

export default function LandingStep({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      {/* Очень мягкое свечение вверху — без визуального шума */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[680px] bg-gradient-to-b from-brand-50/80 via-white to-white" />
      <div className="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 h-[440px] w-[760px] rounded-full bg-brand-200/30 blur-3xl" />

      {/* Навбар */}
      <header className="relative z-10 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold">
              E
            </div>
            <span className="font-semibold text-[15px] sm:text-base text-slate-900">
              Конструктор учёта
            </span>
          </div>
          <button
            onClick={onStart}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-95"
          >
            Войти
            <ArrowRight size={15} />
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6">
        {/* ── Скриншот продукта наверху — вместо текстового героя ── */}
        <section className="relative pt-6 sm:pt-8 pb-10">
          <div className="pointer-events-none absolute -inset-x-10 -top-4 bottom-10 bg-gradient-to-b from-brand-200/25 to-transparent blur-2xl" />
          <div className="relative mx-auto max-w-4xl">
            <CarouselWindow />
          </div>
        </section>

        {/* ── Призыв под дашбордом ── */}
        <section className="text-center pb-14">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onStart}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-600/30 active:scale-95 w-full sm:w-auto"
            >
              Создать свою систему
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={onStart}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 active:scale-95 w-full sm:w-auto"
            >
              У меня уже есть аккаунт
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-sm text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-500" /> Бесплатно
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-500" /> Без карты
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-500" /> Запуск за 15 минут
            </span>
          </div>
        </section>

        {/* ── Цифры ── */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 max-w-4xl mx-auto">
          {[
            { value: "6", label: "готовых шаблонов" },
            { value: "23", label: "модуля на выбор" },
            { value: "5", label: "шагов до запуска" },
            { value: "0", label: "строк кода" },
          ].map((s) => (
            <div key={s.label} className="bg-white px-4 py-6 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-slate-900">{s.value}</div>
              <div className="text-xs text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </section>

        {/* ── Преимущества ── */}
        <section className="py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Всё, что нужно для учёта — из коробки
            </h2>
            <p className="mt-3 text-slate-500">
              Финансы, продажи и склад работают вместе. Включайте только то, что нужно
              вашему бизнесу.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/60"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 grid place-items-center mb-4">
                  <f.icon size={22} />
                </div>
                <div className="font-semibold text-slate-900 text-lg">{f.title}</div>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Финальный призыв ── */}
        <section className="pb-24">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-14 sm:py-16 text-center">
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[640px] rounded-full bg-brand-500/25 blur-3xl" />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Запустите свою систему учёта сегодня
              </h2>
              <p className="mt-3 text-slate-300 max-w-xl mx-auto">
                15 минут на настройку — и готовый дашборд с финансами, продажами и складом.
              </p>
              <button
                onClick={onStart}
                className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-slate-900 transition hover:bg-slate-100 active:scale-95"
              >
                Создать свою систему
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ── Центральное окно: карусель из 4 больших дашбордов ── */
function CarouselWindow() {
  const screens = [
    { id: "finance", label: "Финансы", render: () => <FinanceScreen /> },
    { id: "sales", label: "Продажи · CRM", render: () => <SalesScreen /> },
    { id: "stock", label: "Склад", render: () => <StockScreen /> },
    { id: "reports", label: "Отчёты", render: () => <ReportsScreen /> },
  ];
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const [paused, setPaused] = useState(false);

  const setActiveSafe = (i: number) => {
    activeRef.current = i;
    setActive(i);
  };

  const goTo = (i: number) => {
    const idx = (i + screens.length) % screens.length;
    const t = trackRef.current;
    if (!t) return;
    t.scrollTo({ left: t.clientWidth * idx, behavior: "smooth" });
    setActiveSafe(idx);
  };
  const onScroll = () => {
    const t = trackRef.current;
    if (!t) return;
    setActiveSafe(Math.round(t.scrollLeft / t.clientWidth));
  };

  // Автопрокрутка: карусель листается сама, пока пользователь не трогает её
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => goTo(activeRef.current + 1), 4000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  // Перетаскивание мышью (на тач-устройствах работает нативный свайп)
  const drag = useRef({ down: false, startX: 0, startLeft: 0 });
  const onPointerDown = (e: React.PointerEvent) => {
    setPaused(true);
    if (e.pointerType !== "mouse") return;
    const t = trackRef.current;
    if (!t) return;
    drag.current = { down: true, startX: e.clientX, startLeft: t.scrollLeft };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const t = trackRef.current;
    if (!t || !drag.current.down) return;
    t.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };
  const endDrag = (e: React.PointerEvent) => {
    const t = trackRef.current;
    if (t && drag.current.down) {
      goTo(Math.round(t.scrollLeft / t.clientWidth));
    }
    drag.current.down = false;
    // мышь остаётся над каруселью — пауза до ухода курсора; тач сразу возобновляет
    if (e.pointerType !== "mouse") setPaused(false);
  };

  // Полный список разделов системы, сгруппированный как в реальном ERP.
  // primary-пункт подсвечивается, когда открыт соответствующий слайд карусели.
  type NavItem = { icon: LucideIcon; label: string; screen: number; primary?: boolean };
  const navGroups: { title: string; items: NavItem[] }[] = [
    {
      title: "Финансы",
      items: [
        { icon: Landmark, label: "Счета и кассы", screen: 0, primary: true },
        { icon: Receipt, label: "Журнал операций", screen: 0 },
        { icon: ArrowLeftRight, label: "Отчёт ДДС", screen: 0 },
        { icon: TrendingUp, label: "Отчёт ОПиУ", screen: 3, primary: true },
        { icon: CalendarDays, label: "Платёжный календарь", screen: 3 },
        { icon: Scale, label: "Долги", screen: 3 },
      ],
    },
    {
      title: "Продажи",
      items: [
        { icon: Users, label: "Клиенты (CRM)", screen: 1, primary: true },
        { icon: ShoppingBag, label: "Заказы и продажи", screen: 1 },
        { icon: BarChart3, label: "Планы продаж", screen: 1 },
        { icon: Target, label: "Маркетинг (РНП)", screen: 1 },
      ],
    },
    {
      title: "Склад",
      items: [
        { icon: Package, label: "Склад", screen: 2, primary: true },
        { icon: ShoppingCart, label: "Закупки", screen: 2 },
      ],
    },
  ];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className="rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200 shadow-2xl shadow-slate-400/40 p-3 sm:p-4"
    >
      {/* Шапка-браузер */}
      <div className="flex items-center gap-1.5 px-2 py-2">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-amber-400" />
        <span className="w-3 h-3 rounded-full bg-emerald-400" />
        <div className="ml-3 flex items-center gap-2 text-xs text-slate-400">
          <Landmark size={13} /> Моя компания · {screens[active].label}
        </div>
      </div>

      {/* Корпус: боковое меню + рабочая область со слайдами */}
      <div className="flex overflow-hidden rounded-2xl border border-slate-200">
        {/* Боковое меню (как в реальной системе) */}
        <aside className="hidden sm:flex w-44 shrink-0 flex-col bg-slate-900 text-slate-300 p-2.5 text-[12px]">
          <div className="flex items-center gap-2 px-1.5 pb-2 mb-1 border-b border-slate-800">
            <div className="w-6 h-6 rounded-md bg-blue-600 text-white grid place-items-center font-bold text-[11px]">
              М
            </div>
            <span className="text-white font-semibold text-[12.5px] truncate">Моя компания</span>
          </div>

          <button
            onClick={() => goTo(0)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg mb-0.5 text-left hover:bg-slate-800 transition"
          >
            <LayoutDashboard size={14} className="shrink-0" />
            <span className="truncate">Дашборд</span>
          </button>

          {navGroups.map((g) => (
            <div key={g.title}>
              <div className="text-[9px] uppercase tracking-wide text-slate-500 px-1.5 mt-2 mb-1">
                {g.title}
              </div>
              {g.items.map((it) => {
                const isActive = !!it.primary && it.screen === active;
                return (
                  <button
                    key={it.label}
                    onClick={() => goTo(it.screen)}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-lg mb-0.5 w-full text-left transition ${
                      isActive ? "bg-blue-600 text-white shadow" : "hover:bg-slate-800"
                    }`}
                  >
                    <it.icon size={14} className="shrink-0" />
                    <span className="truncate">{it.label}</span>
                  </button>
                );
              })}
            </div>
          ))}

          <div className="mt-auto pt-2 border-t border-slate-800 flex items-center gap-2 px-2 py-1.5 text-slate-500">
            <Settings size={14} /> Настройки
          </div>
        </aside>

        {/* Рабочая область со слайдами */}
        <div className="relative flex-1 min-w-0 bg-slate-50">
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="flex overflow-x-auto snap-x snap-mandatory select-none cursor-grab active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {screens.map((s) => (
              <div key={s.id} className="snap-center shrink-0 w-full">
                <div className="p-4">{s.render()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Точки */}
      <div className="flex items-center justify-center gap-2 mt-3">
        {screens.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            aria-label={s.label}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-7 bg-brand-600" : "w-2 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Слайд 1: Финансы ── */
function FinanceScreen() {
  const kpis = [
    { icon: Wallet, title: "Остаток", value: "1 250 000 ₸", sub: "3 счёта" },
    { icon: TrendingUp, title: "Выручка", value: "2 840 000 ₸", sub: "+12%", good: true },
    { icon: ArrowLeftRight, title: "Расходы", value: "1 960 000 ₸", sub: "в плане" },
    { icon: ShieldCheck, title: "Прибыль", value: "880 000 ₸", sub: "31%", good: true },
  ];
  const flow = [40, 58, 50, 72, 64, 88, 80, 96, 90, 110, 104, 125];
  const accounts = [
    { name: "Kaspi Pay", value: "415 000 ₸" },
    { name: "Halyk Bank", value: "560 000 ₸" },
    { name: "Наличные (касса)", value: "275 000 ₸" },
  ];
  return (
    <>
      <KpiRow kpis={kpis} />
      <div className="grid lg:grid-cols-2 gap-3">
        <Panel icon={CalendarDays} title="Движение денег">
          <AreaChart points={flow} />
        </Panel>
        <Panel icon={Wallet} title="Счета и кассы">
          <Rows rows={accounts.map((a) => ({ left: a.name, right: a.value }))} />
        </Panel>
      </div>
    </>
  );
}

/* ── Слайд 2: Продажи / CRM ── */
function SalesScreen() {
  const kpis = [
    { icon: ShoppingBag, title: "Сделок", value: "184", sub: "+23 к плану", good: true },
    { icon: Target, title: "Конверсия", value: "28%", sub: "лид → продажа" },
    { icon: Wallet, title: "Средний чек", value: "15 400 ₸", sub: "+6%", good: true },
    { icon: Users, title: "Клиентов", value: "57", sub: "новых" },
  ];
  const managers = [
    { name: "Айгерим", pct: 92 },
    { name: "Данияр", pct: 78 },
    { name: "Мадина", pct: 64 },
    { name: "Тимур", pct: 41 },
  ];
  const deals = [
    { name: "Заказ #1042 — ТОО «Алтын»", value: "320 000 ₸" },
    { name: "Заказ #1041 — ИП Серик", value: "85 000 ₸" },
    { name: "Заказ #1039 — Retail KZ", value: "190 000 ₸" },
  ];
  return (
    <>
      <KpiRow kpis={kpis} />
      <div className="grid lg:grid-cols-2 gap-3">
        <Panel icon={Target} title="План по менеджерам">
          <div className="space-y-2.5">
            {managers.map((m) => (
              <div key={m.name}>
                <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                  <span>{m.name}</span>
                  <span className="font-medium text-slate-700">{m.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-600 to-sky-400"
                    style={{ width: `${m.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel icon={ShoppingBag} title="Последние сделки">
          <Rows rows={deals.map((d) => ({ left: d.name, right: d.value }))} />
        </Panel>
      </div>
    </>
  );
}

/* ── Слайд 3: Склад ── */
function StockScreen() {
  const kpis = [
    { icon: Package, title: "Позиций", value: "342", sub: "на складе" },
    { icon: Wallet, title: "Остатки", value: "4 180 000 ₸", sub: "по FIFO" },
    { icon: ArrowLeftRight, title: "Оборот", value: "1 240 000 ₸", sub: "+8%", good: true },
    { icon: TrendingUp, title: "Кончается", value: "7", sub: "ниже мин." },
  ];
  const stock = [
    { name: "Кофе зерно 1 кг", qty: "48 шт", value: "192 000 ₸" },
    { name: "Стаканы 300 мл", qty: "1 200 шт", value: "84 000 ₸" },
    { name: "Сироп карамель", qty: "9 шт", value: "27 000 ₸", low: true },
    { name: "Молоко 1 л", qty: "6 шт", value: "4 200 ₸", low: true },
  ];
  return (
    <>
      <KpiRow kpis={kpis} />
      <Panel icon={Package} title="Остатки на складе">
        <table className="w-full text-[13px]">
          <thead className="text-left text-[11px] text-slate-400">
            <tr>
              <th className="py-1.5 font-medium">Позиция</th>
              <th className="py-1.5 font-medium">Остаток</th>
              <th className="py-1.5 font-medium text-right">Сумма</th>
            </tr>
          </thead>
          <tbody>
            {stock.map((s) => (
              <tr key={s.name} className="border-t border-slate-100 text-slate-600">
                <td className="py-1.5">{s.name}</td>
                <td className="py-1.5">
                  <span className={s.low ? "text-amber-600 font-medium" : ""}>{s.qty}</span>
                </td>
                <td className="py-1.5 text-right font-medium text-slate-900">{s.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </>
  );
}

/* ── Слайд 4: Отчёты ── */
function ReportsScreen() {
  const opiu = [
    { name: "Выручка", value: "2 840 000 ₸", good: true },
    { name: "Себестоимость", value: "− 1 120 000 ₸" },
    { name: "Операционные расходы", value: "− 840 000 ₸" },
    { name: "Чистая прибыль", value: "880 000 ₸", good: true },
  ];
  const payments = [
    { name: "Аренда", day: "5 число", value: "350 000 ₸" },
    { name: "Зарплата", day: "10 число", value: "1 200 000 ₸" },
    { name: "Налоги", day: "25 число", value: "180 000 ₸" },
  ];
  return (
    <div className="grid lg:grid-cols-2 gap-3">
      <Panel icon={TrendingUp} title="Отчёт ОПиУ">
        {opiu.map((r) => (
          <div
            key={r.name}
            className="flex justify-between py-1.5 border-b border-slate-100 last:border-0 text-[13px] text-slate-600"
          >
            <span>{r.name}</span>
            <span className={`font-medium ${r.good ? "text-emerald-600" : "text-slate-900"}`}>
              {r.value}
            </span>
          </div>
        ))}
      </Panel>
      <Panel icon={CalendarDays} title="Платёжный календарь">
        {payments.map((p) => (
          <div
            key={p.name}
            className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0 text-[13px]"
          >
            <div>
              <div className="text-slate-700">{p.name}</div>
              <div className="text-[11px] text-slate-400">{p.day}</div>
            </div>
            <span className="font-medium text-slate-900">{p.value}</span>
          </div>
        ))}
      </Panel>
    </div>
  );
}

/* ── Переиспользуемые блоки ── */
interface Kpi {
  icon: LucideIcon;
  title: string;
  value: string;
  sub?: string;
  good?: boolean;
}
function KpiRow({ kpis }: { kpis: Kpi[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
      {kpis.map((k) => (
        <div
          key={k.title}
          className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400">{k.title}</span>
            <span className="w-6 h-6 rounded-lg bg-brand-50 text-brand-600 grid place-items-center shrink-0">
              <k.icon size={12} />
            </span>
          </div>
          <div className="text-lg font-bold text-slate-900 mt-1 leading-none">{k.value}</div>
          {k.sub && (
            <div
              className={`flex items-center gap-0.5 text-[11px] mt-1 ${
                k.good ? "text-emerald-600" : "text-slate-400"
              }`}
            >
              {k.good && <ArrowUpRight size={11} />}
              {k.sub}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
function Panel({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm mb-2">
        <Icon size={14} className="text-brand-600" /> {title}
      </div>
      {children}
    </div>
  );
}
function Rows({ rows }: { rows: { left: string; right: string }[] }) {
  return (
    <>
      {rows.map((r) => (
        <div
          key={r.left}
          className="flex justify-between py-1.5 border-b border-slate-100 last:border-0 text-[13px] text-slate-600"
        >
          <span>{r.left}</span>
          <span className="font-medium text-slate-900">{r.right}</span>
        </div>
      ))}
    </>
  );
}
/* Плавный area-график (SVG) для денежного потока */
function AreaChart({ points }: { points: number[] }) {
  const gid = useId();
  const w = 100;
  const h = 38;
  const max = Math.max(...points) * 1.1 || 1;
  const stepX = w / (points.length - 1);
  const coords = points.map((p, i) => [i * stepX, h - (p / max) * h] as const);
  const line = coords.map((c, i) => `${i ? "L" : "M"}${c[0].toFixed(1)} ${c[1].toFixed(1)}`).join(" ");
  const area = `${line} L ${w} ${h} L 0 ${h} Z`;
  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full h-24">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#${gid})`} />
        <path
          d={line}
          fill="none"
          stroke="#2563eb"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {coords.map((c, i) => (
          <circle key={i} cx={c[0]} cy={c[1]} r={1.4} fill="#2563eb" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <div className="flex justify-between text-[9px] text-slate-400 mt-1">
        <span>Янв</span>
        <span>Мар</span>
        <span>Май</span>
        <span>Июл</span>
        <span>Сен</span>
        <span>Ноя</span>
      </div>
    </div>
  );
}
