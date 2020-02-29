import React from 'react'
import './icon/importAlllcons'

interface  iconProps {
    name:String
}

const Icon:React.FunctionComponent<iconProps>=(props)=>{


    return(
        <div>
            <svg>
                <use xlinkHref={`#${props.name}`}></use>
            </svg>
        </div>
    )
}

Icon.displayName='Icon'

export  default Icon