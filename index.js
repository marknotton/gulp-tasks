////////////////////////////////////////////////////////////////////////////////
// Gulp File
////////////////////////////////////////////////////////////////////////////////

// =============================================================================
// Global Requirements
// =============================================================================

import gulp      from 'gulp'                       // Gulp.
import log       from '@marknotton/lumberjack'     // CLI logging.
import notifier  from '@marknotton/notifier'       // Manage notification messages and other aesthetics.
import sass      from './gulp/sass'
import symbols   from './gulp/symbols'
import serve     from './gulp/browser-sync'
import configs   from './gulp/configs'             // Configerations and settings.
import react     from './gulp/react'             // Configerations and settings.
import {scripts, vendors, es5} from './gulp/scripts'

// =============================================================================
// Notification message settings
// =============================================================================

notifier.settings({
  project    : configs.project,
  success    : configs.icon,
  popups     : process.env.ENVIRONMENT == 'dev',
  suffix     : 'successfully',
  delay      : true,
  exclusions : '.map',
  messages : {
    scripts  : 'Javascript files ' + (configs.versioning ? 'versionised' : 'compiled') + (configs.minify ? ' with compression' : ''),
    vendors  : 'Vendor script files ' + (configs.versioning ? 'versionised' : 'compiled') + (configs.minify ? ' with compression' : ''),
    symbols  : 'Symbols files compiled',
		react    : 'React script files compiled',
    sass     : 'SASS files ' + (configs.combineCSS ? (configs.versioning ? 'combined and versionised' : 'combined') : (configs.versioning ? 'versionised' : 'compiled')) + (configs.minify ? ' with compression' : ''),
  }
})

// // =============================================================================
// // Default task
// // =============================================================================
//
// // const defaultTasks = gulp.series(vendors, scripts, symbols, sass, () => {
// let default = gulp.series(scripts, vendors, symbols, sass, callback => {
// 	configs.render = false
// 	log('Done:', "All Gulp tasks completed")
// 	if ( !configs.watching ) { log.render() }
// 	callback()
// })
//
// default.displayName = 'default';
// default.description = 'default';
//
// export default default

export { scripts, vendors, es5, react, serve, sass, symbols, configs }
