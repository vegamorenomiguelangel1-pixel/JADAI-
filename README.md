# JADAI

Sitio oficial de **JADAI** (Joint Academic Development in Artificial Intelligence / Desarrollo Académico Conjunto en Inteligencia Artificial), comunidad estudiantil sin fines de lucro de Santa Cruz de la Sierra, Bolivia.

La frase del sitio es: «Tu idea de IA, validada en conjunto.»

Es un sitio estático: HTML, CSS y un poco de JavaScript. No hay paso de compilación ni dependencias.

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

## Qué está por completar

No inventes estos datos: el sitio los deja marcados a propósito.

- **Correo, Instagram, LinkedIn y WhatsApp** en la sección «Propón tu proyecto». Cada uno dice «Por completar». Sustituye ese texto por el dato real o borra la fila si esa red no se va a usar.
- El **año 2030** de la visión está marcado como «Por confirmar». No es un compromiso.
- JADAI **aún no tiene personería jurídica** y está en etapa inicial. El sitio lo dice.
- **No hay alianzas firmadas**, eventos propios realizados ni formulario en línea. No agregues logos de socios, testimonios ni cifras de miembros hasta que existan.

## Marca y tipografía

Los archivos de la marca están en `assets/`:

- `logo-con-texto.svg` / `.png` — marca con la palabra JADAI, para fondo claro.
- `logo-sin-texto.svg` / `.png` — la marca sola, para fondo claro.
- `logo-punto-verde.svg` / `.png` — el punto verde, para acentos.
- `logo-*-sobre-negro.svg` — la misma marca en blanco, para fondo negro.
- `favicon.svg`, `favicon.ico` y la imagen Open Graph `assets/og.png`.

Colores: negro `#0C0C0C`, blanco y verde `#2A9279`. Para texto pequeño sobre blanco se usa un verde más oscuro (`#145C4C`) porque el verde de marca no alcanza contraste.

Las fuentes (Fraunces y Source Sans 3, licencia SIL Open Font License) están en `assets/fonts/`.
