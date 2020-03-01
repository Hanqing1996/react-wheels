#### 函数可以保存状态
> 在 taker(10) 以后，money 的状态为 90,被保存了下来
```
const taker=function(){
    let money=100
    return (n)=>{
        money-=n
        console.log(money)
    }
}()

taker(10) // 90
taker(20) // 80
```

#### 函数可以传递消息
```
let makeAccount = (money) => {
    let take = (n) => {
        money-=n
        return money
    }
    let save=(n)=>{
        money+=n
        return money
    }

    let dispatch=(m)=>{
        return(
            m==='take'?take:
            m==='save'?save:new Error()
        )
    }
    return dispatch
}

let account=makeAccount(100)
console.log(account('take')(20)) // 80
console.log(account('take')(20)) // 60
console.log(account('take')(30)) // 90
```

#### 赋值和初始化是有区别的
```
// 初始化
let a=1 

// 赋值（变量右边第二次出现等号）
a=2 或 a=b
```

#### 赋值的恶果
> 赋值会让同样的函数表达式可能有不同的结果
```
account('take')(20) // 80
account('take')(20) // 60
```
这种现象违背了数学上，代入求值（一个函数，重复代入某个值，会得到相同的结果），函数映射（一个 x 对应一个 y）的基本思想。

#### 函数式程序设计
1. 不用任何赋值的函数设计，就是函数式程序设计
2. 函数式程序设计，实质是数学式的函数设计
3. 如果必须有赋值操作，那么都放到一个副作用函数里面


#### 安装依赖要不要加 -D
* 加 -D
> 只给程序员用
1. webpack
2. ts

* 不加 -D
> 浏览器会需要
1. react
2. vue

#### 依赖管理
```
"@types/react": "^16.9.23",
"@types/react-dom": "^16.9.5",

"react": "^16.13.0",
"react-dom": "^16.13.0",
```
版本号不一致，可能导致 bug（出 bug 再改成一致）

####【面试】yarn-lock 文件是做什么的？
1. 是 yarn 的 lock 文件
2. lock 了所有依赖的版本号

#### 【面试】import package 和 file 在路径上的区别？
* package
```
// from packageName
import * as React from 'react'
```
* file
```
// from Path+fileName
import Button from './button'
```

```
import React from 'react'
```
不奏效，那就写成  
```
import * as React from 'react'
```

#### 在 react 中，如何绑定 this
> 我们需要使用箭头函数绑定 this
```
class App extends React.Component<IProps, IState>{
    constructor(props:IProps) {
        super(props);
        this.state={
            n:1
        }
    }
    x=()=>{
        this.setState({
            n:this.state.n+1
        })
    }
    render(){
        return(
            <div>
                {this.state.n}
                <button onClick={this.x}>
            </div>
        )
    }
}
```
这么做的原理是
```
x=()=>{
    this.setState({
        n:this.state.n+1
    })
}
```
等价于
```
this=App
this.x=()=>{
    this.setState({
        n:this.state.n+1
    })
}
```
所以 this 作为箭头函数内部的一个普通变量，就是 App

#### 为什么 react 不会帮我们绑定 this
因为 react 的定位只是 UI 框架，

#### propTypes
> 用于 js 下类型限制（运行时报错，而非编译时报错）
> 这是用来防止 使用 lib 的人传输错误的参数类型
1. 安装 prop-types
```
yarn add -D prop-types
```
2. 使用 propTypes
```
static propTypes={
    Message:propTypes.string
}
```

#### displayName
用于 React Developer Tools

#### defaultProps
> 用于指定默认 Props
```
static defaultProps={
    Message:'ji'
}
```

> Hooks API 只能用在 react 16.8.0 以上 

* a/**/*
> 匹配 a 目录下的所有文件


#### .d.ts 什么时候有用
```
// custom.d.ts
declare module '*.svg'{
    const content:any;
    export default content
}
```
> 不 import 具体东西，无用
```
import './icons/draw.svg'
``` 
> import 具体东西，有用
```
import draw from './icons/draw.svg'
``` 

#### tree-shaking
1. 删除 bundle 中相关库没有依赖的部分
2. tree-shaking 的基础是静态 import
```
// bundle 依赖如下，所以需要删除库A中的 a3,a4,B中的 b1,b2,
import {a1,a2} from A
import {b3} from B
```
```
//A
export default {a1,a2,a3,a4}
```
```
//B
export default {b1,b2,b3}
```
3. importAll('') 就无法实现 tree-shaking

#### tsconfig.json 的 include
1. 作用是指定编译哪些 ts 文件
2. 不可以所有 ts 文件都编译，比如 node_modules 中包含上万个 ts 文件，如果编译，内存会炸



#### fn 必须满足 iconProps.onClick 的类型要求
```
// index.tsx
const fn=(event: React.MouseEvent<SVGSVGElement, MouseEvent>)=>{
    console.log(event)
}

ReactDOM.render(<Icon name={'movie'} onClick={fn}/>,document.getElementById('root'))
```
```
// icon.tsx
interface iconProps {
    name:String,
    onClick:React.MouseEventHandler<SVGSVGElement>
}

const Icon:React.FunctionComponent<iconProps>=(props)=>{
    return(
        <div>
            <svg className={'icon'} onClick={props.onClick}>
                <use xlinkHref={`#${props.name}`}></use>
            </svg>
        </div>
    )
}
```


#### <ComponentB {...props}/>
> 在 react.js 的语法里面，React.createElement 的第二个参数必须是一个包含所需参数的对象

> 注意!!!! {...props} 的 {} 不表示一个对象，只是 jsx 用来标识 js 内容的分隔符
```
// jsx
function ComponentA(props){
    let rest={name:'libai',age:12,home:'hz'}
    return(
        <div>
            <div> A 组件</div>
            <ComponentB {...rest}/>
        </div>
    )
}
```
用 babel 编译成 js 
```
function ComponentA(props) {
  var rest = {
    name: "libai",
    age: 12,
    home: "hz"
  };
  return React.createElement(
    "div",
    null,
    React.createElement("div", null, " A \u7EC4\u4EF6"),
    React.createElement(ComponentB, rest) // rest 为包含所需参数的对象
  );
}
```


#### 【memorable bug】 
* SyntaxError: Cannot use import statement outside a module
```
// setupTests.js
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });
```
改为
```
const enzyme=require('enzyme')
const Adapter=require('enzyme-adapter-react-16')

enzyme.configure({ adapter: new Adapter() });
```
* New snapshot was not written. The update flag must be explicitly passed to write a new snapshot. This is likely because this test is run in a continuous integration (CI) environment in which snapshots are not written by default. 
> 是因为测试用例包含 snapshot，但我们没有把 snapshot push 到 repo
* “JEST_JUNIT_OUTPUT=./test-results/jest/results.xml”执行后未生成 test-results 目录
> 修改 jest-junit 版本