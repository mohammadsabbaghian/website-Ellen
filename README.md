# 't Kalverveen — Website

Website voor **'t Kalverveen**: kleinschalig en zelfstandig wonen in een villa in Hattem.

| Onderdeel | Technologie | Waarom |
|-----------|-------------|--------|
| Site-generator | [Hugo](https://gohugo.io/) | Snel, geen database, gratis |
| Content-beheer | [Decap CMS](https://decapcms.org/) | Visueel bewerken in de browser |
| Hosting | [Netlify](https://netlify.com/) | Gratis, auto-deploy, formulieren ingebouwd |

---

## 1. Lokaal draaien

> Dit heb je nodig om de site op je eigen computer te bekijken en te bewerken.

### Stap 1 — Hugo installeren

**Windows (via winget):**
```powershell
winget install Hugo.Hugo.Extended
```

**Mac (via Homebrew):**
```bash
brew install hugo
```

Controleer of het werkt:
```bash
hugo version
```
Je zou iets moeten zien als `hugo v0.157.0...extended`.

### Stap 2 — Repo openen

Open deze repo-root in VS Code (of een andere editor):
```bash
cd pad/naar/website\ Ellen
```

### Stap 3 — Server starten

```bash
hugo server
```

### Stap 4 — Bekijken

Open **http://localhost:1313** in je browser. De site ververst automatisch als je een bestand wijzigt.

### Stoppen

Druk op `Ctrl + C` in de terminal.

---

## 2. Deployen op Netlify

> Eenmalige setup. Daarna deployt elke `git push` automatisch.

### Stap 1 — GitHub-repo aanmaken

1. Ga naar [github.com/new](https://github.com/new)
2. Naam: `huizekalverveen.nl` of `kalverveen`
3. **Private** aanvinken
4. Klik **Create repository**

### Stap 2 — Code pushen

Vanuit de repo-root:
```bash
git init
git add .
git commit -m "Eerste versie"
git branch -M main
git remote add origin https://github.com/JOUW-USERNAME/kalverveen.git
git push -u origin main
```

### Stap 3 — Netlify koppelen

1. Ga naar [app.netlify.com](https://app.netlify.com/)
2. Klik **Add new site** → **Import an existing project**
3. Kies **GitHub** en selecteer de repo
4. Netlify moet invullen:
   - **Base directory:** leeg laten
   - **Build command:** `hugo`
   - **Publish directory:** `public`
5. Klik **Deploy site**

De site is nu live op een Netlify-URL (bijv. `random-naam.netlify.app`).

### Stap 4 — Custom domein instellen

1. In Netlify: ga naar **Domain management** → **Add custom domain**
2. Vul in: `hetkalverveen.nl`
3. Bij je domeinregistrar: zet de DNS van dit domein naar Netlify.
   - Als de registrar alleen `TXT`, `CNAME` of `A` aanbiedt: kies voor het hoofddomein (`hetkalverveen.nl`) een `A`-record
   - Host/naam: `@`
   - Waarde: `75.2.60.5`
   - Voor `www.hetkalverveen.nl` gebruik je meestal een `CNAME` naar `kalverveen.netlify.app`
   - Als je registrar `ALIAS`, `ANAME` of flattened `CNAME` ondersteunt, is dat voor het hoofddomein nog netter dan een `A`-record
   - Laat de registrar **geen URL forwarding / web forwarding / domein-doorsturing** instellen, want dan ziet de bezoeker `kalverveen.netlify.app` in plaats van `hetkalverveen.nl`
   - **OF** gebruik Netlify DNS (dan wijs je de nameservers van je domein naar Netlify)
4. Netlify regelt automatisch HTTPS (Let's Encrypt)

### Stap 5 — huizekalverveen.nl redirect

1. In Netlify: voeg ook `huizekalverveen.nl` toe als domein
2. Ook dit domein moet met DNS naar Netlify wijzen, anders kan Netlify de redirect niet uitvoeren
3. Als de registrar alleen `TXT`, `CNAME` of `A` aanbiedt: gebruik voor `huizekalverveen.nl` ook een `A`-record met host `@` en waarde `75.2.60.5`
4. Voor `www.huizekalverveen.nl` kun je een `CNAME` gebruiken naar `kalverveen.netlify.app`
5. Zodra Netlify dit domein ontvangt, redirect het automatisch naar het primaire domein `hetkalverveen.nl`
6. Hiervoor is geen aparte `_redirects`-regel nodig
7. Laat ook hier de registrar alleen DNS instellen, niet een handmatige URL-doorsturing

### Klaar!

Elke `git push` naar `main` triggert automatisch een nieuwe deploy (~10 seconden).

---

## 3. CMS instellen (Decap CMS)

> Zodat iemand zonder technische kennis teksten en foto's kan aanpassen via een admin-paneel.

### Stap 1 — Netlify Identity activeren

1. In Netlify dashboard: ga naar **Integrations** → **Identity**
2. Klik **Enable Identity**
3. Onder **Registration**: kies **Invite only** (zodat niet iedereen zich kan registreren)

### Stap 2 — Git Gateway activeren

1. Nog steeds in Identity: scroll naar **Services** → **Git Gateway**
2. Klik **Enable Git Gateway**

### Stap 3 — Gebruiker uitnodigen

1. Ga naar **Identity** → **Invite users**
2. Vul het e-mailadres in van de persoon die content gaat bewerken
3. Die persoon ontvangt een e-mail om een wachtwoord in te stellen

### Stap 4 — Inloggen op het CMS

1. Ga naar `https://hetkalverveen.nl/admin/`
2. Log in met het e-mailadres en wachtwoord uit stap 3
3. Je ziet nu een overzicht van alle pagina's en secties

### Wat kun je bewerken via het CMS?

| Onderdeel | Wat kun je aanpassen |
|-----------|---------------------|
| **Homepage** | Hero-tekst, kernpunten, over-tekst, galerij-foto's, welzijn, locatie, FAQ, CTA |
| **Over 't Kalverveen** | Volledige tekst |
| **Woningen** | Tekst, subtitel, foto's |
| **Interesse** | Introductietekst |
| **Contact** | Tekst en contactgegevens |
| **Privacy** | Volledige tekst |
| **Bedankpagina** | Tekst na formulierinzending |

### Hoe werkt het?

1. Open `hetkalverveen.nl/admin/`
2. Kies de pagina die je wilt bewerken
3. Pas tekst, foto's of FAQ-items aan
4. Klik **Publiceren**
5. De wijziging is binnen ~30 seconden zichtbaar op de live site

---

## 4. Content bewerken via bestanden

> Voor wie liever direct in de bestanden werkt.

De teksten staan in de `content/`-map als Markdown-bestanden:

| Bestand | Pagina |
|---------|--------|
| `content/_index.md` | Homepage |
| `content/over.md` | Over 't Kalverveen |
| `content/woningen.md` | Woningen (teaser) |
| `content/interesse.md` | Interesseformulier |
| `content/contact.md` | Contact |
| `content/dank.md` | Bedankpagina |
| `content/privacy.md` | Privacyverklaring |

**Structuur van een bestand:**
```markdown
---
title: "Paginatitel"
description: "Korte beschrijving voor Google"
---

Hier staat de inhoud. **Vetgedrukt**, *cursief*, [links](https://example.com).
```

Het stuk tussen `---` is metadata. Daaronder de tekst.

Na wijzigen: `git add . && git commit -m "Tekst aangepast" && git push`

---

## 5. Foto's beheren

### Toevoegen

1. Plaats foto's in `static/images/`
2. Gebruik ze in content: `/images/bestandsnaam.jpg`

### Via het CMS

In het admin-paneel kun je foto's uploaden bij de galerij-secties. Ze worden automatisch in de juiste map geplaatst.

### Huidige foto's

| Bestand | Beschrijving |
|---------|-------------|
| `villa-voorzijde.jpg` | Voorzijde villa (hero) |
| `oprijlaan-groen.jpg` | Oprijlaan met groen |
| `zijaanzicht-villa.jpg` | Zijaanzicht villa |
| `tuin-zithoek.jpg` | Tuin met zithoek |
| `tuinpad.jpg` | Tuinpad |
| `uitzicht-groen.jpg` | Groene omgeving |
| `entree-hal.jpg` | Entree en hal |
| `woonkamer-sfeer.jpg` | Woonkamer |
| `veranda-bijgebouw.jpg` | Veranda en bijgebouw |

---

## 6. Formulieren

Formulieren (interesse + contact) worden afgehandeld door **Netlify Forms**.

- **Inzendingen bekijken:** Netlify dashboard → Forms
- **E-mailnotificatie instellen:** Forms → Form notifications → Add notification → Email
- **Exporteren als CSV:** Forms → kies formulier → Download as CSV

Geen extra configuratie nodig — werkt automatisch na deploy.

---

## Projectstructuur

```
website Ellen/
├── content/          ← Teksten (Markdown)
├── layouts/          ← HTML-templates
│   ├── _default/     ← Standaard layout
│   ├── partials/     ← Header, footer
│   └── page/         ← Pagina-specifieke templates
├── assets/
│   ├── css/main.css  ← Stylesheet
│   └── js/main.js    ← JavaScript (minimaal)
├── static/
│   ├── images/       ← Foto's
│   └── admin/        ← Decap CMS
├── hugo.toml         ← Site-instellingen
└── netlify.toml      ← Deploy-instellingen
```

---

## Domeinen

| Domein | Rol |
|--------|-----|
| **hetkalverveen.nl** | Primair domein |
| **huizekalverveen.nl** | Redirect naar primair |

---

## Hulp nodig?

- Hugo documentatie: https://gohugo.io/documentation/
- Decap CMS documentatie: https://decapcms.org/docs/
- Netlify documentatie: https://docs.netlify.com/
