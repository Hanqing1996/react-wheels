import React from 'react'
import './icon/importAlllcons'
import './icon.scss'
import classes from "./helpers/classes";

interface iconProps extends React.SVGAttributes<SVGSVGElement> {
    name:string,
    classNames:(string|undefined)[]
}

const Icon:React.FunctionComponent<iconProps>=(props)=>{
    const {classNames,...rest}=props
    return(
        <div>
            <svg className={classes('icon',...classNames)  } {...rest}>
                <use xlinkHref={`#${props.name}`}></use>
            </svg>
        </div>
    )
}

Icon.displayName='Icon'

export  default Icon