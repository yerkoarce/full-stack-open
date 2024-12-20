*** Lista de blogs - Full Stack Open***

* Linea de tiempo de la aplicación

- Se instalan las dependencias necesarios por el momento, en este caso express, cors, dotenv y mongoose. 
- Se añade el gitignore y se añaden la carpeta node_modules y .env
- Creo la base de datos para esta aplicación en mongoDB atlas
- En el archivo .env se añade la MONGO_URI y el puerto en que se alojará la aplicación en modo desarrollo
- Se añade en el package.json el script para el dev y el start. (En este proyecto se utiliza --watch de node en vez de nodemon)
- se crea los directorios necesarios para llevar el modelo vista controlador (MVC)
- También se cre un directorio utils con un archivo config donde  se tendrán las variables de entorno del puerto y la url de la base de datos de mongo, en este directorio tambien se añade el archivo con los logs necesarios.
- Se crea el modelo para los blog en la carpeta models
- Tambien se crea el controlador de los blogs con las rutas para las peticiones http.
- Se añaden inmediatamente los middlewares como requestLogger, unknownEndpoint y errorHandler. Estos estarán en el archivo middleware de la carpeta utils.
- se agregan las rutas para obtener solo un blog por su id, borrar un blog por su id y actualizar un blog por el id.
- Se implementa la creación de usuarios, estos serán guardados en la misma base de datos de mongo por lo que se utilizará el ID de objeto para hacer referencia entre los blog y los usuarios.
- Se crea el modelo de user 
- Se modifica el modelo de blog para relacionarlo con el usuario que lo publicó
- Se crea el controlador de user y se añade la ruta post para la creación de un nuevo usuario
- Descarga de la librería bcrypt para guardar la contraseña como un hash
- Se crea el get para todos los usuarios

- En el modelo de blogs de agrega la propiedad de user necesaria para poder tener asociado cada blog con el usuario que la creó. También se modifica el controlador de blogs para recibir esta información y actualizar los datos en el usuario correspondiente.
- Se utiliza el método populate() para mostrar el usuario asociado a cada blog
- Los dos últimos cambios también se hacen del lado del controlador y modelo del usuario para mostrar la información necesaria.
- Implementar la autenticación basada en token. Para esto se comienza instalando jsonwebtoken
- Se crea el controlador parla autenticación como login.js
- Para poder crear un blog logueado se modifica la ruta post de api/blogs para que acepte el token vigente
- viene el paso 8 ahora... 