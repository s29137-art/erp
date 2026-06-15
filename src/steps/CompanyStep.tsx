import { useRef } from "react";
import { CompanyInfo } from "../App";
import { ArrowLeft, ArrowRight, Upload, X, ImageIcon } from "lucide-react";

const CITIES = ["Алматы", "Астана", "Шымкент", "Тараз", "Туркестан", "Қызылорда", "Караганда", "Актобе"];

export default function CompanyStep({
  company,
  setCompany,
  onNext,
  onBack,
}: {
  company: CompanyInfo;
  setCompany: (c: CompanyInfo) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const valid = company.name.trim().length >= 2;
  const fileRef = useRef<HTMLInputElement>(null);

  const handleLogo = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Выберите файл изображения (PNG, JPG, SVG)");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Файл слишком большой — максимум 2 МБ");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setCompany({ ...company, logo: reader.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-1">Расскажите о компании</h1>
      <p className="text-slate-500 mb-6">Эти данные появятся в шапке вашей системы и в отчётах.</p>

      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
        {/* Логотип */}
        <div>
          <label className="block text-sm font-medium mb-2">Логотип</label>
          <div className="flex items-center gap-4">
            {company.logo ? (
              <div className="relative">
                <img
                  src={company.logo}
                  alt="Логотип"
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200 bg-white"
                />
                <button
                  onClick={() => setCompany({ ...company, logo: null })}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-slate-700 text-white rounded-full flex items-center justify-center hover:bg-red-500"
                  title="Удалить логотип"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-xl bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                {company.name.trim() ? (
                  <span className="text-xl font-bold text-slate-500">
                    {company.name.trim()[0].toUpperCase()}
                  </span>
                ) : (
                  <ImageIcon size={22} />
                )}
              </div>
            )}
            <div>
              <button
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                <Upload size={15} /> {company.logo ? "Заменить" : "Загрузить"}
              </button>
              <p className="text-xs text-slate-400 mt-1">PNG, JPG или SVG, до 2 МБ</p>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                handleLogo(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Название компании *</label>
          <input
            autoFocus
            value={company.name}
            onChange={(e) => setCompany({ ...company, name: e.target.value })}
            placeholder='Например: «Салон Айгерим»'
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Город</label>
          <select
            value={company.city}
            onChange={(e) => setCompany({ ...company, city: e.target.value })}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white"
          >
            {CITIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Валюта</label>
            <select
              value={company.currency}
              onChange={(e) => setCompany({ ...company, currency: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white"
            >
              <option>₸ Тенге</option>
              <option>$ Доллар</option>
              <option>₽ Рубль</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Язык</label>
            <select
              value={company.lang}
              onChange={(e) => setCompany({ ...company, lang: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white"
            >
              <option>Русский</option>
              <option>Қазақша</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">
          <ArrowLeft size={16} /> Назад
        </button>
        <button
          onClick={onNext}
          disabled={!valid}
          className="flex items-center gap-2 px-5 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Далее <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
