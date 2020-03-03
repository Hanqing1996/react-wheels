import React from 'react'
import {scopedClassMaker} from "../../helpers/classes";
import './layout.scss'

interface IProps extends React.HTMLAttributes<HTMLElement>{
}

const scopedClass = scopedClassMaker('wheel-layout')

const Layout: React.FunctionComponent<IProps> = (props) => {
    console.log(props.className);
    return (
        <div className={ scopedClass('',props.className?{extra:props.className}:undefined)}>
            {props.children}
        </div>
    )
}

export default Layout