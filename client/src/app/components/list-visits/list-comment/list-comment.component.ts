import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonService } from 'src/app/services/person.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface CommentInterface {
  rut: String;
  name: String;
}

@Component({
  selector: 'dialog-list-comment',
  templateUrl: 'dialog-list-comment.html',
  styleUrls: ['./dialog-list-comment.css'],
  providers: [PersonService]
})
export class DialogListComment implements OnInit{

  displayedColumns: string[] = ['descripcion', 'estado', 'function'];
  dataSource: any[] = [];
  public durationInSeconds = 5;

  constructor(
    public dialogRef: MatDialogRef<DialogListComment>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _personService: PersonService,
    private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this._personService.getCommentPerson(this.data.id, "FULL").subscribe(
      response => {
        this.dataSource = response.comment.comment
      },
    )
  }

  desactive(id: String) {
    this._personService.inactiveComment(id, false).subscribe(
      response => {
        this._snackBar.open('Observacion desactivada', 'OK', {
          duration: this.durationInSeconds * 1000,
        });
        this._personService.getCommentPerson(this.data.id, "FULL").subscribe(
          response => {
            this.dataSource = response.comment.comment
          },
        )
      }
    )
  }

  active(id: String) {
    this._personService.inactiveComment(id, true).subscribe(
      response => {
        this._snackBar.open('Observacion activada', 'OK', {
          duration: this.durationInSeconds * 1000,
        });
        this._personService.getCommentPerson(this.data.id, "FULL").subscribe(
          response => {
            this.dataSource = response.comment.comment
          },
        )
      }
    )
  }
}