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

## Marca

El nombre, cuando es marca, usa los archivos originales sin redibujarlos:

- `assets/logo-con-texto.png` — marca con la palabra JADAI.
- `assets/logo-sin-texto.png` — la marca sola.
- `assets/logo-punto-verde.png` — el punto verde.

Colores: negro `#0C0C0C`, blanco y verde `#2A9279`. El texto pequeño sobre blanco usa `#145C4C`, el mismo verde más oscuro, para que se pueda leer.

La tipografía del sitio es Outfit (SIL Open Font License), una sans geométrica fina, alineada con el letrero del logo. El nombre no se vuelve a componer en otra fuente: donde hace de logo, va la imagen.
