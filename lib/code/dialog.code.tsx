import React from 'react'
import ShowCode from '../showCode'
import DialogExample1 from "../examples/dialog.example1";
import DialogExample2 from "../examples/dialog.example2";
import DialogExample3 from "../examples/dialog.example3";
import DialogExample4 from "../examples/dialog.example4";

const example1 = require('!!raw-loader!../examples/dialog.example1.tsx')
const example2 = require('!!raw-loader!../examples/dialog.example2.tsx')
const example3 = require('!!raw-loader!../examples/dialog.example3.tsx')
const example4 = require('!!raw-loader!../examples/dialog.example4.tsx')

const DialogCode: React.FunctionComponent = () => {
    return (
        <div>
            <ShowCode code={example1.default}>
                <DialogExample1/>
            </ShowCode>
            <ShowCode code={example2.default}>
                <DialogExample2/>
            </ShowCode>
            <ShowCode code={example3.default}>
                <DialogExample3/>
            </ShowCode>
            <ShowCode code={example4.default}>
                <DialogExample4/>
            </ShowCode>
        </div>
    )
}

export default DialogCode