var sass = require('node-sass');
var path = require('path');
var fs = require('fs');

var compile = function (inFile, outFile) {
  var result = sass.renderSync({
    file: inFile,
    outputStyle: 'compressed',
    sourceMap: true,
    importer: function importer(url, prev, done) {
      if (url[0] === '~') {
        url = path.resolve('node_modules/', url.substr(1));
      }
      if (url.indexOf('@material') === 0) {
        url = path.resolve('node_modules/', url);
      }
      return {file: url};
    }
  });
  fs.writeFileSync(outFile, result.css);
};

compile('src/core/component/component.scss', 'rac.min.css');
compile('src/core/component/material/material.scss', 'rac-material.min.css');