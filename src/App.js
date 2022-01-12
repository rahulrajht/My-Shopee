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
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer'
import WishListScreen from './screens/WishListScreen'

function App() {
    return (
        <>
        <Router>
            <Header />
            <main className='py-3 mb-6'>
                
                <Container>
                    <Route  exact path="/" component={HomeScreen}/>
                    <Route  exact path="/login" component={LoginScreen} />
                    <Route  exact path="/register" component={RegisterScreen}/>
                    <Route  exact path="/profile" component={ProfileScreen}/>
                    <Route  exact path="/product/:id" component={ProductScreen}/>
                    <Route path='/cart' component={CartScreen} />
                    <Route exact path='/shipping' component={ShippingScreen} />
                    <Route path='/payment' component={PaymentScreen} />
                    <Route path='/placeorder' component={PlaceOrderScreen} />
                    <Route path='/search/:keyword' component={HomeScreen} exact />
                    <Route path='/wishlist' component={WishListScreen} exact />
                </Container>
            </main>
            <Footer />
        </Router>
        
        </>
    )
}

export default App
