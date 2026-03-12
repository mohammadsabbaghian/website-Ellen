(function () {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const IMAGE_FALLBACK =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Crect width='1200' height='800' fill='%23ebe4d8'/%3E%3Cg fill='none' stroke='%23998c78' stroke-width='8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M110 660l240-230 190 170 220-250 330 310'/%3E%3Ccircle cx='930' cy='210' r='60'/%3E%3C/g%3E%3Ctext x='120' y='730' fill='%23453e34' font-family='Verdana' font-size='44'%3EBeeld tijdelijk niet beschikbaar%3C/text%3E%3C/svg%3E";

  const navItems = [
    { href: "index.html", label: "Home" },
    { href: "woningen.html", label: "Woonvarianten" },
    { href: "zorg-services.html", label: "Welzijn & services" },
    { href: "locatie.html", label: "Locatie" },
    { href: "inschrijven.html", label: "Interesse" },
    { href: "contact.html", label: "Contact" },
  ];

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderHeader() {
    const mount = document.querySelector("[data-site-header]");
    if (!mount) return;

    const navLinks = navItems
      .map((item) => {
        const isActive = currentPath === item.href;
        return `<a href="${item.href}" ${isActive ? 'aria-current="page"' : ""}>${item.label}</a>`;
      })
      .join("");

    mount.innerHTML = `
      <a class="skip-link" href="#main-content">Direct naar inhoud</a>
      <header class="site-header" role="banner">
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="Knarre Krasse Woning home">Knarre Krasse Woning</a>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
          <nav id="site-nav" class="site-nav" aria-label="Hoofdnavigatie">${navLinks}</nav>
        </div>
      </header>
    `;

    const toggle = mount.querySelector(".menu-toggle");
    const nav = mount.querySelector(".site-nav");
    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        nav.classList.toggle("is-open");
      });
    }
  }

  function renderFooter() {
    const mount = document.querySelector("[data-site-footer]");
    if (!mount) return;

    mount.innerHTML = `
      <footer class="site-footer" role="contentinfo">
        <div class="container footer-grid">
          <section>
            <h2>Projectlocatie</h2>
            <p>Knarre Krasse Woning<br>Eijerdijk 87<br>8051 XX Hattem</p>
            <p>Voor vragen: <a href="mailto:info@knarrekrassewoning.nl">info@knarrekrassewoning.nl</a><br>of <a href="contact.html">via het contactformulier</a>.</p>
          </section>
          <section>
            <h2>Handig</h2>
            <p><a href="inschrijven.html">Interesse doorgeven</a><br><a href="inschrijven.html#faq-uitgebreid">Veelgestelde vragen</a><br><a href="privacy.html">Privacyverklaring</a></p>
          </section>
        </div>
        <div class="container footer-bottom">
          <small>© <span id="year"></span> Knarre Krasse Woning. Conceptontwikkeling Eijerdijk 87 Hattem.</small>
        </div>
      </footer>
    `;

    const year = mount.querySelector("#year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function renderCookieNotice() {
    if (localStorage.getItem("cookie-consent-minimal") === "accepted") return;

    const notice = document.createElement("aside");
    notice.className = "cookie-notice";
    notice.setAttribute("aria-live", "polite");
    notice.innerHTML = `
      <p>Deze website gebruikt alleen functionele cookies voor basiswerking, zoals formulierafhandeling en voorkeuren.</p>
      <button type="button" class="btn btn-primary" data-cookie-accept>Akkoord</button>
    `;

    document.body.appendChild(notice);
    const button = notice.querySelector("[data-cookie-accept]");
    if (button) {
      button.addEventListener("click", () => {
        localStorage.setItem("cookie-consent-minimal", "accepted");
        notice.remove();
      });
    }
  }

  function renderHeroMedia() {
    const mount = document.querySelector("[data-hero-media]");
    const media = Array.isArray(window.PROJECT_MEDIA) ? window.PROJECT_MEDIA : [];
    if (!mount || !media.length) return;

    const hero = media.find((item) => Array.isArray(item.tags) && item.tags.includes("hero")) || media[0];
    mount.innerHTML = `
      <figure class="hero-media-frame">
        <img src="${escapeHtml(hero.src)}" alt="${escapeHtml(hero.alt)}" loading="eager" fetchpriority="high" width="2160" height="1440" data-fallback="${IMAGE_FALLBACK}">
        <figcaption>${escapeHtml(hero.caption)}</figcaption>
      </figure>
    `;
  }

  function renderProjectGallery() {
    const mount = document.querySelector("[data-project-gallery]");
    const media = Array.isArray(window.PROJECT_MEDIA) ? window.PROJECT_MEDIA : [];
    if (!mount || !media.length) return;

    const galleryItems = media.filter((item) => Array.isArray(item.tags) && item.tags.includes("gallery")).slice(1, 9);
    mount.innerHTML = galleryItems
      .map(
        (item, index) => `
          <figure class="gallery-card ${index === 0 ? "gallery-card-large" : ""}">
            <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt)}" loading="lazy" width="2160" height="1440" data-fallback="${IMAGE_FALLBACK}">
            <figcaption>${escapeHtml(item.caption)}</figcaption>
          </figure>
        `
      )
      .join("");
  }

  function createWoningCard(item, includeCta) {
    const voorkeur = encodeURIComponent(item.ctaVoorkeur || "Geen voorkeur / ik denk mee");
    const woningtype = encodeURIComponent(item.ctaWoningtype || item.titel || "Geen voorkeur");
    const faseLabel = item.type === "huidig" ? "Huidige opzet" : "Verkenning met inspraak";
    const imageSrc = item.image ? escapeHtml(item.image) : IMAGE_FALLBACK;

    return `
      <article class="card woning-card" data-card-type="${escapeHtml(item.type)}" data-card-min="${escapeHtml(item.oppervlakteMin)}" data-card-bedrooms="${escapeHtml(item.slaapkamersMax)}">
        <figure class="card-image-wrap">
          <img class="card-image" src="${imageSrc}" alt="${escapeHtml(item.imageAlt || item.titel)}" loading="lazy" width="2160" height="1440" data-fallback="${IMAGE_FALLBACK}">
        </figure>
        <p class="eyebrow">${faseLabel}</p>
        <h3>${escapeHtml(item.titel)}</h3>
        <p>${escapeHtml(item.omschrijving)}</p>
        <ul class="card-meta">
          <li><strong>Oppervlakte:</strong> ${escapeHtml(item.oppervlakteMin)}-${escapeHtml(item.oppervlakteMax)} m²</li>
          <li><strong>Kamers:</strong> ${escapeHtml(item.kamers)}</li>
          <li><strong>Ligging:</strong> ${escapeHtml(item.verdieping)}</li>
          <li><strong>Status:</strong> ${escapeHtml(item.status)}</li>
        </ul>
        ${
          includeCta
            ? `<a class="btn btn-secondary" href="inschrijven.html?voorkeur=${voorkeur}&woningtype=${woningtype}">Interesse in deze richting</a>`
            : `<a class="text-link" href="woningen.html">Bekijk alle woonvarianten</a>`
        }
      </article>
    `;
  }

  function renderWoningen() {
    const allData = Array.isArray(window.WONING_DATA) ? window.WONING_DATA : [];
    if (!allData.length) return;

    const homeMount = document.querySelector("[data-home-woningen]");
    if (homeMount) {
      homeMount.innerHTML = allData.map((item) => createWoningCard(item, false)).join("");
    }

    const overviewMount = document.querySelector("[data-woningen-overview]");
    if (overviewMount) {
      overviewMount.innerHTML = allData.map((item) => createWoningCard(item, true)).join("");
    }
  }

  function applyFilters() {
    const form = document.querySelector("[data-filter-form]");
    if (!form) return;

    const cards = Array.from(document.querySelectorAll(".woning-card"));
    const result = document.querySelector("[data-filter-result]");

    function runFilter() {
      const type = String(form.querySelector("[name='type']")?.value || "alle");
      const maxM2 = Number(form.querySelector("[name='m2']")?.value || 9999);
      const bedrooms = Number(form.querySelector("[name='slaapkamers']")?.value || 0);

      let visibleCount = 0;
      cards.forEach((card) => {
        const cardType = card.getAttribute("data-card-type");
        const cardMin = Number(card.getAttribute("data-card-min") || 0);
        const cardBedrooms = Number(card.getAttribute("data-card-bedrooms") || 0);

        const typeOk = type === "alle" || cardType === type;
        const m2Ok = cardMin <= maxM2;
        const bedroomOk = bedrooms === 0 || cardBedrooms >= bedrooms;

        const visible = typeOk && m2Ok && bedroomOk;
        card.classList.toggle("is-hidden", !visible);
        if (visible) visibleCount += 1;
      });

      if (result) {
        result.textContent = `${visibleCount} woonvariant(en) zichtbaar.`;
      }
    }

    form.addEventListener("input", runFilter);
    form.addEventListener("change", runFilter);
    runFilter();
  }

  function setupCsvExport() {
    const exportButton = document.querySelector("[data-export-csv]");
    if (!exportButton) return;

    exportButton.addEventListener("click", () => {
      const leads = JSON.parse(localStorage.getItem("kkw-leads") || "[]");
      if (!leads.length) {
        alert("Nog geen inschrijvingen om te exporteren.");
        return;
      }

      const headers = Object.keys(leads[0]);
      const rows = [headers.join(";")].concat(
        leads.map((lead) =>
          headers
            .map((key) => `"${String(lead[key] ?? "").replace(/"/g, '""')}"`)
            .join(";")
        )
      );

      const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "interesse-eijerdijk87.csv";
      link.click();
      URL.revokeObjectURL(url);
    });
  }

  function setupInschrijfformulier() {
    const form = document.querySelector("[data-inschrijf-form]");
    if (!form) return;

    const params = new URLSearchParams(window.location.search);
    const voorkeur = params.get("voorkeur");
    const woningtype = params.get("woningtype");

    if (voorkeur) {
      const select = form.querySelector("[name='voorkeur']");
      if (select) {
        const hasValue = Array.from(select.options).some((option) => option.value === voorkeur);
        if (hasValue) select.value = voorkeur;
      }
    }

    if (woningtype) {
      const select = form.querySelector("[name='woningtype']");
      if (select) {
        const hasValue = Array.from(select.options).some((option) => option.value === woningtype);
        if (hasValue) {
          select.value = woningtype;
        } else if (woningtype.toLowerCase().includes("compact")) {
          select.value = "Compactere tuinunit (verkenning)";
        } else if (woningtype.toLowerCase().includes("villa")) {
          select.value = "Villa-appartement";
        }
      }
    }

    const dienstenInputs = Array.from(form.querySelectorAll("input[name='diensten']"));
    const noServiceOption = form.querySelector("input[name='diensten'][value='Geen aanvullende diensten nodig']");

    form.addEventListener("change", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement) || target.name !== "diensten") return;

      if (noServiceOption && target === noServiceOption && noServiceOption.checked) {
        dienstenInputs.forEach((input) => {
          if (input !== noServiceOption) input.checked = false;
        });
      }

      if (noServiceOption && target !== noServiceOption && target.checked) {
        noServiceOption.checked = false;
      }
    });

    setupCsvExport();

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const diensten = formData.getAll("diensten");
      if (diensten.length > 3) {
        alert("Kies maximaal 3 diensten in Deel 2.");
        return;
      }

      if (!formData.get("privacy")) {
        alert("Geef akkoord op de privacyverklaring om verder te gaan.");
        return;
      }

      const payload = {
        datum: new Date().toISOString(),
        naam: formData.get("naam"),
        email: formData.get("email"),
        telefoon: formData.get("telefoon"),
        rol: formData.get("rol"),
        contactvoorkeur: formData.get("contactvoorkeur"),
        termijn: formData.get("termijn"),
        gewensteStap: formData.get("gewenste_stap"),
        voorkeur: formData.get("voorkeur"),
        woningtype: formData.get("woningtype"),
        m2: formData.get("m2"),
        slaapkamers: formData.get("slaapkamers"),
        huishouden: formData.get("huishouden"),
        belangrijksteFactor: formData.get("belangrijkste_factor"),
        servicebehoefte: formData.get("servicebehoefte"),
        uitbreidingsvoorkeur: formData.get("uitbreidingsvoorkeur"),
        kleinereUnits: formData.get("kleinere_units"),
        diensten: diensten.join(", "),
        prijsupdate: formData.get("prijsupdate") ? "Ja" : "Nee",
        toelichting: formData.get("toelichting"),
      };

      const existing = JSON.parse(localStorage.getItem("kkw-leads") || "[]");
      existing.push(payload);
      localStorage.setItem("kkw-leads", JSON.stringify(existing));

      const subject = encodeURIComponent("Nieuwe interesseaanvraag - Eijerdijk 87");
      const body = encodeURIComponent(
        [
          `Naam: ${payload.naam}`,
          `E-mail: ${payload.email}`,
          `Telefoon: ${payload.telefoon}`,
          `Rol: ${payload.rol}`,
          `Contactvoorkeur: ${payload.contactvoorkeur}`,
          `Gewenste termijn: ${payload.termijn}`,
          `Gewenste stap: ${payload.gewensteStap}`,
          `Voorkeur fase: ${payload.voorkeur}`,
          `Voorkeur woningtype: ${payload.woningtype}`,
          `Voorkeur m2: ${payload.m2}`,
          `Voorkeur slaapkamers: ${payload.slaapkamers}`,
          `Huishouden: ${payload.huishouden}`,
          `Belangrijkste factor: ${payload.belangrijksteFactor}`,
          `Servicebehoefte: ${payload.servicebehoefte}`,
          `Voorkeur aantal woningen: ${payload.uitbreidingsvoorkeur}`,
          `Interesse kleinere units: ${payload.kleinereUnits}`,
          `Gewenste diensten: ${payload.diensten}`,
          `Prijsupdate ontvangen: ${payload.prijsupdate}`,
          `Toelichting: ${payload.toelichting}`,
        ].join("\n")
      );

      const mailto = `mailto:info@knarrekrassewoning.nl?subject=${subject}&body=${body}`;
      window.location.href = `dank.html?mail=${encodeURIComponent(mailto)}`;
    });
  }

  function setupDankpagina() {
    const mount = document.querySelector("[data-mailto-link]");
    if (!mount) return;

    const params = new URLSearchParams(window.location.search);
    const mailRaw = params.get("mail");
    if (!mailRaw) return;

    const mail = decodeURIComponent(mailRaw);
    if (mail.startsWith("mailto:")) {
      mount.innerHTML = `<a class="btn btn-secondary" href="${escapeHtml(mail)}">Stuur deze aanvraag ook per e-mail</a>`;
    }
  }

  function setupContactForm() {
    const form = document.querySelector("[data-contact-form]");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent(`Contactaanvraag - ${String(data.get("onderwerp") || "Algemeen")}`);
      const body = encodeURIComponent(
        [
          `Naam: ${data.get("naam")}`,
          `E-mail: ${data.get("email")}`,
          `Telefoon: ${data.get("telefoon")}`,
          `Onderwerp: ${data.get("onderwerp")}`,
          "Bericht:",
          `${data.get("bericht")}`,
        ].join("\n")
      );
      window.location.href = `mailto:info@knarrekrassewoning.nl?subject=${subject}&body=${body}`;
    });
  }

  function renderBuurt() {
    const mount = document.querySelector("[data-in-de-buurt]");
    if (!mount || !Array.isArray(window.IN_DE_BUURT_DATA)) return;
    mount.innerHTML = window.IN_DE_BUURT_DATA.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  }

  function attachImageFallbacks() {
    const images = Array.from(document.querySelectorAll("img[data-fallback]"));
    if (!images.length) return;

    const applyFallback = (img) => {
      if (!(img instanceof HTMLImageElement)) return;
      if (img.dataset.fallbackApplied === "true") return;
      const fallback = img.getAttribute("data-fallback");
      if (!fallback) return;

      img.dataset.fallbackApplied = "true";
      img.src = fallback;
      img.alt = "Illustratieve afbeelding";
      img.classList.add("is-fallback-image");
    };

    images.forEach((img) => {
      img.addEventListener("error", () => applyFallback(img), { once: true });
      if (img.complete && img.naturalWidth === 0) {
        applyFallback(img);
      }
    });
  }

  renderHeader();
  renderFooter();
  renderCookieNotice();
  renderHeroMedia();
  renderProjectGallery();
  renderWoningen();
  applyFilters();
  setupInschrijfformulier();
  setupDankpagina();
  setupContactForm();
  renderBuurt();
  attachImageFallbacks();
})();
