import * as React from 'react'
import {alert} from "../components/dialog/dialog";

export default function () {
    return (
        <div>
            <button onClick={() => {
                alert('alert content')
            }} style={{display: "block"}}>alert
            </button>
        </div>
    )
}
