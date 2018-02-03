const fs = require('fs');
const appPath = require('app-root-path');
const projectPath = appPath.require('helpers/project-path-helper');

module.exports = {

    /**
     * Get the Path configuration settings
     *
     * This method will override the defaults if you add a custom path config file
     * in your project's config folder: gulpfile.js/config/path-config.js
     *
     * @returns {*}
     */
    getPathConfig: function () {

      let configPath = 'gulpfile.js/config';

      if (process.env.ONWARD_CONFIG_PATH) {
        configPath = process.env.ONWARD_CONFIG_PATH;
      }

      const pathConfigOverride = projectPath.resolve(configPath, 'path-config.json');

      // Use the config file provided by the project
      if (fs.existsSync(pathConfigOverride)) {
        return require(pathConfigOverride);
      }

      // Fallback to use our default config file
      return appPath.require('gulpfile.js/config/path-config.json');
    }

};
