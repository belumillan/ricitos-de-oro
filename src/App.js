import NavBar from "./components/NavBar"
import ItemListContainer from "./components/ItemListContainer"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemDetailContainer from "./components/ItemDetailContainer";
import useStyles from "./components/Styles";
import Cart from "./components/Cart"
import CustomProvider from "./components/CartContext";
import Order from "./components/Order";
import PurchaseProvider from "./components/PurchaseContext";

const App = () => {

    let loggedIn = true;

    const links = [
        {id:1, name:"Accesorios", href:'/Category/Accesories'}, 
        {id:2, name:"Capilares", href:'/Category/Hair'},
        {id:3, name:"Herramientas", href: '/Category/Tools'},
        {id:4, name:"Equipamientos", href: '/Category/Furniture'},
        {id:5, name:"Manicura", href: '/Category/Nails'}
    ]
    
    return (
    <>
        <CustomProvider>
        <PurchaseProvider>
            <BrowserRouter>

                <NavBar id="ricitosDeOroBar" userName="Masha Masha" links={links} loggedIn={loggedIn}></NavBar> 
                <Routes>
                    <Route path='*' element={<h1>No existe la pagina</h1>}></Route>
                    <Route path='/' element={<ItemListContainer greeting="Bienvenido a Ricitos de Oro"/> }></Route>
                    <Route path='/Category/:id' element={<ItemListContainer greeting="Bienvenido a Ricitos de Oro"/> }></Route>
                    <Route path='/item/:id' element={<ItemDetailContainer/>}></Route>
                    <Route path='/cart' element={<Cart></Cart>}></Route>
                    <Route path='/order' element={<Order></Order>}></Route>
                </Routes>
    
            </BrowserRouter>
            </PurchaseProvider>
        </CustomProvider>
    </>   
    )
    
    }

export default App 