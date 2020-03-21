import { Component, OnInit } from '@angular/core';
import { SnackConfirmationComponent } from '../snack-confirmation/snack-confirmation.component';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonService } from 'src/app/services/person.service';
import { RutValidator } from 'ng2-rut';

@Component({
  selector: 'app-assign-resident',
  templateUrl: './assign-resident.component.html',
  styleUrls: ['./assign-resident.component.css'],
  providers: [PersonService]
})
export class AssignResidentComponent implements OnInit {

  public personForm: FormGroup;
  public loading: Boolean
  public durationInSeconds = 5;

  constructor(
    private fb: FormBuilder,
    private _personService: PersonService,
    private _snackBar: MatSnackBar,
    private rv: RutValidator,
  ) {
    this.personForm = this.createForm();
    this.loading = false
  }

  get person() { return this.personForm.get('person'); }
  get dep() { return this.personForm.get('dep'); }

  createForm() {
    return this.fb.group({
      person: [ '', [Validators.required, Validators.minLength(8), this.rv]],
      dep: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    });
  }

  ngOnInit() { }

  onSaveForm() {
    this.loading = true
    this._personService.assignPersonDep(this.personForm.value).subscribe(
      response => {
        this.loading = false
        this._snackBar.open('Asignacion exitosa', 'OK', {
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
