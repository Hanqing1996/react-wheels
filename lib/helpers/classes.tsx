// className 包含多个 class
const classes=(...names:(string|undefined)[])=>{ // ...names:string[] 表示参数为多个字符串,解构为数组 names
    return names.filter(Boolean).join(' ')
}

// className 添加前缀
interface Options {
    extra:String
}

/***
 * 用于添加前缀,并接受不加前缀的 className
 * @param prefix:
 * @param options
 */
const scopedClassMaker=(prefix?:String)=>{
        return function (name:String,options?:Options) {
            const extraName = options && options.extra
            const classWithPrefix = [prefix, name].filter(Boolean).join('-')
            return [classWithPrefix,extraName].join(' ')
        }
}

export {classes,scopedClassMaker}


