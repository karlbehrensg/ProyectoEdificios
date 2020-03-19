import { Component, OnInit } from '@angular/core';
import { SnackConfirmationComponent } from '../snack-confirmation/snack-confirmation.component';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BuildService } from 'src/app/services/build.service';
import { UserService } from 'src/app/services/user.service';
import { Build } from 'src/app/models/build';

@Component({
  selector: 'app-create-user-build',
  templateUrl: './create-user-build.component.html',
  styleUrls: ['./create-user-build.component.css'],
  providers: [UserService, BuildService]
})
export class CreateUserBuildComponent implements OnInit {

  public userForm: FormGroup;
  public loading: Boolean
  public durationInSeconds = 5;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public builds: Build[] =[]

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _buildService: BuildService,
    private _snackBar: MatSnackBar
  ) {
    this.userForm = this.createForm();
    this.loading = false
  }

  get email() { return this.userForm.get('email'); }
  get name() { return this.userForm.get('name'); }
  get password() { return this.userForm.get('password'); }
  get build() { return this.userForm.get('build'); }

  createForm() {
    return this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
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
    this._userService.createUserBuild(this.userForm.value).subscribe(
      response => {
        this.loading = false
        this._snackBar.open('Creacion de Usuario exitosa', 'OK', {
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
