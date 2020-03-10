import React, {Fragment, useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import './citySelector.scss'
import Dialog from "./citySelectorDialog";
import pinyin from 'tiny-pinyin';
import {C} from './context'


interface CitySelectorProps{
    onChange:(cityName:string)=>void,
    dataSource:string[]
}

const CitySelector: React.FunctionComponent<CitySelectorProps> = (props) => {

    const [dialogVisible, setDialogVisible] = useState(true)
    const [cityMap,setCityMap]=useState<{[key:string]:string[]}>({})

    useEffect(()=>{
        const map:{[key:string]:string[]}={}
        props.dataSource.map((city)=>{
            const py=pinyin.convertToPinyin(city)
            const index=py[0]
            map[index]=map[index]||[]
            map[index].push(city)
        })

        setCityMap(map)
    },[])

    const onClick = () => {
        setDialogVisible(true)
    }

    const onClose = () => {
        setDialogVisible(false)
    }
    const dialog = ReactDOM.createPortal(<Dialog onClose={onClose} dataSource={props.dataSource}/>, document.body)

    return (
        <Fragment>
            <C.Provider value={{ cityMap,onChange:props.onChange}}>
            <div onClick={onClick}>{props.children}</div>
            {dialogVisible && dialog}
            </C.Provider>
        </Fragment>
    )
}


export default CitySelector