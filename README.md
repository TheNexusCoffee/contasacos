# ContaSacos – Contador de Sacos de Café

Esta es una **Progressive Web App (PWA)** que permite contar y clasificar sacos de café a partir de fotografías.  
La app está lista para ser publicada en **GitHub Pages** y, una vez alojada, podrá instalarse en iPhone mediante *Añadir a pantalla de inicio*.

---
## 🚀 Publicar en GitHub Pages

### 1️⃣ Crear un repositorio en GitHub
1. Ve a https://github.com y crea un nuevo repositorio (p.ej. `contasacos`).
2. **No** inicialices el repositorio con README, .gitignore o licencia – los vamos a subir desde local.

### 2️⃣ Inicializar git en tu proyecto (si aún no lo tienes)
```bash
cd /home/papi/myDisk/Proyectos/ConteoCafe
git init
git add .
git commit -m "Initial commit – ContaSacos PWA"
```

### 3️⃣ Añadir el remoto y pushear
```bash
git remote add origin https://github.com/<TU_USUARIO>/contasacos.git
git branch -M main
git push -u origin main
```
Reemplaza `<TU_USUARIO>` por tu nombre de usuario de GitHub.

### 4️⃣ Configurar GitHub Pages
1. En GitHub, abre el repositorio → *Settings* → *Pages*.
2. En *Source* elige la rama **main** y la carpeta **/ (root)**.
3. Haz clic en **Save**. GitHub generará una URL tipo `https://<TU_USUARIO>.github.io/contasacos/`.

### 5️⃣ (Opcional) Automatizar la publicación con GitHub Actions
Crea el siguiente workflow para que cada push a `main` publique automáticamente:
```yaml
name: GitHub Pages Deploy
on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Upload site to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
          force_orphan: true
```
Guarda este archivo como **`.github/workflows/pages.yml`** (el mismo nombre del archivo que crearás en el paso siguiente).

### 6️⃣ Verificar la PWA
1. Abre la URL generada en Safari de tu iPhone.
2. Usa el botón *Compartir* → *Añadir a pantalla de inicio*.
3. La app aparecerá con el ícono **ContaSacos** y se ejecutará en modo *standalone*.
4. Después de cargarla una vez, pon el móvil en modo avión y vuelve a abrirla; todo debería funcionar sin conexión gracias al Service Worker.

---
## 📂 Estructura del proyecto
```
ConteoCafe/
├─ index.html          # Página principal (ya incluye meta‑tags PWA)
├─ manifest.json       # Manifiesto PWA
├─ service-worker.js   # Caché offline
├─ icon_512.jpg        # Ícono de la app (usado por iOS y Android)
├─ script.js           # Lógica de la app (cálculo, generación de reporte)
└─ README.md           # Este archivo
```

---
## 🎉 ¡Listo!
Con los pasos anteriores tu app **ContaSacos** quedará publicada, accesible y instalable en cualquier iPhone sin problemas. Si necesitas ayuda adicional (p.ej. personalizar el ícono, agregar splash screens, o configurar un dominio propio), solo avísame.
