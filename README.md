## Practica 8 de Temas Emergentes
Ariel Eduardo Borbon Izaguirre 252116


¿qué línea del Service o del Controller tuvo que cambiar para que Clases hablara con MySQL?
Ninguna, como el service siempre hablo con una interfaz, para todo el sistema es como si no hubiera cambiado nada, por lo que todo funciono exactamente igual sin mover nada


¿por qué InscripcionesService no tuvo que cambiar ni una línea de las reglas de cupo y duplicados?
porque toda esta logica esta obligatoriamente en el service, mientras que se siga inyectando la dependencia con la interfaz, todas las reglas de validacion se van a mantener igual para cualquier BD que se conecte


¿por qué una interfaz no puede validar nada en tiempo de ejecución?
porque las interfaces al pasarse a JS desaparecen, por lo que algo como class-validator no tendria de donde validar, pero las clases si se mantienen


¿qué código de estado responde y qué trae en el cuerpo?
con un 400 bad request y un mensaje que dice que no deberia existir


¿cuántas líneas quedó más corto el controlador?
alrededor de 10-20 lineas, ya que se borraron los try catch y las validaciones de ahi mismo


¿quién bloquea realmente y a quién protege?
el que bloquea es el navegador, el servidor recibe y envia la informacion, pero el navegador no le da la informacion al cliente ya que no esta autorizado, esto sirve para proteger al usuario en caso de que una pagina con virus haga peticiones en su nombre con la sesion activa