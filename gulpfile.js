
// function tarea(done){
//     console.log("mi primer tarea");

//     done();
// }
//                 //nombre de la function 
// exports.tarea = tarea; // llamar una función con nodejs


const { src, dest, watch} = require("gulp"); // Importa funciones de Gulp para manejar archivos y tareas de automatización

// Importa el paquete gulp-sass para compilar archivos Sass a CSS
const sass = require('gulp-sass')(require('sass'));

// Importa el paquete gulp-plumber
const plumber = require('gulp-plumber');

// Definición de la función para compilar archivos Sass a CSS
function css(done){
    
    // Identifica el archivo Sass de entrada
    src('src/scss/**/*.scss')
          // Usa plumber para prevenir que la ejecución se detenga en caso de errores
          .pipe(plumber())
        // Compila el archivo Sass a CSS
        .pipe( sass() )
       
        // Almacena el archivo CSS resultante en la carpeta de destino
        .pipe( dest('build/css'));

    // Callback que avisa a gulp cuando la función ha terminado
    done();
}

// Definición de la función para observar cambios en archivos Sass y ejecutar la tarea de compilación
function dev(done){
    // Observa cambios en el archivo Sass y ejecuta la función css() cuando se producen cambios
    watch('src/scss/**/*.scss', css)

    // Callback que avisa a gulp cuando la función ha terminado
    done();
}

// Exporta las funciones css y dev para que estén disponibles para ser llamadas desde la línea de comandos de Gulp
exports.css = css;
exports.dev = dev;
