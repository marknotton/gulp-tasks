////////////////////////////////////////////////////////////////////////////////
// Sass
////////////////////////////////////////////////////////////////////////////////

// =============================================================================
// Requirements
// =============================================================================

import gulp             from 'gulp'                       // Gulp.
import concat           from 'gulp-concat'                // Concatenate files.
import gulpif           from 'gulp-if'                    // Add conditionals inline.
import gulpsass         from 'gulp-sass'                  // Sass precompiler.
import plumber          from 'gulp-plumber'               // Asynchronous concatenator.
import injectScss       from '@marknotton/inject-scss'    // Inject JS variables into SCSS
import log              from '@marknotton/lumberjack'     // CLI logging.
import notifier         from '@marknotton/notifier'       // Manage notification messages and other aesthetics.
import source           from '@marknotton/source-exists'  // Report if any src files don't exist
import versioniser      from '@marknotton/versioniser'    // Manages versioning of filenames via .emv.
import postcss          from 'gulp-postcss'               // PostCSS
import autoprefixer     from 'autoprefixer'               // PostCSS Autoprefixer
import postcssInlineSvg from 'postcss-inline-svg'         // PostCSS Inline SVG
import postcssAssets    from 'postcss-assets'             // PostCSS assets
import browserSync      from 'browser-sync'               // Browser watcher.
import configs          from './configs'                  // Configerations and settings.
import cache            from 'gulp-cached'                // Keeps an in-memory cache of files

// =============================================================================
// Tasks
// =============================================================================

function sass() {
	return gulp.src(configs.config.sources.sass, { sourcemaps: true })
	.pipe(cache('linting'))
	.pipe(injectScss(configs.config['sass-injections']))
	.pipe(plumber({errorHandler: notifier.error }))
	.pipe(gulpsass({outputStyle: (configs.minify ? 'compressed' : 'nested')}))
	.pipe(postcss([
		autoprefixer(),
		postcssAssets({loadPaths:[configs.images]}),
		postcssInlineSvg({path:configs.images}),
	]))
	.pipe(gulpif(configs.versioning, gulp.dest(configs.css, { sourcemaps : configs.maps })))
	.pipe(gulpif(configs.versioning, versioniser.updater({destination:configs.css, variable:configs.deployer || 'css', exclusions:'.map', increment:!configs.deployer}) ))
	.pipe(gulp.dest(configs.css, { sourcemaps : configs.maps }))
	.pipe(notifier.success('sass'))
	.on('end', () => !configs.render || log.render())
}

sass.displayName = 'sass';
sass.description = 'generation of sass assets';

export default sass;
