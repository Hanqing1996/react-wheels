import * as React from 'react'
import {confirm} from "../../components/dialog/dialog";

export default function () {
    return (
        <div>
            <button onClick={() => {
                confirm('confirm content', () => {
                    console.log('yes')
                }, () => {
                    console.log('no')
                })
            }} style={{display: "block"}}>confirm
            </button>
        </div>
    )
}
