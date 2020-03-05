import React,{Fragment} from 'react'
import ShowCode from '../showCode'
import InputExample from "../examples/input/input.example";

const example=require('!!raw-loader!../examples/input/input.example.tsx')

const InputCode: React.FunctionComponent = () => {
    return (
        <Fragment>
            <ShowCode code={example.default}>
                <InputExample/>
            </ShowCode>
        </Fragment>
    )
}

export default InputCode