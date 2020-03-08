#### Dialog
* Alert
> 警告消息框
* Confirm
> 确认消息框
* Model
> 提示消息框

* visible 
> 是外来传递的参数，不是内部状态，所以 visible 的状态切换应该由用户自己实现
* buttons
> 按钮数组（ok,cancel...）是外来传递的参数，所以按钮具体做什么（事件）由用户自己实现
* maskClosable
> 点击蒙层是否允许关闭

#### Form
* 支持三种 Layout
> vertical,inline,horizontal

#### Validator
* rules
```
rules=[
    {key: 'username', required: true}
    {key: 'username', minLength: 5,maxLength:10}
    {key: 'email', required: true}
    {key: 'password', pattern: /^[A-Za-z0-9]+$/}
]
```
* data
```
data={
    username:'aassa',
    email:'sddsf123@163.com'
}
```
* errors
> 初始值:{}
```
errors={
    username:['必填']
    email:['格式不正确','太短']
}
```
* errorsDisplay
> error 展示个数（first|all）
* 支持异步校验
1. 这里的异步校验是指 onSubmit 时的异步校验
2. 比如对于 username,注册时"查询用户名是否已存在"就属于异步校验。这里要注意，必须等待所有异步校验完成后才能生成一个统一的 errors。否则同步的校验已经完成并渲染错误情况了，但是异步校验还没完成的尴尬。

#### scroll
* height

