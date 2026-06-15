import { useEffect, useState } from "react";
import { TEMPLATES, Template, AccountRow, ServiceRow, CategoryRow } from "./data/templates";
import { CORE_IDS, MODULES } from "./data/modules";
import LandingStep from "./steps/LandingStep";
import AuthForm from "./steps/AuthForm";
import { AuthUser, getCurrentUser, signOut } from "./lib/auth";
import TemplateStep from "./steps/TemplateStep";
import CompanyStep from "./steps/CompanyStep";
import ModulesStep from "./steps/ModulesStep";
import ConfigStep from "./steps/ConfigStep";
import PreviewStep from "./steps/PreviewStep";
import SystemShell from "./steps/SystemShell";
import { Check, LogOut } from "lucide-react";

export interface CompanyInfo {
  name: string;
  city: string;
  currency: string;
  lang: string;
  logo: string | null; // data-URL загруженного логотипа
}

export interface BuilderConfig {
  accounts: AccountRow[];
  categories: CategoryRow[];
  services: ServiceRow[];
  stages: string[];
  positions: string[];
}

/** Персонализация интерфейса будущей системы */
export interface Customization {
  themeId: string;
  mode: "light" | "dark"; // рабочая область
  names: Record<string, string>; // moduleId → своё название раздела
  order: string[]; // порядок пунктов меню
}

const STEPS = ["Шаблон", "Компания", "Модули", "Настройка", "Запуск"];

export default function App() {
  const [started, setStarted] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [step, setStep] = useState(0);
  const [launched, setLaunched] = useState(false);
  const [template, setTemplate] = useState<Template | null>(null);
  const [company, setCompany] = useState<CompanyInfo>({
    name: "",
    city: "Алматы",
    currency: "₸ Тенге",
    lang: "Русский",
    logo: null,
  });
  const [enabled, setEnabled] = useState<string[]>([...CORE_IDS]);
  const [config, setConfig] = useState<BuilderConfig>({
    accounts: [],
    categories: [],
    services: [],
    stages: [],
    positions: [],
  });
  const [custom, setCustom] = useState<Customization>({
    themeId: "graphite",
    mode: "light",
    names: {},
    order: MODULES.map((m) => m.id),
  });

  // Восстановить сессию при загрузке
  useEffect(() => {
    getCurrentUser().then((u) => u && setUser(u));
  }, []);

  const applyTemplate = (t: Template) => {
    setTemplate(t);
    setEnabled([...CORE_IDS, ...t.modules]);
    setConfig({
      accounts: [...t.accounts],
      categories: [...t.categories],
      services: [...t.services],
      stages: [...t.stages],
      positions: [...t.positions],
    });
    setStep(1);
  };

  const handleStart = () => {
    if (user) setStarted(true);
    else setShowAuth(true);
  };

  const handleAuthed = (u: AuthUser) => {
    setUser(u);
    setShowAuth(false);
    setStarted(true);
  };

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    setStarted(false);
    setLaunched(false);
    setStep(0);
  };

  if (!started) {
    return (
      <>
        <LandingStep onStart={handleStart} />
        {showAuth && (
          <AuthForm onAuthed={handleAuthed} onClose={() => setShowAuth(false)} />
        )}
      </>
    );
  }

  if (launched) {
    return (
      <SystemShell
        company={company}
        enabled={enabled}
        config={config}
        custom={custom}
        onBack={() => setLaunched(false)}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Шапка */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <button
            onClick={() => setStarted(false)}
            className="flex items-center gap-2 min-w-0 hover:opacity-80 transition"
          >
            <div className="w-8 h-8 shrink-0 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold">
              E
            </div>
            <span className="font-semibold text-base sm:text-lg leading-tight text-left">
              Конструктор финансовых учётных записей
            </span>
          </button>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-sm text-slate-500 hidden lg:block">
              Соберите систему учёта за 15 минут — без программиста
            </span>
            {user && (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-flex items-center gap-1.5 text-sm text-slate-600">
                  <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-semibold">
                    {(user.name.trim()[0] || "К").toUpperCase()}
                  </span>
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 px-2 py-1 rounded-lg hover:bg-slate-100"
                >
                  <LogOut size={15} /> Выйти
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Прогресс */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-1 sm:gap-3 overflow-x-auto">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-1 sm:gap-3 shrink-0">
              <button
                onClick={() => i < step && setStep(i)}
                className={`flex items-center gap-2 px-2 py-1 rounded-full text-sm ${
                  i === step
                    ? "bg-brand-600 text-white"
                    : i < step
                    ? "text-brand-600 hover:bg-brand-50 cursor-pointer"
                    : "text-slate-400 cursor-default"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold ${
                    i === step
                      ? "bg-white text-brand-600"
                      : i < step
                      ? "bg-brand-100 text-brand-700"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {i < step ? <Check size={12} /> : i + 1}
                </span>
                {label}
              </button>
              {i < STEPS.length - 1 && <div className="w-4 sm:w-8 h-px bg-slate-300" />}
            </div>
          ))}
        </div>
      </div>

      {/* Контент шага */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {step === 0 && <TemplateStep templates={TEMPLATES} onSelect={applyTemplate} />}
        {step === 1 && (
          <CompanyStep
            company={company}
            setCompany={setCompany}
            onNext={() => setStep(2)}
            onBack={() => setStep(0)}
          />
        )}
        {step === 2 && (
          <ModulesStep
            enabled={enabled}
            setEnabled={setEnabled}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <ConfigStep
            enabled={enabled}
            config={config}
            setConfig={setConfig}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}
        {step === 4 && (
          <PreviewStep
            company={company}
            template={template}
            enabled={enabled}
            config={config}
            custom={custom}
            setCustom={setCustom}
            onLaunch={() => setLaunched(true)}
            onBack={() => setStep(3)}
          />
        )}
      </main>
    </div>
  );
}
