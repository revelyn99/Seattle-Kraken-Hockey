const { src, dest, watch, series, parallel } = require("gulp");
const browsersync = require("browser-sync").create();
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
var uglifyJs = require("gulp-uglify");
const minifyCss = require("gulp-minify-css");
const rename = require("gulp-rename");

//
//
function watchFiles() {
  watch(
    [
      "ssrc/css/*.scss",
      "src/scss/**/*.scss",
      "src/scss/*.scss",
      "src/js/*.js",
      "*.html",
    ],
    { events: "all", ignoreInitial: false },
    series(styles, buildScripts)
  );
}
//
//
function styles() {
  return src("src/scss/*.scss")
    .pipe(sass({ "sourcemap=none": true }))
    .pipe(concat("styles-min.css"))
    .pipe(autoprefixer("last 2 version", "ie 9"))
    .pipe(minifyCss({ keepSpecialComments: 0 }))
    .pipe(dest("css"))
    .pipe(browsersync.reload({ stream: true }));
}
//

function buildScripts() {
  return (
    src("src/js/*.js")
      .pipe(rename({ suffix: "-min", extname: ".js" }))
      //  .pipe(concat("all.js"))
      .pipe(uglifyJs())
      .pipe(dest("js"))
      //  .pipe(dest('../temp/js/'))
      .pipe(browsersync.reload({ stream: true }))
  );
}

function concatScripts() {
  return (
    src([
      "src/js/vendor/gsap.min.js",
      "src/js/vendor/ScrollMagic.min.js",
      "src/js/vendor/animation.gsap.min.js",
      "src/js/vendor/TextPlugin.min.js",
      "src/js/vendor/DrawSVGPlugin.min.js",
      "src/js/vendor/jquery.fancybox.min.js",
    ])
      .pipe(concat("vendor.js"))
      .pipe(rename({ suffix: "-min", extname: ".js" }))
      .pipe(dest("js"))
      //  .pipe(dest('../temp/js/'))
      .pipe(browsersync.reload({ stream: true }))
  );
}
//
// Init BrowserSync.
function browserSync(done) {
  browsersync.init({
    server: "",
    socket: { domain: "localhost:3000" },
  });
  done();
}
// Export commands.
exports.default = parallel(browserSync, watchFiles); // $ gulp
exports.sass = styles; // $ gulp sass
exports.script = buildScripts; // $ buildHtml
exports.concat = concatScripts; // $ Concat

// const { src, dest, watch, series, parallel } = require("gulp");
// const browsersync = require("browser-sync").create();
// const sass = require("gulp-sass");
// const concat = require("gulp-concat");
// const jshint = require("gulp-jshint");
// const autoprefixer = require("gulp-autoprefixer");
// const uglify = require("gulp-uglify");
// const minifyCss = require("gulp-minify-css");
// const rename = require("gulp-rename");
// <script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.min.js"></script>
//
// //
// //
// function buildSass() {
//   return (
//     src("scss/styles.scss")
//       .pipe(sass({ outputStyle: "compressed" }))
//       .pipe(rename({ suffix: "-min", extname: ".css" }))
//       .pipe(dest("../dist/css/"))
//       //   .pipe(dest('../temp/css/'))
//       .pipe(browsersync.reload({ stream: true }))
//   );
// }
// //
// function buildHtml() {
//   return src("../src/html/*.html")
//     .pipe(dest("../dist/"))
//     .pipe(browsersync.reload({ stream: true }));
// }
// //
// function watchFiles() {
//   watch(
//     ["scss/*.scss", "js/*.js", "html/*.html"],
//     { events: "all", ignoreInitial: false },
//     series(buildSass, buildScripts, buildHtml)
//     //
//   );
// }
// //
// function buildScripts() {
//   return (
//     src("js/main.js")
//       .pipe(rename({ suffix: "-min", extname: ".js" }))
//       .pipe(dest("../dist/js/"))
//       //  .pipe(dest('../temp/js/'))
//       .pipe(browsersync.reload({ stream: true }))
//   );
// }
// //
// // Init BrowserSync.
// function browserSync(done) {
//   browsersync.init({
//     server: "../dist/",
//     socket: { domain: "localhost:3000" },
//   });
//   done();
// }
// // Export commands.
// exports.default = parallel(browserSync, watchFiles); // $ gulp
// exports.sass = buildSass; // $ gulp sass
// exports.html = buildHtml; // $ buildHtml
// exports.script = buildScripts; // $ buildHtml
