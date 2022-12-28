module.exports = {
  root: true,
  extends: ["universe/native", "plugin:react-hooks/recommended"],
  rules: { "prettier/prettier": ["error", { endOfLine: "auto" }] },
  settings: {
    "import/ignore": ["react-native"],
  },
};
