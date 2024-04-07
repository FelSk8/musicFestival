
// function tarea(done){
//     console.log("mi primer tarea");

//     done();
// }
//                 //nombre de la function 
// exports.tarea = tarea; // llamar una función con nodejs


const { src, dest, watch, parallel } = require("gulp"); // Importa funciones de Gulp para manejar archivos y tareas de automatización
// CSS
// Importa el paquete gulp-sass para compilar archivos Sass a CSS
const sass = require('gulp-sass')(require('sass'));
// Importa el paquete gulp-plumber
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

// Javascript
const terser = require('gulp-terser-js');

// IMAGENES 
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// Definición de la función para compilar archivos Sass a CSS
function css(done){
    // Identifica el archivo Sass de entrada
    src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
          // Usa plumber para prevenir que la ejecución se detenga en caso de errores
          .pipe(plumber())
        // Compila el archivo Sass a CSS
        .pipe( sass() )

        .pipe( postcss([ autoprefixer(), cssnano() ]))
        .pipe(sourcemaps.write('.'))
        // Almacena el archivo CSS resultante en la carpeta de destino
        .pipe( dest('build/css'));

    // Callback que avisa a gulp cuando la función ha terminado
    done();
}
function imagenes( done ) {
    const opciones = {
        optimizationLevel: 3
    }

    src('src/img/**/*.{png,jpg}')
    .pipe( cache( imagemin(opciones)))
    .pipe(dest('build/img'))
    done();
}

function versionWebp( done ) {

    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe( webp(opciones) )
        .pipe( dest('build/img') )
    done();
}

function versionAvif( done ) {

    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe( avif(opciones) )
        .pipe( dest('build/img') )
    done();
}

function javascript(done) {
    src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe( terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/js'));

    done();
}

// Definición de la función para observar cambios en archivos Sass y ejecutar la tarea de compilación
function dev(done){
    // Observa cambios en el archivo Sass y ejecuta la función css() cuando se producen cambios
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javascript)
    // Callback que avisa a gulp cuando la función ha terminado
    done();
}

// Exporta las funciones css y dev para que estén disponibles para ser llamadas desde la línea de comandos de Gulp
exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, versionAvif, javascript, dev) ;

