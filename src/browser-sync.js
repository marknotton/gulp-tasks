////////////////////////////////////////////////////////////////////////////////
// Browser Sync Watcher
////////////////////////////////////////////////////////////////////////////////

// =============================================================================
// Requirements
// =============================================================================

import gulp         from 'gulp'                       // Gulp.
import log          from '@marknotton/lumberjack'     // CLI logging.
import notifier     from '@marknotton/notifier'       // Manage notification messages and other aesthetics.
import browsersync  from 'browser-sync'               // Browser watcher.
import configs      from './configs'                  // Configerations and settings.

// =============================================================================
// Tasks
// =============================================================================

const browserSync = browsersync.create();

function serve() {

  if ( process.env.ENVIRONMENT == 'dev' ) {

		configs.watching = true

    browserSync.init({
      watch          : true,
      open           : "external",
      proxy          : configs.host,
      host           : configs.host,
      notify         : false,
			logPrefix      : configs.project,
      port           : configs.port || 3000,
			logFileChanges : false,
			files          : [`./${configs.css}*.css`],
			callbacks: {
				ready: () => { setTimeout(() => { log.render(); configs.render = true}, 1000) }
			}
    })

    for (const watcher of Object.values(configs.config.watchers)) {
      if ( watcher.patterns == "config.json" ) {
				browserSync.watch(watcher.patterns, (event) => {
					return browserSync.reload()
				})
			} else {
				browserSync.watch(watcher.patterns).on('change', (file) => {
					if (typeof watcher.tasks === 'undefined' || watcher.tasks == "") {
						browserSync.reload();
					} else {
						return gulp.series(watcher.tasks, (done) => {
							if ( watcher.reload ) {
								browserSync.reload();
							}
							log(`${watcher.reload ? 'Reloading' : 'Updating'} your browser because you`, `changed`, `this file:`, file, false, ['#87AEFF', 'white', '#87AEFF'])
							done();
						})();
					}

				})
			}
    }

  } else {

    log("You can only run Gulp Serve in a local development environment.", false, ['red'])

    return false

  }

}

serve.displayName = 'serve';
serve.description = 'Browser Sync Start';

export default serve;
