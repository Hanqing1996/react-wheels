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
4. 运行 npx webpack-dev-server，请求 index.html（http://localhost:8081/index.html,或直接 http://localhost:8081,webpack 会将 index.html 作为首页）,可以看到 index.html 页面
5. 注意此时若改动 lib/index.tsx ,编译结果依然更新于内存而非 dist/lib 目录

#### 至此，我们便建立了项目的首页

* 在 tsx 中引入 react,react-DOM
1. 安装 react,react-dom
```
yarn add -D react
yarn add -D react-dom
```
2. 安装相应类型声明文件
```
yarn add -D @types/react-dom
yarn add -D @types/react
```

* 在 index.tsx 中引入 button.tsx
> 配置 webpack.config.js 的 resolve.extensions

* 去除 bundle 中 react 相关依赖
> 修改 webpack.config.js 的 externals
1. bundle 指的是 dist/lib 目录下的 main.js 文件。
2. 去除 react 相关依赖指的是运行 npx webpack 后 bundle 去除 react 相关依赖，而 npx webpack-dev-sever 时项目开发时的运行状态，main.js 必须包含 react 依赖。
3. 之所以要去除依赖，是为了减小 bundle 的体积，不是为了减小 npx webpack-dev-sever 时的 main.js 体积
4. [externals](https://webpack.docschina.org/configuration/externals/) 指明了 bundle 中应该去除哪些依赖，并通过一些配置，保证我们的 lib 可以在各种模块上下文(module context)中使用，例如 CommonJS, AMD, 全局变量和 ES2015 模块。 
5. 比如我们在 externals 中对 root 配置了{root:'React'},那么引用了我们 lib 的项目就可以通过 script 引入 react
```
<script src="https://cdn.bootcss.com/react/16.12.0/cjs/react.production.min.js"></script>
```
6. 换而言之，externals 对某个依赖的具体模块引用配置，规定了其他人使用我们 lib 时对于该依赖的模块引用方式
7. 注意,我们的 index.tsx 同样需要引用 react,所以 externals 的 react 配置中必须包含我们在 index.tsx 中引用 react 的模块引用方式，否则项目在开发过程中无法顺利运行