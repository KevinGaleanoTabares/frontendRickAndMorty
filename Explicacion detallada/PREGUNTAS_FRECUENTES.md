# ❓ PREGUNTAS FRECUENTES - Para tu Presentación

---

## 1. ¿POR QUÉ USAS REACTIVE FORMS EN VEZ DE TEMPLATE FORMS?

### Tu respuesta:
```
Usamos Reactive Forms porque:

1. VALIDACIÓN MÁS ROBUSTA
   • Todos los validadores están en el código TypeScript
   • Fácil de debuggear
   • Fácil de probar

2. ACCESO FÁCIL AL ESTADO DEL FORMULARIO
   • registerForm.invalid (está mal?)
   • registerForm.touched (fue tocado por el usuario?)
   • registerForm.dirty (fue modificado?)

3. CONTROL DINÁMICO
   • Podemos crear campos a nivel de código
   • Podemos agregar/remover validadores en runtime

4. PATRÓN MÁS PROFESIONAL
   • Las aplicaciones grandes usan Reactive Forms
   • Es más escalable
```

---

## 2. ¿QUÉ PASA SI ALGUIEN INTENTA ACCEDER A /USERS SIN TOKEN?

### Tu respuesta:
```
El AuthGuard lo intercepta:

PASO 1: Usuario accede a /users
        ↓
PASO 2: app-routing.module.ts ve que la ruta tiene canActivate: [AuthGuard]
        ↓
PASO 3: AuthGuard.canActivate() se ejecuta
        ↓
PASO 4: Busca en localStorage.getItem('token')
        ↓
        ¿Token existe?
        │
    ┌───┴───┐
    ▼       ▼
   SÍ      NO
    │       │
    ▼       ▼
 true    router.navigate(['login'])
(acceso) return false (RECHAZA acceso)

Si no hay token, redirige a /login automáticamente.
```

---

## 3. ¿CÓMO FUNCIONA LA AUTENTICACIÓN CON TOKEN?

### Tu respuesta:
```
FASE 1: REGISTRO
────────────────
Usuario completa registerForm:
  • name: "Juan"
  • email: "juan@example.com"
  • password: "SecurePass@123"
  • age: 25

Se envía: POST /auth/register { ...datos }
Backend crea el usuario en BD

─────────────────────────────────────────────

FASE 2: LOGIN
─────────────
Usuario completa loginForm:
  • email: "juan@example.com"
  • password: "SecurePass@123"

Se envía: POST /auth/login { ...datos }

Backend responde:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  "user": { name, email, age, ... }
}

Nosotros guardamos:
  localStorage.setItem('token', response.data.token);

─────────────────────────────────────────────

FASE 3: USAR RECURSOS PROTEGIDOS
─────────────────────────────────────
Usuario accede a /users

Se envía: GET /users
CON HEADER: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Backend verifica el token:
  ¿Token válido? SÍ ✅ → Devuelve usuarios
              NO ❌ → Error 401 (Unauthorized)

─────────────────────────────────────────────

FASE 4: LOGOUT
───────────────
Usuario clickea "Cerrar sesión"

Se ejecuta:
  localStorage.removeItem('token');
  router.navigate(['login']);

Ahora no hay token, así que vuelve al login.
```

---

## 4. EN TU PROYECTO, ¿DE DÓNDE VIENE LA DATA?

### Tu respuesta:

```
┌─────────────────────────────────────────────────────────┐
│  TU FRONTEND (Angular)          │  BACKEND (Node.js)   │
│                                 │                       │
│  Necesita usuarios              │                       │
│  ├─ getUsers()                  │                       │
│  └─ axios.get('/users', {       │                       │
│       headers: {token}    ──────┼──→ Recibe request    │
│     })                          │    Valida token       │
│                                 │    Busca en BD        │
│                                 │    Responde array     │
│  Recibe respuesta  ←────────────┼─ [{ id, name... }]  │
│  └─ this.users = res.data       │                       │
│                                 │                       │
└─────────────────────────────────────────────────────────┘

USUARIOS: Del backend local (Node.js en puerto 3000)
CHARACTERS: De API externa (Rick and Morty)

getUsers()           ← GET /users (Tu backend)
getCharacters()      ← GET https://rickandmortyapi.com/api/character
                       (API pública, no necesita token)
deleteUser(id)       ← DELETE /users/:id (Tu backend con token)
updateUser(id, data) ← PUT /users/:id (Tu backend con token)
```

---

## 5. ¿QUÉ SIGNIFICA `$event` EN LOS TEMPLATES?

### Tu respuesta:

```
$event es el ARGUMENTO que emite el child component.

EJEMPLO 1: event simple (sin argumento)
───────────────────────────────────────
Child emite:
  this.addUser.emit(); // ← No envía nada

Parent recibe:
  (addUser)="openCreateModal()"
  ← No necesita $event porque no hay argumento

─────────────────────────────────────────

EJEMPLO 2: event con argumento (STRING)
─────────────────────────────────────────
Child emite:
  this.search.emit("Juan"); // ← Envía string

Parent recibe:
  (search)="receiveSearch($event)"
  ← $event = "Juan" (el string que emitió el child)
  └─ receiveSearch(text: string) {
       this.userSearch = text; // text = "Juan"
     }

─────────────────────────────────────────

EJEMPLO 3: event con objeto complejo
──────────────────────────────────────
Child emite:
  this.editUser.emit({ id: 1, name: "Juan", age: 25 });

Parent recibe:
  (editUser)="openEditModal($event)"
  ← $event = { id: 1, name: "Juan", age: 25 }
  └─ openEditModal(user: any) {
       this.userForm.patchValue(user);
     }

────────────────────────────────────────

EN RESUMEN:
$event = Lo que el child emitió en emit()
```

---

## 6. ¿CÓMO VALIDA ANGULAR LOS FORMULARIOS EN TIEMPO REAL?

### Tu respuesta:

```
PASO 1: Se crea el FormGroup
────────────────────────────
this.registerForm = this.fb.group({
  password: ['', [Validators.required, Validators.pattern(...)]]
});

PASO 2: En el HTML se vincula
────────────────────────────
<input formControlName="password" />

PASO 3: Usuario ESCRIBE en el input
────────────────────────────────────
Usuario: "abc" (ESCRIBIENDO)

PASO 4: Angular DETECTA el cambio (Change Detection)
────────────────────────────────────
Angular dice: "El valor cambió, debo validar"

PASO 5: Angular EJECUTA los validadores
─────────────────────────────────────────
Validators.required: "¿Está vacío?" NO ✅
Validators.pattern(): "¿Cumple la regex?" 
                      "¿Tiene minúscula?" SÍ ✅
                      "¿Tiene mayúscula?" NO ❌
                      FALLA

PASO 6: Actualiza el estado del formulario
──────────────────────────────────────────
registerForm.valid = false
registerForm.get('password').hasError('pattern') = true

PASO 7: Se actualiza el HTML (2-way binding)
─────────────────────────────────────────────
*ngIf="registerForm.get('password').hasError('pattern')"
↓
Muestra: "La contraseña no cumple los requisitos"

─────────────────────────────────────

PASO 8: Usuario ESCRIBE "SecurePass@123"
─────────────────────────────────────────
Angular detecta cambio → ejecuta validadores → PASAN ✅
registerForm.valid = true
El botón "Registrar" se activa [disabled]="registerForm.invalid"

─────────────────────────────────────

EN RESUMEN:
Usuario escribe → Angular detecta → Valida → Actualiza UI
(TODO ESTO SUCEDE EN TIEMPO REAL, EN MILISEGUNDOS)
```

---

## 7. ¿QUÉ ES `markAllAsTouched()`?

### Tu respuesta:

```
markAllAsTouched() es un MÉTODO para mostrar errores.

PROBLEMA:
─────────
El usuario accede a /register.
No ha escrito nada.
Si intentamos mostrar errores así:

<span *ngIf="registerForm.get('name').hasError('required')">
  Campo requerido
</span>

NO MUESTRA NADA (porque el usuario no ha "tocado" el campo)

SOLUCIÓN:
─────────
En el método register():

if (this.registerForm.invalid) {
  this.registerForm.markAllAsTouched();
  // ↑ Marca TODOS los campos como "tocados"
  return;
}

Ahora Angular PUEDE mostrar los errores porque:
- registerForm.get('name').touched = true
- *ngIf muestra: *ngIf="registerForm.get('name').touched && hasError('required')"

────────────────────────────────────

EN RESUMEN:
markAllAsTouched() = "Muestra TODOS los errores de validación"
```

---

## 8. ¿CUÁL ES LA DIFERENCIA ENTRE `patchValue()` Y `setValue()`?

### Tu respuesta:

```
PATCHVALUE()
────────────
Actualiza SOLO algunos campos del formulario.

Formulario actual:
{
  name: "Juan",
  email: "juan@example.com",
  password: "",
  age: 0
}

Ejecutas:
this.registerForm.patchValue({
  name: "Carlos"
  // ↑ Solo actualiza name
});

Resultado:
{
  name: "Carlos",          ← CAMBIÓ
  email: "juan@example.com" ← Igual
  password: "",            ← Igual
  age: 0                   ← Igual
}

USO EN TU PROYECTO:
In openEditModal(user):
  this.userForm.patchValue({
    name: user.name,
    email: user.email,
    // No incluimos password (la dejamos vacía)
    age: user.age
  });

─────────────────────────────────────

SETVALUE()
──────────
Actualiza TODOS los campos (si falta uno, LANZA ERROR).

Ejecutas:
this.registerForm.setValue({
  name: "Carlos",
  // ❌ FALTA email → LANZA ERROR

  // Tienes que incluir TODO:
  name: "Carlos",
  email: "carlos@example.com",
  password: "SecurePass@123",
  age: 30
});

USO EN TU PROYECTO:
In openCreateModal():
  this.userForm.reset({
    name: '',
    email: '',
    password: '',
    age: 0,
    _id: ''
  });
  // ↑ reset() es como setValue() pero con valores por defecto

─────────────────────────────────────

EN RESUMEN:
patchValue() = Actualiza algunos campos (flexible)
setValue()   = Actualiza todos los campos (requiere todos)
```

---

## 9. ¿QUÉ PASA CUANDO LLAMAS A `loadCharacters()`?

### Tu respuesta:

```
CharactersComponent.ts:

async ngOnInit() {
  this.loadCharacters(); // ← Se ejecuta al cargar el componente
}

async loadCharacters() {
  try {
    const res = await getCharacters(this.currentPage);
    // ↑ Petición HTTP a Rick and Morty API

    this.characters = res.data.results;
    // ↑ res.data = { info: {pages: X}, results: [...personajes...] }
    // ↑ Extrae el array de personajes

    this.totalPages = res.data.info.pages;
    // ↑ Extrae el total de páginas

    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
}

EXPLICACIÓN:
────────────

PASO 1: Se llama loadCharacters()

PASO 2: Realiza petición: 
  GET https://rickandmortyapi.com/api/character?page=1

PASO 3: Rick and Morty API responde:
{
  "info": {
    "count": 671,     ← Total de personajes en toda la API
    "pages": 34,      ← Total de páginas
    "next": "https://...",
    "prev": null
  },
  "results": [
    {
      "id": 1,
      "name": "Rick Sanchez",
      "status": "Alive",
      "image": "https://..."
    },
    { ... más personajes ... }
  ]
}

PASO 4: Extraemos lo importante:
  this.characters = res.data.results
  this.totalPages = res.data.info.pages

PASO 5: El HTML muestra los personajes:
  *ngFor="let character of characters"
  └─ <img [src]="character.image" />
     <h2>{{ character.name }}</h2>

PASO 6: Usuario puede paginar:
  nextPage() {
    this.currentPage++;
    this.loadCharacters(); // ← Carga la siguiente página
  }

────────────────────────────────────

EN RESUMEN:
loadCharacters() obtiene personajes del API de Rick and Morty
y los almacena en this.characters para mostrar en el HTML
```

---

## 10. ¿POR QUÉ `ngOnInit()` ES `async` PERO RETORNA `void`?

### Tu respuesta:

```
PREGUNTA: En tu código ves:
──────────────────────────
async ngOnInit(): void {
  this.loadUsers();
}

¿No debería ser:
  ngOnInit(): Promise<void> {
    ...
  }
?

RESPUESTA CORTA:
────────────────
Angular espera que ngOnInit() sea void, NO Promise.

EXPLICACIÓN:
────────────

async ES UNA PALABRA RESERVADA que automáticamente convierte
una función a que RETORNE un Promise.

Pero Angular no ESPERA el resultado del Promise.

Así que aunque escribas:
  async ngOnInit(): void { ... }

Angular la ejecuta PERO NO ESPERA A QUE TERMINE.

Ejemplo:
────────
export class UsersComponent implements OnInit {
  
  users: any[] = [];

  async ngOnInit(): void {
    // ← Aquí empezamos (time=0ms)
    
    const res = await getUsers();
    // ← Espera 500ms (por ejemplo) a que el backend responda
    
    this.users = res.data;
    // ← Aquí termina (time=500ms)
  }

  // Pero Angular AQUÍ YA MOSTRÓ EL COMPONENTE (time=0ms)
  // Así que this.users aún está vacío []
  // Hasta que pase el tiempo y se cargue
}

MEJOR PRÁCTICA:
────────────────
NO hacer ngOnInit() async. En su lugar:

ngOnInit(): void {
  this.loadUsers(); // ← No await, solo llama
}

async loadUsers() {
  // ← La función async está DENTRO
  const res = await getUsers();
  this.users = res.data;
}

Así Angular no se confunde.

────────────────────────────────────────

EN TU PROYECTO:
───────────────
En CharactersComponent:

async ngOnInit() {
  this.loadCharacters();
}

↓ Debería ser:

ngOnInit() {
  this.loadCharacters();
}

async loadCharacters() {
  const res = await getCharacters(this.currentPage);
  this.characters = res.data.results;
}

(El código ya funciona igual, pero esta es la mejor práctica)
```

---

## 11. ¿CUÁL ES LA DIFERENCIA ENTRE COMPONENTE Y SERVICIO?

### Tu respuesta:

```
COMPONENTE
──────────
• Es la VISTA + LÓGICA de una parte de la app
• Tiene HTML (template)
• Tiene CSS (estilos)
• Tiene TypeScript (lógica)
• Ejemplos: RegisterComponent, UsersComponent, LoginComponent

SERVICIO
────────
• Es SOLO LÓGICA (código reutilizable)
• NO tiene HTML ni CSS
• Es una "caja de herramientas"
• Se inyecta en componentes para usarse
• Ejemplos: api.service.ts (todas las peticiones HTTP)

EN TU PROYECTO:
───────────────

// api.service.ts (SERVICIO)
export const getUsers = () => {
  return axios.get(`${API}/users`, { headers: { ... } });
};

// users.component.ts (COMPONENTE que USA el servicio)
export class UsersComponent implements OnInit {
  constructor(private fb: FormBuilder) { }
  
  async loadUsers() {
    const res = await getUsers(); // ← Usa el SERVICIO
    this.users = res.data;
  }
}

────────────────────────────────────────────

¿POR QUÉ SEPARAR?
─────────────────
1. REUTILIZACIÓN: Muchos componentes pueden usar getUsers()
2. TESTEO: Fácil de probar un servicio aislado
3. MANTENIMIENTO: Si el API cambia, solo modificas el servicio
4. RESPONSABILIDAD: Componente = UI, Servicio = datos
```

---

## 12. SI TÚ FUERAS ENTREVISTADOR, ¿QUÉ PREGUNTARÍAS?

### Preguntas "trampa":

```
1. "¿Qué pasa si el usuario intenta crear una contraseña 
   que NO cumple la validación?"
   
   Respuesta correcta:
   • El formulario se marca como invalid
   • El botón "Registrar" está deshabilitado [disabled]
   • Se muestran mensajes de error
   • NO se envía la petición al backend

2. "¿Qué diferencia hay entre localStorage y localStorage.getItem()?
   
   Respuesta correcta:
   • localStorage = el objeto global
   • localStorage.getItem('token') = obtiene el valor de 'token'
   • localStorage.setItem('token', value) = guarda un valor
   • localStorage.removeItem('token') = elimina un valor

3. "¿Qué pasa si el backend no responde en 5 segundos?"
   
   Respuesta correcta:
   • Axios espera por defecto 0ms (infinito)
   • El usuario espera ⏳
   • Podrías agregar un timeout: axios.defaults.timeout = 5000
   • Y manejar el error en catch

4. "¿Por qué guardas el token en localStorage y no en una variable?"
   
   Respuesta correcta:
   • localStorage persiste entre recargas de página
   • Si usas una variable, al recargar se pierde
   • localStorage = los datos sobreviven al refresh

5. "¿Cómo protegerías mejor tu aplicación?"
   
   Respuesta profesional:
   • Usar HTTPS (no HTTP)
   • Implementar refresh tokens (tokens que expiran)
   • Guardar token en httpOnly cookies (más seguro que localStorage)
   • Validar en el backend (ya lo hace)
   • Implementar CORS correctamente
```

---

## 13. GLOSARIO RÁPIDO

```
Angular       = Framework para SPA (Single Page Application)
Component     = Bloque de UI reutilizable
Service       = Código lógico reutilizable (sin UI)
Directive     = Instrucción en HTML (*ngIf, *ngFor, etc.)
Pipe          = Transforma datos en templates ({{ date | date:'short' }})
Guard         = Protege rutas (AuthGuard)
Interceptor   = Intercepta peticiones HTTP
FormGroup     = Grupo de campos de formulario
Validators    = Reglas de validación
Reactive      = Formularios controlados por código (mejor)
Template      = Formularios controlados por HTML (más simple)
RxJS          = Librería de programación reactiva (observables)
Observable    = Patrón reactivo (flujo de datos)
Promise       = Promesa de un valor futuro (async/await)
async/await   = Forma moderna de manejar promises
Event Emitter = Emite eventos del child al parent
Input         = Recibe datos del parent
Output        = Envía eventos al parent
localStorage  = Almacenamiento persistente en el navegador
JWT           = Token de autenticación (contiene datos del usuario)
Token         = Identificador único del usuario autenticado
API           = Interfaz para comunicarse con el backend
axios        = Librería HTTP para peticiones (similar a fetch)
```

---

## 🎯 ÚLTIMO CONSEJO PARA TU PRESENTACIÓN

```
ESTRUCTURA SUGERIDA:
────────────────────

1. (2 min) "Hola, este es mi proyecto Angular"
   └─ Muestra la app funcionando

2. (3 min) "¿Qué hace?"
   └─ Explica: login, usuarios, personajes

3. (3 min) "¿Cómo fluyen los datos?"
   └─ Muestra el diagrama de Input/Output
   └─ Muestra Users → UserTable

4. (2 min) "Validación de contraseñas"
   └─ Explica la regex paso a paso
   └─ Muestra ejemplos que fallan/pasan

5. (2 min) "Reactive Forms"
   └─ Muestra el código del formulario
   └─ Explica markAllAsTouched()

6. (2 min) "Autenticación"
   └─ Explica flujo login → token → localStorage

7. (1 min) "Preguntas?"

────────────────

RECUERDA:
• Habla claro y lento
• Mira a tu audiencia, no a la pantalla
• Sé honesto si no sabes algo ("Es buena pregunta, déjame investigar")
• Muestra código en la pantalla (es mejor que solo hablar)
• Practica antes (al menos 2 veces)
```

¡Mucho éxito en tu presentación! 🚀
