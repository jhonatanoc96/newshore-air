## Despliegue inicial
# Versión de Angular CLI utilizada: ^17.1.1

-Clonar repositorio 'https://github.com/jhonatanoc96/newshore-air'.
-Ejecutar `npm install`
-Ejecutar `ng serve`

## Temas pendientes por implementar

- Test unitarios.
- Informar al usuario que su consulta no pudo ser procesada en caso de que no exista la ruta.
- Implementación Front End del problema 4 - Selección de moneda. (Implementación de lado de back funcional, utilizando API de "https://onesimpleapi.com/api/exchange_rate" para realizar conversiones, sin embargo no se alcanzó a asociar la funcionalidad a ningún componente HTML).

## Notas
-States Manager: Se está almacenando el origen y destino ingresado por el usuario en variables de estado, utilizado @ngrx/store
-Interceptors: A todas las peticiones HTTP enviadas desde la aplicación, se está agregando un token genérico haciendo uso de un 'Interceptor', agregando un 'Authorization' a los headers.
- Inyection Tokens: Las URL's y tokens utilizados en el código se están enviando por medio de Inyection tokens.
