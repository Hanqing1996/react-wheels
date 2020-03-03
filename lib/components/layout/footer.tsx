import React from 'react'
import {scopedClassMaker} from "../../helpers/classes";

interface IProps extends React.HTMLAttributes<HTMLElement>{
}

const scopedClass = scopedClassMaker('wheel-layout')
const Footer: React.FunctionComponent<IProps> = () => {
    return (
        <div className={scopedClass('footer')}>footer</div>
    )
}

export default Footer