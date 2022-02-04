import NavBar from "./components/NavBar"
import ItemListContainer from "./components/ItemListContainer"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Cart from "./components/Cart"
import CustomProvider from "./components/CartContext";
import Order from "./components/Order";
import PurchaseProvider from "./components/PurchaseContext";
import { db } from './components/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useEffect, useState } from "react";
import SignUp from "./components/SingUp";
import Login from "./components/Login";
import OrderDetail from "./components/OrderDetail";

const App = () => {

    // const links = [
    //     { id: 1, name: "Accesorios", href: '/Category/Accesories' },
    //     { id: 2, name: "Capilares", href: '/Category/Hair' },
    //     { id: 3, name: "Herramientas", href: '/Category/Tools' },
    //     { id: 4, name: "Equipamientos", href: '/Category/Furniture' },
    //     { id: 5, name: "Manicura", href: '/Category/Nails' }
    // ]

    const [categories, setCategories] = useState([]);

    const categoriesCollection = collection(db, 'categories')

    const getCategories = () => {

        const q = query(
            categoriesCollection,
            orderBy('name', 'asc')
        )

        return getDocs(q).then((snapshot) => {

            let categories = []
            if (snapshot.size > 0) {
                categories = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
            }

            return categories
        }

        )
    }

    useEffect(() => {

        getCategories().then((items) => {
            setCategories(items)
        })

    }, [])

    return (
        <>
            <CustomProvider>
                <PurchaseProvider>
                    <BrowserRouter>

                        <NavBar id="ricitosDeOroBar" links={categories} ></NavBar>
                        <Routes>
                            <Route path='*' element={<h1>No existe la pagina</h1>}></Route>
                            <Route path='/' element={<ItemListContainer greeting="Bienvenido a Ricitos de Oro" />}></Route>
                            <Route path='/Category/:id' element={<ItemListContainer greeting="Bienvenido a Ricitos de Oro" />}></Route>
                            <Route path='/item/:id' element={<ItemDetailContainer />}></Route>
                            <Route path='/cart' element={<Cart></Cart>}></Route>
                            <Route path='/order' element={<Order></Order>}></Route>
                            <Route path='/signup' element={<SignUp></SignUp>}></Route>
                            <Route path='/login' element={<Login></Login>}></Route>
                            <Route path='/orderdetail/:id' element={<OrderDetail></OrderDetail>}></Route>
                        </Routes>

                    </BrowserRouter>
                </PurchaseProvider>
            </CustomProvider>
        </>
    )

}

export default App 