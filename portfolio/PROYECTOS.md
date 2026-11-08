# Rellenar tus proyectos

La lista está en **`projects.js`**. Está vacía a propósito: la web no muestra proyectos inventados ni material de otras personas.

## Añadir el primero

Abre `projects.js`. Copia este objeto dentro de los corchetes de `PORTFOLIO_PROJECTS` y cambia sus valores:

```js
globalThis.PORTFOLIO_PROJECTS = [
  {
    id: 'my-project',
    title: 'My project',
    category: 'Backend',
    scope: 'Server-side programming',
    role: 'The specific systems I built.',
    summary: 'What the project does, in one or two sentences.',
    image: '',
    imageAlt: '',
    challenge: 'The concrete problem I had to solve.',
    approach: 'What I did and why I chose that approach.',
    tags: ['Luau', 'Backend'],
    demoUrl: '',
    videoUrl: '',
    source: { label: '', url: '' },
    published: true,
  },
];
```

El ejemplo también está comentado dentro del archivo. Puedes descomentarlo quitando los `//` del objeto. Rellena la entrada con tu trabajo antes de publicarla.

## Qué significa cada campo

| Campo | Qué poner |
| --- | --- |
| `id` | Identificador único: minúsculas, números y guiones, sin espacios. |
| `title` | Nombre del juego o del sistema. |
| `category` | Categoría para agruparlo. Los filtros aparecen automáticamente cuando hay varias categorías. |
| `scope` | Alcance breve: por ejemplo, programación del servidor. |
| `role` | Qué hiciste tú. Es especialmente útil si trabajaste con otras personas. |
| `summary` | Descripción corta de lo que hace el proyecto. |
| `image` | Ruta de una captura, como `assets/my-project.webp`, o una URL HTTPS. Puede quedar vacía. |
| `imageAlt` | Descripción de la captura para lectores de pantalla. |
| `challenge` | Un problema real que tuviste que resolver. Puede quedar vacío. |
| `approach` | Cómo lo resolviste. Puede quedar vacío. |
| `tags` | Lista corta de tecnologías o conceptos. Puede quedar como `[]`. |
| `demoUrl` | Enlace al juego o demo. Vacío si todavía no existe. |
| `videoUrl` | Enlace a una grabación. Vacío si no tienes vídeo. |
| `source` | Crédito opcional de una imagen o fuente externa. Vacío si no hace falta. |
| `published` | `true` para mostrarlo; `false` para conservar un borrador oculto. |

No necesitas completar todos los campos. El título, el identificador y la descripción corta son los datos básicos. Los apartados vacíos del diálogo se omiten y una entrada sin imagen se presenta como una nota de texto.

## Imágenes

Guarda tus capturas dentro de `assets/` y utiliza la ruta relativa al sitio. Por ejemplo, `assets/player-data.webp`. No escribas la ruta completa de tu ordenador.

Las capturas se muestran en 16:9. La portada utiliza una imagen grande junto al texto de cada trabajo. Portfolio comienza con un trabajo destacado y continúa con una galería de dos columnas. No necesitas generar miniaturas por separado.

## Orden y portada

El orden de los objetos en `projects.js` es el orden de presentación.

La portada toma automáticamente los primeros tres proyectos publicados. Puedes cambiar esa cantidad en `content.js` → `home.work.limit`.

Para elegir trabajos concretos, rellena `settings.featuredProjectIds` en `content.js`:

```js
"featuredProjectIds": ["player-data", "progression"]
```

Esos identificadores deben existir y estar publicados. Si dejas la lista como `[]`, se usa la selección automática.

## Añadir más de uno

Separa los objetos con comas. Cada uno debe tener un `id` diferente. Para ocultar uno temporalmente, cambia solo `published` a `false`; no hace falta borrarlo.

## Guardar y comprobar

Desde la carpeta del portfolio, ejecuta:

```bash
node --check projects.js
node scripts/render-pages.cjs
```

Abre `index.html`, recarga y visita Work. Comprueba que tu captura se ve, que el botón «Read notes» abre la información y que los enlaces funcionan.

Si hay un identificador repetido, una captura inexistente o un proyecto destacado que no existe, el generador te lo indicará antes de reemplazar los HTML.
