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

No inventes estos datos. Edita el objeto `CONTACT` al inicio de `js/main.js`. Si un campo queda vacío (`""`), el sitio no lo muestra.

```js
var CONTACT = {
  email: "jadai.bolivia@gmail.com",
  whatsapp: "",       // solo dígitos, con código de país
  instagram: "",      // URL https://…
  linkedin: "",       // URL de la red, no de una persona
  linkedinMiguel: "",
  linkedinJazid: "",
  githubJazid: ""
};
```

- El correo oficial ya está en `email`. Se muestra en Escríbenos y en el pie, y abre «Abrir en mi correo» con el asunto y el mensaje del rol.
- WhatsApp, Instagram y LinkedIn siguen vacíos: no se muestran.
- Con `whatsapp` aparecería el canal y el botón «WhatsApp».
- El GitHub de Miguel ya está en Fundadores: `https://github.com/vegamorenomiguelangel1-pixel`.
- Foto de un fundador: atributo `data-foto` en su `.avatar`. Vacío = iniciales.
- JADAI está en etapa inicial y sin personería jurídica. El pie lo dice una vez.
- No agregues logos de socios, testimonios, cifras, eventos realizados ni alianzas firmadas hasta que existan.

## Marca

El nombre, cuando es marca, usa los archivos originales sin redibujarlos:

- `assets/logo-con-texto.png` — marca con la palabra JADAI.
- `assets/logo-sin-texto.png` — la marca sola.
- `assets/logo-punto-verde.png` — el punto verde.

Colores: negro `#0C0C0C`, blanco y verde `#2A9279`. El texto pequeño sobre blanco usa `#145C4C`, el mismo verde más oscuro, para que se pueda leer.

La tipografía del sitio es Outfit (SIL Open Font License), una sans geométrica fina, alineada con el letrero del logo. El nombre no se vuelve a componer en otra fuente: donde hace de logo, va la imagen.
