import React from 'react'
import ShowCode from '../showCode'
import LayoutExample1 from "../examples/layout.example1";
import LayoutExample2 from "../examples/layout.example2";
import LayoutExample3 from "../examples/layout.example3";
import LayoutExample4 from "../examples/layout.example4";

const example1 = require('!!raw-loader!../examples/layout.example1.tsx')
const example2 = require('!!raw-loader!../examples/layout.example2.tsx')
const example3 = require('!!raw-loader!../examples/layout.example3.tsx')
const example4 = require('!!raw-loader!../examples/layout.example4.tsx')

const LayoutCode: React.FunctionComponent = () => {
    return (
        <div>
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
        </div>
    )
}

export default LayoutCode