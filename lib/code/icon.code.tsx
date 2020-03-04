import React from 'react'
import ShowCode from '../showCode'
import IconExample from "../examples/icon.example";

const example=require('!!raw-loader!../examples/icon.example.tsx')

const IconCode: React.FunctionComponent = () => {
    return (
        <div>
            <ShowCode code={example.default}>
                <IconExample/>
            </ShowCode>
        </div>
    )
}

export default IconCode