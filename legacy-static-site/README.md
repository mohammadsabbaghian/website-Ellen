# Knarre Krasse Woning - Website

Deze repo bevat een statische website voor het woonconcept op **Eijerdijk 87, Hattem**.

Er is geen build-stap nodig: je kunt de site direct lokaal openen in VS Code.

## Wat zit er in dit project?

- Multi-page website in het Nederlands
- Styling via `assets/css/styles.css`
- Logica via `assets/js/main.js`
- Data voor woningkaarten, buurtinfo en projectbeelden via `assets/js/data.js`
- Formulieren met lokale opslag in de browser (`localStorage`) en CSV-export

## Snel lokaal draaien in VS Code (makkelijkste manier)

Deze route is bedoeld voor iemand met weinig technische kennis.

1. Open VS Code.
2. Kies **File > Open Folder...** en open deze map:
   - `e:\test\website Ellen`
3. Installeer de extensie **Live Server** (publisher: `Ritwick Dey`).
4. Open `index.html`.
5. Klik rechtsonder op **Go Live**.
6. De website opent in je browser, meestal op:
   - `http://127.0.0.1:5500/index.html`

Dat is alles.

## Alternatief: starten via terminal

Als Live Server niet gebruikt wordt, kan dit ook:

1. Open de map in VS Code.
2. Open een terminal in VS Code (`Terminal > New Terminal`).
3. Run:

```bash
npx --yes serve -l 4173 .
```

4. Open in browser:
   - `http://localhost:4173`

Stoppen:

- In de terminal: `Ctrl + C`

## Belangrijkste bestanden

- `index.html` - homepage
- `woningen.html` - woonvarianten + filters
- `inschrijven.html` - 2-delig interesseformulier
- `zorg-services.html` - welzijn en services
- `locatie.html` - locatie en bereikbaarheid
- `contact.html` - contactformulier
- `dank.html` - bedankt pagina na formulier
- `privacy.html` - privacyverklaring
- `assets/css/styles.css` - visuele stijl
- `assets/js/main.js` - front-end logica
- `assets/js/data.js` - content/data

## Inhoud aanpassen

- Teksten op pagina's: pas de `.html` bestanden aan.
- Woondata/beelden/buurt: pas `assets/js/data.js` aan.
- Styling: pas `assets/css/styles.css` aan.

## Bekende punten

- Een melding `404 /favicon.ico` is onschuldig als er nog geen favicon bestand is toegevoegd.
- Formulierdata wordt lokaal in de browser opgeslagen voor de huidige projectfase.

## Delen met anderen

Als je deze repo deelt, stuur dan mee:

- De link naar de repo
- Deze README
- Eventueel een korte notitie: "Open folder in VS Code en klik op Go Live"
