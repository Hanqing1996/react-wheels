import React,{Fragment} from 'react'
import ShowCode from '../showCode'
import IconExample from "../examples/icon/icon.example";

const example=require('!!raw-loader!../examples/icon/icon.example.tsx')

const IconCode: React.FunctionComponent = () => {
    return (
        <Fragment>
            <ShowCode code={example.default}>
                <IconExample/>
            </ShowCode>
        </Fragment>
    )
}

export default IconCode