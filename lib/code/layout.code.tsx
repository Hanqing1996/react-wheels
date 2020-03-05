import React,{Fragment} from 'react'
import ShowCode from '../showCode'
import {LayoutExample1,LayoutExample2,LayoutExample3,LayoutExample4} from "../examples/layout/exportLayouts";

const example1 = require('!!raw-loader!../examples/layout/layout.example1.tsx')
const example2 = require('!!raw-loader!../examples/layout/layout.example2.tsx')
const example3 = require('!!raw-loader!../examples/layout/layout.example3.tsx')
const example4 = require('!!raw-loader!../examples/layout/layout.example4.tsx')

const LayoutCode: React.FunctionComponent = () => {
    return (
        <Fragment>
            <ShowCode code={example1.default}>
                <LayoutExample1/>
            </ShowCode>
            <ShowCode code={example2.default}>
                <LayoutExample2/>
            </ShowCode>
            <ShowCode code={example3.default}>
                <LayoutExample3/>
            </ShowCode>
            <ShowCode code={example4.default}>
                <LayoutExample4/>
            </ShowCode>
        </Fragment>
    )
}

export default LayoutCode