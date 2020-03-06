import React, {ReactNode} from 'react'
import {scopedClassMaker} from "../../helpers/classes";

interface IProps extends React.HTMLAttributes<HTMLElement>{
    children:ReactNode
}
const scopedClass = scopedClassMaker('wheel-layout')

const Aside: React.FunctionComponent<IProps> = (props) => {
    const {className,...rest}=props
    return (
        <div className={scopedClass('aside',className)} {...rest}>{props.children}</div>
    )
}

export default Aside