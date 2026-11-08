# Personalizar tu web

La web recupera la estructura amplia del portfolio: presentación y contacto a la izquierda, un panel con tu avatar y enfoque backend a la derecha, accesos a las páginas y proyectos destacados debajo. La apariencia usa azul, violeta, fondo oscuro y un bloque crema para el contacto por GDD.

## Los archivos que vas a editar

| Archivo | Para qué sirve |
| --- | --- |
| `content.js` | Nombre, contacto, presentación, biografía, navegación y textos de las páginas. |
| `projects.js` | Tu lista de trabajos. Está vacía, con un objeto comentado para rellenar. |
| `theme.css` | Colores, fuentes, anchos, avatar y apariencia. |
| `assets/` | Tu avatar y las capturas que añadas. |
| `PROYECTOS.md` | Instrucciones detalladas para añadir, ordenar y ocultar proyectos. |

`app.js` contiene las interacciones y el renderizado; `styles.css`, las reglas de distribución compartidas. No necesitas editarlos para rellenar la plantilla.

Los `index.html` son copias generadas. Evita cambiar sus textos a mano: se reemplazan al ejecutar el generador. Contienen el contenido estático para que la web siga mostrando algo aunque JavaScript no cargue.

## Guardar un cambio

1. Edita `content.js`, `projects.js` o `theme.css`.
2. Guarda el archivo.
3. Ejecuta desde la carpeta del portfolio:

   ```bash
   node scripts/render-pages.cjs
   ```

4. Abre `index.html` y recarga con **Ctrl + Shift + R**.

También puedes usar `python3 -m http.server 8000` y abrir `http://localhost:8000`. Los enlaces funcionan al abrir los archivos directamente y al servir la web desde una subcarpeta.

No tienes que instalar dependencias. El generador comprueba los datos y prepara todas las páginas antes de escribirlas. Si un proyecto tiene errores o una imagen no existe, conserva los HTML anteriores.

## Nombre, avatar y Discord

En `content.js`, busca `profile`:

```js
"profile": {
  "name": "Weirdtions",
  "discord": "weirdtions_",
  "discordUrl": "https://discord.com/channels/@me",
  "avatar": "assets/avatar.jpg",
  "avatarAlt": "Weirdtions avatar",
  "favicon": "assets/avatar.jpg",
  "tagline": "Roblox programmer"
}
```

El nombre público y el usuario de Discord son independientes. `discordUrl` puede apuntar a `https://discord.com/users/TU_ID_NUMERICO` si quieres que el botón abra tu perfil.

Para sustituir una imagen, guarda el archivo en `assets/` y escribe su ruta, como `assets/my-avatar.png`. El avatar actual y su uso como favicon se conservaron de tu configuración. El tipo del favicon se actualiza automáticamente al regenerar.

## Presentación, panel lateral y secciones

Todo está en `home`:

- `greeting`: el saludo que aparece encima de tu nombre.
- `profileNote`: la etiqueta pequeña sobre la presentación.
- `introduction`: párrafos breves sobre ti y el trabajo que buscas.
- `workLabel`: texto del botón hacia Portfolio.
- `facts`: datos breves bajo los botones. Son pares `label` / `value`, no métricas de clientes.
- `board`: el panel lateral. Cambia `title`, `description`, `imageLabel`, `items` y el enlace `linkLabel`. Cada elemento de `items` tiene un `title` y un `detail`.
- `directory.items`: accesos a páginas bajo la portada, con `page`, `label` y `description`.
- `work`: título, enlace y textos del espacio de proyectos.
- `workflow`: título y enlace de la sección del proceso. Sus pasos se editan en `services.process`.
- `notes.items`: notas personales opcionales; si la lista está vacía, no aparecen.
- `contact`: título, descripción y botones del bloque de contacto crema.

El panel lateral usa la imagen de `profile.avatar`. Para cambiar el encuadre, edita `object-position` en `.focus-art img` dentro de `theme.css`.

En `settings.homeSections` puedes ocultar `projects`, `workflow`, `notes` o `contact` usando `false`.

`settings.showProjectPlaceholders` controla el marco de proyecto vacío. Con `true`, Home y Portfolio muestran una plantilla visual identificada como vacía cuando todavía no hay proyectos. Con `false`, muestran un mensaje breve. Al añadir proyectos publicados, la plantilla visual desaparece automáticamente.

Para cambiar el nombre automáticamente en cualquier texto, utiliza `{{name}}`. También funcionan `{{discord}}`, `{{projectCount}}`, `{{reviewCount}}` y `{{questionCount}}`.

## Proyectos en un archivo aparte

Edita **`projects.js`**. La lista comienza vacía a propósito; no se publican ejemplos ni capturas ajenas. Dentro tienes un proyecto comentado con todos sus campos.

[PROYECTOS.md](PROYECTOS.md) explica cómo rellenarlo, añadir imágenes, abrir enlaces a demos y conservar borradores ocultos.

La portada selecciona automáticamente los primeros `home.work.limit` trabajos publicados. Si quieres elegirlos manualmente, escribe sus identificadores en `settings.featuredProjectIds`. Una lista vacía activa la selección automática.

`settings.initialProjectCount` y `settings.loadMoreStep` controlan la cantidad inicial y el botón para ver más. Deben ser enteros mayores que cero. La lista vacía de proyectos controla el estado sin trabajos; no necesitas poner los contadores a cero.

## Páginas y navegación

La navegación inicial muestra **Portfolio**, **Services**, **About** y **FAQ**, además del contacto. Las demás páginas se conservan como plantillas opcionales, ocultas del menú.

En `navigation`:

- Cambia `label` para renombrar un enlace.
- Usa `visible: false` para ocultarlo.
- Usa `inHeader: false` para quitarlo de la cabecera de escritorio y conservarlo en el menú móvil y el pie.
- Ordena los objetos para ordenar los enlaces.

Los identificadores de ruta son `portfolio`, `about`, `services`, `proof`, `studios`, `reviews`, `terms` y `faq`. Conserva esos identificadores para que apunten a las carpetas existentes.

En `pages` están los títulos del navegador, las descripciones y los encabezados. Los campos que terminan en `Html` admiten etiquetas como `<br>`, `<strong>` y `<em>`. Los demás campos muestran texto normal.

## Biografía y trabajo por GDD

- `about.paragraphs`: tu biografía en párrafos.
- `about.facts`: información breve junto al avatar de About.
- `services.process`: el proceso para recibir y revisar un GDD.
- `services.groups`: servicios o precios opcionales. La lista está vacía; rellénala solo si quieres mostrarlos.
- `contact`: textos de la ventana de Discord.
- `callToAction`: invitación que aparece en las páginas interiores que la utilizan.
- `labels`: botones y mensajes compartidos.
- `footer`: textos de las columnas y del pie de página.

Los textos iniciales se basan en lo que has indicado: interés en backend y preferencia por recibir un GDD. No incluyen experiencia, métricas, precios ni clientes inventados.

## Páginas opcionales

Puedes rellenar y activar Proof, Clients, Reviews, Terms o FAQ en `navigation` cuando las necesites. Sus datos siguen en `proof`, `clients`, `reviews`, `terms` y `faq`.

Las reseñas utilizan objetos con `author`, `role`, `text`, `rating` opcional y `url` opcional. Los créditos de colaboración utilizan `name`, `description`, `detail` y `url` opcional. Las listas iniciales están vacías.

Las plantillas de código y condiciones no representan trabajo de cliente ni un acuerdo activo. Sustituye ese contenido antes de incluir esas páginas en tu navegación.

## Apariencia

`theme.css` concentra la apariencia actual. Las variables del principio controlan:

| Variable | Uso |
| --- | --- |
| `--bg`, `--surface`, `--surface-deep` | Fondo y superficies oscuras. |
| `--ink`, `--soft`, `--muted` | Texto principal, texto normal y notas. |
| `--accent` | Enlaces azules. |
| `--accent-secondary` | Detalles lavanda. |
| `--cream` | Estrella del nombre y fondo del bloque de contacto. |
| `--board-bg` | Fondo azul del panel lateral. |
| `--work-media` | Fondo del marco de proyecto vacío. |
| `--portrait-height` | Alto del recorte de tu avatar en el panel de escritorio. |
| `--fill`, `--action-hover` | Botones de los diálogos. |
| `--content-width` | Ancho máximo de la web. |
| `--gutter`, `--gutter-mobile` | Separación lateral. |
| `--avatar-size` | Tamaño del avatar en escritorio. |
| `--sans`, `--display-font`, `--mono` | Fuente de texto, títulos y notas. |

Se conserva M PLUS Rounded para la firma de Weirdtions, con respaldo local si Google Fonts no carga. Los títulos grandes y el texto utilizan Plex. Plex y Plex Mono están incluidos en `assets/`.

Los bloques siguientes de `theme.css` controlan la presentación, el panel con avatar, las filas de proyectos, el proceso, las páginas interiores y móvil. La composición usa tamaños distintos para el trabajo destacado y los demás; no necesitas ajustar cada entrada por separado.

## Comprobar

```bash
node --check content.js
node --check projects.js
node --check app.js
node scripts/render-pages.cjs
node tests/configuration.cjs
```

Después revisa la portada, Work y About en una ventana grande y otra estrecha. Añade un proyecto de prueba propio y comprueba que «Read notes» abre su información. Las pruebas automáticas cubren contenido, borradores, configuración y rutas; la revisión del navegador confirma el aspecto real.
