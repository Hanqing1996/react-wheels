import React,{Fragment} from 'react'
import ShowCode from '../showCode'
import CitySelectorExample from "../examples/citySelector/citySelector.example";

const example=require('!!raw-loader!../examples/citySelector/citySelector.example.tsx')

const citySelectorCode: React.FunctionComponent = () => {
    return (
        <Fragment>
            <ShowCode code={example.default}>
                <CitySelectorExample/>
            </ShowCode>
        </Fragment>
    )
}

export default citySelectorCode