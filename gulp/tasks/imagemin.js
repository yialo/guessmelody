const svgoPlugins = [
  { addAttributesToSVGElement: false },
  { addClassesToSVGElement: false },
  { cleanupAttrs: false },
  { cleanupEnableBackground: true },
  { cleanupIDs: false },
  { cleanupListOfValues: true },
  { cleanupNumericValues: true },
  { collapseGroups: true },
  { convertColors: true },
  { convertPathData: true },
  { convertShapeToPath: false },
  { convertStyleToAttrs: false },
  { convertTransform: true },
  { inlineStyles: false },
  { mergePaths: true },
  { minifyStyles: false },
  { moveElemsAttrsToGroup: true },
  { moveGroupAttrsToElems: false },
  { prefixIds: false },
  { removeAttrs: true },
  { removeComments: true },
  { removeDesc: true },
  { removeDimensions: true },
  { removeDoctype: true },
  { removeEditorsNSData: true },
  { removeElementsByAttr: false },
  { removeEmptyAttrs: true },
  { removeEmptyContainers: true },
  { removeEmptyText: true },
  { removeHiddenElems: true },
  { removeMetadata: true },
  { removeNonInheritableGroupAttrs: true },
  { removeRasterimg: false },
  { removeScriptElement: true },
  { removeStyleElement: true },
  { removeTitle: true },
  { removeUnknownsAndDefaults: true },
  { removeUnusedNS: true },
  { removeUselessDefs: false },
  { removeUselessStrokeAndFill: true },
  { removeViewBox: false },
  { removeXMLNS: false },
  { removeXMLProcInst: true },
  { sortAttrs: false },
];

module.exports = () => {
  $.gulp.task('imagemin', () => (
    $.gulp
      .src($.path.raw.input)
      .pipe(
        $.pl.imagemin([
          $.imp.gifsicle(),
          $.imp.jpegtran({ progressive: true }),
          $.imp.mozjpeg({ quality: 90 }),
          $.imp.pngquant({ speed: 1, quality: [0.8, 0.8] }),
          $.imp.zopfli({ more: true }),
          $.imp.svgo({ plugins: svgoPlugins }),
        ])
      )
      .pipe($.gulp.dest($.path.raw.output))
  ));
};
