const { src, dest, watch, parallel, series } = require('gulp');      /*для работы src*/

const scss          = require('gulp-sass');
const concat        = require('gulp-concat');
const autoprefixer  = require('gulp-autoprefixer');
const uglify        = require('gulp-uglify');
const imagemin      = require('gulp-imagemin');
const rename        = require('gulp-rename');
const del           = require('del');
const browserSync   = require('browser-sync').create();
const svgSprite     = require('gulp-svg-sprite');
// const fileinclude   = require('gulp-file-include');  // для настройки модульности с gulp-file-include


// function includeHTML() { // для настройки модульности с gulp-file-include
//   return src([
//     //'./src/html/**/*.html', 
//     //'!./src/html/parts/*.html',    //ignore
//     //'!./src/html/pages/*.html'     //ignore


//     './src/module/**/*.html', 
//     '!./src/module/parts/*.html',    //ignore
//     '!./src/module/pages/*.html'     //ignore
//     ])
//     .pipe(fileinclude({
//       prefix: '@@',
//       basepath: '@file'
//     }))
//     .pipe(dest('./src'))
//     .pipe(browserSync.stream());
// }

function svgSprites() {
  return src('./src/images/icons/**.svg')
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: "../sprite.svg"
      }
    }
  }))  
  .pipe(dest('./src/images'))
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'src/'
    },
    notify: false /* убрать уведомления в правом верхнем углу браузера о выполнении действий browsersync*/
  })
}

function styles() {
  return src('src/scss/style.scss')  // до настройки файла index.scss   // для настройки модульности с gulp-file-include
  //return src('src/scss/*.scss')  // после настройки файла index.scss
    .pipe(scss({outputStyle: 'compressed'}))  /* expanded | compressed */
    .pipe(concat('style.min.css'))  /* указываем название файла после конвератции */  // до настройки файла index.scss
    //.pipe(concat()) // после настройки файла index.scss
    // .pipe(rename({   // для настройки модульности с gulp-file-include
    //   suffix : '.min'
    // }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      grid: true
    }))
    .pipe(dest('src/css'))   /* путь для выходного файла style.css*/
    .pipe(browserSync.stream())  /* stream - выполняется только добавление стилей без перезагрузки страницы 
                                  reload - выполняется перезагрузка страницы */ 
}

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/mixitup/dist/mixitup.js',
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
    'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
    'node_modules/rateyo/src/jquery.rateyo.js',
    'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
    'src/js/main.js'
  ])
  .pipe(concat('main.min.js'))
  .pipe(uglify())   /* для минификации js файлов */ 
  .pipe(dest('src/js'))
  .pipe(browserSync.stream())  /* для js нужна презагрузка страницы */
}

function images() {
  return src('src/images/**/*.*')
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.mozjpeg({quality: 75, progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    })
  ]))
  .pipe(dest('dist/images'))
}

function build() {
  return src([
    'src/**/*.html',  // строка до добавления gulp-file-include
    //'src/html/*.html',  // строка после добавления gulp-file-include  // для настройки модульности с gulp-file-include
    'src/css/style.min.css',
    'src/js/main.min.js'
  ], {base: 'src'})
  .pipe(dest('dist'))
}

function cleanDist() {
  return del('dist')
}

function watching() {
  watch(['src/module/**/*.scss'], styles);
  watch(['src/scss/**/*.scss'], styles);
  watch(['src/js/**/*.js', '!src/js/main.min.js'], scripts);
  /* следить за измеенниямии в 'src/js/--.js' но не следить за файлом '!src/js/main.min.js*/

  watch(['src/images/icons/*.svg'], svgSprites);

  //watch(['src/html/**/*.html']).on('change', includeHTML);
  //watch(['src/module/**/*.html']).on('change', includeHTML);
  

  watch(['src/**/*.html']).on('change', browserSync.reload);  // строка до добавления gulp-file-include
  //watch(['src/**/*.html']).on('change', browserSync.reload);  // строка после добавления gulp-file-include

  
}

exports.styles = styles;   /* для запуска function styles() */
exports.scripts = scripts;
exports.svgSprites = svgSprites;
exports.browsersync = browsersync;
exports.watching = watching;  /* для запуска function watching */
exports.images = images;
//exports.includeHTML = includeHTML;
//exports.build = build;   /*  если запускаем build сразу для удаления dist, сжатия картинок и копирования файлов из src в dist то используем build с series*/



exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build);

exports.default = parallel(styles, scripts, svgSprites, browsersync, watching);

// для настройки модульности с gulp-file-include
//exports.default = parallel(styles, includeHTML, scripts, svgSprites, browsersync, watching);