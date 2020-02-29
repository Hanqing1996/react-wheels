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
