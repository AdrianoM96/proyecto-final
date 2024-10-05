# proyecto-final
Este proyecto es un E-Commerce de indumentaria, realizado con NextJs y utilizando un proyecto bancked hecho en nodeJs y usando MongoDb
Aqui el repo (https://github.com/AdrianoM96/proyecto-final-back)

## Demo
 ... ![](./src/assets/gif/demo.gif)

## Instalacion
1) Clonar el repositorio.
2) Estando en la raíz del proyecto, corra el comando
```
npm install
```
3) Cambiar el archivo .env.template a .env y establecer sus variables de entorno
4) Ejecutar para inciar el proyecto:
```
npm run dev
``` 
El proyecto estará disponible en http://localhost:3000

# User
Introduce estos datos para loguearte
    name = admin;
    email = admin@admin.com
    password = admin123

# Aclaracion
Para que funcione las compras de mercado pago, debes usar un servidor https, no localhost, por eso en este proyecto viene un archivo de cloudflare para que puedas crear tu tunnel con:

`./cloudflared tunnel --url localhost:tu puerto/`

Abrir el proyecto en esta dirección y además debe colocarla en la base de datos en el controlador de mercadoPago específicamente en estas líneas:

- `success: COLOCA AQUI LA RUTA/orders/${req.body.orderId}`
- `failure: COLOCA AQUI LA RUTA/orders/${req.body.orderId}`
- `pending: COLOCA AQUI LA RUTA/orders/${req.body.orderId}`

También debes leer las instrucciones del proyecto backend.


## Contenido
Este proyecto con
* Login, necesario para efectuar compras
* Manejo de sesion por usuario
* Catálogo de todos los productos con buscador.
* Filtro por categorías y subcategorias, las cuales son : Hombres, Mujeres y Niños.
* Navbar Dinamico
* Detalle de cada producto , mostrando en pantalla su nombre,descripción, precio, fotos y la posibilidad de poder elegir la cantidad que queremos agregar al carrito, siempre respetando el stock disponible.
* Carrito persistente
* Carrito: en el cual podemos ver todos los productos que hemos agregado a nuestro carrito, mostrando su imagen,nombre, cantidad elegida, sub total de cada producto y el total del carrito completo. Tenemos la posibilidad de eliminar algun producto en caso de no quererlo. Si queremos efectuar la compra, hay un botón para "Continuar", para luego ir al siguiente paso.
* Formulario para que el usuario llene con información correcta y obligatoria, donde se le pide nombre completo, direccion, numero de telefono, ciudad, pais. Tiene la posibildad de que todos los datos ingresados se recuerden para cuando loguee en el mismo navegador u otro.
* Una vez "Finalizada la orden" se genera el codigo de la orden y se la la posibildad de pagarla en ese momento , o en caso de no hacerla queda guardada la orden para poderla pagar luego, con paypal o mercado pago . Se podra ver en la pestaña ordenes.
* Si se cumple el rol de administrador tendra en la barra de navegacion nuevas pestañas
* Los productos cuentan con stock segun su talle
* El administrador podra hacer un abm de productos con sus datos incluyendo imagenes, pausar una publicacion, tambien cuenta con un buscador de productos en el panel
* El administrador podra cambiar el rol de los usuarios registrados
* El administrador podra ver todas las ordenes efectuadas y su condicion de pago
* Perfil de usuario con algunos datos y posibilidad de cambiar contraseña.
* Validacion de formularios
* Uso de server y clients components
* Responsive Design




