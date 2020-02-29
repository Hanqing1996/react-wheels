import * as React from 'react'
import * as ReactDOM from 'react-dom'
import  Icon from './components/icon/icon'

const fn=(event: React.MouseEvent<SVGSVGElement, MouseEvent>)=>{
    console.log(event)
}

ReactDOM.render(<Icon name={'movie'} onClick={fn} classNames={['nameA','nameB',undefined,'nameC']}/>,document.getElementById('root'))