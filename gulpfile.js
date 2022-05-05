const gulp = require("gulp");
const { src, dest, watch, series, parallel } = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const terser = require("gulp-terser");
const sass = require("gulp-sass")(require("sass"));
const fibers = require("fibers");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const del = require("del");
const browsersync = require("browser-sync").create();
const argv = require("yargs").argv;
const buildUrl = argv.site ? `${argv.ste}` : "localhost";
const port = argv.port ? `${argv.port}` : 3000;
const buildOpen = argv.open ? "external" : false;

function initAssets(done) {
    browsersync.init({
        server: {
            baseDir: "./src"
        },
        files: [
            "./src/assets/scss/**/*scss",
            "./src/assets/css/*.css",
            "./src/assets/js/*.js",
            "./src/assets/**/*.*",
            "./src/**/*.html",
            "./src/*.html"
        ],
        host: buildUrl,
        port: port,
        notify: false,
        open: buildOpen
    });
    done();
}

/**
 * TODO: 
 *      If using Gulp when building the Umbraco version of site,
 *      Set up a siteInit function to launch browserSync pointing at Views / wwwroot etc.
 */
function init(done) {
    initAssets(done);
}

function copyHtml() {
    return gulp.src("./src/**/*.html")
        .pipe(gulp.dest("./dist/"))
        .pipe(browsersync.stream());
}

function copyFonts() {
    return gulp.src("./src/assets/fonts/**/*.*")
        .pipe(gulp.dest("./dist/assets/fonts/"))
        .pipe(browsersync.stream());
}

function compileSassDev() {
    return gulp
        .src("./src/assets/scss/main.scss")
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                fiber: fibers,
                outputStyle: "expanded",
            }).on("error", sass.logError)
        )
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write("./maps/"))
        .pipe(gulp.dest("./src/assets/css/"))
        .pipe(browsersync.stream());
}

function compileSassProd() {
    return gulp
        .src("./src/assets/scss/main.scss")
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                fiber: fibers,
                outputStyle: "expanded",
            }).on("error", sass.logError)
        )
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(
            rename({
                suffix: ".min",
            })
        )
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest("./dist/assets/css/"));
}

function minifyScriptsDev() {
    return gulp
        .src("./src/assets/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat("main"))
        .pipe(sourcemaps.write("./maps/"))
        .pipe(gulp.dest("./src/assets/js/"))
        .pipe(browsersync.stream());
}

function minifyScriptsProd() {
    return gulp
        .src("./src/assets/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat("main"))
        .pipe(terser().on("error", (error) => console.log(error)))
        .pipe(rename({suffix: ".min"}))
        .pipe(sourcemaps.write("./maps/"))
        .pipe(gulp.dest("./src/assets/js/"));
}

function cacheBuster() {
    return gulp
        .src("./dist/**/*.html")
        .pipe(replace(/css\?v=\d+/g, `min.css?v=${ new Date().getTime() }`))
        .pipe(gulp.dest("./dist/"));
}

function cleanDist() {
    return del(["./dist/"])
}

function watcher() {
    gulp.watch("./src/assets/scss/**/*.html", copyHtml).on("change", browsersync.reload);
    gulp.watch("./src/assets/scss/**/*.scss", compileSassDev).on("change", browsersync.reload);
    gulp.watch("./src/assets/js/**/*.js", minifyScriptsDev).on("change", browsersync.reload)
}

const dev = gulp.parallel(compileSassDev, minifyScriptsDev, init, watcher);

const prod = gulp.series(
    cleanDist,
    gulp.parallel(copyHtml, copyFonts, compileSassProd, minifyScriptsProd),
    cacheBuster
);

exports.dev = dev;
exports.prod = prod;