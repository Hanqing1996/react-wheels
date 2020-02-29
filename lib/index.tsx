import * as React from 'react'
import * as ReactDOM from 'react-dom'
import  Icon from './components/icon/icon'

const fn=(event: React.MouseEvent<SVGElement, MouseEvent>)=>{
    console.log(event)
}

ReactDOM.render(<Icon name={'movie'} onClick={fn} className={'otherName'}/>,document.getElementById('root'))