module.exports = {
  // Default namespace used in your i18next config
  defaultNamespace: 'grafana',

  locales: ['en-US', 'fr-FR', 'es-ES', 'pseudo-LOCALE'],

  output: './public/locales/$LOCALE/$NAMESPACE.json',

  pluralSeparator: '__',

  sort: true,

  // Don't include default values for English, they'll remain in the source code
  skipDefaultValues: (locale) => locale !== 'en-US',
};
