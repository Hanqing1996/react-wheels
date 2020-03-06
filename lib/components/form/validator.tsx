import {FormValue} from "./form";

interface FormRule {
    key: string,
    pattern?: RegExp,
    required?: boolean,
    minLength?: number
    maxLength?: number
    validator?: {
        name: string,
        newValidate: (data: string) => Promise<unknown>
    }
}

type FormRules = Array<FormRule>

export interface FormErrors {
    [key: string]: string []
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
export const validator = (data: FormValue, rules: FormRules) => {
    let errors: FormErrors = {}

    const addError = (key: string, message: string) => {
        errors[key] = errors[key] === undefined ? [message] : [...errors[key], message]
    }

    // 用rule遍历data
    rules.forEach(rule => {
        let value = data[rule.key]

        if (rule.validator) {
            rule.validator.newValidate(value).then(() => {
            }, () => {
                addError(rule.key, '用户名已存在')
                console.log('异步校验完成,经查询，用户名已存在');
            })
        }

        if (rule.required) {
            if (isEmpty(value)) {
                addError(rule.key, '必填')
            }
        }
        if (rule.minLength) {
            if (!isEmpty(value) && value.length < rule.minLength) {
                addError(rule.key, '太短')
            }
        }
        if (rule.maxLength) {
            if (!isEmpty(value) && value.length > rule.maxLength) {
                addError(rule.key, '太长')
            }
        }
        if (rule.pattern) {
            if (!isEmpty(value) && !rule.pattern.test(value)) {
                addError(rule.key, '格式不正确')
            }
        }

    })
    return errors
}


