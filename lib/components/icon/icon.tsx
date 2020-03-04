import React from 'react'
import '../../helpers/importAllIcons'
import './icon.scss'
import {classes} from "../../helpers/classes";

interface iconProps extends React.SVGAttributes<SVGElement> {
    name:string
}

const Icon:React.FunctionComponent<iconProps>= ({className,name,...rest})=>{
    return(
        <span>
            <svg className={classes('wheel-icon',className)} {...rest}>
                <use xlinkHref={`#${name}`}></use>
            </svg>
        </span>
    )
}

Icon.displayName='Icon'

export  default Icon