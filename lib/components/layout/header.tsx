import React from 'react'
import {scopedClassMaker} from "../../helpers/classes";

const scopedClass = scopedClassMaker('wheel-layout')
const Header: React.FunctionComponent = () => {
    return (
        <div className={scopedClass('header')}>header</div>
    )
}

export default Header