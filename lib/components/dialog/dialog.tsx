import React, {Fragment, ReactElement, ReactFragment, ReactNode,} from 'react'
import ReactDOM from 'react-dom'
import './dialog.scss'
import Icon from "../icon/icon";
import {scopedClassMaker} from '../../helpers/classes'

interface dialogProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
    visible: Boolean
    buttons?: Array<ReactElement>
    onClose: React.MouseEventHandler<HTMLDivElement>
    maskClosable?: Boolean
}

const scopedClass = scopedClassMaker('wheel-dialog')

const Dialog: React.FunctionComponent<dialogProps> = (props) => {

    const onClickClose: React.MouseEventHandler<HTMLDivElement> = (e) => {
        props.onClose(e)
    }
    const closeOnClickMask: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if (props.maskClosable) {
            props.onClose(e)
        }
    }
    const result = props.visible ?
        <Fragment>
            <div className={scopedClass('mask')} onClick={closeOnClickMask}>
            </div>
            <div className={scopedClass()}>
                <div className={scopedClass('close')} onClick={onClickClose}>
                    <Icon name='close'></Icon>
                </div>
                <header className={scopedClass('header')}>提示</header>
                <main className={scopedClass('main')}>{props.children}</main>
                {props.buttons && props.buttons.length > 0 && <footer className={scopedClass('footer')}>
                    {
                        props.buttons.map((button, index) => {
                            return {...button, key: index}
                        })}
                </footer>
                }
            </div>
        </Fragment> : null
    return (
        result
    )
}
Dialog.defaultProps = {
    maskClosable: false
}
Dialog.displayName = 'Dialog'

const makeDialog = (content: ReactNode | ReactFragment, buttons?: Array<ReactElement>) => {
    // onClose 无法访问到 setX,所以无法直接切换 visible 状态，因此采用更新容器 div 内部组件的方式实现关闭 Dialog
    const onClose = () => {
        // 容器 div 内部组件更新
        ReactDOM.render(React.cloneElement(component, {visible: false}), div)
        // 移除 div 上的组件
        ReactDOM.unmountComponentAtNode(div)
        // 移除 div
        div.remove()
    }
    // onClose 无法访问到 setX,所以无法直接切换 visible 状态，因此采用更新容器 div 内部组件的方式实现关闭 Dialog
    const component = <Dialog
        visible={true}
        onClose={onClose}
        buttons={buttons}>{content}</Dialog>
    const div = document.createElement('div')
    document.body.appendChild(div)
    ReactDOM.render(component, div)
    return onClose
}

const alert = (content: String) => {
    makeDialog(content)
}

const confirm = (content: String, yes?: Function, no?: Function) => {

    const onYes = () => {
        onClose()
        yes && yes()
    }
    const onNo = () => {
        onClose()
        no && no()
    }

    const onClose=makeDialog(content,[<button onClick={onYes}>yes</button>, <button onClick={onNo}>no</button>])
}

const modal = (content: ReactNode | ReactFragment) => {
    const onClose=makeDialog(content)
    return onClose
}
export {alert, confirm, modal}
export default Dialog