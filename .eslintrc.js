module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "no-console": "off",
    "no-unused-vars": "off",
    "no-cond-assign": "off",
    "no-undef": "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
