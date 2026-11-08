<<<<<<< HEAD
# Roblox Developer Portfolio

Plantilla en inglés creada con HTML, CSS y JavaScript, sin dependencias ni proceso de compilación. Incluye ilustraciones SVG originales, filtros de proyectos, fichas de caso, menú móvil y preparación de briefs de contacto.

## Abrir

Abre `index.html` directamente en tu navegador. Los recursos son locales y no se utilizan fuentes externas, analíticas ni servicios de terceros.

Para servirla por HTTP, desde esta carpeta:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

Después abre `http://127.0.0.1:8080`. Detén el servidor con `Ctrl+C`. Python solo se utiliza para esta vista previa opcional.

## Personalizar

Empieza por `portfolio.js`:

- `profile.name`: nombre o alias.
- `intro`, `about`, `approach`: presentación, biografía y forma de trabajar.
- `availability`: disponibilidad real, sin compromisos de respuesta inventados.
- `email`, `discord`, `githubUrl`, `robloxUrl`: contacto y perfiles. Si un campo está vacío, no se crea un enlace ficticio.
- `projects`: los tres objetos actuales son ejemplos. Sustituye títulos, textos, etiquetas y enlaces. Se pueden agregar o eliminar objetos completos.

Cada proyecto dispone de:

| Campo | Uso |
| --- | --- |
| `id` | Identificador del proyecto. |
| `title`, `subtitle` | Titular y nombre del sistema. |
| `category` | `gameplay`, `ai` o `ui`, para los filtros existentes. |
| `categoryLabel`, `tags` | Categoría visible y tecnologías o capacidades. |
| `cover` | Diagrama de respaldo: `quest`, `arena` o `inventory`. |
| `sample` | Mantener `true` mientras sea un ejemplo; usar `false` para trabajo propio documentado. |
| `summary`, `role`, `challenge`, `approach`, `evidence`, `result` | Contenido de la ficha del proyecto. Los textos iniciales son instrucciones para completarla. |
| `imageUrl`, `imageAlt` | Captura propia, por ejemplo `assets/my-project.webp`, y texto alternativo descriptivo. También admite una URL HTTP(S). |
| `demoUrl`, `codeUrl`, `gameUrl` | URLs HTTP(S) de vídeo, código y experiencia. Un valor vacío oculta el enlace. |

Los enlaces externos se abren en otra pestaña. Las imágenes remotas sí requieren conexión; las ilustraciones incluidas funcionan sin conexión.

Edita en `index.html` los textos de servicios, herramientas, proceso y titulares. Son propuestas de presentación: revisa que describan fielmente lo que ofreces. No se ha conectado un CMS ni un editor visual.

En `styles.css`, las variables iniciales controlan colores y fuentes. Las fuentes proceden del sistema para evitar descargas externas.

Una vez sustituidos y revisados todos los textos de ejemplo, establece `templateMode: false`. Esto retira los avisos generales de plantilla y actualiza la descripción de la página. Las etiquetas de ejemplo de cada proyecto dependen de su propio campo `sample`, para no ocultarlas accidentalmente. Actualiza también el título y la descripción iniciales en el `<head>` de `index.html` para buscadores que no ejecuten JavaScript.

## Contacto

El formulario no envía mensajes, no guarda datos y no tiene backend. Valida el contenido y genera un texto que el visitante puede copiar o descargar. Si el navegador bloquea el portapapeles, selecciona el texto y muestra instrucciones para copiarlo manualmente.

Al configurar `profile.email`, también aparece un enlace que abre un borrador en el cliente de correo del visitante. Abrir el borrador no equivale a enviarlo. Discord se presenta como identificador legible; no se inventa una URL de perfil a partir de un nombre de usuario.

## Verificación manual

1. Abre la página y comprueba las imágenes, el contenido y los enlaces de navegación.
2. Activa los tres filtros y vuelve a `All work`.
3. Abre una ficha y ciérrala con el botón o `Escape`.
4. Ejecuta `Run demo`: recorre tres estados ilustrativos y permite repetirlos. Es una demostración en el navegador, no ejecución de Roblox ni prueba de código Luau.
5. Intenta enviar un brief vacío; completa nombre y al menos 20 caracteres de descripción. Copia y descarga el resultado.
6. Cambia los campos: el brief anterior se oculta hasta volver a generarlo.
7. Revisa el menú, los campos y las tarjetas en móvil. Navega con `Tab` y activa los controles con teclado.
8. Antes de compartir tu versión, revisa todas las afirmaciones, enlaces, imágenes y permisos de publicación.

La sintaxis se puede comprobar sin instalar paquetes:

```bash
node --check app.js
node --check portfolio.js
```

## Archivos

```text
index.html        Page structure and static copy
styles.css        Visual design and responsive layouts
portfolio.js      Editable profile and project content
app.js            Filters, dialogs, demo, and brief builder
assets/           Original SVG illustrations and favicon
ESTUDIO.md        Comparative research, sources, and design decisions
README.md         Setup and customization guide
```

La plantilla queda preparada para alojamiento estático. No se ha publicado ni vinculado a una cuenta de hosting.
=======
# Weirdtions

A Roblox programmer portfolio with a broad introduction, an anime portrait / backend panel, featured projects, independent pages and a GDD contact section. Public copy is English. Editing instructions are Spanish.

- **[PERSONALIZAR.md](PERSONALIZAR.md)**: identity, text, navigation and theme settings.
- **[PROYECTOS.md](PROYECTOS.md)**: fill the separate, initially empty project file.
- `content.js`: site copy and settings.
- `projects.js`: project entries, with a commented template.
- `theme.css`: the dark blue / lavender theme and cream star.

## Preview

Open `index.html` directly, or run:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>. No installation is needed. Relative links support direct file previews and hosting inside a subdirectory. The visible content is included in the HTML even when JavaScript is unavailable.

## Update

After editing:

```sh
node scripts/render-pages.cjs
```

The generator validates the configuration and renders all pages before replacing the HTML. Missing images or invalid project references preserve the previous pages.

## Structure

Home has a two-column introduction, a page-access strip, selected projects, a short workflow and a cream contact panel. Portfolio, Services, About and FAQ are separate pages in the navigation. Proof, Clients, Reviews and Terms remain optional templates.

The project list starts empty. An explicitly labeled layout placeholder shows the image / description structure; disable it with `settings.showProjectPlaceholders`. Published projects automatically replace it on Home and Portfolio. Drafts use `published: false`. There are no fabricated commissions, reviews or statistics in the public navigation.

## Check

```sh
node --check content.js
node --check projects.js
node --check app.js
node tests/configuration.cjs
```

Automated checks cover configuration behavior and local resource paths. Browser layout and real input need a browser review.

## Fonts and existing media

IBM Plex Sans and IBM Plex Mono are bundled under the SIL Open Font License; see `assets/FONT-LICENSE.txt`. The selected M PLUS Rounded font uses Google Fonts, with a local fallback.

The avatar is the image provided in the existing workspace. The older `combat.webp`, `arena.webp` and `world.webp` reference artwork remains in `assets/` but is not used by the empty project list. That artwork came from VZNZach's reference portfolio and is not work by Weirdtions.
>>>>>>> 3fdc246 (update)
