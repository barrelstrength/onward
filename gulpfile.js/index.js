// Include Core & Plugins
const requireDir = require('require-dir');
const appPath = require('app-root-path');

const pathConfigHelper = appPath.require('helpers/path-config-helper');
const taskConfigHelper = appPath.require('helpers/task-config-helper');

global.PATH_CONFIG = pathConfigHelper.getPathConfig();
global.TASK_CONFIG = taskConfigHelper.getTaskConfig();

// Require all tasks in gulpfile.js/tasks, including sub-folders
requireDir(appPath.resolve('gulpfile.js/tasks'), {recurse: true});
