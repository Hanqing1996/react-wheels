import React from 'react'

interface  iconProps {
    name:String
}

const Icon:React.FunctionComponent<iconProps>=(props)=>{


    return(
        <div>
            icon
        </div>
    )
}

Icon.displayName='Icon'

export  default Icon