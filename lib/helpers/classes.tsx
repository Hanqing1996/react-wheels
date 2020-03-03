// className 包含多个 class
const classes=(...names:(string|undefined)[])=>{ // ...names:string[] 表示参数为多个字符串,解构为数组 names
    return names.filter(Boolean).join(' ')
}

// className 添加前缀
const scopedClassMaker=(prefix:String)=>{
    return function (name?:String) {
        return [prefix,name].filter(Boolean).join('-')
    }
}

export {classes,scopedClassMaker}