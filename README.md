## Base de datos
En este proyecto se utiliza <strong>firebase</strong> como base
de datos. La elección de esta BBDD se debe a aportar rapidez en la solución, ya que  el modelo propuesto no es muy complejo. No es necesario hacer nada para establecer la conexión con esta BBDD, ya que esta se precarga en el fichero <strong>[.env](./server/\.env)</strong> en la carpeta del servidor.

## Despliegue del servidor
Antes de comenzar con el inicio del servidor, debe se debe de tener instalado el entorno de ejecución de <i>JavaScript</i> [NodeJs](https://nodejs.org/en/).

Con este entorno ya preparado, nos movemos al directorio de nombre <strong>server</strong> y abrimos una consola para ejecutar la siguiente instrucción e instalar así las dependencias utilizadas.
```
$ npm install --force
```
Para iniciar el servidor, basta con utilizar el siguiente comando que se muestra a continuación:
```
$ npm start
```
La dirección despliegue del servidor, será http://localhost:8888.

### Tests con Postman
En el directorio [postman.test](./server/postman.tests/) se incluyen los tests realizados para comprobar el funcionamiento de la API. Para ello, se proporciona el fichero [usersapp.postman_collection-tests.json](./server/postman.tests/usersapp.postman_collection-tests.json); que se debe de importar en la aplicación postman para su uso. Los tests son <strong>manuales</strong>; es decir, se debe ejecutar el caso que se quiera comprobar.

## Despliegue del cliente
Al igual que con el servidor, hay que asegurarse de tener instalado NodeJs. Tras esto, actuamos de la misma manera, pero en este caso, nos deberemos de mover al directorio de nombre <strong>client</strong>.
Los comandos para instalar dependencias e iniciar la aplicación son los mismos:
```
$ npm install --force
$ npm start
```
