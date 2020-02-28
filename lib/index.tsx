import * as React from 'react'
import * as ReactDOM from 'react-dom'

interface IProps {
    Message:String
}

interface IState {
    n:Number
}

class App extends React.Component<IProps, IState>{
    static defaultProps={
        Message:'ji'
    }
    constructor(props:IProps) {
        super(props);
        this.state={
            n:1
        }
    }
    render(){
        return(
            <div>
                {this.props.Message}
                {this.state.n}
            </div>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))