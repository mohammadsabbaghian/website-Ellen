import { GitContentSource } from '@stackbit/cms-git';
import { Model, defineStackbitConfig } from '@stackbit/types';

const factItem: Model = {
  type: 'object',
  name: 'fact_item',
  label: 'Kernpunt',
  labelField: 'titel',
  fields: [
    { type: 'string', name: 'titel', label: 'Titel', required: true },
    { type: 'string', name: 'tekst', label: 'Tekst', required: true }
  ]
};

const highlightItem: Model = {
  type: 'object',
  name: 'highlight_item',
  label: 'Highlight',
  labelField: 'titel',
  fields: [
    { type: 'string', name: 'label', label: 'Label' },
    { type: 'string', name: 'titel', label: 'Titel', required: true },
    { type: 'text', name: 'tekst', label: 'Tekst', required: true },
    {
      type: 'list',
      name: 'items',
      label: 'Accentwoorden',
      items: {
        type: 'string'
      }
    }
  ]
};

const imageItem: Model = {
  type: 'object',
  name: 'image_item',
  label: 'Afbeelding',
  labelField: 'alt',
  fields: [
    { type: 'image', name: 'afbeelding', label: 'Afbeelding', required: true },
    { type: 'string', name: 'alt', label: 'Alt-tekst', required: true },
    { type: 'string', name: 'bijschrift', label: 'Bijschrift' }
  ]
};

const faqItem: Model = {
  type: 'object',
  name: 'faq_item',
  label: 'FAQ-item',
  labelField: 'vraag',
  fields: [
    { type: 'string', name: 'vraag', label: 'Vraag', required: true },
    { type: 'markdown', name: 'antwoord', label: 'Antwoord', required: true }
  ]
};

const pageGroups = [
  { name: 'content', label: 'Content', icon: 'text' },
  { name: 'seo', label: 'SEO', icon: 'page' }
];

const homeModel: Model = {
  type: 'page',
  name: 'home',
  label: 'Homepage',
  labelField: 'title',
  singleInstance: true,
  canDelete: false,
  hideContent: true,
  urlPath: '/',
  file: 'content/_index.md',
  fieldGroups: [
    { name: 'hero', label: 'Hero', icon: 'sparkles' },
    { name: 'concept', label: 'Concept', icon: 'text' },
    { name: 'images', label: 'Beelden', icon: 'image' },
    { name: 'location', label: 'Locatie', icon: 'globe' },
    { name: 'faq', label: 'FAQ', icon: 'circle-question' },
    { name: 'cta', label: 'CTA', icon: 'arrow-up-from-square' },
    { name: 'seo', label: 'SEO', icon: 'page' }
  ],
  fields: [
    { type: 'string', name: 'title', label: 'Titel', required: true, group: 'seo' },
    { type: 'string', name: 'description', label: 'Beschrijving', required: true, group: 'seo' },
    { type: 'string', name: 'hero_kicker', label: 'Hero kicker', group: 'hero' },
    { type: 'string', name: 'hero_title', label: 'Hero titel', required: true, group: 'hero' },
    { type: 'text', name: 'hero_subtitle', label: 'Hero subtitel', required: true, group: 'hero' },
    {
      type: 'list',
      name: 'feiten',
      label: 'Kernpunten',
      group: 'concept',
      items: {
        type: 'model',
        models: ['fact_item']
      }
    },
    { type: 'string', name: 'over_titel', label: 'Over-titel', required: true, group: 'concept' },
    { type: 'markdown', name: 'over_tekst', label: 'Over-tekst', required: true, group: 'concept' },
    { type: 'string', name: 'highlights_titel', label: 'Highlights titel', required: true, group: 'concept' },
    { type: 'text', name: 'highlights_intro', label: 'Highlights intro', group: 'concept' },
    {
      type: 'list',
      name: 'highlights',
      label: 'Highlights',
      group: 'concept',
      items: {
        type: 'model',
        models: ['highlight_item']
      }
    },
    { type: 'string', name: 'galerij_titel', label: 'Galerij titel', required: true, group: 'images' },
    {
      type: 'list',
      name: 'galerij',
      label: 'Galerij',
      group: 'images',
      items: {
        type: 'model',
        models: ['image_item']
      }
    },
    { type: 'string', name: 'welzijn_titel', label: 'Welzijn titel', required: true, group: 'concept' },
    { type: 'markdown', name: 'welzijn_tekst', label: 'Welzijn tekst', required: true, group: 'concept' },
    { type: 'string', name: 'zoekvraag_titel', label: 'Zoekvraag titel', required: true, group: 'location' },
    { type: 'markdown', name: 'zoekvraag_tekst', label: 'Zoekvraag tekst', required: true, group: 'location' },
    { type: 'string', name: 'locatie_titel', label: 'Locatie titel', required: true, group: 'location' },
    { type: 'markdown', name: 'locatie_tekst', label: 'Locatie tekst', required: true, group: 'location' },
    {
      type: 'list',
      name: 'faq',
      label: 'FAQ',
      group: 'faq',
      items: {
        type: 'model',
        models: ['faq_item']
      }
    },
    { type: 'string', name: 'cta_titel', label: 'CTA titel', required: true, group: 'cta' },
    { type: 'text', name: 'cta_tekst', label: 'CTA tekst', required: true, group: 'cta' }
  ]
};

const overModel: Model = {
  type: 'page',
  name: 'over',
  label: 'Over',
  labelField: 'title',
  singleInstance: true,
  canDelete: false,
  urlPath: '/over',
  file: 'content/over.md',
  fieldGroups: pageGroups,
  fields: [
    { type: 'string', name: 'title', label: 'Titel', required: true, group: 'content' },
    { type: 'markdown', name: 'markdown_content', label: 'Inhoud', required: true, group: 'content' },
    { type: 'string', name: 'description', label: 'Beschrijving', required: true, group: 'seo' },
    { type: 'string', name: 'layout', const: 'single', hidden: true },
    { type: 'string', name: 'type', const: 'over', hidden: true }
  ]
};

const woningenModel: Model = {
  type: 'page',
  name: 'woningen',
  label: 'Woningen',
  labelField: 'title',
  singleInstance: true,
  canDelete: false,
  urlPath: '/woningen',
  file: 'content/woningen.md',
  fieldGroups: [
    { name: 'content', label: 'Content', icon: 'text' },
    { name: 'images', label: 'Beelden', icon: 'image' },
    { name: 'seo', label: 'SEO', icon: 'page' }
  ],
  fields: [
    { type: 'string', name: 'title', label: 'Titel', required: true, group: 'content' },
    { type: 'string', name: 'description', label: 'Beschrijving', required: true, group: 'seo' },
    { type: 'string', name: 'subtitle', label: 'Subtitel', required: true, group: 'content' },
    { type: 'markdown', name: 'markdown_content', label: 'Inhoud', required: true, group: 'content' },
    { type: 'string', name: 'layout', const: 'woningen', hidden: true },
    { type: 'string', name: 'type', const: 'woningen', hidden: true },
    {
      type: 'list',
      name: 'fotos',
      label: 'Foto\'s',
      group: 'images',
      items: {
        type: 'model',
        models: ['image_item']
      }
    }
  ]
};

const interesseModel: Model = {
  type: 'page',
  name: 'interesse',
  label: 'Interesse',
  labelField: 'title',
  singleInstance: true,
  canDelete: false,
  urlPath: '/interesse',
  file: 'content/interesse.md',
  fieldGroups: pageGroups,
  fields: [
    { type: 'string', name: 'title', label: 'Titel', required: true, group: 'content' },
    { type: 'string', name: 'description', label: 'Beschrijving', required: true, group: 'seo' },
    { type: 'markdown', name: 'markdown_content', label: 'Introductie', required: true, group: 'content' },
    { type: 'string', name: 'layout', const: 'interesse', hidden: true },
    { type: 'string', name: 'type', const: 'interesse', hidden: true }
  ]
};

const contactModel: Model = {
  type: 'page',
  name: 'contact',
  label: 'Contact',
  labelField: 'title',
  singleInstance: true,
  canDelete: false,
  urlPath: '/contact',
  file: 'content/contact.md',
  fieldGroups: pageGroups,
  fields: [
    { type: 'string', name: 'title', label: 'Titel', required: true, group: 'content' },
    { type: 'string', name: 'description', label: 'Beschrijving', required: true, group: 'seo' },
    { type: 'markdown', name: 'markdown_content', label: 'Inhoud', required: true, group: 'content' },
    { type: 'string', name: 'layout', const: 'contact', hidden: true },
    { type: 'string', name: 'type', const: 'contact', hidden: true }
  ]
};

const privacyModel: Model = {
  type: 'page',
  name: 'privacy',
  label: 'Privacy',
  labelField: 'title',
  singleInstance: true,
  canDelete: false,
  urlPath: '/privacy',
  file: 'content/privacy.md',
  fieldGroups: pageGroups,
  fields: [
    { type: 'string', name: 'title', label: 'Titel', required: true, group: 'content' },
    { type: 'markdown', name: 'markdown_content', label: 'Inhoud', required: true, group: 'content' },
    { type: 'string', name: 'description', label: 'Beschrijving', required: true, group: 'seo' },
    { type: 'string', name: 'type', const: 'privacy', hidden: true }
  ]
};

const dankModel: Model = {
  type: 'page',
  name: 'dank',
  label: 'Bedankpagina',
  labelField: 'title',
  singleInstance: true,
  canDelete: false,
  urlPath: '/dank',
  file: 'content/dank.md',
  fieldGroups: pageGroups,
  fields: [
    { type: 'string', name: 'title', label: 'Titel', required: true, group: 'content' },
    { type: 'markdown', name: 'markdown_content', label: 'Inhoud', required: true, group: 'content' },
    { type: 'string', name: 'description', label: 'Beschrijving', required: true, group: 'seo' },
    { type: 'string', name: 'type', const: 'dank', hidden: true }
  ]
};

const models: Model[] = [
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

export default defineStackbitConfig({
  stackbitVersion: '~0.7.0',
  ssgName: 'custom',
  nodeVersion: '18',
  devCommand: 'hugo server --bind 0.0.0.0 --port {PORT} --appendPort=false --baseURL http://localhost:{PORT}',
  customContentReload: true,
  experimental: {
    ssg: {
      name: 'hugo',
      logPatterns: {
        up: ['Web Server is available at']
      },
      passthrough: ['/livereload.js', '/livereload']
    }
  },
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['content'],
      models,
      assetsConfig: {
        referenceType: 'static',
        staticDir: 'static',
        uploadDir: 'images',
        publicPath: '/'
      }
    })
  ]
});