# 📊 DIAGRAMAS VISUALES DEL PROYECTO

## 1️⃣ DIAGRAMA DE FLUJO: INPUT Y OUTPUT

```
┌─────────────────────────────────────────────────────────────┐
│                    PARENT COMPONENT                         │
│                   (users.component)                         │
│                                                              │
│  users: any[] = [];                                         │
│  userSearch: string = '';                                   │
│                                                              │
│  receiveSearch(text) {                                      │
│    this.userSearch = text;                                  │
│  }                                                          │
│                                                              │
│  openEditModal(user) {                                      │
│    // user viene del child                                  │
│  }                                                          │
│                                                              │
│                                                              │
│  HTML:                                                      │
│  <app-user-search                                           │
│    (search)="receiveSearch($event)"  ← ESCUCHA OUTPUT       │
│    (addUser)="openCreateModal()">    ← ESCUCHA OUTPUT       │
│  </app-user-search>                                         │
│                                                              │
│  <app-user-table                                            │
│    [users]="users"                   ← ENVÍA INPUT ⬇️       │
│    [userSearch]="userSearch"         ← ENVÍA INPUT ⬇️       │
│    (editUser)="openEditModal($event)" ← ESCUCHA OUTPUT      │
│    (deleteUser)="deleteUserById($event)">                   │
│  </app-user-table>                                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
     ⬇️ ENVÍA DATA (Input)              ⬆️ EMITE EVENTOS (Output)
     │                                   │
┌────▼──────────────────────────────────▲─────────────────────┐
│                    CHILD COMPONENT                          │
│                 (user-table.component)                      │
│                                                              │
│  @Input() users: any[] = [];   ← RECIBE                    │
│  @Input() userSearch: string = '';  ← RECIBE               │
│                                                              │
│  @Output() editUser = new EventEmitter<any>();            │
│  @Output() deleteUser = new EventEmitter<string>();       │
│                                                              │
│  filteredUsers() {                                          │
│    // AQUÍ USA los @Input                                   │
│    return this.users.filter(...); ← USA INPUT users       │
│  }                                                          │
│                                                              │
│  confirmDeleteUser() {                                      │
│    this.deleteUser.emit(id); ← EMITE OUTPUT               │
│  }                                                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 2️⃣ DIAGRAMA DE FLUJO: AUTENTICACIÓN

```
┌─────────────────────────────────────────────────────────────────┐
│                         USUARIO ACCEDE                          │
│                         a http://localhost/users                │
│                                                                   │
│                              │                                   │
│                              ▼                                   │
│                    ¿Hay ruta protegida?                         │
│                              │                                   │
│                 ┌────────────┴────────────┐                      │
│                 ▼                         ▼                      │
│               SÍ                         NO                      │
│               │                          │                       │
│               ▼                          ▼                       │
│         AuthGuard intercepta      Muestra componente             │
│         canActivate()             sin protección                │
│               │                                                  │
│               ▼                                                  │
│      ¿localStorage.token existe?                                │
│               │                                                  │
│      ┌────────┴────────┐                                         │
│      ▼                 ▼                                         │
│      SÍ               NO                                        │
│      │                 │                                         │
│      ▼                 ▼                                         │
│    ✅ Permite    ❌ Redirige a                                 │
│    acceso       /login                                          │
│                                                                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

CÓDIGO:
────────────────────────────────────────────────────────────────
canActivate(): boolean {
  const token = localStorage.getItem('token');
  
  if (token) {
    return true;  ✅
  }
  
  this.router.navigate(['login']);
  return false; ❌
}
────────────────────────────────────────────────────────────────
```

---

## 3️⃣ DIAGRAMA DE FLUJO: REACTIVE FORMS

```
┌─────────────────────────────────────────────────────────────────┐
│              REACTIVE FORM EN REGISTER COMPONENT                │
│                                                                   │
│   PASO 1: Declarar                                              │
│   registerForm!: FormGroup;                                     │
│                                                                   │
│   PASO 2: Crear en ngOnInit()                                   │
│   this.registerForm = this.fb.group({                           │
│                                                                   │
│     name: [                                                      │
│       '',                                  ← Valor por defecto  │
│       [                                                          │
│         Validators.required,               ← Validador 1        │
│         Validators.pattern(/^[a-zA-Z\s]+$/) ← Validador 2       │
│       ]                                                          │
│     ],                                                          │
│                                                                   │
│     email: ['', [Validators.required, Validators.email]],       │
│     password: ['', [Validators.required, Validators.pattern(...)], │
│     age: [0, [Validators.required, Validators.min(18)]]        │
│   });                                                            │
│                                                                   │
│   PASO 3: HTML vincula el formulario                            │
│   <form [formGroup]="registerForm" (ngSubmit)="register()">     │
│     <input formControlName="name" />                            │
│   </form>                                                        │
│                                                                   │
│   PASO 4: Validar en TypeScript                                 │
│   if (this.registerForm.invalid) {                              │
│     this.registerForm.markAllAsTouched();                       │
│     return;                                                      │
│   }                                                              │
│                                                                   │
│   PASO 5: Obtener datos                                         │
│   const data = this.registerForm.value;                         │
│   // { name: '...', email: '...', password: '...', age: 0 }     │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4️⃣ DIAGRAMA: REGEX VALIDACIÓN CONTRASEÑA

```
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{5,}$/

┌──────────────────────────────────────────────────────────────┐
│                  DESGLOSE COMPLETO                           │
├──────────────────────────────────────────────────────────────┤
│ ^                                                             │
│ │ = INICIO: Comienza la validación aquí                      │
│                                                               │
├──────────────────────────────────────────────────────────────┤
│ (?=.*[a-z])                                                  │
│ │││││││││                                                     │
│ │││││││└─ [a-z] = Una minúscula (a-z)                       │
│ │││││││                                                       │
│ ││││└─ .* = Cero o más caracteres (cualquiera)              │
│ ││││                                                          │
│ │└─ (?= ... ) = Lookahead positivo (verifica sin consumir)  │
│                                                               │
│ SIGNIFICA: "Debe contener AL MENOS una minúscula"           │
│                                                               │
│ Ejemplos: ✅ 'abc123', ✅ 'ABCd123' ❌ 'ABC123'              │
│                                                               │
├──────────────────────────────────────────────────────────────┤
│ (?=.*[A-Z])                                                  │
│ │││││││││                                                     │
│ │││││││└─ [A-Z] = Una mayúscula (A-Z)                       │
│ ││││└─ .* = Cero o más caracteres                            │
│ │└─ (?= ... ) = Lookahead positivo                           │
│                                                               │
│ SIGNIFICA: "Debe contener AL MENOS una mayúscula"           │
│                                                               │
│ Ejemplos: ✅ 'Abc123', ✅ 'ABc123' ❌ 'abc123'               │
│                                                               │
├──────────────────────────────────────────────────────────────┤
│ (?=.*\d)                                                     │
│ │││││││                                                       │
│ │││││└─ \d = Un dígito (0-9)                                │
│ ││││                                                          │
│ │└─ (?= ... ) = Lookahead positivo                           │
│                                                               │
│ SIGNIFICA: "Debe contener AL MENOS un número"               │
│                                                               │
│ Ejemplos: ✅ 'Abc1', ✅ 'Abc999' ❌ 'AbcDEF'                 │
│                                                               │
├──────────────────────────────────────────────────────────────┤
│ (?=.*[\W_])                                                  │
│ │││││││││                                                     │
│ │││││└─ [\W_] = Un símbolo (NO letra/número/guión bajo)     │
│ │││││        O un guión bajo específicamente                 │
│ ││││                                                          │
│ │└─ (?= ... ) = Lookahead positivo                           │
│                                                               │
│ SIGNIFICA: "Debe contener AL MENOS un símbolo especial"      │
│                                                               │
│ Ejemplos: ✅ 'Abc1@', ✅ 'Abc1!' ❌ 'Abc1xyz'                 │
│                                                               │
├──────────────────────────────────────────────────────────────┤
│ .{5,}                                                        │
│ ││││                                                          │
│ │││└─ 5, = Cinco o más                                       │
│ ││└─ { } = Cuantificador (cuántas veces)                     │
│ │└─ . = Cualquier carácter                                   │
│                                                               │
│ SIGNIFICA: "Longitud mínima de 5 caracteres"                │
│                                                               │
│ Ejemplos: ✅ 'Abc1@' (5), ✅ 'Abc1@xyz' (8) ❌ 'Abc1' (4)    │
│                                                               │
├──────────────────────────────────────────────────────────────┤
│ $                                                             │
│ │ = FIN: Termina la validación aquí (nada después)          │
│                                                               │
└──────────────────────────────────────────────────────────────┘

TABLA DE VALIDACIÓN:
────────────────────────────────────────────────────────────────
Contraseña             Minús  Mayús  Número  Símbolo  Longitud  RESULTADO
───────────────────────────────────────────────────────────────────────────
"abc123"               ✅     ❌     ✅      ❌       ✅        ❌ FALLA (sin mayús ni símbolo)
"ABC123"               ❌     ✅     ✅      ❌       ✅        ❌ FALLA (sin minús ni símbolo)
"Abc123"               ✅     ✅     ✅      ❌       ✅        ❌ FALLA (sin símbolo)
"Abc@123"              ✅     ✅     ✅      ✅       ✅        ✅ PASA
"Pass@1word"           ✅     ✅     ✅      ✅       ✅        ✅ PASA
"MyP@ss5"              ✅     ✅     ✅      ✅       ✅        ✅ PASA
"Ab@1"                 ✅     ✅     ✅      ✅       ❌        ❌ FALLA (< 5 caracteres)
────────────────────────────────────────────────────────────────────────────
```

---

## 5️⃣ DIAGRAMA: FLUJO COMPLETO DEL PROYECTO

```
                         INICIO: http://localhost

                              │
                              ▼
                    ┌──────────────────┐
                    │   ¿Token existe? │
                    └────────┬─────────┘
                             │
                ┌────────────┴────────────┐
                ▼                         ▼
              SÍ (Login hecho)           NO (Sin login)
                │                         │
                ▼                         ▼
    Acceso a rutas protegidas     Redirige a /login
    • /users                      (página de acceso público)
    • /characters
    • /profile
                │
                │
    ┌───────────┼───────────┐
    │           │           │
    ▼           ▼           ▼
  USERS      CHARACTERS   PROFILE
    │           │           │
    ├─ Load    ├─ Load      ├─ Load
    │  Users   │ Characters │ User Profile
    │  from    │ from Rick  │ from Backend
    │  Backend │ & Morty    │
    │          │ API        │
    ├─ Search  ├─ Search    │
    │ by name  │ by name    │
    │          │            │
    ├─ Create  ├─ Paginate  │
    │ User     │ (next/prev) │
    │ (Modal)  │            │
    │          │            │
    ├─ Edit    │            │
    │ User     │            │
    │ (Modal)  │            │
    │          │            │
    └─ Delete  │            │
      User     │            │
              │            │


FLUJO DE DATOS EN USERS:
─────────────────────────────────────────────────────────
1. UsersComponent carga
   └─ ngOnInit() llama a loadUsers()
      └─ getUsers() (api.service)
         └─ axios.get('/users', { headers: { Authorization: token } })
            └─ Backend responde con array de usuarios
               └─ this.users = res.data

2. Los usuarios se pasan como @Input a UserTableComponent
   └─ [users]="users"
      └─ UserTable recibe los usuarios en @Input users
         └─ filteredUsers() filtra según búsqueda
            └─ *ngFor="let u of filteredUsers()" muestra en tabla

3. Usuario hace click en "Editar"
   └─ (editUser)="openEditModal($event)"
      └─ UserTable emite el usuario mediante @Output
         └─ UsersComponent recibe el usuario
            └─ openEditModal(user) llena el formulario
               └─ Se abre modal para editar

4. Usuario envía el formulario editado
   └─ async addUser() en UsersComponent
      └─ updateUser(id, data) llama al backend
         └─ Backend actualiza usuario
            └─ loadUsers() recarga la lista
               └─ UI se actualiza automáticamente
```

---

## 6️⃣ DIAGRAMA: CICLO DE VIDA DEL COMPONENTE

```
┌──────────────────────────────────────────────────────────────┐
│                  CICLO DE VIDA (LIFECYCLE)                   │
│                                                               │
│  1. CREACIÓN: Se crea la instancia del componente            │
│     └─ new UsersComponent()                                  │
│                                                               │
│  2. constructor()                                            │
│     └─ Se ejecuta UNA VEZ (inyecta servicios)               │
│     └─ En tu caso: inyecta FormBuilder                       │
│                                                               │
│  3. ngOnInit() ← ⭐ MÁS IMPORTANTE                           │
│     └─ Se ejecuta DESPUÉS de que Angular inicializa          │
│     └─ En tu caso:                                           │
│        ├─ Crea registerForm                                  │
│        ├─ Llama a loadUsers()                                │
│        └─ Carga datos del API                                │
│                                                               │
│  4. DURANTE LA VIDA DEL COMPONENTE:                          │
│     ├─ Usuario interactúa (click, input, etc.)              │
│     ├─ Angular detecta cambios                              │
│     ├─ Se llaman métodos (search(), editUser(), etc.)       │
│     └─ Se actualizan los datos en la UI                     │
│                                                               │
│  5. ngOnDestroy() (si se implementa)                         │
│     └─ Se ejecuta cuando se destruye el componente           │
│     └─ Útil para limpiar (ej: cerrar conexiones)            │
│                                                               │
└──────────────────────────────────────────────────────────────┘


EN TU REGISTER COMPONENT:
────────────────────────────────────────────────────────────────
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    // 1️⃣ Aquí inyecta FormBuilder (se ejecuta primero)
  }

  ngOnInit(): void {
    // 2️⃣ Aquí crea el formulario (se ejecuta después)
    this.registerForm = this.fb.group({ ... });
    
    // 3️⃣ Inicia el tour
    setTimeout(() => this.startTour(), 500);
  }

  async register() {
    // 4️⃣ Se ejecuta cuando usuario clickea "Registrar"
    if (this.registerForm.invalid) return;
    
    const res = await registerUser(this.registerForm.value);
    this.router.navigate(['login']); // Destruye este componente
    // 5️⃣ Aquí se destruye el componente (ngOnDestroy si lo tuvieras)
  }
}
```

---

## 7️⃣ TABLA RESUMEN: MÉTODOS IMPORTANTES

```
┌──────────────────────────────────────────────────────────────┐
│                MÉTODOS EN TUS COMPONENTES                     │
├──────────────────────────────────────────────────────────────┤
│ loadUsers()                                                   │
│ └─ Obtiene usuarios del backend via api.service              │
│ └─ Actualiza this.users = res.data                           │
│                                                               │
├──────────────────────────────────────────────────────────────┤
│ receiveSearch(text)                                           │
│ └─ Recibe evento del child (user-search)                     │
│ └─ Guarda: this.userSearch = text                            │
│ └─ Trigger: UserTable se re-filtra automáticamente           │
│                                                               │
├──────────────────────────────────────────────────────────────┤
│ filteredUsers()                                               │
│ └─ Filtra this.users según this.userSearch                   │
│ └─ Se ejecuta cada vez que los datos cambian                 │
│ └─ Retorna array filtrado                                    │
│                                                               │
├──────────────────────────────────────────────────────────────┤
│ openEditModal(user)                                           │
│ └─ Recibe evento del child (user-table)                      │
│ └─ Llena el formulario con datos del usuario                 │
│ └─ Abre modal para editar                                    │
│                                                               │
├──────────────────────────────────────────────────────────────┤
│ async addUser()                                               │
│ └─ Valida registerForm.invalid                               │
│ └─ Llama registerUser() o updateUser()                       │
│ └─ Recarga la lista de usuarios                              │
│ └─ Cierra modal                                              │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎬 CONCLUSIÓN: TODO JUNTO

```
USUARIO ACCEDE A LA APP
         │
         ▼
   ¿Token existe?
         │
    ┌────┴────┐
    ▼         ▼
   SÍ        NO ──→ Redirige a /login
    │
    ▼
Acceso a componentes
    │
    ├─ UsersComponent ngOnInit()
    │  └─ loadUsers() vía API
    │     └─ [users]="users" → UserTableComponent
    │
    ├─ UserTableComponent recibe @Input users
    │  └─ Muestra tabla con *ngFor
    │
    └─ Usuario interactúa
       ├─ Busca → (search) emite → receiveSearch()
       ├─ Edita → (editUser) emite → openEditModal()
       ├─ Borra → (deleteUser) emite → deleteUserById()
       └─ Rellena form → Validators validan
          └─ Submit → updateUser() al backend
             └─ loadUsers() recarga
                └─ UI se actualiza automáticamente
```

¡Ahora visualizas cómo todo fluye en tu proyecto! 🚀
