const fs = require('fs');
const appPath = require('app-root-path');
const projectPath = appPath.require('helpers/project-path-helper');

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

        const taskConfigOverride = projectPath.resolve('config/task-config.js');

        if (fs.existsSync(taskConfigOverride)) {
            return require(taskConfigOverride);
        }

        return appPath.require('gulpfile.js/config/task-config.js');
    }

};
