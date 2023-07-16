"use strict";

const { src, dest } = require("gulp");
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const cssbeautify = require("gulp-cssbeautify");
const removeComments = require("gulp-strip-css-comments");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const uglify = require("gulp-uglify");
const panini = require("panini");
const imagemin = require("gulp-imagemin");
const del = require("del");
const browserSync = require("browser-sync").create();
const rigger = require("gulp-rigger");
const notify = require("gulp-notify");
const htmlmin = require("gulp-htmlmin");
const plumberNotifier = require("gulp-plumber-notifier");

// path
const srcPath = "src/";
const distPath = "dist/";

const path = {
   build: {
      html: distPath,
      css: distPath + "assets/css/",
      fonts: distPath + "assets/fonts/",
      js: distPath + "assets/js/",
      images: distPath + "assets/images/",
      prodaction: "prodaction/",
   },
   src: {
      html: srcPath + "*.html",
      css: srcPath + "assets/scss/*.scss",
      js: srcPath + "assets/js/**/*.js",
      images:
         srcPath +
         "assets/images/**/*.{jpg, svg, webp, png, gif, ico, webmanifest, xml, json}",
      fonts: srcPath + "assets/fonts/**/*.{eot, woff, woff2, ttf, svg}",
   },
   watch: {
      html: srcPath + "**/*.html",
      css: srcPath + "assets/scss/**/*.scss",
      js: srcPath + "assets/js/**/*.js",
      images:
         srcPath +
         "assets/images/**/*.{jpg, svg, webp, png, gif, ico, webmanifest, xml, json}",
      fonts: srcPath + "assets/fonts/**/*.{eot, woff, woff2, ttf, svg}",
      tamplates: srcPath + "templates/**/*.html",
   },
   clean: {
      dist: "./" + distPath + "*",
      server: distPath + "server",
   },
};

function serve() {
   browserSync.init({
      server: {
         baseDir: "./" + distPath,
      },
   });
}

function html() {
   panini.refresh();
   return src(path.src.html, { base: srcPath })
      .pipe(plumberNotifier())
      .pipe(
         panini({
            root: srcPath,
            layouts: srcPath + "templates/layouts/",
            partials: srcPath + "templates/partials/",
            data: srcPath + "tamplates/data",
         })
      )
      .pipe(
         htmlmin({
            collapseWhitespace: true,
            removeComments: true,
         })
      )
      .pipe(dest(path.build.html))
      .pipe(browserSync.reload({ stream: true }));
}
function css() {
   return src(path.src.css, { base: srcPath + "assets/scss/" })
      .pipe(plumberNotifier())
      .pipe(sass())
      .pipe(
         autoprefixer({
            overrideBrowserslist: ["last 50 versions"],
            cascade: false,
         })
      )
      .pipe(cssbeautify())
      .pipe(dest(path.build.css))
      .pipe(
         cssnano({
            zindex: false,
            discardComments: {
               removeAll: true,
            },
         })
      )
      .pipe(removeComments())
      .pipe(
         rename({
            suffix: ".min",
            extname: ".css",
         })
      )
      .pipe(dest(path.build.css))
      .pipe(browserSync.reload({ stream: true }));
}
function js() {
   return src(path.src.js, { base: srcPath + "assets/js/" })
      .pipe(plumberNotifier())
      .pipe(rigger())
      .pipe(dest(path.build.js))
      .pipe(uglify())
      .pipe(
         rename({
            suffix: ".min",
            extname: ".js",
         })
      )
      .pipe(dest(path.build.js))
      .pipe(browserSync.reload({ stream: true }));
}
function images() {
   return src(path.src.images, { base: srcPath + "assets/images/" })
      .pipe(
         imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
               plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
            }),
         ])
      )
      .pipe(dest(path.build.images))
      .pipe(browserSync.reload({ stream: true }));
}
function clean() {
   return del([path.clean.dist, "!" + path.clean.server]);
}

function fonts() {
   return src(path.src.fonts, { base: srcPath + "assets/fonts/" }).pipe(
      browserSync.reload({ stream: true })
   );
}
function watchFiles() {
   gulp.watch([path.watch.html], html);
   gulp.watch([path.watch.css], css);
   gulp.watch([path.watch.js], js);
   gulp.watch([path.watch.images], images);
   gulp.watch([path.watch.fonts], fonts);
   gulp.watch([path.watch.tamplates], html);
}

const build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts));
const watch = gulp.parallel(build, watchFiles, serve);

exports.html = html;
exports.css = css;
exports.fonts = fonts;
exports.js = js;
exports.clean = clean;
exports.images = images;
exports.build = build;
exports.watch = watch;
exports.default = watch;
