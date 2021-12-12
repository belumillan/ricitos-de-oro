import NavBar from "./components/NavBar"
import ItemListContainer from "./components/ItemListContainer"


const App = () => {

//Prueba de useState Hook, ver de usar react tostify para mostrar mensajes de alertas, ver useEffect
//Cuando el estado cambia, si los props que se reciben o si el componente padre se esta volviendo a ejecutar cambian se vuelve a renderizar el componente , se puede usar el useEffect en ese caso, el return dentro del useEffect se ejecuta antes de que deje de existir el componente
//Ver efecto useRef

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