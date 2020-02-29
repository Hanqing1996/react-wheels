// ...names:string[] 表示参数为多个字符串
function classes(...names:(string|undefined)[]) {
    return names.filter(Boolean).join(' ')
}

export default classes