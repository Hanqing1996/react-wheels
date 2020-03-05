import React, {ButtonHTMLAttributes} from 'react'
import {scopedClassMaker} from '../../helpers/classes'
import './button.scss'

const scopedClass = scopedClassMaker('wheel-button')

interface buttonProps extends  ButtonHTMLAttributes<HTMLButtonElement> {

}


const Button: React.FunctionComponent<buttonProps> = (props) => {
    return (
            <button className={scopedClass('')}>{props.children}</button>
    )
}

export default Button