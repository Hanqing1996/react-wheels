import React, {ReactNode} from 'react'
import {scopedClassMaker} from "../../helpers/classes";

interface IProps extends React.HTMLAttributes<HTMLElement>{
    children:ReactNode
}

const scopedClass = scopedClassMaker('wheel-layout')
const Header: React.FunctionComponent<IProps> = (props) => {

    return (
        <div className={scopedClass('header',props.className)}>{props.children}</div>
    )
}

export default Header