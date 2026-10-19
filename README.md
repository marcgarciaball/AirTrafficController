# Torre

Aplicación web de preparación para el examen de controlador aéreo en España. Next.js 16 en `frontend/` y proyecto de la CLI de Supabase en `database/`.

Todo se prueba online desde el principio: base de datos en Supabase (plan gratuito en la nube, sin Docker) y despliegue en Vercel (plan Hobby) con la CLI. De momento no hay repositorio git.

## Requisitos

- Node 22.
- Una cuenta gratuita de Supabase (supabase.com).
- Una cuenta gratuita de Vercel (vercel.com), para desplegar.

## Puesta en marcha online

1. **Supabase: crear el proyecto.** Crea una cuenta en supabase.com y un proyecto en región UE. Guarda la contraseña de la base de datos. Copia la Project URL, la clave publishable (API Keys) y el project ref (Project Settings > API / General).

2. **Base de datos.** En tu terminal:

   ```bash
   cd web/database
   npm i
   npx supabase login
   npx supabase link --project-ref <ref>
   npm run db:push
   ```

3. **Supabase: URLs de autenticación.** En Authentication > URL Configuration:
   - Site URL: la URL de Vercel (`https://<proyecto>.vercel.app`). Si aún no la tienes, usa de momento `http://localhost:3000` y cámbiala tras el paso 4.
   - Redirect URLs: `http://localhost:3000/**` y `https://<proyecto>.vercel.app/**`.

3b. **Supabase: confirmación de email.** En Authentication > Sign In / Providers > Email, comprueba que "Confirm email" está activado (suele estarlo por defecto). No uses `supabase config push` para la configuración de auth en la nube: en el plan gratuito con el proveedor de email por defecto falla al subir las plantillas y además cambiaría ajustes remotos (MFA, `otp_length`, frecuencia de email). La configuración de la nube se hace solo en el panel: URL Configuration (paso 3) y "Confirm email".

   El código funciona con las plantillas por defecto de Supabase (`{{ .ConfirmationURL }}`, flujo PKCE): registro y recuperación pasan por `/auth/callback?next=...`. Limitación conocida: el enlace de recuperación hay que abrirlo en el mismo navegador donde se pidió.

   Mejora futura: las plantillas propias con `token_hash` (`web/database/supabase/templates/*.html`, ruta `/auth/confirm`) solo se usan en local y cuando haya un SMTP propio.

4. **Vercel: desplegar el frontend.** Crea la cuenta en Vercel. En tu terminal:

   ```bash
   cd web/frontend
   npx vercel login
   npx vercel link
   ```

   En Vercel, Settings > Environment Variables, añade:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_SITE_URL`

   Después despliega:

   ```bash
   npx vercel --prod
   ```

5. **Google Auth (opcional, más adelante).** Sigue los pasos de inicio de sesión con Google cuando lo necesites:
   - En Google Cloud: crear la pantalla de consentimiento y un cliente OAuth Web.
   - Redirect URI autorizada: `https://<ref>.supabase.co/auth/v1/callback`.
   - Pegar el Client ID y el Client Secret en Supabase > Authentication > Providers > Google.

## Desarrollo local

1. Copia `frontend/.env.example` a `frontend/.env.local` y rellena los valores de tu proyecto de Supabase. El archivo `.env.local` no se sube al repositorio. Debe estar en `web/frontend/` (Next solo lee los `.env` de su carpeta). La clave secreta (`SUPABASE_SECRET_KEY`) no se usa en esta app, nunca lleva el prefijo `NEXT_PUBLIC` y no se añade a Vercel.
2. Arranca la aplicación:

   ```bash
   cd web/frontend
   npm i
   npm run dev
   ```

   Se abre en `http://localhost:3000`.

3. Tests:

   ```bash
   cd web/frontend
   npm test
   ```

   ```bash
   cd web/database
   npm run db:test
   ```

## PWA, exportación y recordatorios

- Torre se puede instalar como app (`app/manifest.ts`, iconos SVG en `frontend/public/`). El service worker (`public/sw.js`) solo cachea recursos estáticos públicos y nunca respuestas autenticadas.
- `/mas/exportar` descarga tus datos en JSON y CSV con tu propia sesión (RLS).
- Los recordatorios del calendario se ven dentro de la app.

## Nota sobre el correo electrónico

El SMTP por defecto de Supabase tiene límites de envío en el plan gratuito. Para usuarios reales, configura más adelante un SMTP propio (por ejemplo Resend).

**Mejora futura: recordatorios por email.** Los recordatorios de `/mas/calendario` no envían correo, porque eso requiere un SMTP propio (por ejemplo Resend) y una tarea programada que lea `reminders` con `due_at` vencido y `done = false`.
