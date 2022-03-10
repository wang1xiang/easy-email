#### package.json解读

##### 依赖

- chalk 修改中断输出字符样式
- dayjs 类似momentJs
- jsdom 在Node.js环境中“模拟出”DOM环境，像jQuery这样对DOM依赖的库就可以在Node.js中运行
- rimraf 删除文件或文件夹
- yup 用于值解析和验证的JavaScript模式生成器
- fs-extra node 文件操作相关工具库
- is-hotkey 检查浏览器事件是否与热键匹配
- json-format 将JavaScript对象解析为缩进的JSON字符串
- mjml、mjml-browser 用来将 MJML 标识语言转成 HTML
- mustache 模板
- qrcode-generator 生成二维码
- qs 增加了一些安全性的查询字符串解析和序列化字符串的库
- react-color 颜色选择器

##### 脚本

- lib: "rimraf lib  && npm run typings && tsc-alias -p tsconfig.lib.json && vite build --config vite.lib.config.ts"
  - rimraf lib删除旧lib
  - npm run typings
  - tsc-alias -p tsconfig.lib.json 替换路径
  - vite build --config vite.lib.config.ts

#### 代码结构

- Provider EmailEditorProvider入口，存放各种context状态
- EmailEditor EmailEditor组件，具体操作内容
