import { Component } from '@angular/core';
import { VisitService } from 'src/app/services/visit.service';
import { DepartamentService } from 'src/app/services/departament.service';
import { PersonService } from 'src/app/services/person.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackConfirmationComponent } from '../snack-confirmation/snack-confirmation.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RutValidator } from 'ng2-rut';
import { MatDialog } from '@angular/material/dialog';
import { AlertVisitComponent } from './alert-visit/alert-visit.component';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css'],
  providers: [VisitService, DepartamentService, PersonService]
})
export class VisitComponent {

  public personForm: FormGroup;
  public loading: Boolean
  public durationInSeconds = 5;

  constructor(
    private _personService: PersonService,
    private rv:RutValidator,
    private fb:FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.personForm = this.createForm();
    this.loading = false
  }

  get rut() { return this.personForm.get('rut'); }
  get name() { return this.personForm.get('name'); }
  get lastName() { return this.personForm.get('lastName'); }
  get patent() { return this.personForm.get('patent'); }
  get dep() { return this.personForm.get('dep'); }

  createForm() {
    return this.fb.group({
      rut: [ '', [Validators.required, Validators.minLength(8), this.rv]],
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
      patent: new FormControl('', [Validators.minLength(6), Validators.maxLength(15)]),
      dep: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(5)]),
      obs: [ true, [Validators.required]],
    });
  }

  onSaveForm() {
    this.loading = true

    this._personService.createPersonVisit(this.personForm.value).subscribe(
      response => {
        this.loading = false
        this._snackBar.open('Creacion de Visita exitosa', 'OK', {
          duration: this.durationInSeconds * 1000,
        });
      },
      error => {
        this.loading = false
        if(error.status == 500 && error.error.alert != null) {
          const dialogRef = this.dialog.open(AlertVisitComponent, {
            width: '600px',
            data: this.personForm.value
          });
        }
        if(error.status == 500 && error.error.msg != null) {
          this.openSnackBar({error: [{msg: error.error.msg}]})
        }
      }
    );
  }

  openSnackBar(mesagge: any) {
    this._snackBar.openFromComponent(SnackConfirmationComponent, {
      duration: this.durationInSeconds * 1000,
      data: mesagge
    });
  }
}
