# RICITOS DE ORO

Es un e-commerce de productos de salon destinado para peluquerias y al publico en general.

  - Al ingresar al sitio se ve un lilstado con productos destacados y una barra de navegacion que permite filtrar por categorias. Esta contiene un link al carrito de compras y un menu para gestionar el perfil del usuario: permite crear cuenta o iniciar sesion en el caso de ya poseer una cuenta.

  - Perfil de ususario: si el usuario no posee cuenta en el sitio, puede registrarse ingresando email y password. Una vez que creo su cuenta puede loguearse usando los mismos datos. 
  Si esta logueado se visualizan en la barra de navegacion sus iniciales y un menu donde puede buscar un pedido y desloguearse (para este caso practico no se valido que el usuario logueado solo pueda buscar sus pedidos, sino que le permite ver el detalle de cualquier pedido existente).

  - Detalle de producto: Para cada producto del listado se puede ver su imagen, una descripcion breve, el precio y da la opcion de poder comprar o ver detalle si se desea obtener mas informacion.
  - En el carrito de compras se puede ver la lista con los productos elegidos y el total de la compra, se permite modificar la cantidad y eliminar cada uno de los productos. Desde el carrito se puede vaciarlo, volver a la pagina principal para seguir comprando o iniciar la compra.

  - Iniciar Compra: En esta pantalla se puede ver el detalle de la compra mas el costo de envio y hay un formulario donde permite ingresar los datos del comprador (nombre, apellido, telefono, domicilio, email en el caso de que no este logueado).Si los datos ingresados son correctos se genera la orden.

  - Detalle de la orden/pedido: a esta pantalla se accede cuando un usuario logueado accede a la opcion de buscar pedido, si ingreso un numero de pedido existente se muestra el detalle y el total de la compra 

  - Se utilizo local storage para persistir el carrito de compras y el usuario logueado.



## Tecnologias utilizadas

El proyecto esta desarrollado principalmente en Reactjs y Javascript.

Se  utilizaron las siguientes librerias adicionales:

- Material UI (MUI): se utilizo este framework para la interfaz del usuario porque es simple de usar, y tiene componentes reutilizables que permiten combinarlos sencillamente sin tener que agregar demasiados estilos adicionales
(https://mui.com/)

- react-toastify: se utilizo para mostrar los mensajes, permite mostrar distintos tipos de mensajes con formato de notificaciones en distintos lugares de la pantalla segun se le indique. Se eligio porque es sencillo de configurar y permite mostrar tanto errores como info en un formato amigable para el usuario sin bloquear la pagina.
(https://www.npmjs.com/package/react-toastify)

- Firebase: se utilizo el servicio de base de datos Firestore para poder guardar productos, usuarios, categorias, ordenes de compra e imagenes de los productos.
Tambien se utilizo el servicio de autenticacion por email y password para gestionar las cuentas del sitio.

## Componentes principales

- NavBar.js: Barra de navegacion que se muestra en la parte superior del sitio. Contiene al logo de la compania, menu con categorias, icono para gestionar la cuenta del usuario con menu desplegable e icono para acceder al carrito de compras

- ItemListContainer.js: Se encarga de hacer la busqueda de los items a mostrar (si filtra por categoria solo trae los que cumplan con ese criterio), este componente contiene al ItemList.
    -ItemList.js: Muestra una lista con los items que se obtuvieron en ItemListContainer, la vista de cada item esta desarrollada en Item.js

- ItemDetailContainer.js: Busca el detalle del item en la base de datos y se lo pasa al ItemDetail.js que es quien se encarga de mostrarlo.
    - ItemDetail.js: Ademas de mostrar la info detallada del producto, contiene una galeria de imagenes desarrollada en el componente (ImageGallery.js) y un contador para elegir que cantidad de productos agregar al carrito (ItemCount.js). Si elijo finalizar la compra me dirige al carrito de compras.

- Cart.js: Es la vista del carrito de compras, si hay items se muestra un listado con el detalle y precio y sino muestra que esta vacio y un boton para ir a la vista principal donde muestra el listado de productos. 

- Order.js: Muestra el detalle de la compra y contiene un formulario para ingresar los datos del comprador (Datos de contacto: BuyerForm.js y Domicilio: AddressForm.js)

- CartWidget.js: Icono del carrito que muestra la cantidad de items agregados y al hacer click va a la vista del carrito de compras

- Componentes para gestionar cuentas de usuarios:
    - SignUp.js: permite ingresar datos para crear una nueva cuenta
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


