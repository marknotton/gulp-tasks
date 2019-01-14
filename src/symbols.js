////////////////////////////////////////////////////////////////////////////////
// SVG symbols
////////////////////////////////////////////////////////////////////////////////

// =============================================================================
// Requirements
// =============================================================================

import {src, dest}  from 'gulp'                       // Gulp.
import concat       from 'gulp-concat'                // Concatenate files.
import plumber      from 'gulp-plumber'               // Asynchronous concatenator.
import log          from '@marknotton/lumberjack'     // CLI logging.
import notifier     from '@marknotton/notifier'       // Manage notification messages and other aesthetics.
import svgToSymbols from '@marknotton/svg-to-symbols' // SVG Symbols creator.
import configs      from './configs'                  // Configerations and settings.

// =============================================================================
// Tasks
// =============================================================================

function symbols() {

	return src([...configs.config.sources.symbols, ('!' + configs.images.replace("//", "/") + configs.filenames.svg.symbols)])
  .pipe(svgToSymbols({
    sanitise : true,
    prefix   : configs.filenames.svg.prefix || 'icon',
    exclude  : configs.filenames.svg.exclusions || [],
    scss     : configs.sass + configs.filenames.sass.symbols,
		children : true
  }))
  .pipe(concat('symbols.svg'))
  .pipe(dest(configs.images))
  .pipe(notifier.success('symbols', {extra : configs.sass + configs.filenames.sass.symbols}))
	.on('end', () => !configs.render || log.render())
}

symbols.displayName = 'symbols';
symbols.description = 'generation of symbols assets';

export default symbols;
