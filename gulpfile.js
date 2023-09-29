const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const del = require('del');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const pugHtml = require('gulp-pug');
const webpack = require('webpack-stream'); 

const path = {
    style: {
        mainSass: './app/themes/engine/sass/**/*.sass',        
        app: './app/themes/engine/css/',
        dest: './dest/themes/engine/css/',
        appCss: './app/themes/engine/css/*.css'
    },
    script: {
        appJs: './app/themes/engine/js/*.js',
        app: './app/themes/engine/js/',
        dest: './dest/themes/engine/js/',
        indexJs: './app/themes/engine/js/index.js',        

    },
    img: {
        app: './app/images/**/*.*',
        dest: './dest/images/'
    }
};
function clean() {
    return del('./dest')
}
function delStyle(val){
    return del(path.style.app + 'build/'+ val + '*' +'.css')   
}
function pug() {
    return gulp.src('./app/themes/engine/pug/*.pug')                    
        .pipe(pugHtml({
            pretty: true
        }))
        .pipe(gulp.dest('./app/'))
        .pipe(browserSync.stream());       
}
function styleSass() {
    delStyle('main');
    return gulp.src(path.style.mainSass)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 2 version']))
        .pipe(cleanCss({level: 2}))
        .pipe(concat('main.css'))
        .pipe(gulp.dest(path.style.app))                              
        .pipe(browserSync.stream());
}
function styles() {
    return gulp.src(path.style.appCss)
        .pipe(gulp.dest(path.style.dest))        
}


function jsWatch() {
    return gulp.src(path.script.indexJs)        
        .pipe(webpack({
            entry: {
                main: './app/themes/engine/js/index.js',                                
            },
            output: {
                filename: '[name].bundle.js',
            },
            mode: 'production' 
        }))        
        .pipe(gulp.dest(path.script.app));
}

function scripts() {
    return gulp.src(path.script.appJs)        
        .pipe(gulp.dest(path.script.dest));
}

function browsersync() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false,
    });
}

function img() {
    return gulp.src(path.img.app)
        .pipe(imagemin())     
        .pipe(gulp.dest(path.img.dest));
}

function html() {
    return gulp.src('app/*.html')
    .pipe(gulp.dest('dest/'))
}

function fonts() {
    return gulp.src('./app/themes/engine/fonts/**/*.*')
        .pipe(gulp.dest('./dest/themes/engine/fonts/'));
}

function watching() {
    gulp.watch(path.style.mainSass, styleSass);        
    gulp.watch(path.script.indexJs, jsWatch);
    gulp.watch('./app/themes/engine/pug/**/*.pug', pug);
    gulp.watch('app/*.html', browserSync.reload);    
    gulp.watch(path.script.appJs, browserSync.reload);   
}

let watch = gulp.series(clean, gulp.parallel(watching, browsersync))

let build = gulp.series(clean, gulp.parallel(styles, scripts, fonts, img, html))

exports.clean = clean;
exports.styles = styles;
exports.watch = watch;
exports.build = build;
exports.pug = pug;
exports.delStyle = delStyle;
exports.defauld = build;
