import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'dialog-add-comment',
  templateUrl: 'dialog-add-comment.html',
  styleUrls: ['./dialog-add-comment.css'],
  providers: [PersonService]
})
export class DialogAddComment {

  public obs: any;
  public loading: Boolean
  public durationInSeconds = 5;

  constructor(
    public dialogRef: MatDialogRef<DialogAddComment>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private _personService: PersonService) {

      this.obs = {
        desc: '',
        person: this.data.id
      }
      this.loading = false
    }
  
  addComment() {
    this.loading = true
    this._personService.createCommentPerson(this.obs).subscribe(
      response => {
        this.loading = false
        this._snackBar.open('Observacion agregada', 'OK', {
          duration: this.durationInSeconds * 1000,
        });
      },
      error => {
        this._snackBar.open('Error al crear Observacion', 'OK', {
          duration: this.durationInSeconds * 1000,
        });
        this.loading = false
      }
    )
  }
}