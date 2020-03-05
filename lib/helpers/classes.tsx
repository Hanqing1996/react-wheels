// className 包含多个 class
const classes=(...names:(string|undefined)[])=>{ // ...names:string[] 表示参数为多个字符串,解构为数组 names
    return names.filter(Boolean).join(' ')
}

/***
 * 用于添加前缀,并接受不加前缀的 className
 * @param prefix:
 * @param className
 */
const scopedClassMaker=(prefix?:String)=>{
        return function (suffix:String,className?:String) {
            const classWithPrefix = [prefix, suffix].filter(Boolean).join('-')
            return [classWithPrefix,className].join(' ')
        }
}

export {classes,scopedClassMaker}


