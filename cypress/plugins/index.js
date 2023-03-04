const cucumber = require('cypress-cucumber-preprocessor').default
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = (on, config) => {
  on('file:preprocessor', cucumber())

  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}
