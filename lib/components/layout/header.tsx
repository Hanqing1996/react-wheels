import React from 'react'
import {scopedClassMaker} from "../../helpers/classes";

interface IProps extends React.HTMLAttributes<HTMLElement>{
}

const scopedClass = scopedClassMaker('wheel-layout')
const Header: React.FunctionComponent<IProps> = () => {
    return (
        <div className={scopedClass('header')}>header</div>
    )
}

export default Header