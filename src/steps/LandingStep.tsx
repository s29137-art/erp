import { useEffect, useId, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Sparkles,
  Landmark,
  TrendingUp,
  ArrowLeftRight,
  CalendarDays,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Users,
  Package,
  Bell,
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

export default function LandingStep({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50">
      {/* Градиентное свечение фона */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full bg-gradient-to-br from-brand-500/30 via-sky-400/20 to-cyan-300/20 blur-3xl" />
        <div className="absolute top-72 -right-32 h-[380px] w-[380px] rounded-full bg-gradient-to-br from-violet-400/20 to-brand-500/10 blur-3xl" />
      </div>

      {/* Навбар */}
      <header className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold">
              E
            </div>
            <span className="font-semibold text-lg">Конструктор финансовых учётных записей</span>
          </div>
          <button
            onClick={onStart}
            className="cta-button group relative overflow-hidden hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105 hover:bg-brand-700 active:scale-95"
          >
            <span className="relative z-10 inline-flex items-center gap-1.5">
              Начать
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="pt-4 sm:pt-6" />

        {/* 3D-параллакс-сцена с каруселью больших слайдов в центре */}
        <ParallaxScene />

        {/* Описание и призыв под каруселью */}
        <div className="text-center pt-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-slate-200 px-4 py-1.5 text-sm text-slate-600 shadow-sm">
            <Sparkles size={14} className="text-brand-600" />
            Финучёт, CRM, склад и отрасль — в одной системе
          </div>
          <p className="mt-4 text-base text-slate-500 max-w-2xl mx-auto">
            Выберите шаблон бизнеса, включите нужные модули и запустите готовую систему
            учёта с дашбордами, отчётами ДДС и ОПиУ. Всё настраивается мышкой.
          </p>

          <div className="mt-6 flex items-center justify-center">
            <button
              onClick={onStart}
              className="cta-button group relative overflow-hidden inline-flex items-center gap-2 rounded-xl bg-brand-600 px-8 py-4 text-lg font-semibold text-white transition-transform duration-200 hover:scale-[1.03] hover:bg-brand-700 active:scale-95"
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                Создать свою систему учёта
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </button>
          </div>
          <div className="mt-3 text-xs text-slate-400">
            Бесплатно · без карты · запуск за 15 минут
          </div>
        </div>

        {/* Цифры */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mt-6">
          {[
            { value: "6", label: "готовых шаблонов" },
            { value: "23", label: "модуля на выбор" },
            { value: "5", label: "шагов до запуска" },
            { value: "0", label: "строк кода" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-white/70 backdrop-blur border border-slate-200 px-4 py-4 shadow-sm text-center"
            >
              <div className="text-3xl font-bold text-slate-900">{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-400 pb-16 mt-10">
          Финансовый учёт по методологии профессионального финансиста (ДДС, ОПиУ,
          платёжный календарь) входит в каждый шаблон.
        </p>
      </main>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Параллакс-сцена: в центре — карусель из 4 больших дашбордов
   (листается налево/направо), вокруг — плавающие панели на разной
   глубине (translateZ + blur = depth-of-field). При скролле слои
   сдвигаются с разной скоростью, курсор слегка наклоняет сцену.
   ───────────────────────────────────────────────────────────── */
function ParallaxScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0); // смещение центра сцены от центра экрана, px
  const [tilt, setTilt] = useState({ x: 0, y: 0 }); // наклон за мышью, deg

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setP(rect.top + rect.height / 2 - window.innerHeight / 2);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width - 0.5;
    const cy = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -cy * 4, y: cx * 6 });
  };

  const layer = (speed: number, z: number): React.CSSProperties => ({
    transform: `translate3d(0, ${(p * speed).toFixed(1)}px, ${z}px)`,
    willChange: "transform",
  });

  return (
    <>
      {/* Мобильные и планшеты: карусель в обычном потоке — ничего не наезжает */}
      <div className="lg:hidden mt-4 w-full max-w-[640px] mx-auto">
        <CarouselWindow />
      </div>

      {/* Десктоп (lg+): полноценная 3D-параллакс-сцена с плавающими панелями */}
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        className="relative hidden lg:block h-[520px] [perspective:1700px]"
      >
      <div
        className="absolute inset-0 [transform-style:preserve-3d] transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${(6 + tilt.x).toFixed(2)}deg) rotateY(${(-7 + tilt.y).toFixed(2)}deg)`,
        }}
      >
        {/* ── Дальние панели (медленный параллакс, размытие) ── */}
        <FloatPanel
          className="hidden lg:block left-[-30px] top-[30px] w-60 blur-[2px] opacity-90"
          style={layer(0.07, -260)}
        >
          <ProfitCard />
        </FloatPanel>
        <FloatPanel
          className="hidden lg:block right-[-20px] top-[10px] w-64 blur-[1.5px] opacity-95"
          style={layer(0.1, -200)}
        >
          <MiniBarsCard />
        </FloatPanel>
        <FloatPanel
          className="hidden xl:block right-[40px] bottom-[30px] w-56 blur-[1px]"
          style={layer(0.13, -120)}
        >
          <PayReminderCard />
        </FloatPanel>

        {/* ── Центральная карусель в фокусе ── */}
        <div
          className="absolute left-1/2 top-1/2 w-[660px]"
          style={{
            transform: `translate(-50%, -50%) translate3d(0, ${(p * 0.03).toFixed(1)}px, 60px)`,
            willChange: "transform",
          }}
        >
          <CarouselWindow />
        </div>

        {/* ── Ближние панели (быстрый параллакс, чёткие) ── */}
        <FloatPanel
          className="hidden lg:block left-[0px] bottom-[40px] w-60 z-30"
          style={layer(0.2, 150)}
        >
          <PaidToast />
        </FloatPanel>
        <FloatPanel
          className="hidden lg:block right-[-40px] bottom-[110px] w-56 z-30"
          style={layer(0.17, 120)}
        >
          <ClientCard />
        </FloatPanel>
        <FloatPanel
          className="hidden xl:block left-[60px] top-[0px] w-52 z-20"
          style={layer(0.15, 100)}
        >
          <StockAlertCard />
        </FloatPanel>
      </div>
      </div>
    </>
  );
}

/* Обёртка плавающей панели */
function FloatPanel({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute rounded-2xl bg-white/90 backdrop-blur border border-slate-200 shadow-xl shadow-slate-300/30 p-4 ${className ?? ""}`}
      style={style}
    >
      {children}
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

/* ── Плавающие панели вокруг ── */
function ProfitCard() {
  return (
    <>
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <TrendingUp size={13} className="text-emerald-500" /> Чистая прибыль
      </div>
      <div className="text-2xl font-bold text-slate-900 mt-1">880 000 ₸</div>
      <div className="text-xs text-emerald-500 mt-0.5">маржа 31% · +12%</div>
    </>
  );
}
function MiniBarsCard() {
  return (
    <>
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
        <CalendarDays size={13} className="text-brand-600" /> Выручка по дням
      </div>
      <Bars bars={[40, 65, 50, 80, 60, 92, 70]} small />
    </>
  );
}
function PayReminderCard() {
  return (
    <>
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Bell size={13} className="text-amber-500" /> Платёжный календарь
      </div>
      <div className="mt-2 text-sm text-slate-700 font-medium">Зарплата · 10 число</div>
      <div className="text-xs text-slate-400">1 200 000 ₸ запланировано</div>
    </>
  );
}
function PaidToast() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">
        <CheckCircle2 size={18} className="text-emerald-600" />
      </div>
      <div>
        <div className="text-sm font-semibold text-slate-900">Платёж проведён</div>
        <div className="text-xs text-slate-400">Заказ #1042 · 320 000 ₸</div>
      </div>
    </div>
  );
}
function ClientCard() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-sky-400 flex items-center justify-center text-white font-semibold">
        А
      </div>
      <div>
        <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
          Айгерим <Users size={12} className="text-slate-300" />
        </div>
        <div className="text-xs text-slate-400">Новый клиент · CRM</div>
      </div>
    </div>
  );
}
function StockAlertCard() {
  return (
    <>
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Package size={13} className="text-amber-500" /> Склад
      </div>
      <div className="mt-1 text-sm text-slate-700">
        <span className="font-bold text-amber-600">7 позиций</span> заканчивается
      </div>
      <div className="text-xs text-slate-400">ниже минимального остатка</div>
    </>
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
function Bars({ bars, small }: { bars: number[]; small?: boolean }) {
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  return (
    <div>
      <div className={`flex items-end gap-1.5 ${small ? "h-16" : "h-24"}`}>
        {bars.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end">
            <div
              className="rounded-t-md bg-gradient-to-t from-brand-600 to-sky-400"
              style={{ height: `${h}%` }}
            />
          </div>
        ))}
      </div>
      {!small && (
        <div className="flex gap-1.5 mt-1.5">
          {bars.map((_, i) => (
            <div key={i} className="flex-1 text-center text-[9px] text-slate-400">
              {days[i % days.length]}
            </div>
          ))}
        </div>
      )}
    </div>
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
