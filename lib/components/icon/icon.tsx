import React from 'react'
import '../../helpers/importAllIcons'
import './icon.scss'
import classes from "../../helpers/classes";

interface iconProps extends React.SVGAttributes<SVGElement> {
    name:string
}

const Icon:React.FunctionComponent<iconProps>= ({className,name,...rest})=>{
    return(
        <div>
            <svg className={classes('icon',className)} {...rest}>
                <use xlinkHref={`${name}`}></use>
            </svg>
        </div>
    )
}

Icon.displayName='Icon'

export  default Icon