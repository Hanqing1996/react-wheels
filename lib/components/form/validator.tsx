import {FormValue} from "./form";

interface FormRule {
    key: string,
    pattern?: string,
    required?: Boolean,
    minLength?: number
}

type FormRules = Array<FormRule>

interface FormErrors{
    [key: string]:string []
}




//                 rules=[
//                   {key: 'username', required: true}
//                   {key: 'username', minLength: 5,maxLength:10}
//                   {key: 'email', required: true}
//                 ],

//                  data={
//                    username:'aassa',
//                    email:'sddsf123@163.com'
//                  }

//                  errors={
//                      username:['必填']
//                      email:['格式不正确','太短']
//                  }

// 判断 value 是否存在
const isEmpty=(value:any)=>value===undefined||value===null||value===''

export const validator = (data: FormValue, rules: FormRules): FormErrors => {
    let errors:FormErrors= {}
    // 用rule遍历data
    rules.forEach(rule => {
        let value = data[rule.key]
        if (rule.required) {
            if (isEmpty(value)) {
                errors[rule.key]=['必填']
            }
        }
        if(rule.minLength){
            if(value.length<rule.minLength){
                if(errors[rule.key]===undefined){
                    errors[rule.key]=[]
                }
                errors[rule.key].push('太短')
            }
        }


    })
    return errors
}