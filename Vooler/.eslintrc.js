/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
module.exports = {
  parser: "@babel/eslint-parser",
  env: {
    browser: true,
    es2021: true,
    "react-native/react-native": true,
  },
  extends: [
    "google",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
    requireConfigFile: "false",
    babelOptions: { configFile: "./babel.config.js" },
  },
  plugins: ["react", "react-native", "prettier"],
  rules: {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/react-in-jsx-scope": 0,
    "no-console": 0,
    "require-jsdoc": 0,
    "prettier/prettier": "error",
  },
  settings: {
    react: {
      // Regex for Component Factory to use, default to "createReactClass"
      // eslint-disable-next-line no-trailing-spaces
      createClass: "createReactClass",
      // Pragma to use, default to "React"
      pragma: "React",
      // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // default to latest and warns if missing
      // It will default to "detect" in the future
      version: "detect",
      // Flow version
      flowVersion: "0.53",
    },
    propWrapperFunctions: [
      // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
      "forbidExtraProps",
      { property: "freeze", object: "Object" },
      { property: "myFavoriteWrapper" },
    ],
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      "Hyperlink",
      { name: "Link", linkAttribute: "to" },
    ],
  },
};
