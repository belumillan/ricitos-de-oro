import NavBar from "./components/NavBar"
import ItemListContainer from "./components/ItemListContainer"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemDetailContainer from "./components/ItemDetailContainer";
import useStyles from "./components/Styles";

const App = () => {

//Cuando el estado cambia, si los props que se reciben o si el componente padre se esta volviendo a ejecutar cambian se vuelve a renderizar el componente , se puede usar el useEffect en ese caso, el return dentro del useEffect se ejecuta antes de que deje de existir el componente
//Ver efecto useRef

    //Mas adelante se implementara logica para saber si el usuario esta logueado o no, y si esta logueado traeria info del user, necesito un estado inicial ({}), necesito un render inicial, un effect que se ejecute una sola vez para traer el detalle del item, agregar el contador al detalle del producto. item detail va a tener la funcion onAdd. El container se encarga de conseguir la info del producto

    let loggedIn = true;
    const styles = useStyles()

    const links = [
        {id:1, name:"Accesorios", href:'/Category/Accesories'}, 
        {id:2, name:"Capilares", href:'/Category/Hair'},
        {id:3, name:"Herramientas", href: '/Category/Tools'},
        {id:4, name:"Equipamientos", href: '/Category/Furniture'},
        {id:5, name:"Manicura", href: '/Category/Nails'}
    ]
    
    return (
        // <>
        //     <NavBar id="ricitosDeOroBar" userName="Masha Masha" links={links} loggedIn={loggedIn}></NavBar> 
        //     <ItemListContainer id='itemListContainer' greeting="Bienvenido a Ricitos de Oro"></ItemListContainer>
        // </>

        <BrowserRouter>
        
             <NavBar id="ricitosDeOroBar" userName="Masha Masha" links={links} loggedIn={loggedIn}></NavBar> 
            <Routes>
                <Route path='/' element={<ItemListContainer greeting="Bienvenido a Ricitos de Oro"/> }></Route>
                <Route path='/Category/:id' element={<ItemListContainer greeting="Bienvenido a Ricitos de Oro"/> }></Route>
                <Route path='/item/:id' element={<ItemDetailContainer/>}></Route>
            </Routes>
  
        </BrowserRouter>
        
    )
    
    }

export default App 