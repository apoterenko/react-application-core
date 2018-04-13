var replace = require("replace");

replace({
  regex: "declare var require: NodeRequire;",
  replacement: "",
  paths: ['node_modules/@types/node/index.d.ts'],
});

replace({
  regex: "readonly geolocation: Geolocation;",
  replacement: "",
  paths: ['node_modules/@types/react-native/index.d.ts'],
});