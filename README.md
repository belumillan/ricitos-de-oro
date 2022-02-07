# RICITOS DE ORO

Es un e-commerce de productos de salon destinado para peluquerías y consumidores varios.

  - Al ingresar al sitio se ve un listado con productos destacados y la barra de navegación, la cual posibilita filtrar por categorías. En la barra se puede encontrar el carrito de compras y un menú para gestionar el perfil de usuario, en donde el usuario puede crear su cuenta o iniciar sesión, si es que ya tiene una cuenta.

  - Perfil de usuario: Posibilita al usuario que no tiene cuenta a crearse una, en el caso de tener en el perfil puede registrarse e iniciar sesión. Para crear su cuenta el usuario debe ingresar su correo y una contraseña. Para aquellos usuarios que ya tienen una cuenta pueden loguearse usando los mismos datos. 
  Una vez logueado se visualizan en la barra de navegación sus iniciales, un menú donde puede buscar sus pedidos y la opción de cerrar sesión (para este caso práctico no se validó que el usuario logueado solo pueda buscar sus pedidos, sino que le permite ver el detalle de cualquier pedido existente).

  - Detalle de producto: Para cada producto del listado se ve su imagen, una breve descripción, y el precio, también da la opción de ampliar contenido, en caso de que el usuario desee obtener más información, y agregar al carrito.
  
  - En el carrito de compras se puede ver la lista con los productos elegidos y el total de la compra, se permite modificar cantidad y eliminar productos. En el carrito se puede vaciarlo, volver a la página principal o iniciar la compra.

  - Iniciar Compra: En esta pantalla se ven los productos elegidos, el subtotal, el costo de envío y el total. Se abre un formulario para ingresar los datos del comprador (nombre, apellido, teléfono, domicilio, email en caso de que no esté logueado).Si los datos ingresados son correctos se genera la compra.

  - Detalle de la orden/pedido: a esta pantalla se accede cuando un usuario logueado ingresa a la opción de buscar pedido. Cuando el usuario coloca un numero de pedido existente, se muestra el detalle y el total de la compra.

  - Se utilizo local storage para persistir el carrito de compras y el usuario logueado.


## Tecnologias utilizadas

El proyecto esta desarrollado principalmente en Reactjs y Javascript.

Se  utilizaron las siguientes librerias adicionales:

- Material UI (MUI): se utilizó este framework para la interfaz del usuario porque tiene una usabilidad sencilla y componentes reutilizables que permiten combinarlos con facilidad haciendo su desarrollo más dinámico.
(https://mui.com/)

- react-toastify: se utilizó para mostrar los mensajes, ya que permite mostrar distintos tipos con formato de notificaciones en diferentes sitios de la pantalla según se le indique. Se eligió por su simplicidad a la hora de desarrollar que permite mostrar tanto errores como información en un formato amigable para el usuario sin bloquear la página.
(https://www.npmjs.com/package/react-toastify)

- Firebase: se utilizó el servicio de base de datos Firestore para poder guardar productos, usuarios, categorías, órdenes de compra e imágenes.
También se utilizó el servicio de autenticación por email y contraseña para gestionar las cuentas del sitio.

- react-jss: se utilizo para aplicar estilos customizados para los componentes de material utilizados en el desarrollo de este sitio (https://cssinjs.org/)

## Componentes principales

- NavBar.js: Barra de navegación que se muestra en la parte superior del sitio. Contiene al logo, el menú con categorías, icono para gestionar la cuenta del usuario con menú desplegable e icono para acceder al carrito de compras

- ItemListContainer.js: Se encarga de hacer la búsqueda de los ítems a mostrar (el filtro por categoría solo trae los que cumplan con ese criterio), este componente contiene al ItemList.
    -ItemList.js: Muestra una lista con los ítems que se obtuvieron en ItemListContainer, la vista de cada ítem esta desarrollada en Item.js

- ItemDetailContainer.js: Busca el detalle del ítem en la base de datos y se lo pasa al ItemDetail.js que es quien se encarga de mostrarlo.
    - ItemDetail.js: Además de mostrar la info detallada del producto, contiene una galería de imágenes desarrollada en el componente (ImageGallery.js), y un contador para elegir qué cantidad de productos agregar al carrito (ItemCount.js). Una vez que se finalice la compra me direcciona al carrito de compras.

- Cart.js: Es la vista del carrito de compras, cuando hay ítems muestra un listado con el detalle y precio, en caso de que no existan productos agregados el carrito figurará vacío con un botón para ir a la vista principal donde muestra el listado de productos. 

- Order.js: Muestra el detalle de la compra y contiene un formulario para ingresar los datos del comprador (Datos de contacto: BuyerForm.js y Domicilio: AddressForm.js)

- CartWidget.js: Icono del carrito que muestra la cantidad de ítems agregados y al hacer click va a la vista del carrito de compras

- Componentes para gestionar cuentas de usuarios:
    - SignUp.js: permite ingresar datos para crear una cuenta nueva
    - Login.js: permite loguearse en el sitio con email y password

- OrderSearch.js: Dialog que permite buscar un pedido por numero

## Uso

1. Clonar el repositorio 
`git clone https://github.com/belumillan/ricitos-de-oro`

2. Ir a la carpeta donde se guardo el proyecto (por ejemplo)
`cd Users\Usuario\Documents\GitHub\ricitos-de-oro\src`

3. Instalar las librerias necesarias para que corra el proyecto
`npm install`

4. Compilar el proyecto
`npm start`
Se compila en modo desarrollo, para verlo en el browser ir a: [http://localhost:3000](http://localhost:3000)

`npm run build`
Se compila para el ambiente de produccion en la carpeta `build` .\ 
Se optimiza para mejor rendimiento

## Ejemplo

Se encuentra un video con el circuito de compra en el archivo: `Ricitos de Oro - Circuito de compra.mp4`
