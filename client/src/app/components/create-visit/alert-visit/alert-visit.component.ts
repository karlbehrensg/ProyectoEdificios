import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-alert-visit',
  templateUrl: './alert-visit.component.html',
  styleUrls: ['./alert-visit.component.css'],
  providers: [PersonService]
})
export class AlertVisitComponent implements OnInit {

  public obs: any;
  public loading: Boolean
  public durationInSeconds = 5;
  displayedColumns: string[] = ['descripcion', 'estado'];
  dataSource: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<AlertVisitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private _personService: PersonService) {

      this.obs = {
        rut: this.data.person.rut,
        name: this.data.person.name,
        lastName: this.data.person.lastName,
        patent: this.data.person.patent,
        dep: this.data.person.dep,
        obs: false
      }

      this.loading = false
    }
  
  ngOnInit() {
    this._personService.getCommentPerson(this.data.idperson, "ACTIVE").subscribe(
      response => {
        this.dataSource = response.comment
      },
    )
  }
  
  createVisit() {
    this.loading = true
    this._personService.createPersonVisit(this.obs).subscribe(
      response => {
        this.loading = false
        this._snackBar.open('Visita creada', 'OK', {
          duration: this.durationInSeconds * 1000,
        });
        this.dialogRef.close();
      },
      error => {
        this._snackBar.open('Error al crear Visita', 'OK', {
          duration: this.durationInSeconds * 1000,
        });

        this.loading = false
        this.dialogRef.close();
      }
    )
  }

  dismiss() {
    this.dialogRef.close();
  }
}
