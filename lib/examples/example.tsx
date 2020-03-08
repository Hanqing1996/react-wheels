import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {HashRouter as Router, NavLink, Route} from 'react-router-dom';

import './example.scss'
import '../index.scss'

import Layout, {Aside, Header, Content, Footer} from "../components/layout/layout";

import IconCode from '../code/icon.code'
import DialogCode from '../code/dialog.code'
import LayoutCode from "../code/layout.code";
import FormCode from '../code/form.code'
import InputCode from '../code/input.code'
import ButtonCode from '../code/button.code'
import ScrollCode from '../code/scroll.code'

import {scopedClassMaker} from "../helpers/classes";

const scopedClass = scopedClassMaker('example-layout')

ReactDOM.render(
    <Router>
        <Layout className={scopedClass('')}>
            <Header className={scopedClass('header')}>
                <h1>
                    my-react-wheel
                </h1>
            </Header>
            <Layout className={scopedClass('')}>
                <Aside className={scopedClass('aside')}>
                    <h2>组件</h2>
                    <ul>
                        <li>
                            <NavLink to="/icon">
                                Icon-图标
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/button">
                                Button-按钮
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dialog">
                                Dialog-对话框
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/layout">
                                Layout-布局
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/input">
                                Input-输入框
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/form">
                                Form-表单
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/scroll">
                                Scroll-滚动条
                            </NavLink>
                        </li>
                    </ul>
                </Aside>
                <Content className={scopedClass('content')}>
                    <Route path='/icon' component={IconCode}/>
                    <Route path='/button' component={ButtonCode}/>
                    <Route path='/dialog' component={DialogCode}/>
                    <Route path='/layout' component={LayoutCode}/>
                    <Route path='/input' component={InputCode}/>
                    <Route path='/form' component={FormCode}/>
                    <Route path='/scroll' component={ScrollCode}/>
                </Content>
            </Layout>
            <Footer className={scopedClass('footer')}>&copy; zhq</Footer>
        </Layout>
    </Router>
    , document.querySelector('#root')
)
