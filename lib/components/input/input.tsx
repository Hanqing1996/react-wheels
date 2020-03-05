import React, {InputHTMLAttributes} from 'react'
import {scopedClassMaker} from "../../helpers/classes";

import './input.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{

}
const scopedClass = scopedClassMaker('wheel-input')
const Input: React.FunctionComponent<InputProps> = ({className,...rest}) => {
    return (
        <input type="text" className={scopedClass('',className)} {...rest}/>
    )
}

export default Input