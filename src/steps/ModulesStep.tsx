import { useState } from "react";
import {
  MODULES,
  MODULE_MAP,
  LAYER_TITLES,
  Layer,
  collectDeps,
  dependents,
} from "../data/modules";
import { ArrowLeft, ArrowRight, Lock, Link2 } from "lucide-react";

export default function ModulesStep({
  enabled,
  setEnabled,
  onNext,
  onBack,
}: {
  enabled: string[];
  setEnabled: (ids: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [notice, setNotice] = useState<string | null>(null);

  const toggle = (id: string) => {
    const m = MODULE_MAP[id];
    if (m.locked) return;

    if (enabled.includes(id)) {
      // выключение: проверяем зависимые
      const deps = dependents(id, enabled);
      if (deps.length > 0) {
        const names = deps.map((d) => MODULE_MAP[d].name).join(", ");
        if (
          !window.confirm(
            `От модуля «${m.name}» зависят: ${names}.\nОни будут выключены вместе с ним. Продолжить?`
          )
        )
          return;
        setEnabled(enabled.filter((e) => e !== id && !deps.includes(e)));
        setNotice(`Выключены: ${m.name}, ${names}`);
      } else {
        setEnabled(enabled.filter((e) => e !== id));
        setNotice(null);
      }
    } else {
      // включение: добавляем зависимости
      const needed = [...collectDeps(id)].filter((d) => !enabled.includes(d));
      setEnabled([...enabled, id, ...needed]);
      if (needed.length > 0) {
        setNotice(
          `Вместе с «${m.name}» включены необходимые модули: ${needed
            .map((d) => MODULE_MAP[d].name)
            .join(", ")}`
        );
      } else {
        setNotice(null);
      }
    }
  };

  const layers: Layer[] = ["finance", "business", "industry"];
  const count = enabled.length;

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold mb-1">Соберите свою систему</h1>
      <p className="text-slate-500 mb-4">
        Включайте и выключайте модули. Связанные модули подключатся автоматически —
        система сама следит за зависимостями.
      </p>

      {notice && (
        <div className="mb-4 flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-700 text-sm rounded-lg px-4 py-2">
          <Link2 size={16} /> {notice}
        </div>
      )}

      {layers.map((layer) => (
        <section key={layer} className="mb-8">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            {LAYER_TITLES[layer]}
          </h2>
          <div className="flex flex-col gap-2.5">
            {MODULES.filter((m) => m.layer === layer).map((m) => {
              const on = enabled.includes(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => toggle(m.id)}
                  className={`w-full text-left rounded-xl border p-3.5 sm:p-4 transition flex items-center gap-3 sm:gap-4 ${
                    m.locked
                      ? "bg-emerald-50/60 border-emerald-200 cursor-default"
                      : on
                      ? "bg-white border-brand-500 ring-1 ring-brand-500 shadow-sm"
                      : "bg-white border-slate-200 hover:border-slate-300 opacity-75"
                  }`}
                >
                  <span
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      m.locked ? "bg-emerald-100 text-emerald-700" : on ? "bg-brand-50 text-brand-600" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <m.icon size={20} />
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{m.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{m.desc}</div>
                    {m.deps.length > 0 && (
                      <div className="text-[11px] text-slate-400 mt-1">
                        Требует: {m.deps.map((d) => MODULE_MAP[d].name).join(", ")}
                      </div>
                    )}
                  </div>

                  <div className="shrink-0">
                    {m.locked ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                        <Lock size={10} /> в ядре
                      </span>
                    ) : (
                      <span
                        className={`block w-9 h-5 rounded-full p-0.5 transition ${
                          on ? "bg-brand-600" : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`block w-4 h-4 bg-white rounded-full transition-transform ${
                            on ? "translate-x-4" : ""
                          }`}
                        />
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ))}

      <div className="flex justify-between items-center mt-2">
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">
          <ArrowLeft size={16} /> Назад
        </button>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500">Выбрано модулей: {count}</span>
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-5 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700"
          >
            Настроить <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
