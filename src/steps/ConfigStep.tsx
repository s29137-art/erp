import { useState } from "react";
import { BuilderConfig } from "../App";
import { AccountRow, CategoryRow, ServiceRow } from "../data/templates";
import { ArrowLeft, ArrowRight, Plus, Trash2, Landmark, FolderTree, CalendarClock, Ruler, UserCog } from "lucide-react";

type TabId = "accounts" | "categories" | "services" | "stages" | "positions";

export default function ConfigStep({
  enabled,
  config,
  setConfig,
  onNext,
  onBack,
}: {
  enabled: string[];
  config: BuilderConfig;
  setConfig: (c: BuilderConfig) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const tabs: { id: TabId; label: string; icon: typeof Landmark; show: boolean }[] = [
    { id: "accounts", label: "Счета", icon: Landmark, show: true },
    { id: "categories", label: "Категории расходов", icon: FolderTree, show: true },
    { id: "services", label: "Услуги", icon: CalendarClock, show: enabled.includes("s1") },
    { id: "stages", label: "Этапы проектов", icon: Ruler, show: enabled.includes("s6") },
    { id: "positions", label: "Должности", icon: UserCog, show: enabled.includes("b3") },
  ];
  const visible = tabs.filter((t) => t.show);
  const [tab, setTab] = useState<TabId>("accounts");

  const inputCls =
    "border border-slate-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Настройте справочники</h1>
      <p className="text-slate-500 mb-5">
        Мы уже заполнили всё типовыми данными вашей отрасли — поправьте под себя.
        Любой справочник можно изменить и после запуска.
      </p>

      <div className="flex gap-2 mb-4 flex-wrap">
        {visible.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                tab === t.id ? "bg-brand-600 text-white" : "bg-white border border-slate-200 hover:border-slate-300"
              }`}
            >
              <Icon size={15} /> {t.label}
            </button>
          );
        })}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 min-h-[300px]">
        {/* Счета */}
        {tab === "accounts" && (
          <div className="space-y-2">
            <div className="overflow-x-auto -mx-1 px-1">
            <div className="min-w-[340px] space-y-2">
            <div className="grid grid-cols-[1fr_140px_40px] gap-2 text-xs font-semibold text-slate-500 px-1">
              <span>Название счёта</span>
              <span>Комиссия, %</span>
              <span />
            </div>
            {config.accounts.map((a, i) => (
              <div key={i} className="grid grid-cols-[1fr_140px_40px] gap-2">
                <input
                  className={inputCls}
                  value={a.name}
                  onChange={(e) => {
                    const next = [...config.accounts];
                    next[i] = { ...a, name: e.target.value };
                    setConfig({ ...config, accounts: next });
                  }}
                />
                <input
                  className={inputCls}
                  type="number"
                  step="0.05"
                  value={a.commission}
                  onChange={(e) => {
                    const next = [...config.accounts];
                    next[i] = { ...a, commission: Number(e.target.value) };
                    setConfig({ ...config, accounts: next });
                  }}
                />
                <button
                  onClick={() =>
                    setConfig({ ...config, accounts: config.accounts.filter((_, j) => j !== i) })
                  }
                  className="text-slate-400 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            </div>
            </div>
            <AddBtn
              onClick={() =>
                setConfig({
                  ...config,
                  accounts: [...config.accounts, { name: "Новый счёт", commission: 0 } as AccountRow],
                })
              }
              label="Добавить счёт"
            />
            <p className="text-xs text-slate-400 pt-2">
              Комиссия эквайринга будет автоматически учитываться в каждой операции.
            </p>
          </div>
        )}

        {/* Категории */}
        {tab === "categories" && (
          <div className="space-y-2">
            <div className="overflow-x-auto -mx-1 px-1">
            <div className="min-w-[380px] space-y-2">
            <div className="grid grid-cols-[1fr_180px_40px] gap-2 text-xs font-semibold text-slate-500 px-1">
              <span>Категория</span>
              <span>Группа (для ДДС и ОПиУ)</span>
              <span />
            </div>
            {config.categories.map((c, i) => (
              <div key={i} className="grid grid-cols-[1fr_180px_40px] gap-2">
                <input
                  className={inputCls}
                  value={c.name}
                  onChange={(e) => {
                    const next = [...config.categories];
                    next[i] = { ...c, name: e.target.value };
                    setConfig({ ...config, categories: next });
                  }}
                />
                <select
                  className={inputCls + " bg-white"}
                  value={c.group}
                  onChange={(e) => {
                    const next = [...config.categories];
                    next[i] = { ...c, group: e.target.value as CategoryRow["group"] };
                    setConfig({ ...config, categories: next });
                  }}
                >
                  <option>Доход</option>
                  <option>Постоянные</option>
                  <option>Переменные</option>
                  <option>Капитальные</option>
                </select>
                <button
                  onClick={() =>
                    setConfig({ ...config, categories: config.categories.filter((_, j) => j !== i) })
                  }
                  className="text-slate-400 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            </div>
            </div>
            <AddBtn
              onClick={() =>
                setConfig({
                  ...config,
                  categories: [...config.categories, { name: "Новая категория", group: "Переменные" }],
                })
              }
              label="Добавить категорию"
            />
            <p className="text-xs text-slate-400 pt-2">
              Группа определяет, в какую строку отчётов ДДС и ОПиУ попадёт операция. Отчёты
              перестроятся автоматически.
            </p>
          </div>
        )}

        {/* Услуги */}
        {tab === "services" && (
          <div className="space-y-2">
            <div className="overflow-x-auto -mx-1 px-1">
            <div className="min-w-[460px] space-y-2">
            <div className="grid grid-cols-[1fr_120px_140px_40px] gap-2 text-xs font-semibold text-slate-500 px-1">
              <span>Услуга</span>
              <span>Минут</span>
              <span>Цена, ₸</span>
              <span />
            </div>
            {config.services.map((s, i) => (
              <div key={i} className="grid grid-cols-[1fr_120px_140px_40px] gap-2">
                <input
                  className={inputCls}
                  value={s.name}
                  onChange={(e) => {
                    const next = [...config.services];
                    next[i] = { ...s, name: e.target.value };
                    setConfig({ ...config, services: next });
                  }}
                />
                <input
                  className={inputCls}
                  type="number"
                  value={s.duration}
                  onChange={(e) => {
                    const next = [...config.services];
                    next[i] = { ...s, duration: Number(e.target.value) };
                    setConfig({ ...config, services: next });
                  }}
                />
                <input
                  className={inputCls}
                  type="number"
                  value={s.price}
                  onChange={(e) => {
                    const next = [...config.services];
                    next[i] = { ...s, price: Number(e.target.value) };
                    setConfig({ ...config, services: next });
                  }}
                />
                <button
                  onClick={() =>
                    setConfig({ ...config, services: config.services.filter((_, j) => j !== i) })
                  }
                  className="text-slate-400 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            </div>
            </div>
            <AddBtn
              onClick={() =>
                setConfig({
                  ...config,
                  services: [...config.services, { name: "Новая услуга", duration: 60, price: 10000 } as ServiceRow],
                })
              }
              label="Добавить услугу"
            />
          </div>
        )}

        {/* Этапы */}
        {tab === "stages" && (
          <div className="space-y-2 max-w-md">
            {config.stages.map((s, i) => (
              <div key={i} className="flex gap-2 items-center">
                <span className="w-6 text-sm text-slate-400 text-right">{i + 1}.</span>
                <input
                  className={inputCls + " flex-1"}
                  value={s}
                  onChange={(e) => {
                    const next = [...config.stages];
                    next[i] = e.target.value;
                    setConfig({ ...config, stages: next });
                  }}
                />
                <button
                  onClick={() => setConfig({ ...config, stages: config.stages.filter((_, j) => j !== i) })}
                  className="text-slate-400 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <AddBtn
              onClick={() => setConfig({ ...config, stages: [...config.stages, "Новый этап"] })}
              label="Добавить этап"
            />
            <p className="text-xs text-slate-400 pt-2">
              Каждый ваш проект будет проходить эти этапы по порядку.
            </p>
          </div>
        )}

        {/* Должности */}
        {tab === "positions" && (
          <div className="space-y-2 max-w-md">
            {config.positions.map((p, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  className={inputCls + " flex-1"}
                  value={p}
                  onChange={(e) => {
                    const next = [...config.positions];
                    next[i] = e.target.value;
                    setConfig({ ...config, positions: next });
                  }}
                />
                <button
                  onClick={() =>
                    setConfig({ ...config, positions: config.positions.filter((_, j) => j !== i) })
                  }
                  className="text-slate-400 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <AddBtn
              onClick={() => setConfig({ ...config, positions: [...config.positions, "Новая должность"] })}
              label="Добавить должность"
            />
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">
          <ArrowLeft size={16} /> Назад
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-5 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700"
        >
          Предпросмотр <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function AddBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 mt-1"
    >
      <Plus size={15} /> {label}
    </button>
  );
}
