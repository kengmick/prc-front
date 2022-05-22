module.exports = {
  customSyntax: 'postcss-html',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
    'stylelint-config-prettier',
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'color-no-invalid-hex': true,
    'selector-class-pattern': null,
    'rule-empty-line-before': null,
    'color-function-notation': null,
    'alpha-value-notation': null,
    'selector-pseudo-element-colon-notation': 'single',
  },
}
