import React,{Fragment} from 'react'
import ShowCode from '../showCode'
import FormExample from "../examples/form/form.example";

const example=require('!!raw-loader!../examples/form/form.example.tsx')

const FormCode: React.FunctionComponent = () => {
    return (
        <Fragment>
            <ShowCode code={example.default}>
                <FormExample/>
            </ShowCode>
        </Fragment>
    )
}

export default FormCode