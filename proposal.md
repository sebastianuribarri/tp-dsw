# Propuesta TP DSW

## Grupo
### Integrantes
- Benjamin Da Silva - 50371.
- Ignacio Relancio - 51778.
- Luciano Komorovski - 50173
- Sebastian Uribarri - 50382.

## Tema
### Descripción
La idea de la aplicación es el de desarrollar un entorno en el cual los usuarios se registren y puedan consultar tantos partidos en vivo, como resultados de ligas o copas de futbol profesional. A su vez tambien poder permitir que el usario realice una serie de predicciones sobre los partidos proximos, otogandole diversos puntos con los aciertos que realice. 

Para la proxima entrega se desarrolla el CRUD de la clase usuario.

### Modelo
![imagen del modelo]()
![image](https://github.com/sebastianuribarri/tp-dsw/assets/161463568/3a11cb0f-1d1f-4c57-8278-f4f1c8d5d1d4)

## Alcance Funcional 

### Alcance Mínimo

Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD TEMPORADA<br>2. CRUD LIGA<br>3. CRUD JUGADOR<br>4. CRUD Usuario|
|CRUD dependiente|1. CRUD Equipo {depende de} CRUD Temporada y Liga<br>2. CRUD Partido {depende de} CRUD Temporada y Liga|
|Listado<br>+<br>detalle| 1. Listado de los partidos de un equipo, muestra fecha, estado (programado, en vivo, ya jugado) y equipos => detalle CRUD Temporada, liga, alineacion y eventos<br> 2. Listado de equipos de una liga, mostrando puntos y ordenado por posicion => detalle muestra jugadores y listado 1 (partidos)|
|CUU/Epic|1. Registrarse o iniciar sesion<br>2. Realizar una apuesta de un partido|


Adicionales para Aprobación
|Req|Detalle|
|:-|:-|
|CRUD |1. CRUD TEMPORADA<br>2. CRUD LIGA<br>3. CRUD JUGADOR<br>4. CRUD Usuario<br>5. CRUD Equipo<br>6. CRUD Partido<br>7. CRUD Evento<br>7. CRUD Apuesta<br>8. CRUD voto|
|CUU/Epic|1. Registrar usuario o iniciar sesion<br>2. Realizar una apuesta de un partido<br>3. Realizar un voto a mejor jugador de un partido|
