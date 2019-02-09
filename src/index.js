import React from 'react'
import ReactDOM from 'react-dom'
import { Route, HashRouter, Switch} from 'react-router-dom'
import './index.css'
import HomePage from './components/homepage';
import Explore from './components/explore';
import Learn from './components/learn';
import NotFound from './notfound';
import * as serviceWorker from './serviceWorker';

const routing = (
    <HashRouter>
        <div>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/explore" component={Explore} />
                <Route path="/learn" component={Learn} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </HashRouter>
)

ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


