var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// stackbit.config.ts
var stackbit_config_exports = {};
__export(stackbit_config_exports, {
  default: () => stackbit_config_default
});
module.exports = __toCommonJS(stackbit_config_exports);
var import_cms_git = require("@stackbit/cms-git");
var import_types = require("@stackbit/types");
var factItem = {
  type: "object",
  name: "fact_item",
  label: "Kernpunt",
  labelField: "titel",
  fields: [
    { type: "string", name: "titel", label: "Titel", required: true },
    { type: "string", name: "tekst", label: "Tekst", required: true }
  ]
};
var highlightItem = {
  type: "object",
  name: "highlight_item",
  label: "Highlight",
  labelField: "titel",
  fields: [
    { type: "string", name: "label", label: "Label" },
    { type: "string", name: "titel", label: "Titel", required: true },
    { type: "text", name: "tekst", label: "Tekst", required: true },
    {
      type: "list",
      name: "items",
      label: "Accentwoorden",
      items: {
        type: "string"
      }
    }
  ]
};
var imageItem = {
  type: "object",
  name: "image_item",
  label: "Afbeelding",
  labelField: "alt",
  fields: [
    { type: "image", name: "afbeelding", label: "Afbeelding", required: true },
    { type: "string", name: "alt", label: "Alt-tekst", required: true },
    { type: "string", name: "bijschrift", label: "Bijschrift" }
  ]
};
var faqItem = {
  type: "object",
  name: "faq_item",
  label: "FAQ-item",
  labelField: "vraag",
  fields: [
    { type: "string", name: "vraag", label: "Vraag", required: true },
    { type: "markdown", name: "antwoord", label: "Antwoord", required: true }
  ]
};
var pageGroups = [
  { name: "content", label: "Content", icon: "text" },
  { name: "seo", label: "SEO", icon: "page" }
];
var homeModel = {
  type: "page",
  name: "home",
  label: "Homepage",
  labelField: "title",
  singleInstance: true,
  canDelete: false,
  hideContent: true,
  urlPath: "/",
  file: "content/_index.md",
  fieldGroups: [
    { name: "hero", label: "Hero", icon: "sparkles" },
    { name: "concept", label: "Concept", icon: "text" },
    { name: "images", label: "Beelden", icon: "image" },
    { name: "location", label: "Locatie", icon: "globe" },
    { name: "faq", label: "FAQ", icon: "circle-question" },
    { name: "cta", label: "CTA", icon: "arrow-up-from-square" },
    { name: "seo", label: "SEO", icon: "page" }
  ],
  fields: [
    { type: "string", name: "title", label: "Titel", required: true, group: "seo" },
    { type: "string", name: "description", label: "Beschrijving", required: true, group: "seo" },
    { type: "string", name: "hero_kicker", label: "Hero kicker", group: "hero" },
    { type: "string", name: "hero_title", label: "Hero titel", required: true, group: "hero" },
    { type: "text", name: "hero_subtitle", label: "Hero subtitel", required: true, group: "hero" },
    {
      type: "list",
      name: "feiten",
      label: "Kernpunten",
      group: "concept",
      items: {
        type: "model",
        models: ["fact_item"]
      }
    },
    { type: "string", name: "over_titel", label: "Over-titel", required: true, group: "concept" },
    { type: "markdown", name: "over_tekst", label: "Over-tekst", required: true, group: "concept" },
    { type: "string", name: "highlights_titel", label: "Highlights titel", required: true, group: "concept" },
    { type: "text", name: "highlights_intro", label: "Highlights intro", group: "concept" },
    {
      type: "list",
      name: "highlights",
      label: "Highlights",
      group: "concept",
      items: {
        type: "model",
        models: ["highlight_item"]
      }
    },
    { type: "string", name: "galerij_titel", label: "Galerij titel", required: true, group: "images" },
    {
      type: "list",
      name: "galerij",
      label: "Galerij",
      group: "images",
      items: {
        type: "model",
        models: ["image_item"]
      }
    },
    { type: "string", name: "welzijn_titel", label: "Welzijn titel", required: true, group: "concept" },
    { type: "markdown", name: "welzijn_tekst", label: "Welzijn tekst", required: true, group: "concept" },
    { type: "string", name: "zoekvraag_titel", label: "Zoekvraag titel", required: true, group: "location" },
    { type: "markdown", name: "zoekvraag_tekst", label: "Zoekvraag tekst", required: true, group: "location" },
    { type: "string", name: "locatie_titel", label: "Locatie titel", required: true, group: "location" },
    { type: "markdown", name: "locatie_tekst", label: "Locatie tekst", required: true, group: "location" },
    {
      type: "list",
      name: "faq",
      label: "FAQ",
      group: "faq",
      items: {
        type: "model",
        models: ["faq_item"]
      }
    },
    { type: "string", name: "cta_titel", label: "CTA titel", required: true, group: "cta" },
    { type: "text", name: "cta_tekst", label: "CTA tekst", required: true, group: "cta" }
  ]
};
var overModel = {
  type: "page",
  name: "over",
  label: "Over",
  labelField: "title",
  singleInstance: true,
  canDelete: false,
  urlPath: "/over",
  file: "content/over.md",
  fieldGroups: pageGroups,
  fields: [
    { type: "string", name: "title", label: "Titel", required: true, group: "content" },
    { type: "markdown", name: "markdown_content", label: "Inhoud", required: true, group: "content" },
    { type: "string", name: "description", label: "Beschrijving", required: true, group: "seo" },
    { type: "string", name: "layout", const: "single", hidden: true },
    { type: "string", name: "type", const: "over", hidden: true }
  ]
};
var woningenModel = {
  type: "page",
  name: "woningen",
  label: "Woningen",
  labelField: "title",
  singleInstance: true,
  canDelete: false,
  urlPath: "/woningen",
  file: "content/woningen.md",
  fieldGroups: [
    { name: "content", label: "Content", icon: "text" },
    { name: "images", label: "Beelden", icon: "image" },
    { name: "seo", label: "SEO", icon: "page" }
  ],
  fields: [
    { type: "string", name: "title", label: "Titel", required: true, group: "content" },
    { type: "string", name: "description", label: "Beschrijving", required: true, group: "seo" },
    { type: "string", name: "subtitle", label: "Subtitel", required: true, group: "content" },
    { type: "markdown", name: "markdown_content", label: "Inhoud", required: true, group: "content" },
    { type: "string", name: "layout", const: "woningen", hidden: true },
    { type: "string", name: "type", const: "woningen", hidden: true },
    {
      type: "list",
      name: "fotos",
      label: "Foto's",
      group: "images",
      items: {
        type: "model",
        models: ["image_item"]
      }
    }
  ]
};
var interesseModel = {
  type: "page",
  name: "interesse",
  label: "Interesse",
  labelField: "title",
  singleInstance: true,
  canDelete: false,
  urlPath: "/interesse",
  file: "content/interesse.md",
  fieldGroups: pageGroups,
  fields: [
    { type: "string", name: "title", label: "Titel", required: true, group: "content" },
    { type: "string", name: "description", label: "Beschrijving", required: true, group: "seo" },
    { type: "markdown", name: "markdown_content", label: "Introductie", required: true, group: "content" },
    { type: "string", name: "layout", const: "interesse", hidden: true },
    { type: "string", name: "type", const: "interesse", hidden: true }
  ]
};
var contactModel = {
  type: "page",
  name: "contact",
  label: "Contact",
  labelField: "title",
  singleInstance: true,
  canDelete: false,
  urlPath: "/contact",
  file: "content/contact.md",
  fieldGroups: pageGroups,
  fields: [
    { type: "string", name: "title", label: "Titel", required: true, group: "content" },
    { type: "string", name: "description", label: "Beschrijving", required: true, group: "seo" },
    { type: "markdown", name: "markdown_content", label: "Inhoud", required: true, group: "content" },
    { type: "string", name: "layout", const: "contact", hidden: true },
    { type: "string", name: "type", const: "contact", hidden: true }
  ]
};
var privacyModel = {
  type: "page",
  name: "privacy",
  label: "Privacy",
  labelField: "title",
  singleInstance: true,
  canDelete: false,
  urlPath: "/privacy",
  file: "content/privacy.md",
  fieldGroups: pageGroups,
  fields: [
    { type: "string", name: "title", label: "Titel", required: true, group: "content" },
    { type: "markdown", name: "markdown_content", label: "Inhoud", required: true, group: "content" },
    { type: "string", name: "description", label: "Beschrijving", required: true, group: "seo" },
    { type: "string", name: "type", const: "privacy", hidden: true }
  ]
};
var dankModel = {
  type: "page",
  name: "dank",
  label: "Bedankpagina",
  labelField: "title",
  singleInstance: true,
  canDelete: false,
  urlPath: "/dank",
  file: "content/dank.md",
  fieldGroups: pageGroups,
  fields: [
    { type: "string", name: "title", label: "Titel", required: true, group: "content" },
    { type: "markdown", name: "markdown_content", label: "Inhoud", required: true, group: "content" },
    { type: "string", name: "description", label: "Beschrijving", required: true, group: "seo" },
    { type: "string", name: "type", const: "dank", hidden: true }
  ]
};
var models = [
  factItem,
  highlightItem,
  imageItem,
  faqItem,
  homeModel,
  overModel,
  woningenModel,
  interesseModel,
  contactModel,
  privacyModel,
  dankModel
];
var stackbit_config_default = (0, import_types.defineStackbitConfig)({
  stackbitVersion: "~0.7.0",
  ssgName: "custom",
  nodeVersion: "18",
  devCommand: "hugo server --bind 0.0.0.0 --port {PORT} --appendPort=false --baseURL http://localhost:{PORT}",
  customContentReload: true,
  experimental: {
    ssg: {
      name: "hugo",
      logPatterns: {
        up: ["Web Server is available at"]
      },
      passthrough: ["/livereload.js", "/livereload"]
    }
  },
  contentSources: [
    new import_cms_git.GitContentSource({
      rootPath: "E:\\test\\website Ellen",
      contentDirs: ["content"],
      models,
      assetsConfig: {
        referenceType: "static",
        staticDir: "static",
        uploadDir: "images",
        publicPath: "/"
      }
    })
  ]
});
//# sourceMappingURL=stackbit.config.FMDXBYAA.cjs.map
