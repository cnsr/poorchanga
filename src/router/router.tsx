import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from '../components/Main';
import Board from '../components/Board';
import Error from '../components/Error';

import Settings from '../components/Settings';

const AppRouter = () => {
    return (
        <Router>
            <Settings />
            <Switch>
                <Route exact path='/' component={Main} />
                <Route exact path='/:board' component={Board}/>
                <Route exact path='/error/:errorId' component={Error}/>
            </Switch>
        </Router>
    )
}

export default AppRouter;