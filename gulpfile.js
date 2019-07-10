'use strict';

const del = require(`del`);
const gulp = require(`gulp`);
const sass = require(`gulp-sass`);
const plumber = require(`gulp-plumber`);
const postcss = require(`gulp-postcss`);
const autoprefixer = require(`autoprefixer`);
const server = require(`browser-sync`).create();
const mqpacker = require(`css-mqpacker`);
const minify = require(`gulp-csso`);
const rename = require(`gulp-rename`);
const imagemin = require(`gulp-imagemin`);

gulp.task(`style`, () => {
  return gulp.src(`sass/style.scss`)
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      mqpacker({sort: true})
    ]))
    .pipe(gulp.dest(`build/css`))
    .pipe(server.stream())
    .pipe(minify())
    .pipe(rename(`style.min.css`))
    .pipe(gulp.dest(`build/css`));
});

gulp.task(`scripts`, () => {
  return gulp.src(`js/**/*.js`)
    .pipe(plumber())
    .pipe(gulp.dest(`build/js/`));
});

gulp.task(`copy-html`, () => {
  return gulp.src(`*.{html,ico}`)
    .pipe(gulp.dest(`build`))
    .pipe(server.stream());
});

gulp.task(`copy-binary`, () => {
  return gulp.src(
      [
        `fonts/**/*.{woff,woff2}`,
        `img/*.*`,
      ],
      {base: `.`}
  )
    .pipe(gulp.dest(`build`));
});

gulp.task(`copy`, gulp.parallel(
    `copy-html`,
    `scripts`,
    `style`,
    `copy-binary`
));

gulp.task(`imagemin`, () => {
  return gulp.src(`build/img/**/*.{jpg,png,gif}`)
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest(`build/img`));
});

gulp.task(`clean`, () => {
  return del(`build`);
});

gulp.task(`js-watch`, gulp.series(
    `scripts`,
    (done) => {
      server.reload();
      done();
    }
));

gulp.task(`assemble`, gulp.series(`clean`, `copy`));

gulp.task(`serve`, () => {
  server.init({
    server: `./build`,
    notify: false,
    open: true,
    port: 3502,
    ui: false
  });

  gulp.watch(`sass/**/*.{scss,sass}`, gulp.series(`style`));
  gulp.watch(`*.html`).on(`change`, (evt) => {
    if (evt.type !== `deleted`) {
      gulp.series(`copy-html`);
    }
  });
  gulp.watch(`js/**/*.js`, gulp.series(`js-watch`));
});

gulp.task(`build`, gulp.series(`assemble`, `imagemin`));

gulp.task(`test`, () => {
});

gulp.task(`default`, gulp.series(`build`, `serve`));
