import { Component, OnInit } from '@angular/core';
import { registerUser } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { driver } from 'driver.js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup; //

  showPassword: boolean = false;

  message = '';

  messageType = '';


  showMessage(text: string, type: string) {

    this.message = text;
    this.messageType = type;

    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 3000);

  }

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({

      name: [

        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]+$/)
        ]
      ],

      email: [

        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [

        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{5,}$/)
        ]
      ],

      age: [

        '',
        [
          Validators.min(18),
          Validators.max(100),
          Validators.pattern(/^[1-9][0-9]*$/)
        ]
      ]
    });
    setTimeout(() => {

  this.startTour();

}, 500);
  }

  async register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    try {

      const res = await registerUser(this.registerForm.value);

      console.log(res.data);

      this.showMessage(
        'Usuario creado correctamente',
        'success'
      );

      this.router.navigate(['login']);

    } catch (error: any) {
      console.error(error)
      alert(error.response?.data?.message || 'Error');
    }
  }

  goLogin() {
    setTimeout(() => {

      this.router.navigate(['/login']);

    }, 100);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  startTour() {

    const driverObj = driver({

      showProgress: true,

      steps: [

        {
          element: '#register-title',
          popover: {
            title: 'Registro',
            description: 'Aqui puedes crear una nueva cuenta.'
          }
        },
        {
        element: '#register-name',
        popover: {
          title: 'Nombre',
          description: 'Ingresa tu nombre completo.'
        }
      },

      {
        element: '#register-email',
        popover: {
          title: 'Correo',
          description: 'Ingresa un correo válido.'
        }
      },

      {
        element: '#register-password',
        popover: {
          title: 'Contraseña',
          description: 'Debe contener mayúsculas, minúsculas, números y símbolos.'
        }
      },

      {
        element: '#register-age',
        popover: {
          title: 'Edad',
          description: 'Debes tener entre 18 y 100 años.'
        }
      },

      {
        element: '#register-button',
        popover: {
          title: 'Registrarse',
          description: 'Presiona este botón para crear la cuenta.'
        }
      },

      {
        element: '#register-login',
        popover: {
          title: 'Ir a Login',
          description: 'Si ya tienes cuenta puedes iniciar sesión aquí.'
        }
      },

      {
        element: '#final-recorrido',
        popover: {
          title: '¡Fin del tutorial!',
          description: 'Thomas care tajada'
        }
      }
      ]
    });
    driverObj.drive();
  }
  
}
