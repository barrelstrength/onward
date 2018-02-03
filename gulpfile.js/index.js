// Include Core & Plugins
const gulp = require('gulp');
const requireDir = require('require-dir');

const pathConfigHelper = require('./helpers/path-config-helper');

global.PATH_CONFIG = pathConfigHelper.getPathConfig();
global.TASK_CONFIG = taskConfigHelper.getTaskConfig();

// Require all tasks in gulpfile.js/tasks, including sub-folders
requireDir('./tasks', {recurse: true});
