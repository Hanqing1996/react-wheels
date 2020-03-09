import React from 'react'
import {scopedClassMaker} from '../../helpers/classes'
import CurrentCity from './currentLocation'

const dialogClass = scopedClassMaker('wheel-citySelector-dialog')

interface DialogPops {
    onClose: () => void
}

const Dialog: React.FunctionComponent<DialogPops> = (props) => {

    return (
        <div className={dialogClass('')} onClick={props.onClose}>
            <header className={dialogClass('header')}>
                <span className={dialogClass('icon')}>&lt;</span>
                <span>选择城市</span>
            </header>
            <CurrentCity></CurrentCity>
            <h2>全部城市</h2>
            <h2  className={dialogClass('cityIndex')}>ABCD...</h2>
            <h2 className={dialogClass('cityList')}>所有城市</h2>
        </div>
    )
}

export default Dialog