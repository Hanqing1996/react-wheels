import React, {ReactNode} from 'react'
import {scopedClassMaker} from "../../helpers/classes";

interface IProps extends React.HTMLAttributes<HTMLElement>{
    children:ReactNode
}

const scopedClass = scopedClassMaker('wheel-layout')
const Footer: React.FunctionComponent<IProps> = (props) => {
    return (
        <div className={scopedClass('footer',props.className)}>{props.children}</div>
    )
}

export default Footer