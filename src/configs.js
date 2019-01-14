import configs from '@marknotton/configs'

// Environment
let config = configs.create({'env': process.env.ENVIRONMENT || 'production', 'dynamic':['paths', 'themes']})

// Project/Server root path. Useful when gulpfiles are nested.
var root = config.paths.root || ""

// Local web directory (sometimes it's not public_html or public).
var webroot = config.paths.webroot || "public"

// =============================================================================
// Config settings task
// =============================================================================

const output = (done) => {
	// Passing a --lock flag will recreate the config.lock file
	if (process.argv.slice(2).includes('--lock')) {
		// configs.create();
	} else {
		console.log(JSON.stringify(config, null, 2))
		done()
	}
}

output.displayName = 'sass';
output.description = 'generation of sass assets';

module.exports = {

	output : output,

	config : config,

	project : config.project,

	host : process.env.SERVER_NAME || config.host,

	// Settings --------------------------------------------------------------------

	// Generate JS and CSS external sourcemaps. Never in production environment.
	sourceMaps : config.settings.sourceMaps,

	// CSS: results in compressed or nested files. JS: Results in Uglified or untouched files. Always in production environment.
	minify : config.settings.minify,

	// Defines whether Javascript should be transcoded with Babel for non-ES6 supported browsers..
	ES5Support : config.settings.ES5Support,

	// Adds automatic incremental version numbers to files using .env.
	versioning : config.settings.versioning,

	// Combine all CSS files into one file.
	combineCSS : config.settings.combineCSS,

	// Directory Paths -------------------------------------------------------------

	// Development Javascript files.
	scripts : (root + config.paths.scripts).replace("//", "/"),

	// Development Sass files.
	sass : (root + config.paths.sass).replace("//", "/"),

	// Production Javascript files.
	js : (root + webroot + config.paths.js).replace("//", "/"),

	// Production Font files.
	fonts : (root + webroot + config.paths.fonts).replace("//", "/"),

	// Production CSS files.
	css : (root + webroot + config.paths.css).replace("//", "/"),

	// Production Image files.
	images : (root + webroot + config.paths.images).replace("//", "/"),

	// Production SVG/Sprite files.
	sprites : (root + webroot + config.paths.sprites).replace("//", "/"),

	// Miscellaneous ---------------------------------------------------------------

	// Log rendering is toggled around depending on the current Gulp state.
	render : true,

	watching : false,

	// Sass variables that will be passed before compiling.
	sassVariables : config['sass-injections']['variables'] || [],

	// Sass imports that will be passed before compiling.
	sassImports : config['sass-injections']['imports'] || [],

	// List of unaltered filename
	filenames : config.filenames,

	// Boolean to determine wether popups should for Gulp tasks
	notifcations : process.env.ENVIRONMENT == 'dev',

	// Image to use for notifications
	icon : config.icon || 'icon.png',

	// Map directory name that will be exlcuded from versioning relative to css and js output paths
	maps : 'maps',

	// Check if Deployer settings exist.
	deployer : false,

}
