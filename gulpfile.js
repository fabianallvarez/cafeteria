const { src, dest, watch, series, parallel } = require('gulp');

// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

function css(done) {
    src('src/scss/app.scss')
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css'))

    done();
}

function imagenes() {
    return src('src/img/**/*')
        .pipe(imagemin({ optimizationlevel: 3 }))
        .pipe(dest('build/img'));
}

function versionWebp() {
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp())
        .pipe(dest('build/img'))
}

function dev() {
    watch('src/scss/**/*.scss', css)
    watch('src/img/**/*', imagenes)
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.default = series(imagenes, versionWebp, css, dev);

// series - Se inicia una tareas y hasta que finaliza, inicia la siguiente
// parallel - Todas inician al mismo tiempo