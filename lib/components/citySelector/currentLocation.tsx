import React, {useEffect, useState} from 'react'
import {scopedClassMaker} from '../../helpers/classes'

const scopeClass = scopedClassMaker('wheel-citySelector-dialog')

const CurrentLocation: React.FunctionComponent = () => {
    const [currentCity, setCurrentCity] = useState('')
    useEffect(() => {
        const xhr = new XMLHttpRequest()
        xhr.open('get', 'http://ip-api.com/json/?lang=zh-CN');
        xhr.onload=()=> {
            const string = xhr.responseText;
            const obj = JSON.parse(string);
            const c = obj.city;
            setCurrentCity(c);
        }
        xhr.onerror = () => {
            setCurrentCity('未知');
        };
        xhr.send();
    }, [])

    return (
        <div className={scopeClass('currentCity')}>
            <span>当前城市:{currentCity?currentCity:'加载中'}</span>
        </div>
    )
}

export default CurrentLocation