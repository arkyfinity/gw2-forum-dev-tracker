module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: '@babel/eslint-parser',
        sourceType: 'module',
        ecmaVersion: 2021
    },
    extends: [
        '@moso/eslint-config-basic'
    ],
    rules: {
        'template-curly-spacing': 0,
        'indent': ['error', 4, { 'MemberExpression': 0 }],
        'import/no-named-as-default': 0,

        // Custom stuff for this project
        'no-console': 'off',
        'prefer-template': 'off',
        'quotes': 'off',
        'no-unused-vars': 'off'
    }
}
