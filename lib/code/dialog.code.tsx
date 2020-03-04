import React from 'react'
import ShowCode from '../showCode'
import {DialogExample1,DialogExample2,DialogExample3,DialogExample4} from "../examples/dialog/exportDialogs";

const code1 = require('!!raw-loader!../examples/dialog/dialog.example1.tsx').default
const code2 = require('!!raw-loader!../examples/dialog/dialog.example2.tsx').default
const code3 = require('!!raw-loader!../examples/dialog/dialog.example3.tsx').default
const code4 = require('!!raw-loader!../examples/dialog/dialog.example4.tsx').default

const DialogCode: React.FunctionComponent = () => {
    return (
        <div>
            <ShowCode code={code1}>
                <DialogExample1/>
            </ShowCode>
            <ShowCode code={code2}>
                <DialogExample2/>
            </ShowCode>
            <ShowCode code={code3}>
                <DialogExample3/>
            </ShowCode>
            <ShowCode code={code4}>
                <DialogExample4/>
            </ShowCode>
        </div>
    )
}

export default DialogCode