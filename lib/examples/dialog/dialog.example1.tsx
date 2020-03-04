import * as React from 'react'
import Dialog from "../../components/dialog/dialog";
import {useState} from "react";

export default function () {
    const [x, setX] = useState(false)

    return (
        <div>
            <Dialog visible={x} buttons={
                [<button  onClick={() => {
                    setX(!x)
                }}>ok</button>,
                    <button onClick={() => {
                        setX(!x)
                    }}>cancel</button>]}

                    onClose={() => setX(!x)}
                    maskClosable={true}>
                <div>content</div>
            </Dialog>
            <button onClick={() => setX(!x)}>trigger</button>
        </div>
    )
}
