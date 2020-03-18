import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackConfirmationComponent } from '../snack-confirmation/snack-confirmation.component';
import { BuildService } from 'src/app/services/build.service';

@Component({
  selector: 'app-create-building',
  templateUrl: './create-building.component.html',
  providers: [BuildService],
  styleUrls: ['./create-building.component.css']
})
export class CreateBuildingComponent implements OnInit {

  public buildForm: FormGroup;
  public loading: Boolean
  public durationInSeconds = 5;

  constructor(
    private fb: FormBuilder,
    private _buidService: BuildService,
    private _snackBar: MatSnackBar
  ) {
    this.buildForm = this.createForm();
    this.loading = false
  }

  get title() { return this.buildForm.get('title'); }

  createForm() {
    return this.fb.group({
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  ngOnInit() { }

  onSaveForm() {
    this.loading = true
    this._buidService.createBuild(this.buildForm.value).subscribe(
      response => {
        this.loading = false
        this._snackBar.open('Creacion de Edificio exitosa', 'OK', {
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
