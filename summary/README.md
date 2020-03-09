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
> 浏览器/使用 lib 的人会需要
1. react
2. vue
3. react-router

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
*  Could not find a declaration file for module 'react-router-dom'. 
```
yarn add @types/react-router-dom 
```
* props.children 为可选字段，可能导致函数组件返回类型为 undefined
> 解决方法：用 div 包裹 props.children
```
const CitySelectorDialog: React.FunctionComponent<dialogProps> = (props) => {
    return (
        props.visible ?
            <div>
                props.children
            </div> : null
    )
}
```


#### js、jsx、ts、tsx的区别
> x:意为扩展
* jsx 对 js 的扩展:jsx 可以写 xml 标签 
```
// jsx
return <div></div>
```
```
// js
React.createElement('div',...)
```
* ts 对 js 的扩展:增加了类型
```
// ts
const a:Number=1
```
* tsx 对 ts 的扩展:tsx 可以写 xml 标签 

#### 命名
> Variable
* maskClosable
> Function
* onClickClose
* closeOnClickMask

####
```
const onClose=modal(<h1>你好 <button onClick={()=>{onClose();}}>close</button></h1>)
```
不能写成
```
const onClose=modal(<h1>你好 <button onClick={onClose}>close</button></h1>)
```
因为 JS引擎是从右往左解析的，一旦发现未声明的 onClose，就会报错
* 类似操作
```
let eventHandler = (event) => {

    //由于setTimeout的存在,在点击close按钮及trigger按钮后closeContent会先于eventHandler被触发，则this.$refs.contentWrapper为undefined
    if(!this.$refs.contentWrapper)
        return


    // 只有点击其它位置,才会触发eventHandler("其它位置的定义"是event.target不是文本内容和button)
    if(!this.$refs.contentWrapper.contains(event.target)&&!this.$refs.triggerWrapper.contains(event.target)){

        this.closeContent()
        document.removeEventListener('click', eventHandler)
    }
```

#### 重构
* 不要过早优化（重构），写完有重复操作的所有代码再优化
* 将各部分代码的公共部分抽取到一个函数里
* 公共函数的参数应根据各个部分情况设置（比如都有 visible=false ,那么公共函数就不必设置 visible 参数）
* 只要有一个部分需要 return XXX,则公共函数必须 return XXX
```
const alert = (content: String) => {
    // onClose 无法访问到 setX,所以无法直接切换 visible 状态，因此采用更新容器 div 内部组件的方式实现关闭 CitySelectorDialog
    const onClose = () => {
        // 容器 div 内部组件更新
        ReactDOM.render(React.cloneElement(component, {visible: false}), div)
        // 移除 div 上的组件
        ReactDOM.unmountComponentAtNode(div)
        // 移除 div
        div.remove()
    }
    // onClose 无法访问到 setX,所以无法直接切换 visible 状态，因此采用更新容器 div 内部组件的方式实现关闭 CitySelectorDialog
    const component = <CitySelectorDialog visible={true} onClose={() => {
        onClose()
    }}>{content}</CitySelectorDialog>
    const div = document.createElement('div')
    document.body.appendChild(div)
    ReactDOM.render(component, div)
}

const confirm = (content: String, yes?: Function, no?: Function) => {
    const onClose = () => {
        ReactDOM.render(React.cloneElement(component, {visible: false}), div)
        ReactDOM.unmountComponentAtNode(div)
        div.remove()
    }

    const onYes = () => {
        onClose()
        yes && yes()
    }
    const onNo = () => {
        onClose()
        no && no()
    }
    const component = <CitySelectorDialog
        visible={true}
        onClose={onNo}
        buttons={[<button onClick={onYes}>yes</button>, <button onClick={onNo}>no</button>]}
    >{content}</CitySelectorDialog>
    const div = document.createElement('div')
    document.body.appendChild(div)
    ReactDOM.render(component, div)
}

const modal = (content: ReactNode | ReactFragment) => {

    const onClose = () => {
        ReactDOM.render(React.cloneElement(component, {visible: false}), div)
        ReactDOM.unmountComponentAtNode(div)
        div.remove()
    }
    const component = <CitySelectorDialog visible={true} onClose={onClose}>{content}</CitySelectorDialog>
    const div = document.createElement('div')
    document.body.appendChild(div)
    ReactDOM.render(component, div)
    return onClose
}
```
所以重构为
```
const xxx = (content: ReactNode | ReactFragment, buttons?: Array<ReactElement>) => {
    const onClose = () => {
        ReactDOM.render(React.cloneElement(component, {visible: false}), div)
        ReactDOM.unmountComponentAtNode(div)
        div.remove()
    }
    // onClose 无法访问到 setX,所以无法直接切换 visible 状态，因此采用更新容器 div 内部组件的方式实现关闭 CitySelectorDialog
    const component = <CitySelectorDialog
        visible={true}
        onClose={onClose}
        buttons={buttons}>{content}</CitySelectorDialog>
    const div = document.createElement('div')
    document.body.appendChild(div)
    ReactDOM.render(component, div)
    return onClose
}

const alert = (content: String) => {
    xxx(content)
}

const confirm = (content: String, yes?: Function, no?: Function) => {

    const onYes = () => {
        onClose()
        yes && yes()
    }
    const onNo = () => {
        onClose()
        no && no()
    }

    const onClose=xxx(content,[<button onClick={onYes}>yes</button>, <button onClick={onNo}>no</button>])
}

const modal = (content: ReactNode | ReactFragment) => {
    const onClose=xxx(content)
    return onClose
}
```

> react 的组件默认不接受 style,ClassName, 除非继承 HTMLAttributes，这样 style,ClassName 可作为props 传递。继承来的 style/clsssName 实际被放置到组件顶层元素上
> vue 的组件也默认不接受 style,ClassName。


#### 受控组件和非受控组价
```
UI=f(state)
```
* 受控组件
> react 哲学：UI=f(state)。state 不变，则 UI 不变
```
// value 难写（onChange=>setName）易读（name）
const [name,setName]=useState('libai')
<input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/>
```
* 非受控组件
> 不受 react 控制
```
// value 易写（用户直接输入）难读（必须用 useRef）
const refInput=useRef(null)
setInterval(()=>{
    console.log(refInput&&refInput);
},3000)
<input type="text" defaultValue='libai' ref={refInput}/>
```
 
> react 和 vue 都认为，props 的修改只能由父组件执行，vue 通过事件机制/sync 实现。react 通过回调函数与作用域原理实现。


#### 避免出现 class 包括 wheel-button-undefined 
* 出现原因:没有传递 level,但组件内部的渲染没有对此种情况做判断
```
// button.example.tsx
<Button >按钮</Button>
```
```
// button.tsx
interface buttonProps extends  ButtonHTMLAttributes<HTMLButtonElement> {
    level?:'important'|'danger'|'normal'
}

const extraName=classes(scopedClass(`${level}`),className)
return (
       <button className={scopedClass(``,extraName)} {...rest}>{props.children}</button>
)
```
解决方法1:加判断，只有传递了 level 的情况下才执行相应后续操作
```
// button.tsx
interface buttonProps extends  ButtonHTMLAttributes<HTMLButtonElement> {
    level?:'important'|'danger'|'normal'
}
const Button: React.FunctionComponent<buttonProps> = (props) => {
    const {className,level,...rest}=props

    const extraName=classes(props.level&& scopedClass(`${level}`),className)
    return (
            <button className={scopedClass(``,extraName)} {...rest}>{props.children}</button>
    )
}
```
解决方法2:设置默认 level,即保证 props.level 一定存在



#### 阅读源码 webStorm 快捷键
> 声明不看，赋值不看

* back
> 回到刚才看的地方
* collapse all
> 折叠代码 

#### TS
```
document.addEventListener('mousemove',onMouseMoveBar)

const onMouseDownBar:MouseEventHandler<HTMLDivElement>=(e)=>{
}
```
> 报错: Type '(event: MouseEvent<DocumentEvent, MouseEvent>) => void' is not assignable to type 'EventListener'.

* 解决办法:只写参数类型
```
document.addEventListener('mousemove',onMouseMoveBar)
const onMouseMoveBar=(e:MouseEvent)=>{
}
```


#### [我们无法在 mousemove 的回调函数中获取到 barScrollTop](https://stackoverflow.com/questions/55126487/function-not-correctly-reading-updated-state-from-react-hook-state) 


#### [Warning: Received `false` for a non-boolean attribute. How do I pass a boolean for a custom boolean attribute?](https://stackoverflow.com/questions/49784294/warning-received-false-for-a-non-boolean-attribute-how-do-i-pass-a-boolean-f)


#### useRef
1. useRef 改变之后立即得到更新后的值;但 useSatate 必须在重新 render 之后才能读到（useEffect,mousemove 回调函数内就读不到，但是 touchMove 内竟然能读到实时更新后的值我丢）
2. 跨函数变量，应该用 useRef（因为 useRef 能保证在 A 中改变后，在 B 中立即读到更新后的值）
```

``` 
3. 作为 DOM 相关属性，应该用 useState（因为 DOM 节点的更新必然经过重新render，useState 能满足）
```
const [barScrollTop,setBarScrollTop]=useState(0)
```
```
<div style={{top: barScrollTop}}>
</div>
```

#### 防抖（debounce）
```
const onScrollContent: UIEventHandler = (e) => {
    setContentScrollTop(e.currentTarget.scrollTop)

    // 不可拖拽，则只在 scroll 期间显示滚动条
    if(!(props.a===1)){
        console.log(1);
        setBarVisible(true)
        let timerId=window.setTimeout(()=>{
            // 停止 scroll 三秒后，barVisible 变为 false
            setBarVisible(false)
            window.clearTimeout(timerId)
        },3000)
    }
}
```

#### TS 
```
<div onTouchStart={MyTouchStart}></div>
```
```
// 怎么知道 MyTouchMove 的类型?
const MyTouchMove=()=>{
}
```
解决方法:因为 MyTouchMove 是赋值给 onTouchStart 的，所以 ctrl 单机查看 onTouchStart 的类型即可


#### 判断设备是不是触屏端
```
const isTouchDevice = 'ontouchstart' in document.documentElement
```

#### 隐藏移动端原生滚动条
```
&::-webkit-scrollbar{
  display: none;
}
```

#### 各类 scss 文件
* example.scss
> 供 example.tsx 引用
* index.scss
> lib 引用 scss 文件
* _helper.scss
> 存储 scss 变量
* layout.example.scss
> 供 layout.example.1tsx 引用

#### 各个组件知识点
* CitySelectorDialog
    * 高阶函数 scopedClass:用于添加 class 前缀
    * Fragment:效果同 vue 的 template
    * 【重构】公共函数 makeDialog
    * 动态生成组件:ReactDOM.render
     ```
      const component = <CitySelectorDialog
          visible={true}
          onClose={onClose}
          buttons={buttons}>{content}</CitySelectorDialog>
      const div = document.createElement('div')
      document.body.appendChild(div)
      ReactDOM.render(component, div)
    ```
    * 访问函数内部变量的 API
      ```
      // api:访问函数内部变量
      function fn(){
          let visible=false
          return ()=>{
              return visible
          }
      }
      
      const api=fn()
      
      console.log(api())
      ```
    * props.children:等效于 vue 的 slot
    * ReactElement（只接受节点，且不接受节点数组）ReactNode（除了节点，节点数组，还接受字符串，数字）
* Layout
    * 让组件接受 className,style:props 继承 React.HTMLAttributes<HTMLElement>    
    ```
    interface IProps extends React.HTMLAttributes<HTMLElement>{
    }
    ```
    ```
    <Layout className={'user-layout1 user-layout2'}>
    ```
* Scroll
    * useRef:如果希望某个变量（非 state）不随重新 render 而被重置，则应该使用 useRef  
  
  