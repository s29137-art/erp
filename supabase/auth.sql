-- Авторизация: «умный» вход (телефон или email + пароль).
-- Выполните этот SQL в Supabase: проект → SQL Editor → New query → Run.

-- 1) Функция проверки: существует ли уже аккаунт с таким логином.
--    Нужна, чтобы показать пользователю «введите пароль» (вход) или
--    «придумайте пароль» (регистрация). SECURITY DEFINER + возврат только
--    boolean — наружу не утекают никакие данные о пользователях.
create or replace function public.account_exists(p_email text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (select 1 from auth.users where email = lower(p_email));
$$;

revoke all on function public.account_exists(text) from public;
grant execute on function public.account_exists(text) to anon, authenticated;

-- 2) ВАЖНО для прототипа: вход по телефону реализован через «псевдо-email»
--    вида  77001234567@phone.erp.local  (без SMS-провайдера).
--    Такие адреса нельзя подтвердить письмом, поэтому отключите
--    подтверждение email:
--
--    Supabase → Authentication → Providers → Email → выключите "Confirm email".
--
--    Тогда signUp сразу создаёт активную сессию, и клиент попадает в систему
--    без письма-подтверждения.
