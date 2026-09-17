# PRISCO Automotores — Sitio web

Sitio de la agencia hecho con **Astro** (sitio estático, rápido y SEO-friendly) + **Sveltia CMS** (panel de carga en `/admin`). Alojamiento pensado para **Cloudflare Pages** (gratis).

El objetivo del sitio es **generar consultas de WhatsApp**: cada auto tiene un botón "Consultar" que abre el chat con un mensaje ya escrito.

---

## 1. Requisitos

- Node.js 18 o superior.
- Una cuenta de **GitHub** (para alojar el código y que funcione el panel `/admin`).
- Una cuenta de **Cloudflare** (para publicar el sitio, gratis).

---

## 2. Correr el sitio en tu compu

```bash
npm install       # instala dependencias (una sola vez)
npm run dev        # arranca en http://localhost:4321
```

Para ver cómo queda el sitio ya compilado:

```bash
npm run build      # genera la carpeta dist/
npm run preview
```

---

## 3. Lo PRIMERO que tenés que editar

Abrí **`src/lib/site.ts`** y completá los datos reales de la agencia:

- **`whatsapp`** ← ⚠️ el más importante. Número real en formato internacional sin "+", sin espacios ni guiones. Ej. Mendoza: `549261XXXXXXX`.
- `email`, `direccion`, `horarios`, `instagram`.

Ese archivo alimenta todos los botones de WhatsApp, el pie de página y el contacto.

---

## 4. Cargar autos

Cada auto es un archivo en `src/content/autos/`. Hay 3 de ejemplo (borralos cuando cargues los reales). Tenés dos formas de cargarlos:

### A) Con el panel visual (recomendado, sin tocar código)

Localmente:

```bash
# terminal 1
npx @sveltia/cms-proxy-server
# terminal 2
npm run dev
```

Entrá a **http://localhost:4321/admin/** → colección **Autos** → *Nuevo auto* → completás datos, arrastrás las fotos y *Guardás*. En modo local, los cambios se escriben directo en `src/content/autos/`.

> En producción (una vez desplegado), el dueño entra a `priscoautomotores.com.ar/admin` con usuario y contraseña. Ver punto 6.

### B) Editando los archivos a mano

Copiá uno de los `.md` de ejemplo y cambiá los datos del frontmatter. Las fotos van en `public/uploads/autos/` y se referencian como `/uploads/autos/mi-foto.jpg`.

---

## 5. Publicar el sitio (deploy en Cloudflare Pages)

### 5.1 Subir el proyecto a GitHub

```bash
git init
git add .
git commit -m "Primer commit — sitio PRISCO"
# Creá un repo PRIVADO en github.com (ej: prisco-web) y luego:
git remote add origin https://github.com/TU-USUARIO/prisco-web.git
git branch -M main
git push -u origin main
```

### 5.2 Conectar Cloudflare Pages

1. Entrá a **dash.cloudflare.com** → *Workers & Pages* → *Create* → *Pages* → *Connect to Git*.
2. Autorizá GitHub y elegí el repo `prisco-web`.
3. Configuración de build:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. *Save and Deploy*. En 1-2 minutos tenés una URL tipo `prisco-web.pages.dev`.

Desde ahora, **cada cambio que se publique en GitHub redepliega el sitio solo.**

### 5.3 Conectar el dominio priscoautomotores.com.ar

1. Registrá el dominio en **NIC Argentina** (nic.ar) — ~$8.500/año.
2. En Cloudflare: agregá el sitio (*Add a site*) y seguí los pasos para **cambiar los nameservers** del dominio en NIC por los que te da Cloudflare. (Recomendado: así manejás web + correo desde un solo lugar.)
3. En tu proyecto de Pages → *Custom domains* → agregá `priscoautomotores.com.ar` y `www`. Cloudflare crea los registros solo.

---

## 6. Activar el panel /admin en producción

El panel usa tu GitHub para guardar los cambios. Para que el dueño entre con usuario y contraseña (sin necesidad de cuenta de GitHub propia), hay que configurar el acceso una vez:

1. En **`public/admin/config.yml`**, cambiá `repo: TU-USUARIO/prisco-web` por tu usuario/repo real.
2. Configurá la autenticación de Sveltia CMS. La forma más simple y gratis es desplegar el pequeño worker de autenticación de Sveltia en Cloudflare y crear una *GitHub OAuth App*. Guía oficial (5 minutos):
   **https://github.com/sveltia/sveltia-cms#getting-started**
3. Listo: el dueño entra a `priscoautomotores.com.ar/admin`, inicia sesión y edita el stock.

> Mientras tanto, podés cargar todo el stock inicial en modo local (punto 4A) y publicar, sin depender del OAuth.

---

## 7. Correo profesional (gratis)

Con el dominio en Cloudflare, creá casillas tipo `ventas@priscoautomotores.com.ar` gratis con **Zoho Mail** (hasta 5 casillas): https://www.zoho.com/es-xl/mail/ — agregás los registros MX/TXT que te indica Zoho en el DNS de Cloudflare.

---

## 8. Fotos: recomendación

El sitio ya carga las imágenes de forma diferida (lazy-load). Para que todo vaya rápido y no ocupe espacio de más:

- Subí las fotos a un ancho de ~1600 px y peso menor a ~400 KB.
- La **primera foto** de cada auto es la portada.
- 8 a 12 fotos por auto es lo ideal.

---

## 9. Estructura del proyecto

```
src/
  lib/site.ts          → datos de contacto (EDITAR)
  lib/autos.ts         → helpers de autos
  content/autos/       → un .md por vehículo (los maneja /admin)
  content/config.ts    → campos del vehículo (schema)
  components/          → Header, Footer, CarCard, Logo
  layouts/Base.astro   → estructura común + SEO
  pages/               → Inicio, Stock, Ficha, Servicios, Vender, Contacto
  styles/global.css    → sistema visual PRISCO (negro/rojo)
public/
  admin/               → panel Sveltia CMS (config.yml = EDITAR repo)
  uploads/autos/       → fotos de los vehículos
  brand/               → logo, favicon, imagen para compartir
```

---

## 10. Pendientes / para reemplazar

- [ ] Número de WhatsApp real en `src/lib/site.ts`.
- [ ] Reemplazar las fotos de ejemplo por fotos reales.
- [ ] Reemplazar el logo placeholder (`Logo.astro`, `favicon.svg`, `og.svg`) por el arte final del monograma cuando esté listo.
- [ ] `repo:` en `public/admin/config.yml`.
- [ ] Cargar los 30 autos.
