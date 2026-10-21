# Pacchetto tema per Fanzine

Copia questa cartella, cambia nome, colori, font e filtri, e pubblicala come repo git. In Fanzine apri **Aggiungi tema**, incolla il link `https://` della repo e premi **Importa**. Il tema entra nel selettore. I filtri entrano negli scanner di un’immagine.

Un pacchetto può avere solo il tema, solo i filtri, o tutti e due. Questo esempio ha entrambi.

Il tema cambia la veste del sito (home, libreria, editor). Non cambia il foglio stampato. Il font vale per l’interfaccia, non per il testo del fanzine.

```
fanzine.json
themes/mio.json
fonts/MioFont-Regular.woff2
filters/brillante.json
filters/brillante.js
```

I percorsi sono relativi e restano dentro la cartella. Niente CDN, niente `http`.

## fanzine.json

Il nome è solo lettere minuscole, numeri e trattini. `engines.fanzine` resta `"1"`.

```json
{
  "name": "mio",
  "version": "1.0.0",
  "engines": { "fanzine": "1" },
  "contributes": {
    "themes": [
      { "id": "mio", "label": "Mio", "path": "themes/mio.json" }
    ],
    "filters": [
      { "id": "mio.brillante", "label": "Brillante", "path": "filters/brillante.json" }
    ]
  }
}
```

`id` del tema è quello che Fanzine salva quando qualcuno lo sceglie. `id` del filtro è quello che resta sull’immagine: tienilo stabile, con il nome del pacchetto davanti (`mio.brillante`).

Togli `themes` se il pacchetto è solo filtri. Togli `filters` se è solo colori e font.

## Tema

`themes/mio.json`:

```json
{
  "colors": {
    "bg": "#fff4fb",
    "panel": "#ffe4f3",
    "panel2": "#ffd0ea",
    "line": "#ff9ec8",
    "text": "#4a1942",
    "muted": "#a85a86",
    "accent": "#ff4f9a",
    "ink": "#2a1024"
  },
  "radius": "16px",
  "font": { "family": "Sniglet", "file": "../fonts/Sniglet-Regular.woff2" }
}
```

Colori in `#rgb` o `#rrggbb`. Una chiave che non è in questa lista viene ignorata. Se ne manca una, resta il colore di Archivio.

| Chiave | Dove si vede |
| --- | --- |
| `bg` | Sfondo |
| `panel` | Pannelli |
| `panel2` | Pannelli secondari |
| `line` | Bordi e hover |
| `text` | Testo |
| `muted` | Testo secondario |
| `accent` | Pulsanti e selezione |
| `ink` | Inchiostro dell’interfaccia |

`radius` è solo pixel, per esempio `16px`. `font.file` è relativo al file del tema. Il font è un `.woff2` dentro `fonts/`, con la sua licenza accanto.

## Filtro

`filters/brillante.json`:

```json
{
  "script": "brillante.js",
  "params": [
    { "key": "amount", "type": "slider", "label": "Forza", "min": 0, "max": 1, "step": 0.01, "default": 0.7 },
    { "key": "spark", "type": "color", "label": "Scintilla", "default": "#fff6c8" }
  ]
}
```

Più file, nello stesso ordine in cui vanno letti:

```json
{ "scripts": ["./vendor/util.js", "brillante.js"], "params": [] }
```

I parametri ammessi sono `slider` (numeri `min`, `max`, `step`, `default`), `color` (`default` esadecimale) e `boolean` (`default` true o false).

`filters/brillante.js`:

```js
function apply(image, params) {
  const data = image.data
  const spark = hexRgb(typeof params.spark === "string" ? params.spark : "#fff6c8")
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 8) continue
    data[i] = spark[0]
    data[i + 1] = spark[1]
    data[i + 2] = spark[2]
  }
}

function hexRgb(hex) {
  const h = String(hex).replace("#", "")
  const full = h.length === 3 ? h.replace(/(.)/g, "$1$1") : h
  const n = Number.parseInt(full, 16)
  if (!Number.isFinite(n)) return [255, 246, 200]
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
```

`image` è un `ImageData`: `width`, `height`, `data` con quattro byte per pixel (rosso, verde, blu, alfa). Scrivi l’effetto al massimo. Lo slider `amount` lo mescola Fanzine dopo `apply`: a `1` resta il tuo risultato, a `0` resta la foto. Non leggere `params.amount` nello script.

Lo script gira in un iframe senza rete e senza la sessione. Può usare solo il codice che hai messo nel pacchetto. Non alzare l’alfa sopra quello della foto: i pixel trasparenti restano trasparenti.

Glitter, Blush e Coriandoli in questa repo sono tre filtri già pronti da copiare.
