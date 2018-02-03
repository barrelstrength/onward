const gulp = require('gulp');
const taskConfig = global.TASK_CONFIG;

gulp.task('default', taskConfig.environments.default);
