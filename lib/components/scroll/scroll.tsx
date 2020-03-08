import React, {HTMLAttributes, UIEventHandler, useEffect, useRef, useState} from 'react'
import {scrollbarWidth} from './scrollbar-width'

import {scopedClassMaker} from "../../helpers/classes";
import './scroll.scss'

interface ScrollProps extends HTMLAttributes<HTMLDivElement> {

}

const scrollClass = scopedClassMaker('wheel-scroll')
const Scroll: React.FunctionComponent<ScrollProps> = (props) => {

    const [contentScrollTop,setContentScrollTop]=useState(0)
    const [barScrollTop,setBarScrollTop]=useState(0)
    const [rate,setRate]=useState(1)

    const refContent=useRef<HTMLDivElement>(null)
    const refTrack=useRef<HTMLDivElement>(null)
    const refBar=useRef<HTMLDivElement>(null)

    // mounted
    useEffect(()=>{
        const contentHeight=refContent.current!.scrollHeight
        const trackHeight=refTrack.current!.getBoundingClientRect().height
        const barHeight=refBar.current!.getBoundingClientRect().height
        const barScrollHeight=trackHeight-barHeight

        setRate(barScrollHeight/(contentHeight!-trackHeight))
    },[])
    
    // 根据 content 下滑高度，动态计算 bar 下滑高度。
    useEffect(()=>{

        setBarScrollTop((contentScrollTop) *rate)

    },[contentScrollTop])

    const onScroll:UIEventHandler<HTMLDivElement> =(e)=>{
        setContentScrollTop(e.currentTarget.scrollTop)
    }

    const {className, children, ...rest} = props

    return (
        <div className={scrollClass('', className)} {...rest}>
            <div ref={refContent} className={scrollClass('inner')} style={{right:-scrollbarWidth()}}
                 onScroll={onScroll}>
                {props.children}
            </div>
            <div ref={refTrack} className={scrollClass('track')}>
                <div ref={refBar} className={scrollClass('bar')} style={{top:barScrollTop}}>
                </div>
            </div>
        </div>
    )
}

export default Scroll