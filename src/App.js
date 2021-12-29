import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'
import RegisterScreen from './screens/RegisterScreen'
function App() {
    return (
        <>
        <Router>
            <Header />
            <main className='py-3'>
                <Container>
                    <Route  exact path="/login" component={LoginScreen} />
                    <Route  exact path="/" component={HomeScreen}/>
                    <Route  exact path="/register" component={RegisterScreen}/>
                    <Route  exact path="/profile" component={ProfileScreen}/>
                </Container>

            </main>
        </Router>
    
        </>
    )
}

export default App
