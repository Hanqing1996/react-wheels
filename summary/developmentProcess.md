#### 安装 webpack
```
yarn add webpack webpack-cli -D
``` 
#### 指定 mode
> 配置 webpack.config.js 的 mode

#### 指定项目入口文件
> 配置 webpack.config.js 的 entry。之后的 html 会自动引用该入口文件 build 后的 js 代码。

#### 让 webpack 能编译 tsx
1. 安装 awesome-typescript-loader
```
yarn add -D awesome-typescript-loader
```
2. 配置 webpack.config.js 的 module.rules
```
module: {
    rules: [
        {
            test:/\.tsx?$/,
            loader: 'awesome-typescript-loader'
        }
    ]
},
```

#### 指定项输出目录（build 后的 js 文件放哪里）
> 配置 webpack.config.js 的 output
```
entry:  {
    index: './lib/index.tsx'
},
output: {
    // output 的 fileName 为 index.js
    path: path.resolve(__dirname, 'dist/lib'),
    library: 'myReactWheel',
    libraryTarget: "umd"
}
```

#### 让 webpack 支持 ts（能把 ts 编译 js）
1. 安装 typescript
2. 配置 tsconfig.json（直接抄，不要自己配）
 
>至此，运行 npx webpack。我们就可以在 dist/lib 下找到 build 后的js文件

#### build temporarily（临时自动 build）
1. 安装 webpack-dev-server
```
yarn add webpack-dev-server -D 
```
2. 运行 npx webpack-dev-server
3. webpack-dev-server 的作用是开启一个 server 服务，如果我们请求 index.js（http://localhost:8081/index.js）。服务器会自动编译 lib/index.tsx，并展示在浏览器中
4. 在执行 npx webpack-dev-server 后，如果我们修改 index.tsx,tsx 代码会被自动编译，但是需要刷新页面才能看到更新后的编译结果。
5. 但是 build 结果只放入内存，不放入 dist 目录下。
6. 要注意到 webpack-dev-server 不会有实质性的，文件形式地 build，而是仅仅展示一个 build 后的结果。所以 npx webpack-dev-server 不能代替 npx webpack。

#### 创建 index.html,并能自动引用 dist/lib 下 build 后的 js 文件
> 我们的需求是，创建一个 index.html,它应该能自动引用 dist/lib 下 build 后的 js 文件。这里存在一个问题，这个 js 文件的名字是一个从 webpack.config.js 中获取的变量，因此必须是动态的所以我们需要保证 index.html 能动态地获取 build 后的 js 文件名
> HtmlWebpackPlugin 可以达到以上要求
1. 在 lib 目录下创建 index.html
2. 手动安装 HtmlWebpackPlugin
3. 配置 webpack.config.js 的 plugin
4. 运行 npx webpack-dev-server，请求 index.html（http://localhost:8081/index.html,或直接 http://localhost:8081,webpack 会将 index.html 作为首页）,可以看到 index.html 页面
5. 注意此时若改动 lib/index.tsx ,编译结果依然更新于内存而非 dist/lib 目录

> 至此，我们便建立了项目的首页

#### 在 tsx 中引入 react,react-DOM
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

#### 在 index.tsx 中引入 button.tsx
> 配置 webpack.config.js 的 resolve.extensions

#### 去除 bundle 中 react 相关依赖
> 修改 webpack.config.js 的 externals
1. bundle 指的是 dist/lib 目录下的 index.js 文件。
2. 去除 react 相关依赖指的是运行 npx webpack 后 bundle 去除 react 相关依赖，而 npx webpack-dev-sever 时项目开发时的运行状态，编译结果必须包含 react 依赖。
3. 之所以要去除依赖，是为了减小 bundle 的体积，不是为了减小 npx webpack-dev-sever 时的临时编译结果的体积
4. [externals](https://webpack.docschina.org/configuration/externals/) 指明了 bundle 中应该去除哪些依赖，并通过一些配置，保证我们的 lib 可以在各种模块上下文(module context)中使用，例如 CommonJS, AMD, 全局变量和 ES2015 模块。 
5. 比如我们在 externals 中对 root 配置了{root:'React'},那么引用了我们 lib 的项目就可以通过 script 引入 react
```
<script src="https://cdn.bootcss.com/react/16.12.0/cjs/react.production.min.js"></script>
```
6. 换而言之，externals 对某个依赖的具体模块引用配置，规定了其他人使用我们 lib 时对于该依赖的模块引用方式
7. 注意,我们的 index.tsx 同样需要引用 react,所以 externals 的 react 配置中必须包含我们在 index.tsx 中引用 react 的模块引用方式，否则项目在开发过程中无法顺利运行

#### 配置 webpack.config.dev.js 和 webpack.config.prod.js
* base 环境
各类文件格式识别（css,svg,ts）。js 不用，默认支持。
* dev 环境
1. 配置入口文件（js）和开发时预览页面（index.html）。入口文件用于被预览页面引用
2. 事实上 dev 环境根本不关心 bundle 的情况。之所以配置入口文件和开发时预览页面，也仅仅是为了入口文件用于被预览页面引用。
3. yarn start 仅仅是搭建一个临时服务器，用于预览开发效果，不包括生成 bundle 这一步。（所以 yarn build:dev 是个不成立的指令）
* prod 环境
1. 去除 bundle 对 react 等库的依赖
2. 不需要预览页面，入口文件用于导出所有组件
3. 配置 bundle 中 js 模块引用方式（bundle 中的 ts 由 ts.config.json 负责） 


#### 配置 Node 相关环境变量
1. 安装 cross-env
```
yarn add cross-env -D
```
2. 修改 package.json
```
  "scripts": {
    "start": "cross-env NODE_ENV=development webpack-dev-server --config webpack.config.dev.js",
    "build:dev": "cross-env NODE_ENV=development webpack --config webpack.config.dev.js",
    "build:prod": "cross-env NODE_ENV=production webpack --config webpack.config.prod.js"
  }
```

#### 根据 lib 目录下 tsx 文件生成 .d.ts 文件
> index.d.ts 用于告诉使用我们 lib 的人，我们的项目中使用了哪些类型
1. 配置 tsconfig.json（如果不起效的话，直接去抄运行成功的）
```
// 我们不希望类型声明文件放入 dist/lib 中 
"outDir": "dist"
```
2. 在 package.json 中指明 lib 入口文件和类型声明文件
```
  "main": "./dist/index.js",
  "types":"./dist/index.d.ts", 
```

#### 配置 Jest（react 官配）
> Jest 不会读取 webpack 配置
1. 安装对应依赖
```
yarn add -D jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer
```
jest 不支持 ts,所以还要安装 ts-jest, 及类型声明文件 @types/jest,@types/react-test-renderer
```
yarn add -D ts-jest
yarn add -D @types/jest
yarn add -D @types/react-test-renderer
```
2. 配置 .babelrc
3. 配置 jest.config
> jest.config.js 不会读取 webpack（karma.config.js 会）
4. 创建 test/setupTests.js
5. 配置 tsconfig.test.json
6. 在 package.json 中添加 test 命令
```
  "scripts": {
    "test": "cross-env NODE_ENV=test jest --config=jest.config.js --runInBand",
    }
```

#### 引入 svg 文件
> webpack 需要能识别以 .svg 结尾的文件。所以需要安装对应 loader:svg-sprite-loader ,并配置 webpack.config.js
```
yarn add -D svg-sprite-loader
```
```
module: {
    rules: [
        {
            test: /\.svg$/,
            loader:'svg-sprite-loader'
        }
    ]
}
```
> 我们需要在 ts 中引入 svg 文件。所以需要声明 svg 类型，并配置 tsconfig.json
```
// types/custom.d.ts
declare module '*.svg'{
    const content:any;
    export default content
}
```
```
// tsconfig.json
  "include": [
    "types/**/*",
    "lib/**/*"
  ],
```
> 此外，其实直接在 ts 中引入 import './svg.js'即可


#### 配置 SCSS
> webpack 需要能识别以 .svg 结尾的文件。所以需要安装对应 loader:svg-sprite-loader ,并配置 webpack.config.js
```
module: {
    rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
    ]
}
```
* loader 作用流程
1. sass-loader 把 icon.scss 语法改为 css 语法（内存中编译，不产生实际文件）
2. css-loader 生成一个对象，包含 1 结果
3. style-loader 根据对象生成 style 标签，放入 html 的 head

#### mock SVG/SCSS
> test 不测试 css,以及 svg,所以需要 mock SVG/SCSS
1. 在 test 目录下创建 mock 目录
2. 在 mock 文件夹下创建 file-mock.js 和 object-mock.js
3. 配置 jest.config
```
// 当测试用例需要引用 css,svg 时，就从指定文件夹中取得 mock 数据
moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/__mocks__/file-mock.js",
    "\\.(css|less|sass|scss)$": "<rootDir>/test/__mocks__/object-mock.js",
}
```

#### 单元测试
```
yarn test
```
> toMatchSnapshot目录：存储正确测试用例的代码快照,通过 yarn test -u 更新

#### enzyme
1. 安装对应依赖
```
yarn add -D enzyme@3.8.0 enzyme-adapter-react-16@1.9.1
```
2. 配置 setupTests.js
```
const enzyme=require('enzyme')
const Adapter=require('enzyme-adapter-react-16')

enzyme.configure({ adapter: new Adapter() });
```

#### 测试覆盖率
安装 jest-junit
```
yarn add -D jest-junit
```
配置 jest.config.ci.js
```
// 测试覆盖率报告放在 coverage 目录
// collectCoverageFrom
const base = require('./jest.config')
module.exports = Object.assign({}, base, {
    reporters: ["jest-junit"], // 引用 jest-junit
    collectCoverage: true, // 是否收集测试覆盖率
    collectCoverageFrom: ["lib/**/*.{ts,tsx}", "!**/node_modules/**"], // 测试哪些文件
    coverageDirectory: 'coverage', // 测试覆盖率报告放在 coverage 目录
    coverageReporters: ['text', 'lcov'], // 测试覆盖率报告种类
})
```
配置 package.json
```
"xxx": "cross-env NODE_ENV=test JEST_JUNIT_OUTPUT=./test-results/jest/results.xml jest --config=jest.config.ci.js"
```
之后运行 yarn xxx 即可获得测试覆盖率报告

#### Circle CI
> 配置 .circleci/config.yml
* prepare
```
prepare:
<<: *defaults
steps:
  - checkout // 从 github clone 相关代码
  - restore_cache:
      keys:
        - v2-dependencies-{{ checksum "package.json" }} // 以当前的 package.json 的 MD5 为 key,创建一个包含 node_modules 的缓存快照，用于加快之后的执行速度
  - run: yarn install // 安装所需依赖
  - save_cache:
      paths:
        - node_modules
      key: v2-dependencies-{{ checksum "package.json" }}
  - persist_to_workspace:
      root: .
      paths:
        - node_modules // ./node_modules 放置相关依赖
```
* build
```
build:
<<: *defaults
steps:
  - checkout
  - attach_workspace:
      at: .
  - run: yarn build
  - persist_to_workspace: // 持久化
      root: .
      paths:         // 指定需要保留哪些文件（下一阶段用）
        - dist
        - package.json
        - LICENSE
        - README.md
```
* test
```
  test:
    <<: *defaults
    steps:
      - checkout
      - attach_workspace:
          at: .
      - run: yarn ci
      - store_test_results:  // 保存测试结果
          path: test-results  // 指定存放测试结果文件的路径
```
* publish
```
  // publish 不需要 checkout，因为上个阶段（build）已经保留了所需文件
  publish:
    <<: *defaults
    steps:
      - attach_workspace:
          at: .
      - run: npm config set //registry.npmjs.org/:_authToken $NPM_TOKEN
      - run: npm publish
```
> 整个工作流程如下
```
workflows:
  version: 2
  build_accept_deploy:
    jobs:
      - prepare
      - build:
          requires:       // 必须在 test 完毕后再执行 build
            - test
      - test:
          requires:
            - prepare
      - publish:
          requires:
            - build
          filters:         // 只在特定条件下执行 publish ,一般情况无 publish 阶段。以此实现 circle CI 自动 publish
            branches:
              only: /deploy/
```

#### 添加 Status badges
[在 circle CI 的 Settings 页面可以找到链接](https://circleci.com/gh/Hanqing1996/react-wheels/edit#badges)

#### 制作官网
1. 安装 raw-loader
```
yarn add -D raw-loader
```
2. 获取组件代码
```
// icon.code.tsx
import React from 'react'
import ShowCode from '../showCode'
import IconExample from "../examples/icon.example";

const example=require('!!raw-loader!../examples/icon.example.tsx')

const iconCode: React.FunctionComponent = () => {
    return (
        <div>
            <ShowCode code={example.default}>
                <IconExample/>
            </ShowCode>
        </div>
    )
}

export default iconCode
```
3. 代码高亮
> 安装 prism-react-renderer

#### 部署官网
1. 配置 webpack.config.doc_build.js
* bundle 需要包括 react 依赖（lib 用户会自己安装 react 依赖。可是浏览器不会自己安装 react 呀）
* bundle 不包括 .d.ts 文件，只需要一个 html 页面以及相应 js 文件
* bundle 应该输出到 docs 目录，而非 dist 目录
2. package.json 添加命令
```
"doc:build": "cross-env NODE_ENV=production webpack --config webpack.config.doc_build.js",
```
3. 在 repo 的 settings/Github Pages 选择 docs folder
4. 修改 package.json 的 homepage
```
"homepage": "https://github.com/Hanqing1996/react-wheels/docs",
```
5. git push（包括 docs 目录）
6. 将以上步骤写成



mv -f doc/* ./