# 📚 EXPLICACIÓN COMPLETA DE TU PROYECTO ANGULAR

---

## 🎯 PARTE 1: LO MÁS IMPORTANTE DEL PROYECTO

### ¿Qué es tu proyecto?
Es una **aplicación web Angular** que gestiona:
- **Usuarios**: Crear, editar, buscar y eliminar usuarios (conecta con un backend en Node.js)
- **Personajes**: Muestra personajes de la API de Rick and Morty (sin necesidad de backend propio)
- **Autenticación**: Sistema de login/register con tokens JWT almacenados en localStorage
- **Protección de rutas**: Solo usuarios autenticados pueden acceder a ciertos datos

### Estructura general:
```
📦 Proyecto Angular
├── 🔐 AUTENTICACIÓN (Login/Register)
│   └── Genera token JWT → Se guarda en localStorage
├── 🛡️ AUTH GUARD
│   └── Valida que haya token antes de entrar a rutas protegidas
├── 📡 API SERVICE
│   └── Realiza peticiones HTTP a backend y API externa
├── 📊 COMPONENTES
│   ├── Users (Gestión de usuarios)
│   ├── Characters (Galería de personajes)
│   └── Profile (Perfil del usuario)
└── 🎨 UI (HTML con Tailwind CSS)
```

### Flujo típico:
```
1. Usuario accede → ¿Hay token? → NO → Redirige a Login
2. Login exitoso → Se almacena token en localStorage
3. Usuario ahora puede acceder a Characters/Users/Profile
4. Las peticiones HTTP envían el token en headers para autenticarse
```

---

## 📤📥 PARTE 2: INPUT y OUTPUT (Comunicación entre Componentes)

### Concepto Base (que ya entiende):
- **@Input**: Padre → Hijo (envía datos)
- **@Output**: Hijo → Padre (envía eventos)

### ¿Cómo lo usa tu proyecto?

#### 🔍 EJEMPLO 1: User-Search Component (CHILD)

**Archivo:** `src/app/components/user-search/user-search.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core'; // ← Importa Output

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
})
export class UserSearchComponent implements OnInit {

  searchText: string = '';

  @Output()  // ← "Prepárate para EMITIR un evento hacia el padre"
  search = new EventEmitter<string>(); // ← Puede emitir STRING

  @Output()  // ← Otro evento diferente
  addUser = new EventEmitter<void>(); // ← Emite NADA (void)

  searchUser() {
    this.search.emit(this.searchText); // ← EMITE el texto al padre
  }

  openModal(){
    this.addUser.emit(); // ← EMITE un evento al padre
  }
}
```

**HTML del Child:**
```html
<input [(ngModel)]="searchText" placeholder="Buscar Usuario" />
<button (click)="searchUser()">Buscar</button>
<button (click)="openModal()">Añadir Usuario</button>
```

#### 📋 EJEMPLO 2: User-Table Component (CHILD)

**Archivo:** `src/app/components/user-table/user-table.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core'; // ← Ambos

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
})
export class UserTableComponent implements OnInit {

  @Input()  // ← "Recibe datos del padre"
  users: any[] = []; // ← Array de usuarios DEL PADRE

  @Input()  // ← Otro input
  userSearch: string = ''; // ← Texto de búsqueda DEL PADRE

  @Output()  // ← Envía eventos al padre
  editUser = new EventEmitter<any>();

  @Output()  // ← Otro evento
  deleteUser = new EventEmitter<string>();

  @Output()  // ← Otro evento
  viewUser = new EventEmitter<any>();

  // Método que RECIBE datos del Input
  filteredUsers() {
    if (!this.userSearch) {
      return this.users; // ← USA el @Input userSearch
    }
    const text = this.userSearch.toLowerCase();
    return this.users.filter((u: any) => // ← USA el @Input users
      u.name.toLowerCase().includes(text) || 
      u.email.toLowerCase().includes(text) || 
      u.age.toString().includes(text)
    );
  }

  // Método que EMITE eventos
  confirmDeleteUser() {
    this.deleteUser.emit(this.selectedUserId); // ← Envía al padre
  }
}
```

**HTML del Child:**
```html
<table>
  <tr *ngFor="let u of filteredUsers()">
    <!-- Usa el array del @Input users a través de filteredUsers() -->
    <td>{{ u.name }}</td>
    <td>
      <button (click)="editUser.emit(u)">Editar</button>
      <!-- Emite el usuario clickeado al padre -->
    </td>
  </tr>
</table>
```

#### 👨‍👩‍👧 EJEMPLO 3: Users Component (PARENT)

**Archivo:** `src/app/components/users/users.component.ts`

```typescript
export class UsersComponent implements OnInit {

  users: any[] = []; // ← Datos que pasará al hijo
  userSearch = ''; // ← Texto que pasará al hijo

  // Método que RECIBE el evento del child (user-search)
  receiveSearch(text: string) {
    this.userSearch = text; // ← Guarda lo que envió el child
  }

  // Método que RECIBE el evento del child (user-table)
  openEditModal(user: any) {
    // ← Recibe el usuario que el child emitió
    this.editMode = true;
    this.userForm.patchValue(user); // ← Prepara formulario para editar
    this.showModal = true;
  }
}
```

**HTML del Parent:**
```html
<!-- Aquí envía datos AL HIJO (Input) y escucha eventos DEL HIJO (Output) -->

<!-- COMPONENTE 1: user-search (Solo Output, solo escucha eventos) -->
<app-user-search 
  (search)="receiveSearch($event)"     <!-- ← Escucha evento 'search' -->
  (addUser)="openCreateModal()">        <!-- ← Escucha evento 'addUser' -->
</app-user-search>

<!-- COMPONENTE 2: user-table (Input AND Output) -->
<app-user-table 
  [users]="filteredUsersByDate()"       <!-- ← Envía datos (Input) -->
  [userSearch]="userSearch"              <!-- ← Envía datos (Input) -->
  (editUser)="openEditModal($event)"    <!-- ← Escucha evento (Output) -->
  (deleteUser)="deleteUserById($event)" <!-- ← Escucha evento (Output) -->
  (viewUser)="openProfileModal($event)"> <!-- ← Escucha evento (Output) -->
</app-user-table>
```

### 🤔 ¿Cómo Angular entiende Input y Output?

Angular usa **decoradores** (`@Input` y `@Output`) que son **metadatos**:

1. **@Input** le dice a Angular: "Este componente puede RECIBIR datos del padre por este nombre"
2. **@Output** le dice a Angular: "Este componente puede ENVIAR eventos al padre por este nombre"
3. Cuando usas `[propiedad]` en HTML, Angular detecta el `@Input` y vincula datos
4. Cuando usas `(evento)` en HTML, Angular detecta el `@Output` y vincula la escucha

**Ejemplo en tiempo real:**
```html
<!-- En HTML del padre -->
<app-user-table [users]="users">

<!-- Angular ve [users] y busca en UserTableComponent -->
<!-- Encuentra: @Input() users: any[] -->
<!-- Entonces: "vale, voy a conectar this.users del padre al this.users del hijo" -->
```

---

## 🎯 PARTE 3: REACTIVE FORMS (Formularios Reactivos)

### ¿Qué son?
Son formularios **controlados por código TypeScript** (no por HTML). Angular vigila el estado del formulario en tiempo real.

### Estructura básica:

```typescript
// PASO 1: Importar FormBuilder y Validators
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class RegisterComponent implements OnInit {

  // PASO 2: Declarar el formulario
  registerForm!: FormGroup;

  // PASO 3: Inyectar FormBuilder
  constructor(private fb: FormBuilder) { }

  // PASO 4: Crear el formulario en ngOnInit
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      
      // Campo: nombre del control | Valores por defecto | Validadores
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      
      email: ['', [Validators.required, Validators.email]],
      
      password: ['', [Validators.required, Validators.pattern(...)]],
      
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]]
    });
  }
}
```

### En el HTML:

```html
<form [formGroup]="registerForm" (ngSubmit)="register()">
  
  <!-- Vincula el campo del grupo al input -->
  <input formControlName="name" placeholder="Nombre completo" />
  
  <!-- Muestra errores si existe validación -->
  <span *ngIf="registerForm.get('name')?.hasError('required')">
    Nombre requerido
  </span>
  
  <!-- El botón desactiva si el formulario es inválido -->
  <button [disabled]="registerForm.invalid">
    Registrar
  </button>

</form>
```

### Validaciones en tiempo real:

```typescript
async register() {
  // Si hay errores, marca todos los campos como "tocados" para mostrar errores
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    return;
  }

  // Si llegó aquí, el formulario es VÁLIDO
  try {
    const res = await registerUser(this.registerForm.value); 
    // ↑ .value obtiene { name: '...', email: '...', ... }
  } catch (error) {
    alert(error.response?.data?.message || 'Error');
  }
}
```

### Ventajas de Reactive Forms:

| Característica | Beneficio |
|---|---|
| Validación en tiempo real | Usuario ve errores mientras escribe |
| Formularios dinámicos | Puedes agregar/quitar campos en código |
| Testing fácil | Todo es código TypeScript |
| Valores y estados reactivos | `invalid`, `touched`, `dirty`, etc. |

---

## 🔐 PARTE 4: LA REGEX DE VALIDACIÓN (La línea que no entendías)

### La línea completa:
```typescript
Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{5,}$/)
```

### ¿Qué es una Regex (Expresión Regular)?
Es una **patrón de búsqueda** que valida si un texto cumple ciertos requisitos.

### DESMENUZAMIENTO LÍNEA POR LÍNEA:

```
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{5,}$/
│ │                                               │
│ └─ INICIO: Comienza desde el principio        │
│                                                 │
└────────────────────────────────────────────────┘
    FIN: Termina exactamente aquí
```

Ahora, vamos con cada COMPONENTE:

#### 1️⃣ `^` = INICIO DE LA CADENA
```
^
```
Significa: "El patrón debe empezar AQUÍ (sin caracteres antes)"

#### 2️⃣ `(?=.*[a-z])` = LOOKAHEAD - DEBE CONTENER MINÚSCULA
```
(?=.*[a-z])
│││││││││
│││││││└─ Cualquier minúscula: a, b, c, ... z
│││││││
│││││└─ Cero o más caracteres: *, significa "cualquier cosa, cualquier cantidad"
│││││
│││└─ Punto: . significa "cualquier carácter excepto salto de línea"
│││
│└─ ? y = : Lookahead positivo (mira adelante sin consumir caracteres)
│
└─ ( ) : Agrupar la condición
```

**En español:** "Verifica que en algún lugar haya AL MENOS una minúscula"

#### 3️⃣ `(?=.*[A-Z])` = LOOKAHEAD - DEBE CONTENER MAYÚSCULA
```
(?=.*[A-Z])
```
**En español:** "Verifica que en algún lugar haya AL MENOS una MAYÚSCULA (A-Z)"

#### 4️⃣ `(?=.*\d)` = LOOKAHEAD - DEBE CONTENER DÍGITO
```
(?=.*\d)
       │
       └─ \d = Un dígito: 0, 1, 2, ... 9
```
**En español:** "Verifica que en algún lugar haya AL MENOS un NÚMERO"

#### 5️⃣ `(?=.*[\W_])` = LOOKAHEAD - DEBE CONTENER SÍMBOLO
```
(?=.*[\W_])
      │││
      │││
      ││└─ _ = Guión bajo específicamente
      │└─ [ ] = Grupo de caracteres
      └─ \W = "Word" negado = TODO lo que NO es letra/número/guión bajo
         En otras palabras: !, @, #, $, %, &, *, etc.
```
**En español:** "Verifica que en algún lugar haya AL MENOS un SÍMBOLO ESPECIAL"

#### 6️⃣ `.{5,}` = LONGITUD MÍNIMA
```
.{5,}
│││
│││
││└─ , sin número = "5 o más"
│└─ 5 = exactamente 5
└─ . = Cualquier carácter
```
**En español:** "La contraseña debe tener AL MENOS 5 caracteres"

#### 7️⃣ `$` = FIN DE LA CADENA
```
$
```
**En español:** "El patrón debe terminar AQUÍ (sin caracteres después)"

---

## 📋 TABLA RESUMEN: QUÉ HACE CADA PARTE

| Parte | Símbolo | Qué significa | Ejemplo |
|-------|---------|--------------|---------|
| Inicio | `^` | Empieza aquí | - |
| Minúscula | `(?=.*[a-z])` | Debe haber AL MENOS una minúscula | abc, A1bc |
| Mayúscula | `(?=.*[A-Z])` | Debe haber AL MENOS una mayúscula | Abc, ABC123 |
| Dígito | `(?=.*\d)` | Debe haber AL MENOS un número | 1abc, 123ABC |
| Símbolo | `(?=.*[\W_])` | Debe haber AL MENOS un símbolo | !abc, A@1 |
| Longitud | `.{5,}` | Mínimo 5 caracteres | Abc@1 (5), Abc@123 (7) |
| Fin | `$` | Termina aquí | - |

---

## ✅ EJEMPLOS: QUÉ CONTRASEÑAS PASAN Y CUÁLES NO

### ❌ FALLAN:
```
"abc123"         ❌ NO tiene mayúscula ni símbolo
"ABC123"         ❌ NO tiene minúscula ni símbolo
"Abc123"         ❌ NO tiene símbolo
"Abc@"           ❌ NO tiene dígito
"Ab@1"           ❌ Menos de 5 caracteres
"abc@123"        ❌ NO tiene mayúscula
```

### ✅ PASAN:
```
"Abc@123"        ✅ Tiene todo: mayús, minús, símbolo, número, 7 caracteres
"Pass@1word"     ✅ Tiene todo: mayús, minús, símbolo, número, 10 caracteres
"MyP@ss5"        ✅ Tiene todo: mayús, minús, símbolo, número, 7 caracteres
"SecureP@ss1"    ✅ Tiene todo: mayús, minús, símbolo, número, 11 caracteres
"A1!bCd"         ✅ Tiene todo: mayús, minús, símbolo, número, 6 caracteres
```

---

## 🔍 EN CONTEXTO: TU PROYECTO

### En Register Component:
```typescript
password: [
  '',
  [
    Validators.required, // ← Obligatorio
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{5,}$/)
    // ↑ Debe tener: minúscula, mayúscula, número, símbolo, mín 5 caracteres
  ]
],
```

### En el HTML, se muestra en el tour:
```html
{
  element: '#register-password',
  popover: {
    title: 'Contraseña',
    description: 'Debe contener mayúsculas, minúsculas, números y símbolos.'
  }
}
```

**Ahora entienden por qué piden eso, ¿verdad?** 🔐

---

## 📚 FLUJO COMPLETO: DEL REGISTRO AL LOGIN

### 1. Usuario va a /register
```
Componentes cargados:
- RegisterComponent (padre)
  └─ Contiene registerForm (Reactive Form)
```

### 2. Usuario llena el formulario
```typescript
password: "MySecure@Pass1"
// ↑ Pasa la validación:
// - "M" = mayúscula ✅
// - "y" = minúscula ✅
// - "@" = símbolo ✅
// - "1" = número ✅
// - 16 caracteres >= 5 ✅
```

### 3. Usuario clickea Registrar
```typescript
async register() {
  if (this.registerForm.invalid) return; // Si falla, detente
  
  // Si llegó aquí, es válido
  const res = await registerUser(this.registerForm.value);
  // ↑ Envía { name, email, password, age } al backend
  
  this.router.navigate(['login']); // Redirige a login
}
```

### 4. Backend crea el usuario y registra token

### 5. Usuario va a /login
```typescript
async login() {
  const res = await loginUser(this.loginForm.value);
  localStorage.setItem('token', res.data.token); // ← GUARDA TOKEN
  this.router.navigate(['/characters']);
}
```

### 6. Token se valida en CADA petición
```typescript
// En api.service.ts
export const getUsers = () => {
  return axios.get(`${API}/users`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}` // ← Token aquí
    }
  });
};
```

### 7. AuthGuard protege las rutas
```typescript
canActivate(): boolean {
  const token = localStorage.getItem('token');
  
  if (token) {
    return true; // ✅ Permite entrar
  }
  
  this.router.navigate(['login']); // ❌ Redirige a login
  return false;
}
```

---

## 🎓 CONCEPTOS CLAVE QUE YA CONOCES

| Concepto | En tu proyecto |
|----------|----------------|
| **Componentes** | Register, Login, Users, Characters, Profile |
| **Servicios** | api.service.ts (todas las peticiones HTTP) |
| **Rutas** | app-routing.module.ts (define qué ver en cada URL) |
| **Guards** | auth.guard.ts (protege rutas que necesitan token) |
| **Módulos** | app.module.ts (declara componentes y módulos necesarios) |

---

## 💡 RESUMEN FINAL

Tu proyecto es una **app de gestión** con:
1. ✅ Sistema de autenticación (login/register)
2. ✅ Protección de rutas (solo usuarios autenticados)
3. ✅ Comunicación padre-hijo (Input/Output)
4. ✅ Validación de formularios (Reactive Forms)
5. ✅ Peticiones HTTP a backend y API externa
6. ✅ Tour interactivo (driver.js)

Y ahora **ENTIENDES** cómo cada parte trabaja junta. 🚀

---

**Notas importantes para tu presentación:**
- Explica primero el flujo de autenticación (es lo más importante)
- Luego habla de Input/Output con ejemplos reales del proyecto
- Muestra la regex en una pantalla (ellos entienden mejor visualmente)
- Menciona que usas Reactive Forms para validación robusta
- Señala cómo los datos fluyen desde backend → componentes → UI
