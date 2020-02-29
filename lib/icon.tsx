import React from 'react'
import './icon/importAlllcons'
import './icon.scss'

interface  iconProps {
    name:String
}

const Icon:React.FunctionComponent<iconProps>=(props)=>{


    return(
        <div>
            <svg className={'icon'}>
                <use xlinkHref={`#${props.name}`}></use>
            </svg>
        </div>
    )
}

Icon.displayName='Icon'

export  default Icon