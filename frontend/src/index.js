import Error404Screen from './screens/Error404Screen.js'
import HomeScreen from './screens/HomeScreen.js'
import ProductScreen from './screens/ProductScreen.js'
import { hideLoading, parseRequestUrl, showLoading } from './utils.js'
import CartScreen from './screens/CartScreen.js'
import signinScreen from './screens/signinScreen.js'
import Header from './components/header.js'
import registerScreen from './screens/RegisterScreen .js'
import ProfileScreen from './screens/profileScreen.js'
import ShippingScreen from './screens/ShippingScreen.js'
import PaymentScreen from './screens/PaymentScreen.js'
import PlaceOrderScreen from './screens/PlaceOrderScreen.js'
import DashboardScreen from './screens/DashboardScreen.js'
import ProductListScreen from './screens/productListScreen.js'
import OrderScreen from './screens/OrderScreen.js'
import ProductEditScreen from './screens/ProductEditScreen.js'
import OrderListScreen from './screens/OrderListScreen.js'
import Aside from './components/Side.js'

const routes={
    '/': HomeScreen,
    '/product/:id/edit':ProductEditScreen,
    '/product/:id': ProductScreen,
    '/order/:id': OrderScreen,
    '/cart/:id':CartScreen,
    '/cart':CartScreen,
    '/signin':signinScreen,
    '/register':registerScreen,
    '/profile':ProfileScreen,
    '/shipping':ShippingScreen,
    '/payment':PaymentScreen,
    '/placeorder':PlaceOrderScreen,
    '/dashboard':DashboardScreen,
    '/productlist':ProductListScreen,
    '/orderlist':OrderListScreen,

    


}
const router = async ()=>{
    showLoading()
    const request=parseRequestUrl()
    const parseUrl=(request.resource ? `/${request.resource}` :'/') +(request.id ? '/:id': '')+(request.verb ? `/${request.verb}`:'')
    const screen=routes[parseUrl] ? routes[parseUrl] : Error404Screen
//header//
const header=document.getElementById('header-container')
header.innerHTML=await Header.render()
await Header.after_render()

//side panel //
const aside = document.getElementById('aside-container');
  aside.innerHTML = await Aside.render();
  await Aside.after_render();

//main-body//
    const main=document.getElementById('main-container')
main.innerHTML=await screen.render()
if (screen.after_render) await screen.after_render()
hideLoading()
}
window.addEventListener('load', router)
window.addEventListener('hashchange', router)