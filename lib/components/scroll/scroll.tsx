import React, {HTMLAttributes, MouseEventHandler, UIEventHandler, useEffect, useRef, useState} from 'react'
import {scrollbarWidth} from './scrollbar-width'

import {scopedClassMaker} from "../../helpers/classes";
import './scroll.scss'

interface ScrollProps extends HTMLAttributes<HTMLDivElement> {
    a:number
}

const scrollClass = scopedClassMaker('wheel-scroll')
const Scroll: React.FunctionComponent<ScrollProps> = (props) => {

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

    // mounted
    useEffect(() => {

        setBarVisible(props.a===1)
    }, [])

    useEffect(() => {
        if(barVisible){
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
        }else {
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
        if(!(props.a===1)){
            setBarVisible(true)
            window.setTimeout(()=>{
                setBarVisible(false)
            },3000)
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

    const {className, children, ...rest} = props

    return (
        <div className={scrollClass('', className)} {...rest}>
            <div ref={refContent} className={scrollClass('inner')} style={{right: -scrollbarWidth()}}
                 onScroll={onScrollContent}>
                {props.children}
            </div>
            {barVisible ? <div ref={refTrack} className={scrollClass('track')}>
                <div ref={refBar} className={scrollClass('bar')} style={{top: barScrollTop}}
                     onMouseDown={onMouseDownBar}>
                </div>
            </div> : null}
        </div>
    )
}

export default Scroll