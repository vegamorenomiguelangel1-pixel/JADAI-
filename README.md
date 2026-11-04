# Sitio de la comunidad

Sitio estático oficial (HTML, CSS y JavaScript). No hay paso de compilación ni dependencias. La frase pública es: «Potenciando el talento boliviano».

## Verlo en local

Abre `index.html` en el navegador, o levanta un servidor en la raíz del repositorio:

```bash
python3 -m http.server 8080
```

Entra a [http://localhost:8080](http://localhost:8080).

## Publicar en GitHub Pages

1. Fusiona este cambio en la rama `main`.
2. En el repositorio de GitHub: **Settings → Pages**.
3. En **Build and deployment**, elige **Source: Deploy from a branch**.
4. Branch: **main**. Carpeta: **/ (root)**.
5. Guarda. En unos minutos el sitio queda en:

   `https://vegamorenomiguelangel1-pixel.github.io/JADAI-/`

El repositorio se llama `JADAI-` (con guion al final): esa ruta forma parte de la URL. El archivo `.nojekyll` evita que GitHub Pages procese el sitio con Jekyll.

Si más adelante usan un dominio propio, actualicen en `index.html` las etiquetas `canonical`, `og:url` y `og:image` para que apunten a la URL absoluta nueva.

## Contacto y redes (solo datos oficiales)

- Instagram: <https://www.instagram.com/jadai.bolivia/>
- Facebook: <https://www.facebook.com/share/1EzJkhTDfF/>
- LinkedIn: <https://www.linkedin.com/company/jadai-bo/>
- X: <https://x.com/jadai_bolivia>
- TikTok: <https://www.tiktok.com/@jadai_bolivia>
- Correo: jadai.bolivia@gmail.com
- WhatsApp: <https://wa.me/59172673684>
- Grupo de WhatsApp: <https://chat.whatsapp.com/KNrKSTzLwH68PcHUtKXGtx>
- Formulario de líderes estudiantiles y CALL FOR MENTORS: enlaces en `#unete`

No agregues métricas, teléfonos o correos personales, ni nombres de universidades o instituciones como aliadas o «en proceso». No menciones UPB.

## Marca y tipografía

Los archivos de la marca están en `assets/`:

- `logo-con-texto.svg` / `.png` — marca con wordmark, para fondo claro.
- `logo-sin-texto.svg` / `.png` — la marca sola, para fondo claro.
- `logo-punto-verde.svg` / `.png` — el punto verde, para acentos.
- `logo-*-sobre-negro.svg` — la misma marca en blanco, para fondo negro.
- `favicon.svg`, `favicon.ico` y la imagen Open Graph `assets/og.png`.

Colores: negro `#0C0C0C`, blanco `#FFFFFF`, papel `#F4F4F4`, teal `#2A9279` y `#449582`, oscuro `#102822`.

La fuente del hub es Outfit (SIL Open Font License), en `assets/fonts/`.
