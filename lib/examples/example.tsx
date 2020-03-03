import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {HashRouter as Router, Link, Route} from 'react-router-dom';
import IconExample from "./icon.example";
import DialogExample from "./dialog.example";
import './example.scss'
import '../index.scss'

ReactDOM.render(
    <Router>
        <div>
            <header></header>
            <div>
                <aside>
                    <h2>组件</h2>
                    <ul>
                        <li>
                            <Link to="/icon">
                                Icon
                            </Link>
                        </li>
                        <li>
                            <Link to="/dialog">
                                Dialog
                            </Link>
                        </li>
                    </ul>
                </aside>
                <main>
                    <Route path='/icon' component={IconExample}/>
                    <Route path='/dialog' component={DialogExample}/>
                </main>
            </div>
        </div>
    </Router>
    , document.querySelector('#root')
)
