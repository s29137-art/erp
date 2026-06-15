import { BuilderConfig, CompanyInfo, Customization } from "../App";
import { Template } from "../data/templates";
import { MODULES, MODULE_MAP, ModuleDef } from "../data/modules";
import { THEMES, THEME_MAP, workMode, Theme } from "../data/themes";
import {
  ArrowLeft,
  Rocket,
  Pencil,
  Check,
  LayoutDashboard,
  Palette,
  GripVertical,
  Sun,
  Moon,
} from "lucide-react";
import { useState } from "react";

export default function PreviewStep({
  company,
  template,
  enabled,
  config,
  custom,
  setCustom,
  onLaunch,
  onBack,
}: {
  company: CompanyInfo;
  template: Template | null;
  enabled: string[];
  config: BuilderConfig;
  custom: Customization;
  setCustom: (c: Customization) => void;
  onLaunch: () => void;
  onBack: () => void;
}) {
  const theme = THEME_MAP[custom.themeId] ?? THEMES[0];
  const mode = workMode(theme.id, custom.mode);
  const byOrder = (a: ModuleDef, b: ModuleDef) =>
    custom.order.indexOf(a.id) - custom.order.indexOf(b.id);
  const enabledModules = MODULES.filter((m) => enabled.includes(m.id)).sort(byOrder);
  const finance = enabledModules.filter((m) => m.layer === "finance");
  const rest = enabledModules.filter((m) => m.layer !== "finance");

  const displayName = (m: ModuleDef) => custom.names[m.id] ?? m.name;

  // ── Drag-and-drop ──
  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const sameGroup = (a: string, b: string) =>
    (MODULE_MAP[a].layer === "finance") === (MODULE_MAP[b].layer === "finance");

  const handleDrop = (targetId: string) => {
    if (dragId && dragId !== targetId && sameGroup(dragId, targetId)) {
      const order = [...custom.order];
      order.splice(order.indexOf(dragId), 1);
      order.splice(order.indexOf(targetId), 0, dragId); // вставить перед целью
      setCustom({ ...custom, order });
    }
    setDragId(null);
    setOverId(null);
  };

  const rename = (id: string, name: string) => {
    const names = { ...custom.names };
    const original = MODULE_MAP[id]?.name;
    if (!name.trim() || name.trim() === original) delete names[id];
    else names[id] = name.trim();
    setCustom({ ...custom, names });
  };

  const dndProps = (m: ModuleDef) => ({
    dragging: dragId === m.id,
    over: overId === m.id && dragId !== null && dragId !== m.id && sameGroup(dragId, m.id),
    onDragStart: () => setDragId(m.id),
    onDragOver: () => setOverId(m.id),
    onDrop: () => handleDrop(m.id),
    onDragEnd: () => {
      setDragId(null);
      setOverId(null);
    },
  });

  const demoKpis = [
    { t: "Остаток на счетах", v: "1 250 000 ₸", s: "3 счёта" },
    { t: "Выручка за месяц", v: "2 840 000 ₸", s: "+12%", good: true },
    { t: "Расходы за месяц", v: "1 960 000 ₸", s: "в плане" },
    { t: "Прибыль (ОПиУ)", v: "880 000 ₸", s: "маржа 31%", good: true },
  ];
  const demoBars = [55, 72, 48, 90, 66, 80, 60];
  const demoAccounts = [
    { n: "Kaspi Pay", v: "415 000 ₸" },
    { n: "Halyk Bank", v: "560 000 ₸" },
    { n: "Наличные (касса)", v: "275 000 ₸" },
  ];

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold mb-1">Ваша система готова к запуску</h1>
      <p className="text-slate-500 mb-6">
        Вот так будет выглядеть ваш дашборд. Всё настраивается прямо здесь: сверху — цвет
        меню и светлая/тёмная область, слева — порядок и названия пунктов (перетащите или
        нажмите карандаш). Всё можно поменять и после запуска.
      </p>

      {/* Краткая сводка о компании — наверху */}
      <div className="flex flex-wrap items-center gap-2 mb-5 text-sm">
        <span className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full pl-1.5 pr-3 py-1 font-semibold">
          {company.logo ? (
            <img src={company.logo} alt="" className="w-6 h-6 rounded-full object-cover" />
          ) : (
            <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center">
              {(company.name.trim()[0] || "К").toUpperCase()}
            </span>
          )}
          {company.name || "Без названия"}
        </span>
        <span className="bg-slate-100 text-slate-600 rounded-full px-3 py-1">{company.city}</span>
        <span className="bg-slate-100 text-slate-600 rounded-full px-3 py-1">{company.currency}</span>
        <span className="bg-slate-100 text-slate-600 rounded-full px-3 py-1">{company.lang}</span>
        {template && (
          <span className="bg-slate-100 text-slate-600 rounded-full px-3 py-1">
            {template.emoji} {template.name}
          </span>
        )}
      </div>

      {/* Живой дашборд — сразу виден */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-6">
        <div className="bg-slate-100 px-3 sm:px-4 py-2 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Palette size={14} className="text-slate-400 shrink-0" />
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => setCustom({ ...custom, themeId: t.id })}
                title={t.name}
                aria-label={`Цвет меню: ${t.name}`}
                className={`w-5 h-5 rounded-full ${t.swatch} transition ${
                  custom.themeId === t.id
                    ? "ring-2 ring-brand-500 ring-offset-1 ring-offset-slate-100"
                    : "hover:scale-110"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-0.5 bg-white border border-slate-200 rounded-lg p-0.5">
            <button
              onClick={() => setCustom({ ...custom, mode: "light" })}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs transition ${
                custom.mode === "light"
                  ? "bg-brand-600 text-white"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <Sun size={13} /> Светлая
            </button>
            <button
              onClick={() => setCustom({ ...custom, mode: "dark" })}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs transition ${
                custom.mode === "dark"
                  ? "bg-brand-600 text-white"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <Moon size={13} /> Тёмная
            </button>
          </div>
        </div>
        <div className="flex h-[420px] sm:h-[460px]">
          {/* Боковое меню */}
          <div className={`w-40 sm:w-56 shrink-0 ${theme.sidebar} ${theme.text} p-3 text-sm overflow-y-auto`}>
            <div className="flex items-center gap-2 mb-3">
              {company.logo && (
                <img
                  src={company.logo}
                  alt=""
                  className="w-6 h-6 rounded object-cover shrink-0 bg-white"
                />
              )}
              <span className={`${theme.header} font-semibold truncate`}>
                {company.name || "Компания"}
              </span>
            </div>
            <div className={`flex items-center gap-2 px-2 py-1.5 rounded ${theme.activeBg} mb-1`}>
              <LayoutDashboard size={14} /> Дашборд
            </div>
            <div className={`text-[10px] uppercase ${theme.muted} mt-2 mb-1 px-2`}>Финансы</div>
            {finance.map((m) => (
              <NavEditRow
                key={m.id}
                module={m}
                name={displayName(m)}
                theme={theme}
                onRename={(name) => rename(m.id, name)}
                {...dndProps(m)}
              />
            ))}
            {rest.length > 0 && (
              <div className={`text-[10px] uppercase ${theme.muted} mt-2 mb-1 px-2`}>Модули</div>
            )}
            {rest.map((m) => (
              <NavEditRow
                key={m.id}
                module={m}
                name={displayName(m)}
                theme={theme}
                onRename={(name) => rename(m.id, name)}
                {...dndProps(m)}
              />
            ))}
          </div>

          {/* Рабочая область с цифрами */}
          <div className={`flex-1 min-w-0 p-3 sm:p-5 ${mode.main} overflow-y-auto`}>
            <div className={`text-lg font-bold mb-4 ${mode.title}`}>Дашборд</div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-3">
              {demoKpis.map((k) => (
                <div key={k.t} className={`${mode.card} border rounded-lg p-3`}>
                  <div className={`text-[11px] ${mode.muted}`}>{k.t}</div>
                  <div className={`font-bold text-base sm:text-lg mt-1 ${mode.title}`}>{k.v}</div>
                  {k.s && (
                    <div className={`text-[11px] mt-0.5 ${k.good ? "text-emerald-500" : mode.muted}`}>
                      {k.s}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="grid lg:grid-cols-2 gap-3">
              <div className={`${mode.card} border rounded-lg p-4`}>
                <div className={`text-sm font-semibold mb-3 ${mode.title}`}>Движение денег</div>
                <div className="flex items-end gap-1.5 h-24">
                  {demoBars.map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end">
                      <div
                        className="rounded-t-md bg-gradient-to-t from-brand-600 to-sky-400"
                        style={{ height: `${h}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className={`${mode.card} border rounded-lg p-4`}>
                <div className={`text-sm font-semibold mb-3 ${mode.title}`}>Счета и кассы</div>
                {demoAccounts.map((a) => (
                  <div
                    key={a.n}
                    className={`flex justify-between py-1.5 border-b ${mode.rowBorder} last:border-0 text-[13px] ${mode.text}`}
                  >
                    <span>{a.n}</span>
                    <span className={`font-medium ${mode.title}`}>{a.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">
          <ArrowLeft size={16} /> Назад
        </button>
        <button
          onClick={onLaunch}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold shadow-md"
        >
          <Rocket size={18} /> Создать мою систему
        </button>
      </div>
    </div>
  );
}

/** Пункт меню в живом дашборде: перетаскивание + переименование «на месте» */
function NavEditRow({
  module,
  name,
  theme,
  onRename,
  dragging,
  over,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: {
  module: ModuleDef;
  name: string;
  theme: Theme;
  onRename: (name: string) => void;
  dragging: boolean;
  over: boolean;
  onDragStart: () => void;
  onDragOver: () => void;
  onDrop: () => void;
  onDragEnd: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);
  const Icon = module.icon;

  const commit = () => {
    onRename(draft);
    setEditing(false);
  };

  return (
    <div
      draggable={!editing}
      onDragStart={onDragStart}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver();
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop();
      }}
      onDragEnd={onDragEnd}
      className={`group flex items-center gap-1.5 px-2 py-1.5 rounded transition ${
        dragging ? "opacity-40" : over ? "ring-1 ring-brand-400" : theme.hover
      } ${editing ? "" : "cursor-grab active:cursor-grabbing"}`}
    >
      <GripVertical size={12} className={`shrink-0 ${theme.muted}`} />
      <Icon size={14} className="shrink-0" />
      {editing ? (
        <>
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && commit()}
            onBlur={commit}
            className="flex-1 min-w-0 text-slate-900 bg-white border border-brand-400 rounded px-1.5 py-0.5 text-xs focus:outline-none"
          />
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={commit}
            className="shrink-0 text-emerald-400 hover:text-emerald-300"
            title="Сохранить"
          >
            <Check size={13} />
          </button>
        </>
      ) : (
        <>
          <span className="flex-1 truncate">{name}</span>
          <button
            onClick={() => {
              setDraft(name);
              setEditing(true);
            }}
            className={`shrink-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 ${theme.muted} hover:opacity-100`}
            title="Переименовать"
          >
            <Pencil size={12} />
          </button>
        </>
      )}
    </div>
  );
}
