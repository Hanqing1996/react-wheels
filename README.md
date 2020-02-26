* 安装 webpack
```
yarn add webpack webpack-cli -D
``` 
* 指定 mode
> 配置 webpack.config.js 的 mode

* 指定项目入口文件
> 配置 webpack.config.js 的 entry。之后的 html 会自动引用该入口文件 build 后的 js 代码。

* 让 webpack 能编译 tsx
> 配置 webpack.config.js 的 module.rules。注意 loader 项内容是需要手动安装的

* 指定项输出目录（build 后的 js 文件放哪里）
> 配置 webpack.config.js 的 output，其中 filename 默认为 main.js

* 让 webpack 支持 ts
1. 安装 typescript
2. 配置 tsconfig.json

#### 至此，运行 npx webpack。我们就可以在 dist/lib 下找到 build 后的js文件

* build temporarily（临时自动 build）
1. 安装 webpack-dev-server
```
yarn add webpack-dev-server -D 
```
2. 运行 npx webpack-dev-server
3. webpack-dev-server 的作用是开启一个 server 服务，如果我们请求 main.js（http://localhost:8081/main.js）。服务器会自动将 lib/index.tsx build 为 main.js 代码，并展示在浏览器中
4. 在执行 npx webpack-dev-server 后，如果我们修改 index.tsx,tsx 代码会被自动编译，但是需要刷新页面才能看到更新后的编译结果。
5. 但是 build 结果只放入内存，不放入 dist 目录下。
6. 要注意到 webpack-dev-server 不会有实质性的，文件形式地 build，而是仅仅展示一个 build 后的结果。所以 npx webpack-dev-server 不能代替 npx webpack。

* 创建 index.html,并能自动引用 dist/lib 下 build 后的 js 文件
> 我们的需求是，创建一个 index.html,它应该能自动引用 dist/lib 下 build 后的 js 文件。这里存在一个问题，这个 js 文件的名字是一个从 webpack.config.js 中获取的变量，因此必须是动态的所以我们需要保证 index.html 能动态地获取 build 后的 js 文件名
> HtmlWebpackPlugin 可以达到以上要求
1. 在 lib 目录下创建 index.html
2. 手动安装 HtmlWebpackPlugin
3. 配置 webpack.config.js 的 plugin
4. 运行 npx webpack-dev-server，请求 index.html（http://localhost:8081/index.html）,可以看到 index.html 页面

