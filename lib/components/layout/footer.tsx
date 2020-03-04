import React, {ReactNode} from 'react'
import {scopedClassMaker} from "../../helpers/classes";

interface IProps extends React.HTMLAttributes<HTMLElement>{
    children:ReactNode
}

const scopedClass = scopedClassMaker('wheel-layout')
const Footer: React.FunctionComponent<IProps> = (props) => {

    const options=props.className?{extra:props.className}:undefined

    return (
        <div className={scopedClass('footer',options)}>{props.children}</div>
    )
}

export default Footer