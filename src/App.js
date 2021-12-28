import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
function App() {
    return (
        <>
        <Router>
            <Header />
            <main className='py-3'>
                <Container>
                    <Route  exact path="/login" component={LoginScreen} />
                    <Route  exact path="/" component={HomeScreen}/>
                </Container>

            </main>
        </Router>
    
        </>
    )
}

export default App
