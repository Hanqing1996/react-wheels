import React from 'react'
import '../../helpers/importAlllcons'
import './icon.scss'
import classes from "../../helpers/classes";

interface iconProps extends React.SVGAttributes<SVGSVGElement> {
    name:string,
    classNames:(string|undefined)[]
}

const Icon:React.FunctionComponent<iconProps>= ({classNames,name,...rest})=>{
    return(
        <div>
            <svg className={classes('icon',...classNames)} {...rest}>
                <use xlinkHref={`#${name}`}></use>
            </svg>
        </div>
    )
}

Icon.displayName='Icon'

export  default Icon