import { Component, OnInit } from '@angular/core';
import { SnackConfirmationComponent } from '../snack-confirmation/snack-confirmation.component';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartamentService } from 'src/app/services/departament.service';
import { BuildService } from 'src/app/services/build.service';

interface Build {
  id: string;
  title: string;
}

@Component({
  selector: 'app-create-departament',
  templateUrl: './create-departament.component.html',
  providers: [DepartamentService, BuildService],
  styleUrls: ['./create-departament.component.css']
})
export class CreateDepartamentComponent implements OnInit {

  public departamentForm: FormGroup;
  public loading: Boolean
  public durationInSeconds = 5;
  public builds: Build[] =[]

  constructor(
    private fb: FormBuilder,
    private _departamentService: DepartamentService,
    private _buildService: BuildService,
    private _snackBar: MatSnackBar
  ) {
    this.departamentForm = this.createForm();
    this.loading = false
  }

  get num() { return this.departamentForm.get('num'); }
  get build() { return this.departamentForm.get('build'); }

  createForm() {
    return this.fb.group({
      num: new FormControl('', [Validators.required, Validators.minLength(1)]),
      build: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  ngOnInit() { 
    this._buildService.builds().subscribe(
      response => {
        this.builds = response.buildings
      }
    )
  }

  onSaveForm() {
    this.loading = true
    this._departamentService.createDepartament(this.departamentForm.value).subscribe(
      response => {
        this.loading = false
        this._snackBar.open(response.msg, 'OK', {
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
