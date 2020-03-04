import { Component, OnInit } from '@angular/core';
import { DepartamentService } from 'src/app/services/departament.service';
import { PersonService } from 'src/app/services/person.service';
import { ShipmentService } from 'src/app/services/shipment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackConfirmationComponent } from '../snack-confirmation/snack-confirmation.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RutValidator } from 'ng2-rut';

@Component({
  selector: 'app-create-shipment',
  templateUrl: './create-shipment.component.html',
  styleUrls: ['./create-shipment.component.css'],
  providers: [ShipmentService]
})
export class CreateShipmentComponent {

  public shipmentForm: FormGroup;
  public loading: Boolean
  public durationInSeconds = 5;

  constructor(
    private _shipmentService: ShipmentService,
    private fb: FormBuilder,
    private rv: RutValidator,
    private _snackBar: MatSnackBar
  ) {
    this.shipmentForm = this.createForm();
    this.loading = false
  }

  get rut() { return this.shipmentForm.get('rut'); }
  get name() { return this.shipmentForm.get('name'); }
  get description() { return this.shipmentForm.get('description'); }
  get dep() { return this.shipmentForm.get('dep'); }

  createForm() {
    return this.fb.group({
      rut: [ '', [Validators.required, Validators.minLength(8), this.rv]],
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      description: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]),
      dep: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(5)])
    });
  }

  onSaveForm() {
    this.loading = true

    this._shipmentService.createShipment(this.shipmentForm.value).subscribe(
      response => {
        this.loading = false
        this._snackBar.open('Creacion de Encomienda exitosa', 'OK', {
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

