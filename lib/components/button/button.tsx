import React, {ButtonHTMLAttributes} from 'react'
import {scopedClassMaker,classes} from '../../helpers/classes'
import './button.scss'

const scopedClass = scopedClassMaker('wheel-button')

interface buttonProps extends  ButtonHTMLAttributes<HTMLButtonElement> {
    level?:'important'|'danger'|'normal'
}


const Button: React.FunctionComponent<buttonProps> = (props) => {
    const {className,level,...rest}=props

    const extraName=classes(scopedClass(`${level}`),className)
    return (
            <button className={scopedClass(``,extraName)} {...rest}>{props.children}</button>
    )
}
Button.defaultProps={
    level:'normal'
}

export default Button