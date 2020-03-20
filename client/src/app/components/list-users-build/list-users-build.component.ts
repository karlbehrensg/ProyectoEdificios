import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface UserInterface {
  id: String;
  username: String;
  email: String;
  role: String;
  build: BuildInterface;
  auth: AuthInterface;
}

export interface BuildInterface {
  title: string;
}

export interface AuthInterface {
  login: string;
  logout: String;
  state: Boolean;
}

@Component({
  selector: 'app-list-users-build',
  templateUrl: './list-users-build.component.html',
  styleUrls: ['./list-users-build.component.css'],
  providers: [UserService]
})
export class ListUsersBuildComponent implements OnInit {

  public displayedColumns: string[] = ['email', 'usuario', 'rol', 'estado', 'auth'];
  public dataSource: MatTableDataSource<UserInterface>;
  public loading: Boolean = true;
  public toppings = new FormControl();
  public toppingList: string[] = ['Email', 'Usuario', 'Rol'];
  public durationInSeconds = 5;

  constructor(
    private _userService: UserService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.toppings.setValue(['Email', 'Usuario', 'Rol']);
    this._userService.getListUsersBuild().subscribe(
      response => {
        this.loading = false
        this.dataSource = new MatTableDataSource(response.users);
      },
      error => {
        this.loading = false
      },
      () => {
        this.dataSource.filterPredicate = (data, filter) => {
          const dataStr = data.email.toLowerCase() + data.username.toLowerCase() + data.role.toLowerCase();
          return dataStr.indexOf(filter) != -1; 
        }
      }
    )
  }

  changeSelect(event) {
    this.dataSource.filterPredicate = (data, filter) => {
      var dataStr = this.selectChecked(event.value, data)
      return dataStr.indexOf(filter) != -1;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();
  }

  selectChecked(data: String[], user: UserInterface): String {

    var dataftr = ''

    for (let index = 0; index < data.length; index++) {
      
      switch(data[index]) {
        case 'Email': { 
          dataftr += user.email.toLowerCase()
          break; 
        } 
        case "Usuario": { 
          dataftr += user.username.toLowerCase()
          break; 
        }
       case "Rol": { 
          dataftr += user.role.toLowerCase()
          break; 
        } 
      } 
    }
    return dataftr;
  }

  auths(auths: [AuthInterface]): void {
    const dialogRef = this.dialog.open(DialogListAuth, {
      width: '1000px',
      data: { auths }
    });
  }

  active(id: String) {
    this._userService.setStateUser({ state: true, user: id}).subscribe(
      response => {
        this._snackBar.open('Usuario Activado', 'OK', {
          duration: this.durationInSeconds * 1000,
        });
        this._userService.getListUsersBuild().subscribe(
          response => { this.dataSource = new MatTableDataSource(response.users); }
        )
      },
      error => {
        this._snackBar.open('Error en la activacion', 'OK', {
          duration: this.durationInSeconds * 1000,
        });
      }
    )
  }

  desactive(id: String) {
    this._userService.setStateUser({ state: false, user: id}).subscribe(
      response => {
        this._snackBar.open('Usuario Desactivado', 'OK', {
          duration: this.durationInSeconds * 1000,
        });
        this._userService.getListUsersBuild().subscribe(
          response => { this.dataSource = new MatTableDataSource(response.users); }
        )
      },
      error => {
        this._snackBar.open('Error en la desactivacion', 'OK', {
          duration: this.durationInSeconds * 1000,
        });
      }
    )
  }

}

@Component({
  selector: 'dialog-list-auth',
  templateUrl: 'dialog-list-auth.html',
  styleUrls: ['./dialog-list-auth.css'],
})
export class DialogListAuth {

  displayedColumns: string[] = ['login', 'logout', 'state'];
  dataSource: AuthInterface[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogListAuth>,
    @Inject(MAT_DIALOG_DATA) public data: [AuthInterface]) {
      this.dataSource = this.data
    }
}
