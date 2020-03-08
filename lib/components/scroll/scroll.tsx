import React, {HTMLAttributes, MouseEventHandler, UIEventHandler, useEffect, useRef, useState} from 'react'
import {scrollbarWidth} from './scrollbar-width'

import {scopedClassMaker} from "../../helpers/classes";
import './scroll.scss'

interface ScrollProps extends HTMLAttributes<HTMLDivElement> {

}

const scrollClass = scopedClassMaker('wheel-scroll')
const Scroll: React.FunctionComponent<ScrollProps> = (props) => {

    const [contentScrollTop,setContentScrollTop]=useState(0)
    const [barScrollTop,setBarScrollTop]=useState(0)

    const rateRef=useRef<number>(1)
    const draggingRef=useRef<boolean>(false)
    const firstYRef=useRef<number>(0)
    const alreadyYRef=useRef<number>(0)
    const maxScrollTop=useRef<number>(0)

    const refContent=useRef<HTMLDivElement>(null)
    const refTrack=useRef<HTMLDivElement>(null)
    const refBar=useRef<HTMLDivElement>(null)

    // mounted
    useEffect(()=>{

        document.addEventListener('mouseup',onMouseUpBar)
        document.addEventListener('mousemove',onMouseMoveBar)

        const contentHeight=refContent.current!.scrollHeight
        const trackHeight=refTrack.current!.getBoundingClientRect().height
        const barHeight=refBar.current!.getBoundingClientRect().height
        const barScrollHeight=trackHeight-barHeight
        maxScrollTop.current=barScrollHeight

        rateRef.current=barScrollHeight/(contentHeight!-trackHeight)

        return ()=>{
            document.removeEventListener('mouseup',onMouseUpBar)
            document.removeEventListener('mousemove',onMouseMoveBar)
        }

    },[])
    
    // 根据 content 下滑高度，动态计算 bar 下滑高度。
    useEffect(()=>{

        setBarScrollTop((contentScrollTop) *rateRef.current)

    },[contentScrollTop])

    const onScroll:UIEventHandler<HTMLDivElement> =(e)=>{
        setContentScrollTop(e.currentTarget.scrollTop)
    }

    const onMouseDownBar:MouseEventHandler<HTMLDivElement>=(e)=>{
        console.log('onMouseDownBar 开始执行');
        draggingRef.current=true
        firstYRef.current=e.clientY
    }
    const onMouseMoveBar=(e:MouseEvent)=>{
        console.log('onMouseMoveBar 开始执行');
        if(draggingRef.current){
            const delta=e.clientY-firstYRef.current
            if(delta+alreadyYRef.current<maxScrollTop.current && delta+alreadyYRef.current>0){
                setBarScrollTop(delta+alreadyYRef.current)
            }
            console.log('试图移动 bar')
        }
    }

    const onMouseUpBar=(e:MouseEvent)=>{
        console.log('onMouseUpBar 开始执行');
        draggingRef.current=false
        alreadyYRef.current=barScrollTop
    }

    const {className, children, ...rest} = props

    return (
        <div className={scrollClass('', className)} {...rest}>
            <div ref={refContent} className={scrollClass('inner')} style={{right:-scrollbarWidth()}}
                 onScroll={onScroll}>
                {props.children}
            </div>
            <div ref={refTrack} className={scrollClass('track')}>
                <div ref={refBar} className={scrollClass('bar')} style={{top:barScrollTop}}
                     onMouseDown={onMouseDownBar}>
                </div>
            </div>
        </div>
    )
}

export default Scroll