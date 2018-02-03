const path = require('path');
const fs = require('fs');

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

        const pathConfigOverride = path.resolve(process.env.INIT_CWD, 'config/path-config.json');

        if (fs.existsSync(pathConfigOverride)) {
            return require(pathConfigOverride);
        }

        return require('../config/path-config.json');
    }

};
