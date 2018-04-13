var replace = require("replace");
var fs = require('fs');
var file1 = 'node_modules/@types/node/index.d.ts';
var file2 = 'node_modules/@types/react-native/index.d.ts';

if (fs.existsSync(file1)) {
  replace({
    regex: "declare var require: NodeRequire;",
    replacement: "",
    paths: [file1],
  });
}

if (fs.existsSync(file2)) {
  replace({
    regex: "readonly geolocation: Geolocation;",
    replacement: "",
    paths: [file2],
  });
}