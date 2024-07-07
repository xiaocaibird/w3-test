export default {
    plugins: ['prettier-plugin-solidity'],

    // 行宽
    printWidth: 80,

    // 每个缩进宽度
    tabWidth: 4,

    // 是否用tab做缩进
    useTabs: false,

    // 分号
    semi: true,

    // 单引号
    singleQuote: true,

    // 对象属性是否加引号
    quoteProps: 'as-needed',

    // jsx单引号
    jsxSingleQuote: true,

    // 尾随逗号
    trailingComma: 'all',

    // 大括号间的空格
    bracketSpacing: true,

    // 标签关闭符号是否在同一行
    bracketSameLine: false,

    // 箭头函数括号
    arrowParens: 'avoid',

    // rangeStart: 0, // rangeEnd: Infinity,

    // parser: '',

    // filepath: '',

    // requirePragma: false,

    // insertPragma: false,

    // 是否拆开散文
    proseWrap: 'preserve', // TODO 跟进使用情况

    // html节点里的空白
    htmlWhitespaceSensitivity: 'css', // TODO 跟进使用情况

    // .vue文件里的缩进
    vueIndentScriptAndStyle: true,

    // 行尾符
    endOfLine: 'lf',

    // 自动格式化嵌入语言（如md文件中的js代码）
    embeddedLanguageFormatting: 'auto',

    // 强制每行单个html或jsx属性
    singleAttributePerLine: false,
};
