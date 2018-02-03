const fs = require('fs');
const appPath = require('app-root-path');
const projectPath = appPath.require('helpers/project-path-helper');

module.exports = {

  /**
   * Get the Task configuration settings
   *
   * This method will override the defaults if you add a custom task config file
   * in your project's config folder: gulpfile.js/config/task-config.js
   *
   * @returns {*}
   */
  getTaskConfig: function () {

    let configPath = 'gulpfile.js/config';

    if (process.env.ONWARD_CONFIG_PATH) {
      configPath = process.env.ONWARD_CONFIG_PATH;
    }

    const taskConfigOverride = projectPath.resolve(configPath, 'task-config.js');

    // Use the config file provided by the project
    if (fs.existsSync(taskConfigOverride)) {
      return require(taskConfigOverride);
    }

    // Fallback to use our default config file
    return appPath.require('gulpfile.js/config/task-config.js');
  }

};
