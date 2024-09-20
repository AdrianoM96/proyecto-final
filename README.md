# proyecto-final
Este proyecto es un E-Commerce de indumentaria, realizado con NextJs y utilizando un proyecto bancked hecho en nodeJs y usando MongoDb
Aqui el repo (https://github.com/AdrianoM96/proyecto-final)

## Demo
 ![](./src/assets/gif/demo.gif)

## Instalacion
1) Clonar el repositorio.
2) Estando en la raíz del proyecto, corra el comando
```
npm install
```
3) Cambiar el archivo .env.template a .env y establecer sus variables de entorno
4) Ejecutar para inciar el proyecto:
```
npm start
``` 
El proyecto estará disponible en http://localhost:3000



## Contenido
Este proyecto con
* Login, necesario para efectuar compras
* Catálogo de todos los productos .
* Filtro por categorías, las cuales son : Hombres, Mujeres y Niños.
* Detalle de cada producto , mostrando en pantalla su nombre,descripción, precio, fotos y la posibilidad de poder elegir la cantidad que queremos agregar al carrito, siempre respetando el stock disponible.
* Carrito: en el cual podemos ver todos los productos que hemos agregado a nuestro carrito, mostrando su imagen,nombre, cantidad elegida, sub total de cada producto y el total del carrito completo. Tenemos la posibilidad de eliminar algun producto en caso de no quererlo. Si queremos efectuar la compra, hay un botón para "Continuar", para luego ir al siguiente paso.
* Formulario para que el usuario llene con información correcta y obligatoria, donde se le pide nombre completo, direccion, numero de telefono, ciudad, pais. Tiene la posibildad de que todos los datos ingresados se recuerden para cuando loguee en el mismo navegador u otro.
* Una vez "Finalizada la orden" se genera el codigo de la orden y se la la posibildad de pagarla en ese momento , o en caso de no hacerla queda guardada la orden para poderla pagar luego, con paypal, mercado pago u otra tarjeta. Se podra ver en la pestaña ordenes.
* Si se cumple el rol de administrador tendra en la barra de navegacion nuevas pestañas para hacer un abm de usuario productos y ver todas las ordenes efectuadas.
* Perfil de usuario con algunos datos y posibilidad de cambiar contraseña




