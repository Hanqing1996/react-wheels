import React, {HTMLAttributes} from 'react'
import {scrollbarWidth} from './scrollbar-width'

import {scopedClassMaker} from "../../helpers/classes";
import './scroll.scss'

interface ScrollProps extends HTMLAttributes<HTMLDivElement> {

}

const scrollClass = scopedClassMaker('wheel-scroll')
const Scroll: React.FunctionComponent<ScrollProps> = (props) => {

    const {className, children, ...rest} = props

    return (
        <div className={scrollClass('', className)} {...rest}>
            <div className={scrollClass('inner')} style={{right:-scrollbarWidth()}}>
                {props.children}
            </div>
        </div>
    )
}

export default Scroll