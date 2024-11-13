¿Qué es un closure? ¿Dónde en el código hay un closure?

Un closure es una función que recuerda el contexto en el que fue creada, es decir, guarda las variables que estaban en su alcance en ese momento. En este código, un ejemplo de closure es la función sortItems() dentro de sortingMixin. Esta función accede a sortKey y sortAsc, propiedades definidas en data del mixin, para alternar el orden de los elementos según estos valores. Gracias a los closures, la función sortItems() puede “recordar” y usar estos valores aunque esté siendo llamada desde otro componente.

¿Cuáles son los posibles efectos secundarios en alguna función? ¿Podrías señalar algún caso en tu código? ¿Son esperados? ¿Pueden evitarse?

Los efectos secundarios ocurren cuando una función cambia algo fuera de su alcance directo, como el estado global, el DOM, o al hacer una solicitud HTTP. En fetchJokes(), el efecto secundario esperado es la actualización de jokes en el estado data porque hace una solicitud HTTP. Este efecto es necesario para traer los datos de la API y no debería evitarse. Sin embargo, agregamos un manejo de errores para evitar que, en caso de fallos en la solicitud, la aplicación se comporte de forma inesperada.
