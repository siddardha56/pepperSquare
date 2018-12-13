module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    "react/forbid-prop-types": [1, { "forbid": ["any", "array"] }],
    "jsx-a11y/no-static-element-interactions": 0,
    'no-script-url': 0,
    'camelcase': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'no-nested-ternary': 0,
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: [],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ["noHref"]
      }
    ],
    "jsx-a11y/label-has-for": 0,
  },
  parser: 'babel-eslint'
};
