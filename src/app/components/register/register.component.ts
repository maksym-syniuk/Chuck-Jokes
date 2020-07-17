import { Router } from '@angular/router';
import { AuthService } from './../../shared/services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', Validators.minLength(3)],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public register() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value)
        .subscribe(() => {
          const data = {
            email: this.registerForm.value.email,
            password: this.registerForm.value.password
          };
          // login after registration
          this.authService.login(data).subscribe(
            () => this.router.navigate(['/'])
          );
        },
          error => this.errorMessage = error
        );
    }
  }
}
