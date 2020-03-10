import React, {useContext} from 'react'
import {scopedClassMaker} from '../../helpers/classes'
import CurrentCity from './currentLocation'
import {C} from './context'

const dialogClass = scopedClassMaker('wheel-citySelector-dialog')

interface DialogPops {
    onClose: () => void
    dataSource: string[]
}

const Dialog: React.FunctionComponent<DialogPops> = (props) => {


    const {cityMap,onChange} = useContext(C)

    const indexList = Object.keys(cityMap).sort()
    const cityList = Object.entries(cityMap).sort((a, b) => a[0].charCodeAt(0) - b[0].charCodeAt(0))

    return (
        <div className={dialogClass('')}>
            <header className={dialogClass('header')}>
                <span className={dialogClass('icon')} onClick={props.onClose}>&lt;</span>
                <span>选择城市</span>
            </header>
            <CurrentCity></CurrentCity>
            <h2>全部城市</h2>

            <ol className={dialogClass('cityIndex')}>
                {indexList.map(letter => <li key={letter}>{letter}</li>)}
            </ol>
            <div className={dialogClass('cityList')}>所有城市</div>
            {cityList.map(([letter, list]) => {
                return (
                    <div key={letter} className={dialogClass('citysBlock')}>
                        <h4 className={dialogClass('letter')}>{letter}</h4>
                        {list.map(city =>
                            <div key={city} className={dialogClass('city')} onClick={()=>{onChange(city)}}>{city}</div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default Dialog