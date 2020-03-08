// 返回当前浏览器下，竖直滚动条宽度
export function scrollbarWidth() {
    const box = document.createElement('div')
    let boxStyle = box.style
    boxStyle.position = 'absolute'
    boxStyle.top = '-9999px'
    boxStyle.left = '-9999px'
    boxStyle.width = '100px'
    boxStyle.height = '100px'
    boxStyle.overflow = 'scroll'

    document.body.appendChild(box)

    return box.offsetWidth - box.clientWidth
}