import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {useState} from "react";

interface IProps {
    Message?:String
}

interface IState {
    n:Number
}

const App:React.FunctionComponent<IProps>=(props:IProps)=>{
    const [n:Number,setN:Function]=useState(1)
        return(
            <div>
                {props.Message}
            </div>
        )
}

ReactDOM.render(<App Message={'hi'}/>,document.getElementById('root'))