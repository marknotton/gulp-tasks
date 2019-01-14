////////////////////////////////////////////////////////////////////////////////
// Scripts
////////////////////////////////////////////////////////////////////////////////

// =============================================================================
// Requirements
// =============================================================================

import gulp             from 'gulp'                       // Gulp.
import babel            from 'gulp-babel'                 // ES6 to ES5 transpiler.
import concat           from 'gulp-concat'                // Concatenate files.
import gulpif           from 'gulp-if'                    // Add conditionals inline.
import gulpsass         from 'gulp-sass'                  // Sass precompiler.
import plumber          from 'gulp-plumber'               // Asynchronous concatenator.
import log              from '@marknotton/lumberjack'     // CLI logging.
import notifier         from '@marknotton/notifier'       // Manage notification messages and other aesthetics.
import source           from '@marknotton/source-exists'  // Report if any src files don't exist
import versioniser      from '@marknotton/versioniser'    // Manages versioning of filenames via .emv.
import browserSync      from 'browser-sync'               // Browser watcher.
import configs          from './configs'                  // Configerations and settings.
import uglify           from 'gulp-uglify-es'             // ES6 supported minifier/uglifier.
import rename           from 'gulp-rename'                // Rename files before they are saved..

// =============================================================================
// Tasks
// =============================================================================

// -----------------------------------------------------------------------------
// Project Scripts
// -----------------------------------------------------------------------------

function scripts() {

  let filename = configs.filenames.js.scripts

  if (configs.versioning) {
    filename = versioniser.update(configs.js, filename, configs.deployer || 'scripts', !configs.ES5Support && !configs.deployer)
  }

  if (configs.minify) {
    filename = filename.replace('.js', '.min.js')
  }

	if ( configs.notifcations ) {
		source(configs.config.sources.scripts)
	}

  return gulp.src(configs.config.sources.scripts, { sourcemaps: true })
    .pipe(plumber({errorHandler: notifier.error }))
    .pipe(concat(filename))
    .pipe(gulpif(configs.minify, uglify()))
    .pipe(gulp.dest(configs.js, { sourcemaps : configs.maps }))
    .pipe(notifier.success('scripts'))
    .pipe(gulpif(configs.versioning, rename(configs.filenames.js.scripts)))
    .pipe(gulpif(configs.versioning, gulp.dest(configs.js, { sourcemaps : configs.maps })))
    .pipe(browserSync.stream())
		.on('end', () => !configs.render || log.render())

}

scripts.displayName = 'scripts';
scripts.description = `${configs.project} production scripts files`;

// -----------------------------------------------------------------------------
// Vendor Scripts
// Third party resources that shouldn't be altered in any way. Only minification.
// -----------------------------------------------------------------------------

function vendors() {

  let filename = configs.filenames.js.vendors

  if ( configs.versioning ) {
    filename = versioniser.update(configs.js, filename, configs.deployer || 'vendors', !configs.deployer)
  }

  if ( configs.minify ) {
    filename = filename.replace('.js', '.min.js')
  }

	if ( configs.notifcations ) {
		source(configs.config.sources.vendors)
	}

  return gulp.src(configs.config.sources.vendors)
    .pipe(concat(filename))
    .pipe(gulpif(configs.minify, uglify()))
    .pipe(gulp.dest(configs.js))
    .pipe(notifier.success('vendors'))
    .pipe(gulpif(configs.versioning, rename(configs.filenames.js.vendors)))
    .pipe(gulpif(configs.versioning, gulp.dest(configs.js)))
		.on('end', () => !configs.render || log.render())

}

vendors.displayName = 'vendors';
vendors.description = 'Third party Javascript resources';

// -----------------------------------------------------------------------------
// ECMAScript (ES5) Tasks
// Required for browsers that don't support ES6 ( Internet Explorer 11 & Safari 9 )
// -----------------------------------------------------------------------------

function es5() {

  if (!configs.ES5Support) {
		log('Skipped', `ES5 Scripts task will not run in "${process.env.ENVIRONMENT || 'production'}" environments. Check your settings in config.json to change this.`)
    return false
  }

  let filename = configs.filenames.js.scripts.replace('.js', '.es5.js')

  if (configs.versioning) {
    filename = versioniser.update(configs.js, filename, configs.deployer || 'scripts', true)
  }

  if (configs.minify) {
    filename = filename.replace('.js', '.min.js')
  }

  return gulp.src(configs.config.sources.scripts)
    .pipe(plumber({errorHandler: notifier.error }))
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(concat(filename))
    .pipe(gulpif(configs.minify, uglify()))
    .pipe(gulp.dest(configs.js))
    .pipe(notifier.success('scripts', {suffix:(configs.minify ? 'and' : 'with') + ' ES5 transpilation'}))
    .pipe(gulpif(configs.versioning, rename(configs.filenames.js.scripts.replace('.js', '.es5.js'))))
    .pipe(gulpif(configs.versioning, gulp.dest(configs.js)))

}

es5.displayName = 'es5';
es5.description = 'Third party Javascript resources';

// Exports ---------------------------------------------------------------------

export {scripts, vendors, es5};
export default scripts;
