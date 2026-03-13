# 't Kalverveen — Website

Website voor 't Kalverveen: kleinschalig en zelfstandig wonen in een villa in Hattem.

**Technologie:** Hugo (static site generator) + Decap CMS (visueel beheer) + Netlify (hosting)

---

## Lokaal draaien

### Benodigdheden

- [Hugo Extended](https://gohugo.io/installation/) (v0.157+)

### Starten

```bash
cd kalverveen
hugo server
```

Open [http://localhost:1313](http://localhost:1313) in je browser.

---

## Projectstructuur

```
kalverveen/
├── content/          ← Teksten (Markdown). Hier pas je content aan.
│   ├── _index.md     ← Homepage
│   ├── over.md       ← Over 't Kalverveen
│   ├── woningen.md   ← Woningen (teaser)
│   ├── interesse.md  ← Interesseformulier
│   ├── contact.md    ← Contact
│   ├── dank.md       ← Bedankpagina
│   └── privacy.md    ← Privacyverklaring
├── layouts/          ← HTML-templates
├── assets/css/       ← Stylesheet
├── assets/js/        ← JavaScript (minimaal)
├── static/images/    ← Foto's
├── static/admin/     ← Decap CMS (visueel beheer)
├── hugo.toml         ← Site-configuratie
└── netlify.toml      ← Netlify deploy-configuratie
```

---

## Content aanpassen

### Via Decap CMS (visueel)

Na deployment op Netlify: ga naar `https://huizekalverveen.nl/admin/` en log in. Teksten, foto's en FAQ-items zijn visueel bewerkbaar.

### Via bestanden

Bewerk de Markdown-bestanden in `content/`. De tekst tussen `---` bovenin is metadata (titel, beschrijving). Daaronder staat de inhoud.

---

## Deployen op Netlify

1. Push deze repo naar GitHub
2. Log in op [netlify.com](https://netlify.com) en klik **"Add new site" → "Import from Git"**
3. Kies de GitHub-repo
4. Netlify detecteert automatisch Hugo — klik **Deploy**
5. Stel het custom domein in (huizekalverveen.nl)
6. Activeer **Netlify Identity** (voor CMS-login)

Elke `git push` naar `main` triggert automatisch een nieuwe deploy.

---

## Domeinen

- **huizekalverveen.nl** — primair domein
- **hetkalverveen.nl** — redirect naar primair

---

## Formulieren

Formulieren worden afgehandeld door Netlify Forms. Inzendingen zijn te bekijken in het Netlify-dashboard en worden per e-mail doorgestuurd.

---

## Licentie

Privaat project.
