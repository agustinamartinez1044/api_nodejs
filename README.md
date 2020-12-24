# api_nodejs
 
Desarrollo de una API capaz de dar soportar a las siguientes acciones que serán
consumidas por aplicaciones clientes :
- registrar usuario
- autenticar usuario
- obtener películas ( con opción de búsqueda por una keyword )
- agregar pelicula a favoritos
- obtener películas favoritas


Integracion de la API implementada con una API externa para obtener
un listado de peliculas de https://www.themoviedb.org/documentation/api?language=es

Se simula la base de datos teniendo archivos almacenados en el root folder del proyecto que puedan ser leídos / escritos y que contendrán la
información que la API manejara en formato JSON ( users.txt y favoritos.txt) 
