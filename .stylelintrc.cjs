module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-standard-scss',
        'stylelint-config-recommended-vue/scss'
    ],
    rules: {
        'selector-pseudo-element-no-unknown': [true, {ignorePseudoElements: ['deep']}],
        'selector-pseudo-class-no-unknown': [true, {ignorePseudoClasses: ['deep']}],
        'no-descending-specificity': null,
        'at-rule-no-unknown': [
            true,
            {
                'ignoreAtRules': ['mixin', 'include', 'extend', 'if', 'use', 'for', 'each'],
            },
        ],
        'selector-class-pattern': '[a-z0-9_\-]+',
        'no-empty-source': null,
        'block-no-empty': null,
    },
};
