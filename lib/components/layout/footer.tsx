import React from 'react'
import {scopedClassMaker} from "../../helpers/classes";

const scopedClass = scopedClassMaker('wheel-layout')
const Footer: React.FunctionComponent = () => {
    return (
        <div className={scopedClass('footer')}>footer</div>
    )
}

export default Footer