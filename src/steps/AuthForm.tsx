import { useState } from "react";
import { X, ArrowRight, ShieldCheck, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import {
  Lead,
  AuthUser,
  identifierKind,
  toLoginEmail,
  accountExists,
  signIn,
  signUp,
} from "../lib/auth";

const NICHES = [
  "Услуги / салон красоты",
  "Общепит / кафе / ресторан",
  "Розница / магазин",
  "Опт / дистрибуция",
  "Производство",
  "Строительство / проекты",
  "Услуги B2B / агентство",
  "Другое",
];

const TURNOVERS = [
  "До 1 млн ₸ / мес",
  "1–5 млн ₸ / мес",
  "5–20 млн ₸ / мес",
  "20–50 млн ₸ / мес",
  "Более 50 млн ₸ / мес",
];

type Phase = "id" | "login" | "signup";

const inputCls =
  "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500";

function PwInput({
  value,
  onChange,
  placeholder,
  show,
  onToggle,
  autoFocus,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  show: boolean;
  onToggle: () => void;
  autoFocus?: boolean;
}) {
  return (
    <div className="relative">
      <input
        autoFocus={autoFocus}
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${inputCls} pr-10`}
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
        aria-label={show ? "Скрыть пароль" : "Показать пароль"}
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

export default function AuthForm({
  onAuthed,
  onClose,
}: {
  onAuthed: (user: AuthUser) => void;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("id");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPw, setShowPw] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [niche, setNiche] = useState("");
  const [turnover, setTurnover] = useState("");
  const [reason, setReason] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const kind = identifierKind(identifier);
  const phoneOk = phone.replace(/\D/g, "").length >= 10;

  const goSignup = () => {
    if (kind === "phone") setPhone(identifier.trim());
    setPhase("signup");
    setError(null);
  };

  const submitId = async () => {
    if (!kind) {
      setError("Введите корректный email или номер телефона");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const exists = await accountExists(toLoginEmail(identifier));
      if (exists) {
        setPhase("login");
      } else {
        goSignup();
      }
    } finally {
      setLoading(false);
    }
  };

  const submitLogin = async () => {
    if (password.length < 1) {
      setError("Введите пароль");
      return;
    }
    setError(null);
    setLoading(true);
    const res = await signIn(toLoginEmail(identifier), password, identifier.trim());
    setLoading(false);
    if ("error" in res) setError(res.error);
    else onAuthed(res.user);
  };

  const signupValid =
    password.length >= 6 &&
    password === password2 &&
    name.trim().length >= 2 &&
    phoneOk &&
    niche !== "" &&
    turnover !== "";

  const submitSignup = async () => {
    if (!signupValid) {
      setError("Заполните все поля. Пароль — минимум 6 символов и должен совпадать.");
      return;
    }
    setError(null);
    setLoading(true);
    const lead: Lead = {
      name: name.trim(),
      phone: phone.trim(),
      niche,
      turnover,
      reason: reason.trim(),
    };
    const res = await signUp({
      loginEmail: toLoginEmail(identifier),
      displayId: identifier.trim(),
      password,
      lead,
    });
    setLoading(false);
    if ("error" in res) setError(res.error);
    else onAuthed(res.user);
  };

  const togglePw = () => setShowPw((s) => !s);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label="Закрыть"
        >
          <X size={18} />
        </button>

        <div className="p-6 sm:p-7">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold shrink-0">
              E
            </div>
            <span className="font-semibold text-lg">
              {phase === "login"
                ? "Вход в систему"
                : phase === "signup"
                ? "Создание аккаунта"
                : "Вход или регистрация"}
            </span>
          </div>

          {/* ── Шаг 1: идентификатор ── */}
          {phase === "id" && (
            <>
              <p className="text-sm text-slate-500 mb-5">
                Введите телефон или email. Если вы впервые — придумаете пароль, если уже
                были — войдёте по нему.
              </p>
              <label className="block text-sm font-medium mb-1">Телефон или Email</label>
              <input
                autoFocus
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitId()}
                placeholder="+7 (___) ___-__-__  или  you@mail.com"
                className={inputCls}
              />
              {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
              <button
                onClick={submitId}
                disabled={loading}
                className="mt-5 w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:opacity-50 font-semibold transition"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <>Далее <ArrowRight size={18} /></>}
              </button>
            </>
          )}

          {/* ── Шаг 2a: вход существующего ── */}
          {phase === "login" && (
            <>
              <p className="text-sm text-slate-500 mb-5">
                С возвращением! Введите пароль для{" "}
                <span className="font-medium text-slate-700">{identifier.trim()}</span>.
              </p>
              <label className="block text-sm font-medium mb-1">Пароль</label>
              <PwInput
                value={password}
                onChange={setPassword}
                placeholder="Ваш пароль"
                show={showPw}
                onToggle={togglePw}
                autoFocus
              />
              {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
              <button
                onClick={submitLogin}
                disabled={loading}
                className="mt-5 w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:opacity-50 font-semibold transition"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : "Войти"}
              </button>
              <div className="mt-4 flex items-center justify-between text-sm">
                <button
                  onClick={() => {
                    setPhase("id");
                    setPassword("");
                    setError(null);
                  }}
                  className="flex items-center gap-1 text-slate-500 hover:text-slate-700"
                >
                  <ArrowLeft size={14} /> Изменить
                </button>
                <button onClick={goSignup} className="text-brand-600 hover:underline">
                  Создать новый аккаунт
                </button>
              </div>
            </>
          )}

          {/* ── Шаг 2b: регистрация нового ── */}
          {phase === "signup" && (
            <>
              <p className="text-sm text-slate-500 mb-5">
                Создайте пароль и расскажите о бизнесе — подберём конфигурацию под вас.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Пароль *</label>
                  <PwInput
                    value={password}
                    onChange={setPassword}
                    placeholder="Минимум 6 символов"
                    show={showPw}
                    onToggle={togglePw}
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Повторите пароль *</label>
                  <PwInput
                    value={password2}
                    onChange={setPassword2}
                    placeholder="Ещё раз пароль"
                    show={showPw}
                    onToggle={togglePw}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ваше имя *</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Например: Айгерим"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Номер телефона *</label>
                  <input
                    type="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ниша / сфера бизнеса *</label>
                  <select
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className={`${inputCls} bg-white ${niche === "" ? "text-slate-400" : ""}`}
                  >
                    <option value="" disabled>
                      Выберите нишу
                    </option>
                    {NICHES.map((n) => (
                      <option key={n} value={n} className="text-slate-900">
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Оборот в месяц *</label>
                  <select
                    value={turnover}
                    onChange={(e) => setTurnover(e.target.value)}
                    className={`${inputCls} bg-white ${turnover === "" ? "text-slate-400" : ""}`}
                  >
                    <option value="" disabled>
                      Выберите диапазон
                    </option>
                    {TURNOVERS.map((t) => (
                      <option key={t} value={t} className="text-slate-900">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Почему хотите внедрить систему?
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={2}
                    placeholder="Например: нет учёта денег, хаос в заказах…"
                    className={`${inputCls} resize-none`}
                  />
                </div>
              </div>
              {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}
              <button
                onClick={submitSignup}
                disabled={loading}
                className="mt-5 w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:opacity-50 font-semibold transition"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>Создать аккаунт и продолжить <ArrowRight size={18} /></>
                )}
              </button>
              <div className="mt-4 flex items-center justify-between text-sm">
                <button
                  onClick={() => {
                    setPhase("id");
                    setError(null);
                  }}
                  className="flex items-center gap-1 text-slate-500 hover:text-slate-700"
                >
                  <ArrowLeft size={14} /> Назад
                </button>
                <button
                  onClick={() => {
                    setPhase("login");
                    setError(null);
                  }}
                  className="text-brand-600 hover:underline"
                >
                  Уже есть аккаунт? Войти
                </button>
              </div>
            </>
          )}

          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400">
            <ShieldCheck size={13} /> Данные защищены и используются только для входа и связи
          </div>
        </div>
      </div>
    </div>
  );
}
