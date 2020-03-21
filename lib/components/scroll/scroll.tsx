import React, {
    HTMLAttributes,
    MouseEventHandler,
    TouchEventHandler,
    UIEventHandler,
    useEffect,
    useRef,
    useState
} from 'react'
import {scrollbarWidth} from './scrollbar-width'

import {scopedClassMaker} from "../../helpers/classes";
import './scroll.scss'

interface ScrollProps extends HTMLAttributes<HTMLDivElement> {
    // 是否允许拖拽滚动条
    a: number
    onPull?: () => void
}

const scrollClass = scopedClassMaker('wheel-scroll')
const Scroll: React.FunctionComponent<ScrollProps> = (props) => {


    const {className, children, a, onPull, ...rest} = props

    const [contentScrollTop, setContentScrollTop] = useState(0)
    const [barScrollTop, setBarScrollTop] = useState(0)
    const [barVisible, setBarVisible] = useState(false)

    const rateRef = useRef<number>(1)
    const draggingRef = useRef<boolean>(false)
    const firstYRef = useRef<number>(0)
    const firstBarTopRef = useRef<number>(0)
    const maxScrollTop = useRef<number>(0)

    const refContent = useRef<HTMLDivElement>(null)
    const refTrack = useRef<HTMLDivElement>(null)
    const refBar = useRef<HTMLDivElement>(null)

    const timerIdRef = useRef<number | null>(null);


    // mounted
    useEffect(() => {

        setBarVisible(a === 1)
    }, [])

    useEffect(() => {
        if (barVisible) {
            document.addEventListener('mouseup', onMouseUpBar)
            document.addEventListener('mousemove', onMouseMoveBar)
            document.addEventListener('selectstart', onSelect)

            const contentHeight = refContent.current!.scrollHeight
            const trackHeight = refTrack.current!.getBoundingClientRect().height
            const barHeight = refBar.current!.getBoundingClientRect().height
            const barScrollHeight = trackHeight - barHeight
            maxScrollTop.current = barScrollHeight

            rateRef.current = barScrollHeight / (contentHeight! - trackHeight)

            // beforeDestroyed
            return () => {
                document.removeEventListener('mouseup', onMouseUpBar)
                document.removeEventListener('mousemove', onMouseMoveBar)
                document.removeEventListener('selectstart', onSelect)
            }
        } else {
            return
        }

    }, [barVisible])


    // 根据 content 下滑高度，动态计算 bar 下滑高度。
    useEffect(() => {

        setBarScrollTop((contentScrollTop) * rateRef.current)

    }, [contentScrollTop])

    // bar 下滑高度，动态计算 content 下滑高度
    useEffect(() => {
        refContent.current!.scrollTop = barScrollTop / rateRef.current

    }, [barScrollTop])

    const onSelect = (e: Event) => {
        if (draggingRef.current) {
            e.preventDefault()
        }
    }

    const onScrollContent: UIEventHandler = (e) => {

        setContentScrollTop(e.currentTarget.scrollTop)

        // 不可拖拽，则只在 scroll 期间显示滚动条
        if (!(a === 1)) {
            setBarVisible(true)

            if (timerIdRef.current !== null) {
                window.clearTimeout(timerIdRef.current)
            }

            timerIdRef.current = window.setTimeout(() => {
                // 停止 scroll 三秒后，barVisible 变为 false
                setBarVisible(false)
            }, 3000)
        }
    }

    const onMouseDownBar: MouseEventHandler<HTMLDivElement> = (e) => {

        draggingRef.current = true
        firstYRef.current = e.clientY
        firstBarTopRef.current = barScrollTop
    }

    const onMouseMoveBar = (e: MouseEvent) => {
        if (draggingRef.current) {
            const delta = e.clientY - firstYRef.current
            const newBarScrollTop = firstBarTopRef.current + delta
            if (newBarScrollTop < maxScrollTop.current && newBarScrollTop > 0) {
                setBarScrollTop(newBarScrollTop)
            }
        }
    }

    const onMouseUpBar = (e: MouseEvent) => {
        draggingRef.current = false
    }

    const [translateY, setTranslateY] = useState(0)
    const lastY = useRef(0)
    const startFromTop = useRef(false)
    const pulling = useRef(false)

    const onTouchStart: TouchEventHandler = (e) => {

        // 如果是想下拉更新，必须保证以下条件
        if (translateY === 0 && contentScrollTop === 0) {
            console.log('你有下拉更新的资质，但是我得瞧瞧你拉的方向');
            startFromTop.current = true
        }
        lastY.current = e.touches[0].clientY
    }
    const onTouchMove: TouchEventHandler = (e) => {
        let delta = e.touches[0].clientY - lastY.current

        // 从顶端往下拉，证明用户向下拉更新
        if (startFromTop.current && delta > 0) {
            // 更新 translateY
            console.log('嗯，你可以下拉更新，拉吧');
            if (delta + translateY < refContent.current!.scrollHeight * 0.3) {
                setTranslateY(delta + translateY)
                pulling.current = true
            }
        }

        // 在下拉更新过程中，用户又往上拉了
        if (pulling.current && delta < 0) {
            console.log('你咋又往上拉了?');

            // 不让用户上拉过度
            if (delta + translateY > 0) {
                console.log('别往上拉过头啊喂!');
                setTranslateY(delta + translateY)
            }
        }

        // 拉到内容顶端，可能下一步用户会下拉更新，因此将 startFromTop.current 置为 true
        if (contentScrollTop === 0) {
            console.log('你拉到内容顶端了,再往下拉就是下拉更新了')
            startFromTop.current = true
        }

        lastY.current = e.touches[0].clientY
        delta = 0
    }
    const onTouchEnd: TouchEventHandler = (e) => {


        if (pulling.current) {
            onPull && onPull()
            console.log('下拉更新结束，此时用户应该看到更新后的内容')
        }

        // 用户松手，则重置 translateY,startFromTop,pulling.current
        setTranslateY(0)
        startFromTop.current = false
        pulling.current = false
    }

    return (
        <div className={scrollClass('', className)} {...rest}>
            <div ref={refContent} className={scrollClass('inner')}
                 style={{right: -scrollbarWidth(), transform: `translateY(${translateY}px)`}}
                 onScroll={onScrollContent}
                 onTouchStart={onTouchStart}
                 onTouchMove={onTouchMove}
                 onTouchEnd={onTouchEnd}>
                {props.children}
            </div>
            {barVisible ? <div ref={refTrack} className={scrollClass('track')}>
                <div ref={refBar} className={scrollClass('bar')} style={{top: barScrollTop}}
                     onMouseDown={onMouseDownBar}>
                </div>
            </div> : null}
            {
                pulling.current ? <div className={scrollClass('pulling')} style={{height: translateY}}>
                    <span>请求数据中。。。</span>
                </div> : null
            }

        </div>
    )
}

export default Scroll