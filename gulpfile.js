var gulp = require('gulp'),
    watch = require('gulp-watch'),
    wait = require('gulp-wait'),
    sass = require('gulp-sass'),
    minify = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    fileinclude = require('gulp-file-include'),
    browserSync = require("browser-sync"),
    spritesmith = require("gulp.spritesmith"),
    reload = browserSync.reload; 

function swallowError (error) {
    console.log(error.toString());
    this.emit('end');
}

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        css: 'build/css/',
        js: 'build/js/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/html/*.html',
        styles: {
            main: 'src/styles/style.scss',
            user: 'src/styles/contentarea.scss'
        },
        js: {
            main: 'src/js/*.js',
            vendor: 'src/js/vendor/*.js'
        }
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/html/**/*.html',
        style: 'src/styles/**/*.scss',
        js: 'src/js/**/*.js',
        sprite: 'src/sprite/*.png'
    }
};
var config = {
    server: {baseDir: "build"},
    tunnel: false, 
    host: 'localhost',
    port: 7777,
    logPrefix: "Frontend"
};

// html tasks 
gulp.task('html', function() {
  return gulp.src(path.src.html)
    .pipe(fileinclude())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));
});

gulp.task('sprite', function() {
    var spriteData =
        gulp.src(path.watch.sprite)
        .pipe(spritesmith({
            imgPath: '../img/ui/sprite.png',
            imgName: 'sprite.png',
            cssName: '_sprite.scss',
            retinaSrcFilter: 'src/sprite/*@2x.png',
            retinaImgName: 'sprite@2x.png',
            algorithm: 'binary-tree',
            padding: 2,
            cssTemplate: 'scss.template.mustache',
            cssVarMap: function(sprite) {
                sprite.name = sprite.name
            }
        }).on('error', swallowError));

    spriteData.img.pipe(gulp.dest('build/img/ui/'));
    spriteData.css.pipe(gulp.dest('src/styles/'));
});

// styles tasks
gulp.task('sass-main', function () {
  return gulp.src(path.src.styles.main)
    .pipe(wait(200))
    .pipe(sass({ style: 'compressed'}))
    .on('error', swallowError)
    .pipe(minify())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});
gulp.task('sass-user', function () {
  return gulp.src(path.src.styles.user)
    .pipe(sass({ style: 'compressed'}))
    .on('error', swallowError)
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});
// js tasks
gulp.task('js-main', function() {
  return gulp.src(path.src.js.main)
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .on('error', swallowError)
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});

// common task
gulp.task('update', ['sprite', 'html', 'sass-main', 'js-main']);

// Else metters
gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('sass-main').start('sass-user');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js-main');
    });
    watch([path.watch.sprite], function(event, cb) {
        gulp.start('sprite');
    });
});
gulp.on('err', function(err){
  console.log(err);
});
gulp.task('default', ['update', 'webserver', 'watch']);