import React from 'react'
import './icon/importAlllcons'
import './icon.scss'

interface iconProps extends React.SVGAttributes<SVGSVGElement> {
    name:string,
}

const Icon:React.FunctionComponent<iconProps>=(props)=>{


    return(
        <div>
            <svg className={'icon'} {...props}>
                <use xlinkHref={`#${props.name}`}></use>
            </svg>
        </div>
    )
}

Icon.displayName='Icon'

export  default Icon