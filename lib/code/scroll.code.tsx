import React,{Fragment} from 'react'
import ShowCode from '../showCode'
import ScrollExample from "../examples/scroll/scroll.example";

const example=require('!!raw-loader!../examples/scroll/scroll.example.tsx')

const FormCode: React.FunctionComponent = () => {
    return (
        <Fragment>
            <ShowCode code={example.default}>
                <ScrollExample/>
            </ShowCode>
        </Fragment>
    )
}

export default FormCode