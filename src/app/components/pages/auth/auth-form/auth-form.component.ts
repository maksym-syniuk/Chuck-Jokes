import { AuthInterface } from './../../../../shared/interfaces/auth.interface';
import { Role } from 'src/app/shared/models/user.model';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  public form: FormGroup;
  public role = Role;
  public hidePassword = true;
  @Input() isRegisterMode: boolean;
  @Output() submitForm = new EventEmitter<AuthInterface>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    if (this.isRegisterMode) {
      this.form.addControl(
        'firstName',
        new FormControl('', [Validators.required, Validators.minLength(2)])
      );
      this.form.addControl(
        'lastName',
        new FormControl('', [Validators.minLength(2)])
      );
      this.form.addControl('roles', new FormControl(''));
    }
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.form.value.roles = [this.form.value.roles];
      this.submitForm.emit(this.form.value);
    }
  }
}
