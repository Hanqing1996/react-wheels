import React, {ReactElement} from 'react'
import {scopedClassMaker} from "../../helpers/classes";
import Aside from "./aside";
import './layout.scss'

export {default as Aside} from './aside'
export {default as Footer} from './footer'
export {default as Header} from './header'
export {default as Content} from './content'


interface IProps extends React.HTMLAttributes<HTMLElement> {
    // 接受节点或节点数组
    children: ReactElement | Array<ReactElement>
}

const scopedClass = scopedClassMaker('wheel-layout')

const Layout: React.FunctionComponent<IProps> = (props) => {

    const hasSider = (props.children as Array<ReactElement>).filter(component => component.type === Aside).length
    const extraName = [props.className, hasSider ? 'layoutHasSider' : ''].join(' ')

    return (
        <div className={scopedClass('', extraName)}>
            {props.children}
        </div>
    )
}

export default Layout
