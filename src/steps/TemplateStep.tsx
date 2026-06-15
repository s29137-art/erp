import { Template } from "../data/templates";
import { MODULE_MAP } from "../data/modules";
import { Wallet, ChevronRight } from "lucide-react";

export default function TemplateStep({
  templates,
  onSelect,
}: {
  templates: Template[];
  onSelect: (t: Template) => void;
}) {
  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold mb-1">Чем занимается ваш бизнес?</h1>
      <p className="text-slate-500 mb-6">
        Выберите шаблон — мы включим нужные модули и заполним справочники. Всё можно
        поменять на следующих шагах.
      </p>

      <div className="flex flex-col gap-3">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t)}
            className="group w-full text-left bg-white border border-slate-200 rounded-xl p-4 sm:p-5 hover:border-brand-500 hover:shadow-md transition flex items-start gap-3 sm:gap-4"
          >
            <div className="text-2xl sm:text-3xl shrink-0 leading-none mt-0.5">{t.emoji}</div>

            <div className="flex-1 min-w-0">
              <div className="font-semibold group-hover:text-brand-600">{t.name}</div>
              <div className="text-sm text-slate-500 mt-0.5">{t.desc}</div>

              <div className="flex flex-wrap gap-1 mt-2.5">
                <span className="inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                  <Wallet size={11} /> Финучёт
                </span>
                {t.modules.slice(0, 3).map((id) => {
                  const m = MODULE_MAP[id];
                  if (!m) return null;
                  const Icon = m.icon;
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full"
                    >
                      <Icon size={11} /> {m.name}
                    </span>
                  );
                })}
                {t.modules.length > 3 && (
                  <span className="text-xs text-slate-400 px-1 py-0.5">
                    +{t.modules.length - 3}
                  </span>
                )}
              </div>
            </div>

            <ChevronRight
              size={20}
              className="hidden sm:block shrink-0 self-center text-slate-300 group-hover:text-brand-500 transition"
            />
          </button>
        ))}
      </div>

      <p className="text-sm text-slate-400 mt-6">
        Финансовый учёт по методологии профессионального финансиста (ДДС, ОПиУ,
        платёжный календарь) входит в каждый шаблон.
      </p>
    </div>
  );
}
