import { createContext, useContext, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cartContext = createContext()

export const { Provider } = cartContext

export const useCartContext = () => {
    return useContext(cartContext)
}

const CustomProvider = ({children}) => {

    const [itemQuantity,setItemQuantity] = useState(0)
    const [cartItems,setCartItems] = useState([])
    const [cartTotal,setCartTotal] = useState(0)

    const freeShippingThreshold = 6000.00

    const addItem = (item, total) => {

        let itemAdded = false

        if(!isInCart(item.id)) {
            
            const itemCopy = {...item}
            itemCopy.quantity = 0
            itemCopy.quantity += total
            itemCopy.subtotal = itemCopy.quantity * item.price
            setCartTotal(cartTotal + itemCopy.subtotal)
            setCartItems([...cartItems, itemCopy])
            setItemQuantity(itemQuantity + total)
            itemAdded = true

        } else {
            let itemFound = cartItems.find(c => c.id == item.id)
            if(itemFound.quantity + total <= itemFound.stock)
            {
                itemFound.quantity += total
                itemFound.subtotal = itemFound.quantity * itemFound.price
                setCartTotal(cartTotal + itemFound.subtotal)
                setItemQuantity(itemQuantity + total)
                itemAdded = true
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
            
            setCartTotal(cartTotal - itemFound.subtotal)
            items.splice(index, 1);
        
            setCartItems(items)
            setItemQuantity(itemQuantity - itemFound.quantity)
        }

    }

    const clear = () => {  
        setCartItems([]) 
        setItemQuantity(0) 
        setCartTotal(0)
    }

    const isInCart = (id) => {
        
        let itemFound = cartItems.find(c => c.id === id)

        return itemFound != null

    }

    const changeQuantity = (itemId, pmtQuantity) => {
        
        let itemFound = cartItems.find(c => c.id === itemId)
        let quantity = parseInt(pmtQuantity)
        if(itemFound)
        {
            if(quantity <= itemFound.stock)
            {
                let tmpQuantity = itemQuantity - itemFound.quantity
                itemFound.quantity = quantity
                let tmpSubtotal = cartTotal - itemFound.subtotal

                itemFound.subtotal = itemFound.quantity * itemFound.price
                setItemQuantity(tmpQuantity + quantity)
                setCartTotal(tmpSubtotal + itemFound.subtotal)
            }
            else
            {
                let outOfStockMsg = `Solo quedan disponibles: ${itemFound.stock} unidades del producto. Por favor modifique la cantidad`
                
                toast.error(outOfStockMsg, 
                    { autoClose: 3000, 
                    position: toast.POSITION.BOTTOM_RIGHT,
                    hideProgressBar: true })
            }
        }
    }

    const contextValue = {
        itemQuantity, 
        cartItems, 
        addItem, 
        removeItem,
        clear,
        cartTotal,
        changeQuantity,
        freeShippingThreshold
    }

    return (
        <Provider value={contextValue}>
            {children}
        </Provider>
    )
}

export default CustomProvider


