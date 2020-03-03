import React from 'react'
import {scopedClassMaker} from "../../helpers/classes";

const scopedClass = scopedClassMaker('wheel-layout')
const Content: React.FunctionComponent = () => {
    return (
        <div className={scopedClass('content')}>content</div>
    )
}

export default Content