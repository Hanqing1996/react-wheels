import * as React from 'react'
import {modal} from "../../components/dialog/dialog";

export default function () {
    return (
        <div>
            <button onClick={() => {

                const onClose = modal(<h1>你好 <button onClick={() => {
                    onClose();
                }}>close</button></h1>)
            }}>modal
            </button>
        </div>
    )
}