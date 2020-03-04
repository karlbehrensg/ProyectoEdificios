import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RutValidator } from 'ng2-rut';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackConfirmationComponent } from '../snack-confirmation/snack-confirmation.component';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.css'],
  providers: [PersonService],
})
export class CreatePersonComponent {

  public personForm: FormGroup;
  public loading: Boolean
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public durationInSeconds = 5;

  constructor(
    private _personService: PersonService,
    private rv:RutValidator,
    private fb:FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.personForm = this.createForm();
    this.loading = false
  }

  get rut() { return this.personForm.get('rut'); }
  get name() { return this.personForm.get('name'); }
  get email() { return this.personForm.get('email'); }
  get lastName() { return this.personForm.get('lastName'); }
  get phone() { return this.personForm.get('phone'); }
  get dep() { return this.personForm.get('dep'); }

  createForm() {
    return this.fb.group({
      rut: [ '', [Validators.required, Validators.minLength(8), this.rv]],
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
      dep: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(5)])
    });
  }

  onSaveForm() {
    this.loading = true

    this._personService.createPersonDep(this.personForm.value).subscribe(
      response => {
        this.loading = false
        this._snackBar.open('Creacion de Persona exitosa', 'OK', {
          duration: this.durationInSeconds * 1000,
        });
      },
      error => {
        this.loading = false
        if(error.status == 500 && error.error.msg == null) {
          this.openSnackBar({error: error.error})
        }
        if(error.status == 500 && error.error.msg != null) {
          this.openSnackBar({error: [{msg: error.error.msg}]})
      }
    });
  }

  openSnackBar(mesagge: any) {
    this._snackBar.openFromComponent(SnackConfirmationComponent, {
      duration: this.durationInSeconds * 1000,
      data: mesagge
    });
  }
}
