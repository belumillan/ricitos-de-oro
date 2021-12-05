import NavBar from "./components/NavBar"
import ItemListContainer from "./components/ItemListContainer"

const App = () => {

    //Mas adelante se implementara logica para saber si el usuario esta logueado o no, y si esta logueado traeria info del user

    let loggedIn = true;

    const links = [
        {id:1, name:"Accesorios"}, 
        {id:2, name:"Capilares"},
        {id:3, name:"Herramientas"},
        {id:4, name:"Equipamientos"},
        {id:5, name:"Manicura"}
    ]
    
    return (
    <>
        <NavBar id="ricitosDeOroBar" userName="Masha Masha" links={links} loggedIn={loggedIn}></NavBar> 
        <ItemListContainer id='itemListContainer' greeting="Bienvenido a Ricitos de Oro"></ItemListContainer>
    </>
    )
    
    }

export default App 