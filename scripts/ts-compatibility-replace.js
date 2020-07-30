var replace = require("replace");
var fs = require('fs');
var file1 = 'node_modules/@openid/appauth/built/flags.d.ts';
var file2 = 'node_modules/camelcase/index.d.ts';

// TODO Migrate to https://github.com/typescript-eslint/typescript-eslint
if (fs.existsSync(file1)) {
  replace({
    regex: "export declare const IS_LOG = true;",
    replacement: "export declare const IS_LOG;",
    paths: [file1],
  });
  replace({
    regex: "export declare const IS_PROFILE = false;",
    replacement: "export declare const IS_PROFILE;",
    paths: [file1],
  });
}

if (fs.existsSync(file2)) {
  fs.unlinkSync(file2);
}