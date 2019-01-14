////////////////////////////////////////////////////////////////////////////////
// Gulp File
////////////////////////////////////////////////////////////////////////////////

// =============================================================================
// Requirements
// =============================================================================

import gulp  from 'gulp'                   // Gulp.
import tasks from '@marknotton/gulp-tasks' // Collection of Gulp tasks.
import log   from '@marknotton/lumberjack' // CLI logging.

// =============================================================================
// Default task
// =============================================================================

// const defaultTasks = gulp.series(vendors, scripts, symbols, sass, () => {
let defaultTask = gulp.series(tasks.scripts, tasks.es5, tasks.vendors, tasks.react, tasks.symbols, tasks.sass, callback => {
	configs.render = false
	log('Done:', "All Gulp tasks completed")
	if ( !configs.watching ) { log.render() }
	callback()
})

defaultTask.displayName = 'default';
defaultTask.description = 'default';

export default defaultTask

// =============================================================================
// Export all tasks
// =============================================================================

gulp.task(tasks.sass)
gulp.task(tasks.scripts)
gulp.task(tasks.vendors)
gulp.task(tasks.es5)
gulp.task(tasks.react)
gulp.task(tasks.symbols)
gulp.task(tasks.serve)
gulp.task(tasks.config)

export {
	tasks.sass,
	tasks.symbols,
	tasks.serve,
	tasks.configs,
	tasks.scripts,
	tasks.vendors,
	tasks.react,
	tasks.es5
}
