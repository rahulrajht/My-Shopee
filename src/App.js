import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import ShippingScreen from './screens/ShippingScreen'

function App() {
    return (
        <>
        <Router>
            <Header />
            <main className='py-3'>
                
                <Container>
                    <Route  exact path="/" component={HomeScreen}/>
                    <Route  exact path="/login" component={LoginScreen} />
                    <Route  exact path="/register" component={RegisterScreen}/>
                    <Route  exact path="/profile" component={ProfileScreen}/>
                    <Route  exact path="/product/:id" component={ProductScreen}/>
                    <Route path='/cart/:id?' component={CartScreen} />
                    <Route exact path='/shipping' component={ShippingScreen} />
                   
                </Container>
            </main>
        </Router>
    
        </>
    )
}

export default App
