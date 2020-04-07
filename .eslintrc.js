module.exports = {
    "env": {
        'browser': true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
    ],
    "plugins": ["vue"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "indent": ["error", 4],
        "linebreak-style": ["error", "unix"], // 换行分隔符LF
        "quotes": ["error", "single"],// string单引号
        "semi": ["error", "always"], // 行尾分号
        "no-trailing-spaces": 1, // 行尾不要空格
        "block-spacing": ["error", "always"],
        "brace-style": ["error"], // 大括号换行
        "arrow-parens": ["error", "always"], // 箭头函数用小括号括起来
        "arrow-spacing": ["error", { "before": true, "after": true }], // 箭头函数的前后括号
        "space-before-blocks": ["error", "always"], // 花括号前空格
        "comma-spacing": ["error", { "before": false, "after": true }], // 逗号前后空格
        "space-infix-ops": ["error", { "int32Hint": false }], // 操作符前后要加空格
        "eqeqeq": ["error", "always", { 'null': 'ignore' }], // 除外null使用全等
        "no-multiple-empty-lines": ["error", { "max": 1 }], // 空行最多1行
        "lines-around-comment": ["error", { "beforeBlockComment": true }], // 块注释前空行
        "spaced-comment": ["error", "always"], // 注释跟随一个空格
        "no-console": ["warn"],
        "curly": ["error", "multi-line"], // if带括号
        "newline-per-chained-call": ["error", { "ignoreChainWithDepth": 2 }], // 点操作符换行
        "dot-location": ["error", "object"], // 点操作符应该和属性在同一行
        "key-spacing": ["error", { //字面量冒号后带空格
            "afterColon": true,
            "beforeColon": false,
        }],
        "rest-spread-spacing": [2, 'never'], // ...后面不空格
        "keyword-spacing": ["error", { "before": true }], //关键字前后带空格
        "new-cap": ["error", { "newIsCap": true }], // new关键字后类名应首字母大写
    }
};