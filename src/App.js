import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './components/Header'
function App() {
    return (
        <Switch>
                <Route exact path="/" component={Header} />
        </Switch>
    
    )
}

export default App
