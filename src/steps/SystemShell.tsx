import { useState } from "react";
import { BuilderConfig, CompanyInfo, Customization } from "../App";
import { MODULES, ModuleDef } from "../data/modules";
import { THEMES, THEME_MAP, workMode, WorkMode } from "../data/themes";
import { Settings, ArrowLeft, Plus, LayoutDashboard, Sun, Moon, Menu, X } from "lucide-react";

export default function SystemShell({
  company,
  enabled,
  config,
  custom,
  onBack,
}: {
  company: CompanyInfo;
  enabled: string[];
  config: BuilderConfig;
  custom: Customization;
  onBack: () => void;
}) {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modeId, setModeId] = useState<"light" | "dark">(custom.mode);
  const theme = THEME_MAP[custom.themeId] ?? THEMES[0];
  const mode = workMode(theme.id, modeId);
  const byOrder = (a: ModuleDef, b: ModuleDef) =>
    custom.order.indexOf(a.id) - custom.order.indexOf(b.id);
  const enabledModules = MODULES.filter((m) => enabled.includes(m.id)).sort(byOrder);
  const finance = enabledModules.filter((m) => m.layer === "finance");
  const rest = enabledModules.filter((m) => m.layer !== "finance");
  const displayName = (m: ModuleDef) => custom.names[m.id] ?? m.name;
  const fmt = (n: number) => n.toLocaleString("ru-RU") + " ₸";

  const activeModule = enabledModules.find((m) => m.id === active);

  const select = (id: string) => {
    setActive(id);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Затемнение под выехавшим меню (только мобильные) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      {/* Сайдбар: статичный на десктопе, выезжающий на мобильных */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-60 max-w-[80vw] transform transition-transform duration-200 md:static md:z-auto md:translate-x-0 md:max-w-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${theme.sidebar} ${theme.text} flex flex-col`}
      >
        <div className={`relative p-4 border-b ${theme.border}`}>
          <button
            onClick={() => setSidebarOpen(false)}
            className={`md:hidden absolute top-3 right-3 p-1 rounded ${theme.hover}`}
            aria-label="Закрыть меню"
          >
            <X size={18} />
          </button>
          <div className="flex items-center gap-3">
            {company.logo ? (
              <img
                src={company.logo}
                alt="Логотип"
                className="w-10 h-10 rounded-lg object-cover shrink-0 bg-white"
              />
            ) : (
              <div className={`w-10 h-10 rounded-lg ${theme.activeBg} flex items-center justify-center font-bold text-lg shrink-0`}>
                {(company.name.trim()[0] || "К").toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <div className={`${theme.header} font-bold truncate`}>
                {company.name || "Моя компания"}
              </div>
              <div className={`text-xs ${theme.muted} truncate`}>
                {company.city} · {company.currency}
              </div>
            </div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-2 text-sm">
          <NavItem
            icon={<LayoutDashboard size={15} />}
            label="Дашборд"
            active={active === "dashboard"}
            theme={theme}
            onClick={() => select("dashboard")}
          />
          <div className={`text-[10px] uppercase ${theme.muted} mt-3 mb-1 px-2`}>Финансы</div>
          {finance.map((m) => (
            <NavItem
              key={m.id}
              icon={<m.icon size={15} />}
              label={displayName(m)}
              active={active === m.id}
              theme={theme}
              onClick={() => select(m.id)}
            />
          ))}
          {rest.length > 0 && (
            <div className={`text-[10px] uppercase ${theme.muted} mt-3 mb-1 px-2`}>Модули</div>
          )}
          {rest.map((m) => (
            <NavItem
              key={m.id}
              icon={<m.icon size={15} />}
              label={displayName(m)}
              active={active === m.id}
              theme={theme}
              onClick={() => select(m.id)}
            />
          ))}
        </nav>
        <div className={`p-2 border-t ${theme.border} space-y-1`}>
          <button
            onClick={() => setModeId(modeId === "light" ? "dark" : "light")}
            className={`w-full flex items-center gap-2 px-2 py-2 rounded text-sm ${theme.hover}`}
          >
            {modeId === "light" ? <Moon size={15} /> : <Sun size={15} />}
            {modeId === "light" ? "Тёмная область" : "Светлая область"}
          </button>
          <button
            onClick={onBack}
            className={`w-full flex items-center gap-2 px-2 py-2 rounded text-sm ${theme.hover}`}
          >
            <Settings size={15} /> Конфигуратор
          </button>
          <button
            onClick={onBack}
            className={`w-full flex items-center gap-2 px-2 py-2 rounded text-sm ${theme.muted} ${theme.hover}`}
          >
            <ArrowLeft size={15} /> Выйти из демо
          </button>
        </div>
      </aside>

      {/* Контент */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Мобильная шапка с гамбургером */}
        <div className={`md:hidden flex items-center gap-3 px-4 py-3 border-b ${mode.card}`}>
          <button
            onClick={() => setSidebarOpen(true)}
            className={`p-1.5 -ml-1.5 rounded ${mode.title}`}
            aria-label="Открыть меню"
          >
            <Menu size={20} />
          </button>
          <span className={`font-semibold truncate ${mode.title}`}>
            {company.name || "Моя компания"}
          </span>
        </div>

        <main className={`flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto ${mode.main}`}>
        <div
          className={`mb-4 text-sm rounded-lg px-4 py-2 border ${
            modeId === "dark"
              ? "bg-amber-950/40 border-amber-900 text-amber-200"
              : "bg-amber-50 border-amber-200 text-amber-800"
          }`}
        >
          🎉 Ваша система создана и готова к работе. Сейчас она пустая — добавляйте данные,
          и здесь появятся ваши показатели.
        </div>

        {active === "dashboard" && (
          <div>
            <h1 className={`text-2xl font-bold mb-6 ${mode.title}`}>Дашборд</h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Kpi mode={mode} title="Остаток на счетах" value={fmt(0)} sub={`${config.accounts.length} счёта`} />
              <Kpi mode={mode} title="Выручка за месяц" value={fmt(0)} sub="нет операций" />
              <Kpi mode={mode} title="Расходы за месяц" value={fmt(0)} sub="нет операций" />
              <Kpi mode={mode} title="Прибыль (ОПиУ)" value={fmt(0)} sub="—" />
            </div>
            <div className="grid lg:grid-cols-2 gap-4">
              <div className={`${mode.card} border rounded-xl p-5`}>
                <div className={`font-semibold mb-3 ${mode.title}`}>Счета</div>
                {config.accounts.length === 0 ? (
                  <div className={`py-6 text-center text-sm ${mode.muted}`}>
                    Пока нет счетов
                  </div>
                ) : (
                  config.accounts.map((a, i) => (
                    <div key={i} className={`flex justify-between py-2 border-b ${mode.rowBorder} last:border-0 text-sm ${mode.text}`}>
                      <span>{a.name}</span>
                      <span className={`font-medium ${mode.title}`}>{fmt(0)}</span>
                    </div>
                  ))
                )}
              </div>
              <div className={`${mode.card} border rounded-xl p-5`}>
                <div className={`font-semibold mb-3 ${mode.title}`}>Ближайшие платежи</div>
                <div className={`py-6 text-center text-sm ${mode.muted}`}>
                  Пока нет запланированных платежей
                </div>
              </div>
            </div>
          </div>
        )}

        {activeModule && active !== "dashboard" && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <h1 className={`flex items-center gap-3 text-xl sm:text-2xl font-bold min-w-0 ${mode.title}`}>
                <activeModule.icon size={26} className={`shrink-0 ${mode.muted}`} />
                <span className="truncate">{displayName(activeModule)}</span>
              </h1>
              <button
                className={`flex items-center gap-2 px-4 py-2 ${theme.accentBtn} text-white rounded-lg text-sm`}
              >
                <Plus size={15} /> Добавить
              </button>
            </div>

            {/* Контент по типу модуля */}
            {active === "f1" && (
              <DataTable
                mode={mode}
                headers={["Счёт", "Комиссия", "Остаток"]}
                rows={config.accounts.map((a) => [a.name, a.commission + " %", fmt(0)])}
              />
            )}
            {active === "s1" && (
              <DataTable
                mode={mode}
                headers={["Услуга", "Длительность", "Цена"]}
                rows={config.services.map((s) => [s.name, s.duration + " мин", fmt(s.price)])}
              />
            )}
            {active === "s6" && (
              <DataTable
                mode={mode}
                headers={["№", "Этап проекта"]}
                rows={config.stages.map((s, i) => [String(i + 1), s])}
              />
            )}
            {active === "b3" && (
              <DataTable
                mode={mode}
                headers={["Должность", "Сотрудников"]}
                rows={config.positions.map((p) => [p, "—"])}
              />
            )}
            {!["f1", "s1", "s6", "b3"].includes(active) && (
              <div className={`${mode.card} border rounded-xl p-10 text-center ${mode.muted}`}>
                <activeModule.icon size={40} className={`mx-auto mb-3 ${mode.input}`} />
                <div className={`font-medium mb-1 ${mode.text}`}>{displayName(activeModule)}</div>
                <div className="text-sm max-w-md mx-auto">{activeModule.desc}</div>
                <div className="text-xs mt-4">
                  В рабочей версии здесь будет полный раздел — как в ваших действующих
                  ERP-проектах.
                </div>
              </div>
            )}
          </div>
        )}
        </main>
      </div>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active,
  theme,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  theme: { activeBg: string; hover: string };
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 text-left px-2 py-1.5 rounded truncate ${
        active ? theme.activeBg : theme.hover
      }`}
    >
      <span className="shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
}

function Kpi({
  mode,
  title,
  value,
  sub,
  good,
}: {
  mode: WorkMode;
  title: string;
  value: string;
  sub?: string;
  good?: boolean;
}) {
  return (
    <div className={`${mode.card} border rounded-xl p-4`}>
      <div className={`text-xs ${mode.muted}`}>{title}</div>
      <div className={`text-xl font-bold mt-1 ${mode.title}`}>{value}</div>
      {sub && <div className={`text-xs mt-1 ${good ? "text-emerald-500" : mode.muted}`}>{sub}</div>}
    </div>
  );
}

function DataTable({ mode, headers, rows }: { mode: WorkMode; headers: string[]; rows: string[][] }) {
  return (
    <div className={`${mode.card} border rounded-xl overflow-x-auto`}>
      <table className="w-full text-sm min-w-[420px]">
        <thead className={`${mode.tableHead} text-left`}>
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={headers.length} className={`px-4 py-8 text-center ${mode.muted}`}>
                Пока пусто — добавьте первую запись
              </td>
            </tr>
          )}
          {rows.map((r, i) => (
            <tr key={i} className={`border-t ${mode.rowBorder} ${mode.text}`}>
              {r.map((cell, j) => (
                <td key={j} className="px-4 py-2.5">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
