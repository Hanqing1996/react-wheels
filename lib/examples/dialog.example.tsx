import * as React from 'react'
import Dialog, {alert, confirm, modal} from "../components/dialog/dialog";
import {useState} from "react";


export default function () {
    const [x, setX] = useState(false)

    return (
        <div>
            <div>
                <Dialog visible={x} buttons={
                    [<button onClick={() => {
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
            <div>
                <button onClick={() => {
                    alert('alert content')
                }} style={{display: "block"}}>alert
                </button>
                <button onClick={() => {
                    confirm('confirm content', () => {
                        console.log('yes')
                    }, () => {
                        console.log('no')
                    })
                }} style={{display: "block"}}>confirm
                </button>

                <div>
                    <button onClick={() => {

                        const onClose=modal(<h1>你好 <button onClick={()=>{onClose();}}>close</button></h1>)
                    }}>modal
                    </button>
                </div>
            </div>
        </div>
    )
}
