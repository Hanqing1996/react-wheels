import {FormValue} from "./form";

interface FormRule {
    key: string,
    pattern?: RegExp,
    required?: boolean,
    minLength?: number
    maxLength?:number
}

type FormRules = Array<FormRule>

export interface FormErrors {
    [key: string]: string []
}

// 判断 value 是否存在
const isEmpty = (value: any) => value === undefined || value === null || value === ''

export const validator = (data: FormValue, rules: FormRules): FormErrors => {
    let errors: FormErrors = {}

    const addError = (key: string,message:string) => {
        errors[key]=errors[key] === undefined?[message]:[...errors[key],message]
    }

    // 用rule遍历data
    rules.forEach(rule => {
        let value = data[rule.key]
        if (rule.required) {
            if (isEmpty(value)) {
                addError(rule.key,'必填')
            }
        }
        if (rule.minLength) {
            if (!isEmpty(value) && value.length < rule.minLength) {
                addError(rule.key,'太短')
            }
        }
        if (rule.maxLength) {
            if (!isEmpty(value) && value.length > rule.maxLength) {
                addError(rule.key,'太长')
            }
        }
        if(rule.pattern){
            if(!isEmpty(value) &&!rule.pattern.test(value)){
                addError(rule.key,'格式不正确')
            }
        }

    })
    return errors
}