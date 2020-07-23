import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modify-categories-form',
  templateUrl: './modify-categories-form.component.html',
  styleUrls: ['./modify-categories-form.component.scss'],
})
export class ModifyCategoriesFormComponent implements OnInit {
  public form: FormGroup;
  @Input() deleteMode: boolean;
  @Output() submitForm = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.deleteMode
      ? (this.form = this.formBuilder.group({
          id: ['', Validators.required],
        }))
      : (this.form = this.formBuilder.group({
          title: ['', Validators.required],
        }));
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
