const path = require('path');
const fs = require('fs');

module.exports = {

    /**
     * Get the Task configuration settings
     *
     * This method will override the defaults if you add a custom task config file
     * in your project's config folder: config/task-config.js
     *
     * @returns {*}
     */
    getTaskConfig: function () {

        const taskConfigOverride = path.resolve(process.env.INIT_CWD, 'config/task-config.json');

        if (fs.existsSync(taskConfigOverride)) {
            return require(taskConfigOverride);
        }

        return require('../config/task-config.json');
    }

};
