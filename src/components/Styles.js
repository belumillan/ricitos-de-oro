import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    
    body: {
        backgroundColor: '#fff8e1',
    },
  
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
    },

    imageListItem: {
        borderStyle: 'solid',
        borderColor: '#eeeeee',
        borderWidth: 1,
        '&:hover': {
            background: "#ebd8ab",
            opacity: 0.8,
            cursor: 'pointer'
        }
    },

    itemImgContainer: {

        '&:hover': {
            background: "#ebd8ab",
            cursor: 'pointer'
        },

        height: 550,
        width: 550,
        maxHeight: { xs: 550, md: 650 },
        maxWidth: { xs: 550, md: 650 },
    },

  });

  export default useStyles
