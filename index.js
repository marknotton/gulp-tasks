"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "sass", {
  enumerable: true,
  get: function () {
    return _sass.default;
  }
});
Object.defineProperty(exports, "symbols", {
  enumerable: true,
  get: function () {
    return _symbols.default;
  }
});
Object.defineProperty(exports, "serve", {
  enumerable: true,
  get: function () {
    return _browserSync.default;
  }
});
Object.defineProperty(exports, "configs", {
  enumerable: true,
  get: function () {
    return _configs.default;
  }
});
Object.defineProperty(exports, "react", {
  enumerable: true,
  get: function () {
    return _react.default;
  }
});
Object.defineProperty(exports, "scripts", {
  enumerable: true,
  get: function () {
    return _scripts.scripts;
  }
});
Object.defineProperty(exports, "vendors", {
  enumerable: true,
  get: function () {
    return _scripts.vendors;
  }
});
Object.defineProperty(exports, "es5", {
  enumerable: true,
  get: function () {
    return _scripts.es5;
  }
});

var _gulp = _interopRequireDefault(require("gulp"));

var _lumberjack = _interopRequireDefault(require("@marknotton/lumberjack"));

var _notifier = _interopRequireDefault(require("@marknotton/notifier"));

var _sass = _interopRequireDefault(require("./gulp/sass"));

var _symbols = _interopRequireDefault(require("./gulp/symbols"));

var _browserSync = _interopRequireDefault(require("./gulp/browser-sync"));

var _configs = _interopRequireDefault(require("./gulp/configs"));

var _react = _interopRequireDefault(require("./gulp/react"));

var _scripts = require("./gulp/scripts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

////////////////////////////////////////////////////////////////////////////////
// Gulp File
////////////////////////////////////////////////////////////////////////////////
// =============================================================================
// Global Requirements
// =============================================================================
// Gulp.
// CLI logging.
// Manage notification messages and other aesthetics.
// Configerations and settings.
// Configerations and settings.
// =============================================================================
// Notification message settings
// =============================================================================
_notifier.default.settings({
  project: _configs.default.project,
  success: _configs.default.icon,
  popups: process.env.ENVIRONMENT == 'dev',
  suffix: 'successfully',
  delay: true,
  exclusions: '.map',
  messages: {
    scripts: 'Javascript files ' + (_configs.default.versioning ? 'versionised' : 'compiled') + (_configs.default.minify ? ' with compression' : ''),
    vendors: 'Vendor script files ' + (_configs.default.versioning ? 'versionised' : 'compiled') + (_configs.default.minify ? ' with compression' : ''),
    symbols: 'Symbols files compiled',
    react: 'React script files compiled',
    sass: 'SASS files ' + (_configs.default.combineCSS ? _configs.default.versioning ? 'combined and versionised' : 'combined' : _configs.default.versioning ? 'versionised' : 'compiled') + (_configs.default.minify ? ' with compression' : '')
  }
}); // // =============================================================================
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
