import React from 'react'
import {scopedClassMaker} from "../../helpers/classes";

interface IProps extends React.HTMLAttributes<HTMLElement>{
}

const scopedClass = scopedClassMaker('wheel-layout')

const Aside: React.FunctionComponent<IProps> = () => {
    return (
        <div className={scopedClass('aside')}>aside</div>
    )
}

export default Aside