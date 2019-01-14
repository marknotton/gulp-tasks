////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////

// =============================================================================
// Requirements
// =============================================================================

import gulp             from 'gulp'                       // Gulp.
import plumber          from 'gulp-plumber'               // Asynchronous concatenator.
import webpack          from 'webpack-stream'             // Webpack Compiler
import log              from '@marknotton/lumberjack'     // CLI logging.
import notifier         from '@marknotton/notifier'       // Manage notification messages and other aesthetics.
import configs          from '@marknotton/configs'        // Configerations and settings.

// =============================================================================
// Tasks
// =============================================================================

function react() {

  let filename = configs.filenames.js.search;

  if ( minify ) {
    filename = configs.filename.replace('.js', '.min.js')
  }

	const settings = {
		entry: './src/scripts/search/index.js',
		output: {
		  path: __dirname + '/web/assets/js/',
			filename: filename
		},
		mode: 'development',
		resolve: {
			extensions: ['.js', '.jsx']
		},
		module: {
			rules: [{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					cacheDirectory: true,
					presets: ['@babel/env', '@babel/react']
				}
			}]
		}
	}

  return gulp.src(configs.config.sources.search)
    .pipe(plumber({errorHandler: notifier.error }))
    .pipe(webpack(settings))
    .pipe(notifier.success('react'))
    .pipe(gulp.dest(configs.js))
		.on('end', () => !configs.render || log.render())
};

react.displayName = 'react';
react.description = 'React';

export default react;
