- 1:

 npm install -D tailwindcss postcss autoprefixer = -D ,El comando oficial es tailwindcss para la instalación oficial, lo que hace postcss es ser el traductor de CSS, cuando se escribe una clase Tailwind lo que hace Postcss es traducirlo para que se suba CSS estándar a internet, cuando yo uso -D lo que estoy haciendo es qeu el archivo final automaticamente se usarán las clases qeu yo escogi, en CSS escogi por ejemplo text-align: 20; y despues de un largo tiempo tuve que volver a usar esa clase en toro lado entonces si eso pasa con otras clases el codigo se vuelve mas grande, con Tailwind lo que pasa es que estoy obligado a usar la clase y si la borro se borrara para tener mas espacio, y si uso esa clase y la uso en otro lado lo que sucede es que en ek archivo CSS final se marcará que la use una sola vez así la haya usado 100 veces en el proyecto. El beneficio de usar Tailwind es evitar tener que cambiar entre archivos html y css se puede hacer todo en un mismo archivo, y si en css tenemos 2000 lineas donde realmente usamos solo 500, ocupa espacio en cambio con Tailwind guarda de verdad las clases que usamos para qeu sea mas liviano el proyecto y no sea pesado haceindo que pueda pasar de 10 mb de peso el css a solo 10 k.

- -D (--save-dev): Crea el archivo CSS borrando las lineas innecesarias, y lee en el archivo package.json para descargar lo necesario para construir el CSS sin errores ya que internet no lee Tailwind, una vez construido la aplicación que usamos para subir nuestra página borra automáticamente los constructores del CSS.

- Tailwindcss: Nombre oficial para descargar Tailwind.

- postcss: Traduce de Tailwind a CSS.

- autoprefixer: Asegura que se aplique mi diseño CSS en todos los navegadores, se hace automático para evitar escribir líneas demás.



//////////////////////////////////////////////////////////////////////////////////////////////////////////////



- 2: frontend\tailwind.config.js





//////////////////////////////////////////////////////////////////////////////////////////////////////////////



- 3: frontend\src\styles.css



//////////////////////////////////////////////////////////////////////////////////////////////////////////////


- 4: Instalación de Axios npm install axios




//////////////////////////////////////////////////////////////////////////////////////////////////////////////



- 5: frontend\src\app\services\api.service.ts




//////////////////////////////////////////////////////////////////////////////////////////////////////////////



- 6: frontend\src\app\components\register\register.component.html


//////////////////////////////////////////////////////////////////////////////////////////////////////////////



- 7: frontend\src\app\components\register\register.component.ts


//////////////////////////////////////////////////////////////////////////////////////////////////////////////



- 8: frontend\src\app\app.module.ts



//////////////////////////////////////////////////////////////////////////////////////////////////////////////



- 9: frontend\src\app\app.component.html



//////////////////////////////////////////////////////////////////////////////////////////////////////////////



- 10: frontend\src\app\components\login\login.component.ts



//////////////////////////////////////////////////////////////////////////////////////////////////////////////



- 11: frontend\src\app\components\dashboard\dashboard.component.ts



//////////////////////////////////////////////////////////////////////////////////////////////////////////////



- 12: frontend\src\app\components\dashboard\dashboard.component.html



//////////////////////////////////////////////////////////////////////////////////////////////////////////////


