## Practica 10 de Temas Emergentes
Ariel Eduardo Borbon Izaguirre 252116

# PARTE 1:

¿por qué el filtro atrapa la clase base y no cada error por separado?
porque como usamos el ErrorDominio, NestJS va agarrar cualquier error que salga de ella, esto ahorra el trabajo de colocar todos los catchs al crear otro error


¿por qué este middleware no podría decidir si un usuario tiene permiso para una ruta?
porque para este momento ni siquiera NestJS a enrutado la peticion, por lo que ni sabe que controlador la va a usar ni puede ver los decoradores de @Publico por ejemplo


¿por qué la petición que responde 409 no aparece en ese registro?
porque solo se ejecuta cuando hay exito, si hay un 409 se manda directo al exceptionFilter, omitiendose ese codigo 


¿por qué este cambio rompe a cualquier cliente que ya estuviera usando la API?
porque se cambia lo que se esperaba que llegara, si se recibian varias clases antes, algo como { {}, {}}, ahora se recibe {data: {} , meta: {}}, por lo que todos los que usaban la estructura tendran que adaptarse a esta nueva


# PARTE 2:

¿quién bloquea y a quién protege?
el navegador web, protege ante un sitio malicioso (sitio fuera del origen) haga peticiones a la api como el usuario sin permiso


¿por qué el campo se llama passwordHash y no password?
porque si se coloca password podria confundirse y colocarse la contraseña real, cosa que nunca se deberia hacer


¿por qué los dos errores del inicio de sesión dicen exactamente lo mismo?
porque si colocaramos solo el que esta mal, alguien podria probar correos o contraseñas hasta que una funcionara, si colocamos ambas cosas nos ahorramos ese problema


¿qué es lo que protege la firma?
El token en si y la autenticidad, garantizando que el cliente no la modifico (si quisiera cambiarse a admin le daria error porque no hicieran match)

¿por qué es más seguro proteger todo y abrir a mano, que al revés?
para no exponer algo sin querer, si todo esta publico por default por algun error podriamos dejar algo que no queremos a la vista, si usamos algo como @publico tenemos que colocar forzosamente todo lo que queremos que las personas usen, ahorrandonos ese problema


¿cuál es la diferencia entre un 401 y un 403?
el 401 es que no estas autorizado (no se sabe quien eres, por token invalido o expirado) y el 403 es que el sistema si sabe quien eres pero lo que quieres hacer no esta permitido para tu rol (como un usuario tratando de borrarle la cuenta a otro usuario)

¿cuántas líneas del AuthService tuvieron que cambiar para pasar de memoria a MySQL? ¿Por qué?
0, porque el service depende de una interfaz, mientras se cumpla el contrato al service no le importa de donde se saquen o guarden los datos





¿por qué es importante tomar al usuario de los claims del token y no de un parámetro de la URL o del cuerpo? Da un ejemplo concreto de qué pasaría si la API confiara en algo como GET /miembros/3/inscripciones o en el miembroId del cuerpo sin compararlo contra el token. Explica qué claim se usa y por qué el cliente no puede falsificarlo 

si la api se basara en el parametro de la API (GET /miembros/3/inscripciones), un usuario perfectamente podria cambiar el 3 por un 1 y ver los datos de otra persona que no deberia ver

entonces usamos claim sub / miembroId (que va adentro del payload JWT, el cual es inmodificable) y apenas que alguien tenga el JWT_SECRET es imposible que se pueda hacer algo como lo de ver la info de otra persona