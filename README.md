# proyecto-final
Este proyecto es un E-Commerce de indumentaria, realizado con NextJs y utilizando un proyecto bancked hecho en nodeJs y usando MongoDb
Aqui el repo (https://github.com/AdrianoM96/proyecto-final-back)

## Demo
 ... ![Ver video de demostración](./demo.mp4)


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
Para que funcione las compras de mercado pago, debes usar un servidor https, por eso en este proyecto viene un archivo de cloudflare para que puedas crear tu tunnel con:

```
 Ejemplo: ./cloudflared tunnel --url localhost:3000/
```

Abrir el proyecto en esta dirección y además debe colocarla en las variables segun corresponda en el proyecto backend

También debes leer las instrucciones del proyecto backend.

Además debe colocar sus credenciales de paypal dev y cloudinary para el completo funcionamiento del proyecto


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
* El administrador podra pedir reportes de ventas entre un rango de fecha que quieras y reportes de stock actual
* El administrador podra establecer sus datos fiscales que van en la factura
* Perfil de usuario con algunos datos y posibilidad de cambiar contraseña.
* Envio de correo electronico para confirmar el email dede el perfil
* Validacion de formularios
* Uso de server y clients components
* Responsive Design
* Envio de la factura de compra al correo del cliente
* Historial de busqueda para cada cuenta, el cual se borra automaticamente cada 15 dias para limpiar espacio
* Si se olvida la contraseña se puede recuperar mediante envio de token al correo y siguiendo las instrucciones
* Verificacion de email mediante envio de token al correo


## Dependencias
Este proyecto utiliza las siguientes dependencias clave:

- **Next.js**: 14.2.5
- **React**: ^18
- **Axios**: ^1.7.3
- **React Hook Form**: ^7.52.2
- **Zustand**: ^4.4.6
- **Zod**: ^3.23.8
- **Cloudinary**: ^2.4.0
- **Swiper**: ^11.0.3
- **PayPal React**: ^8.1.3
- **MercadoPago SDK React**: ^0.0.19

### Dependencias de desarrollo

- **Typescript**: ^5
- **TailwindCSS**: ^3.4.1







