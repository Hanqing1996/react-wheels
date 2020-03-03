import React from 'react'
import {scopedClassMaker} from "../../helpers/classes";

const scopedClass = scopedClassMaker('wheel-layout')

const Aside: React.FunctionComponent = () => {
    return (
        <div className={scopedClass('aside')}>aside</div>
    )
}

export default Aside