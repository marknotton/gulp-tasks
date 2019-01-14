# Gulp Tasks

![Made For NPM](https://img.shields.io/badge/Made%20for-NPM-orange.svg) ![Made For Gulp](https://img.shields.io/badge/Made%20for-Gulp-red.svg)

A private collection of Gulp tasks commonly used within internal projects.

## Installation
```
npm i @marknotton/gulp-tasks --save-dev
```
```js
const tasks = require('@marknotton/gulp-tasks');

gulp.task('sass', tasks.sass)
gulp.task('scripts', tasks.scripts)
gulp.task('vendors', tasks.vendors)
gulp.task('es5', tasks.es5)
gulp.task('react', tasks.react)
gulp.task('symbols', tasks.symbols)
gulp.task('serve', tasks.serve)
gulp.task('config', tasks.config)

```
TODO: Transpile with Babel so that this can actually be used!
