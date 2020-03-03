import React from 'react'
import {scopedClassMaker} from "../../helpers/classes";

interface IProps extends React.HTMLAttributes<HTMLElement>{
}
const scopedClass = scopedClassMaker('wheel-layout')
const Content: React.FunctionComponent<IProps> = () => {
    return (
        <div className={scopedClass('content')}>content</div>
    )
}

export default Content