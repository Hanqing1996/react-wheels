import React,{Fragment} from 'react'
import ShowCode from '../showCode'
import ButtonExample from "../examples/button/button.example";

const example=require('!!raw-loader!../examples/button/button.example.tsx')

const ButtonCode: React.FunctionComponent = () => {
    return (
        <Fragment>
            <ShowCode code={example.default}>
                <ButtonExample/>
            </ShowCode>
        </Fragment>
    )
}

export default ButtonCode