var sass = require('node-sass');
var path = require('path');
var fs = require('fs');

var result = sass.renderSync({
  file: 'src/core/component/component.scss',
  outputStyle: 'compressed',
  sourceMap: true,
  importer: function importer(url, prev, done) {
    if (url[0] === '~') {
      url = path.resolve('node_modules/', url.substr(1));
    }
    return {file: url};
  }
});

fs.writeFileSync('react-application-core.css', result.css);