var gulp        = require('gulp'),
minifycss       = require('gulp-minify-css'),
sass            = require('gulp-sass'),
browserSync     = require('browser-sync'),
reload          = browserSync.reload,
autoprefixer    = require('gulp-autoprefixer'),
plumber         = require('gulp-plumber'),
del             = require('del'),
rename          = require('gulp-rename'),
sourcemaps      = require('gulp-sourcemaps');

var config = {
  scss    :[ 'src/scss/**/*.scss' ],
  css     :[ 'src/css/' ],
  html    :[ 'src/**/*.html' ],
	js			:[ 'src/js/*.js'],
  build   :[ 'build/' ],
  src     :[ 'src/' ]
};

gulp.task('styles',function(){
  return gulp.src(config.scss)
    .pipe(sourcemaps.init())
    .pipe(sass()
    .on('error', sass.logError))
    .pipe(autoprefixer('last 3 versions'))
		.pipe(gulp.dest(''+config.css+''))
    .pipe(minifycss())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(''+config.css+''))
    .pipe(reload({stream:true}));
});

gulp.task('html', function(){
  return gulp.src(config.html)
    .pipe(reload({stream:true}));
});

gulp.task('js', function() {
	return gulp.src(config.js)
		.pipe(reload({stream:true}));
})

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: config.src
    },
		notify: false
  });
});

// Создание
gulp.task('build:create', function(){
  return gulp.src(config.src+'**/*')
    .pipe(gulp.dest(''+config.build+''));
});

// Очистка папки build
gulp.task('build:clean',['build:create'], function(){
  return del(['build/bower_components/',
              'build/scss/',
              'build/css/!(*.min.css)',
              'build/js/!(*.min.js)'
            ]);
});

// Задачи предварительного просмотра приложения
gulp.task('build:start', function() {
  browserSync({
    server: {
      baseDir: config.build
    },
		notify: false
  });
});

// Удаляем папку build
gulp.task('build:delete', function(res){
  return del([config.build+'/**'], res);
});

// Задача build
gulp.task('build', ['build:create', 'build:clean']);

gulp.task('watch', function(){
  gulp.watch(config.scss, ['styles']);
  gulp.watch(config.html, ['html']);
	gulp.watch(config.js, ['js']);
});

gulp.task('default', ['watch', 'browserSync', 'html', 'styles',  'js']);