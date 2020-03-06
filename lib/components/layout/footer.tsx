import React, {ReactNode} from 'react'
import {scopedClassMaker} from "../../helpers/classes";

interface IProps extends React.HTMLAttributes<HTMLElement>{
    children:ReactNode
}

const scopedClass = scopedClassMaker('wheel-layout')
const Footer: React.FunctionComponent<IProps> = (props) => {
    const {className,...rest}=props

    return (
        <div className={scopedClass('footer',className)} {...rest}>{props.children}</div>
    )
}

export default Footer