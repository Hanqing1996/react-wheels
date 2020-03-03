import React, {ReactElement} from 'react'
import {scopedClassMaker} from "../../helpers/classes";
import './layout.scss'

interface IProps extends React.HTMLAttributes<HTMLElement>{
    // 接受节点或节点数组
    children:ReactElement|Array<ReactElement>
}

const scopedClass = scopedClassMaker('wheel-layout')

const Layout: React.FunctionComponent<IProps> = (props) => {

    const hasSider=(props.children as Array<ReactElement>).filter(component => component.props.children === 'aside').length

    const extraName=[props.className,hasSider?'layoutHasSider':''].join(' ')
    return (
        <div className={ scopedClass('',props.className?{extra:extraName}:undefined)}>
            {props.children}
        </div>
    )
}

export default Layout