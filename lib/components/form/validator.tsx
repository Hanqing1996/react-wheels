import {FormValue} from "./form";

interface FormRule {
    key: string,
    pattern?: RegExp,
    required?: boolean,
    minLength?: number
    maxLength?: number
    validator?: {
        name: string,
        newValidate: (data: string) => Promise<any>
    }
}

type FormRules = Array<FormRule>

export interface FormErrors {
    [key: string]: Promise<any> []
}

// 判断 value 是否存在
const isEmpty = (value: any) => value === undefined || value === null || value === ''
// // flat:拍平多维数组（二维->一维）
// const flat=(array:Array<any>)=>{
//     let result:Array<any>=[]
//     array.forEach((item:any)=> {
//         if (item instanceof Array) {
//             result.push(...item)
//         } else {
//             result.push(item)
//         }
//     })
//     return result
// }

const getPromise = (message: string) => {
    return new Promise((resolve, reject) => {
        resolve(message)
    })
}

export const validator = (data: FormValue, rules: FormRules,callback:(result:FormErrors)=>void):void => {
    let errors: FormErrors = {}

    const addError = (key: string, verifyPromise: Promise<any>) => {
        errors[key] = errors[key] === undefined ? [verifyPromise] : [...errors[key], verifyPromise]
    }

    // 用rule遍历data
    rules.forEach(rule => {
        let value = data[rule.key]

        if (rule.validator) {
            addError(rule.key, rule.validator.newValidate(value))
        }

        if (rule.required) {
            if (isEmpty(value)) {
                addError(rule.key, getPromise('必填'))
            }
        }
        if (rule.minLength) {
            if (!isEmpty(value) && value.length < rule.minLength) {
                addError(rule.key, getPromise('太短'))
            }
        }
        if (rule.maxLength) {
            if (!isEmpty(value) && value.length > rule.maxLength) {
                addError(rule.key, getPromise('太长'))
            }
        }
        if (rule.pattern) {
            if (!isEmpty(value) && !rule.pattern.test(value)) {
                addError(rule.key, getPromise('格式不正确'))
            }
        }

    })

    let temp: FormErrors = {}
    const sum: Number = Object.keys(errors).length
    Object.keys(errors).map((key, index) => {

        temp[key] = []
        Promise.all(errors[key]).then((info) => {
            temp[key] = [...temp[key], ...info].filter(Boolean)
            if (sum === (index + 1)) {
                callback(temp)
            }
        })
    })
}


