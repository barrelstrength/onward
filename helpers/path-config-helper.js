const fs = require('fs');
const appPath = require('app-root-path');
const projectPath = appPath.require('helpers/project-path-helper');

module.exports = {

    /**
     * Get the Path configuration settings
     *
     * This method will override the defaults if you add a custom path config file
     * in your project's config folder: config/path-config.js
     *
     * @returns {*}
     */
    getPathConfig: function () {

        const pathConfigOverride = projectPath.resolve('config/path-config.json');

        if (fs.existsSync(pathConfigOverride)) {
            return require(pathConfigOverride);
        }

        return appPath.require('gulpfile.js/config/path-config.json');
    }

};
