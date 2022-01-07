import { createContext, useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cartContext = createContext()

export const { Provider } = cartContext

export const useCartContext = () => {
    return useContext(cartContext)
}

const CustomProvider = ({children}) => {

    //Voy a guardar en estados la cantidad de total decitems del carrito y una lista con los productos
    const [itemQuantity,setItemQuantity] = useState(0)
    const [cartItems,setCartItems] = useState([])

    const addItem = (item, total) => {
        debugger
        //Si el item esta en el carrito solo incremento la cantidad, caso contrario lo agrego a la lista con la cantidad seleccionada
        let itemAdded = false

        if(!isInCart(item.id)) {
            
            const itemCopy = {...item}
            itemCopy.quantity = 0
            itemCopy.quantity += total
            setCartItems([...cartItems, itemCopy])
            setItemQuantity(itemQuantity + total)
            itemAdded = true
            console.log(`Se agrego el item ${itemCopy.id}:${itemCopy.title}. Tengo ${itemCopy.quantity} unidades en total`)

        } else {
            let itemFound = cartItems.find(c => c.id == item.id)
            if(itemFound.quantity + total <= itemFound.stock)
            {
                itemFound.quantity += total
                setItemQuantity(itemQuantity + total)
                itemAdded = true
                console.log(`Se agregaron ${total} unidades del item ${itemFound.id}:${itemFound.title} que ya existia en el carrito. Tengo ${itemFound.quantity} unidades en total`)
            }
            else
            {
                let remainingItems = itemFound.stock - itemFound.quantity
                let outOfStockMsg = remainingItems > 0 ? `Solo quedan disponibles: ${remainingItems} unidades del producto. Por favor modifique la cantidad` : `No hay mas stock del producto: ${itemFound.title}`
                
                toast.error(outOfStockMsg, 
                    { autoClose: 3000, 
                    position: toast.POSITION.BOTTOM_RIGHT,
                    hideProgressBar: true })
            }
        }

        return itemAdded
    }

    const removeItem = (id) => {
        
        let items = [...cartItems]
        const index = items.findIndex(i => i.id == id)
        let itemFound = items.find(c => c.id == id)

        if (index > -1) {
            
            items.splice(index, 1);
        
            setCartItems(items)
            setItemQuantity(itemQuantity - itemFound.quantity)
        }

    }

    const clear = () => {  
        setCartItems([]) 
        setItemQuantity(0) 
    }

    const isInCart = (id) => {
        
        let itemFound = cartItems.find(c => c.id === id)

        return itemFound != null

    }

    const contextValue = {
        itemQuantity, 
        cartItems, 
        addItem, 
        removeItem,
        clear
    }

    return (
        <Provider value={contextValue}>
            {children}
        </Provider>
    )
}

export default CustomProvider

