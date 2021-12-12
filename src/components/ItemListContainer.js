import ItemCount from "./ItemCount"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ItemListContainer = ({greeting}) => {
    
    //TODO: El container busca los items y se los pasa al itemList. El item list hace un map y muestra cada item
    const productStock = 15;
    const itemInitialValue = 1;

    const onAdd = (total) => {
        debugger
        //Funcion que luego va a agregar la cantidad de items solicitados al carrito
        toast.info(`Se han agregado: ${total} items al carrito`, 
            { autoClose: 10000, 
             position: toast.POSITION.BOTTOM_RIGHT,
             hideProgressBar: true })
    }

    return (
        <>
            <h2 style={{textAlign:'center'}}>
                {greeting}
            </h2>

            <ItemCount stock={productStock} initial={itemInitialValue} onAddCallback={onAdd}>
            </ItemCount>
            
            <ToastContainer />

        </>
    )
}

export default ItemListContainer