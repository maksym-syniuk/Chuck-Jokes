import { JokesService } from 'src/app/shared/services/jokes.service';
import { Observable } from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
    private jokesService: JokesService
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.deleteMode
      ? (this.form = this.formBuilder.group({
          id: ['', Validators.required],
        }))
      : (this.form = this.formBuilder.group({
          title: ['', Validators.required, this.forbiddenCategories.bind(this)],
        }));
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }

  public forbiddenCategories(
    control: FormControl
  ): Observable<object> | Observable<null> {
    console.log('calling');
    return this.jokesService.checkExistCategories(control.value);
  }
}
