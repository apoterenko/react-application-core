var sass = require('node-sass');
var path = require('path');
var fs = require('fs');
var ncp = require('ncp').ncp;

var compile = function (inFile, outFile) {
  var result = sass.renderSync({
    file: inFile,
    outputStyle: 'compressed',
    sourceMap: true,
    importer: function importer(url) {
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

ncp.limit = 16;

ncp('src/core/assets', 'assets', function (err) {
    if (err) {
        return console.error(err);
    }
});

compile('src/core/bootstrap.scss', 'rac.min.css');
compile('src/core/material.bootstrap.scss', 'rac-material.min.css');