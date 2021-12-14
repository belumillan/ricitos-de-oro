import { jss } from "react-jss";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    itemButton: {
        backgroundColor:'#e0b241', 
        color: 'white', 
        '&:hover': {
            background: "#ebd8ab",
        },
        width: 200,
        borderRadius: 50
    },
    cardContent: {
        textAlign: 'center'
    },
    card: {
        maxWidth: 345, 
        maxHeight: 550
    },
    counterButton: {
        backgroundColor:'#e0b241', 
        color: 'white', 
        '&:hover': {
            background: "#ebd8ab",
        }

    },

    addRemoveItemButton: {
        extend: 'counterButton',
        width: 40
    },

    itemTotal: {
        borderColor: "transparent",
        width: 130
    },
    
    itemCountContainer: {
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: 210
    }

  });

  export default useStyles
