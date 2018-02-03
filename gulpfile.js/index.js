/**
 * Setup Core & Override configurations
 *
 * This file establishes our configuration and loads all relevant gulp tasks.
 *
 * After tasks are required, gulp will determine which task to run.
 * 1. If tasks are provided, gulp will run those specific tasks.
 * 2. If no tasks are provided, gulp will run the `default` task
 *
 *    gulp.js: var toRun = tasks.length ? tasks : ['default'];
 *
 * See the onward/gulpfile.js/tasks for specific tasks, including the default task
 */

const requireDir = require('require-dir');
const appPath = require('app-root-path');

const pathConfigHelper = appPath.require('helpers/path-config-helper');
const taskConfigHelper = appPath.require('helpers/task-config-helper');

global.PATH_CONFIG = pathConfigHelper.getPathConfig();
global.TASK_CONFIG = taskConfigHelper.getTaskConfig();

// Require all tasks in gulpfile.js/tasks, including sub-folders
// @todo - update tasks to have consistent formatting and methodology
//         http://macr.ae/article/splitting-gulpfile-multiple-files.html
requireDir(appPath.resolve('gulpfile.js/tasks'), {recurse: true});
