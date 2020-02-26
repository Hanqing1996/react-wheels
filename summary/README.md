* 安装 webpack
```
yarn add webpack webpack-cli -D
``` 
* 指定 mode
> 配置 webpack.config.js 的 mode

* 指定项目入口文件
> 配置 webpack.config.js 的 entry 

* 让 webpack 能编译 tsx
> 配置 webpack.config.js 的 module.rules。注意 loader 项内容是需要手动安装的

* 指定项输出目录（build 后的 js 文件放哪里）
> 配置 webpack.config.js 的 output，其中 filename 默认为 main.js

* 让 webpack 支持 ts
1. 安装 typescript
2. 配置 tsconfig.json

#### 至此，运行 npx webpack。我们就可以在 dist/lib 下找到 build 后的js文件

