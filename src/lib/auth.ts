import { supabase } from "./supabase";

/** Маркетинговая анкета клиента (ниша, оборот и т.д.) */
export interface Lead {
  name: string;
  phone: string;
  niche: string;
  turnover: string;
  reason: string;
}

/** Авторизованный пользователь */
export interface AuthUser {
  id: string;
  name: string;
  loginEmail: string; // email для Supabase Auth (для телефона — псевдо-email)
  displayId: string; // что ввёл пользователь (email или телефон)
}

// Телефоны логиним через псевдо-email, чтобы не подключать SMS-провайдер
const PHONE_DOMAIN = "phone.erp.local";
const LS_USERS = "erp_users";
const LS_SESSION = "erp_session";
const LS_LEADS = "erp_leads";

export function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

/** Что ввёл пользователь: email, телефон или ничего корректного */
export function identifierKind(raw: string): "email" | "phone" | null {
  const v = raw.trim();
  if (!v) return null;
  if (isEmail(v)) return "email";
  if (v.replace(/\D/g, "").length >= 10) return "phone";
  return null;
}

/** Привести идентификатор к email-логину для Supabase Auth */
export function toLoginEmail(raw: string): string {
  const v = raw.trim();
  if (isEmail(v)) return v.toLowerCase();
  const digits = v.replace(/\D/g, "");
  return `${digits}@${PHONE_DOMAIN}`;
}

export const isPhoneEmail = (email: string) => email.endsWith(`@${PHONE_DOMAIN}`);

// ── Локальный резерв (когда Supabase не настроен) ──
interface LocalUser {
  password: string;
  name: string;
  lead: Lead;
}

function readUsers(): Record<string, LocalUser> {
  try {
    return JSON.parse(localStorage.getItem(LS_USERS) || "{}");
  } catch {
    return {};
  }
}

function writeUsers(u: Record<string, LocalUser>) {
  localStorage.setItem(LS_USERS, JSON.stringify(u));
}

function saveLeadLocal(lead: Lead) {
  try {
    const prev = JSON.parse(localStorage.getItem(LS_LEADS) || "[]");
    localStorage.setItem(
      LS_LEADS,
      JSON.stringify([...prev, { ...lead, at: new Date().toISOString() }])
    );
  } catch {
    /* ignore */
  }
}

async function saveLeadRow(lead: Lead) {
  if (!supabase) return saveLeadLocal(lead);
  const { error } = await supabase.from("leads").insert({
    name: lead.name,
    phone: lead.phone,
    niche: lead.niche,
    turnover: lead.turnover,
    reason: lead.reason,
  });
  if (error) {
    console.error("[supabase] не удалось сохранить заявку:", error.message);
    saveLeadLocal(lead);
  }
}

/** Есть ли уже аккаунт с таким логином (для «умного» входа) */
export async function accountExists(loginEmail: string): Promise<boolean> {
  if (supabase) {
    const { data, error } = await supabase.rpc("account_exists", { p_email: loginEmail });
    if (error) {
      // RPC не создан — не блокируем вход, считаем что аккаунта нет
      console.warn("[auth] account_exists недоступен:", error.message);
      return false;
    }
    return !!data;
  }
  return loginEmail in readUsers();
}

export interface SignUpInput {
  loginEmail: string;
  displayId: string;
  password: string;
  lead: Lead;
}

type AuthResult = { user: AuthUser } | { error: string };

/** Регистрация нового пользователя */
export async function signUp(input: SignUpInput): Promise<AuthResult> {
  const { loginEmail, displayId, password, lead } = input;

  if (supabase) {
    const { data, error } = await supabase.auth.signUp({
      email: loginEmail,
      password,
      options: {
        data: { name: lead.name, phone: lead.phone, niche: lead.niche, turnover: lead.turnover },
      },
    });
    if (error) return { error: error.message };
    await saveLeadRow(lead);
    if (!data.session) {
      return {
        error:
          "Аккаунт создан, но требуется подтверждение email. Для прототипа отключите «Confirm email» в настройках Supabase Auth и войдите снова.",
      };
    }
    return {
      user: { id: data.user!.id, name: lead.name, loginEmail, displayId },
    };
  }

  // Локальный резерв
  const users = readUsers();
  if (loginEmail in users) return { error: "Такой аккаунт уже есть — войдите по паролю." };
  users[loginEmail] = { password, name: lead.name, lead };
  writeUsers(users);
  saveLeadLocal(lead);
  const user: AuthUser = { id: loginEmail, name: lead.name, loginEmail, displayId };
  localStorage.setItem(LS_SESSION, JSON.stringify(user));
  return { user };
}

/** Вход существующего пользователя */
export async function signIn(
  loginEmail: string,
  password: string,
  displayId: string
): Promise<AuthResult> {
  if (supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password,
    });
    if (error) return { error: "Неверный логин или пароль" };
    const meta = data.user.user_metadata as { name?: string };
    return {
      user: { id: data.user.id, name: meta?.name || displayId, loginEmail, displayId },
    };
  }

  const users = readUsers();
  const u = users[loginEmail];
  if (!u || u.password !== password) return { error: "Неверный логин или пароль" };
  const user: AuthUser = { id: loginEmail, name: u.name, loginEmail, displayId };
  localStorage.setItem(LS_SESSION, JSON.stringify(user));
  return { user };
}

/** Текущий пользователь (восстановление сессии при загрузке) */
export async function getCurrentUser(): Promise<AuthUser | null> {
  if (supabase) {
    const { data } = await supabase.auth.getSession();
    const s = data.session;
    if (!s) return null;
    const meta = s.user.user_metadata as { name?: string; phone?: string };
    const email = s.user.email ?? "";
    const displayId = isPhoneEmail(email) ? meta?.phone || "" : email;
    return { id: s.user.id, name: meta?.name || displayId, loginEmail: email, displayId };
  }
  try {
    const raw = localStorage.getItem(LS_SESSION);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export async function signOut(): Promise<void> {
  if (supabase) await supabase.auth.signOut();
  localStorage.removeItem(LS_SESSION);
}
