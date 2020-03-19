import { Component, OnInit } from '@angular/core';
import { ShipmentService } from 'src/app/services/shipment.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

export interface ShipmentInterface {
  description: string;
  date: string;
  dep: DeptoInterface;
  person: PersonInterface;
}

export interface DeptoInterface {
  num: string;
}

export interface PersonInterface {
  name: string;
  rut: string;
}

@Component({
  selector: 'app-list-shipments',
  templateUrl: './list-shipments.component.html',
  styleUrls: ['./list-shipments.component.css'],
  providers: [ShipmentService]
})
export class ListShipmentsComponent implements OnInit {

  public displayedColumns: string[] = ['fecha', 'descripcion', 'nombre', 'numero'];
  public dataSource: MatTableDataSource<ShipmentInterface>;
  public loading: Boolean = true;
  public toppings = new FormControl();
  public toppingList: string[] = ['Descripcion', 'Nombre', 'Rut', 'Departamento'];

  constructor(
    private _shipmentService: ShipmentService
  ) { }

  ngOnInit() {
    this.toppings.setValue(['Descripcion', 'Nombre', 'Rut', 'Departamento']);
    this._shipmentService.getShipments().subscribe(
      response => {
        this.loading = false
        this.dataSource = new MatTableDataSource(response.shipments);
      },
      error => {
        console.log(error)
        this.loading = false
      },
      () => {
        this.dataSource.filterPredicate = (data, filter) => {
          const dataStr = data.date.toLowerCase() + data.description.toLowerCase() + data.person.rut.toLowerCase() + data.person.name.toLowerCase() + data.dep.num.toLowerCase();
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

  selectChecked(data: String[], shipment: ShipmentInterface): String {

    var dataftr = ''

    for (let index = 0; index < data.length; index++) {
      
      switch(data[index]) { 
        case 'Rut': { 
          dataftr += shipment.person.rut.toLowerCase()
          break; 
        } 
        case "Nombre": { 
          dataftr += shipment.person.name.toLowerCase()
          break; 
        }
        case "Descripcion": { 
          dataftr += shipment.description.toLowerCase()
          break; 
        }
       case "Departamento": { 
          dataftr += shipment.dep.num.toLowerCase()
          break; 
        } 
      } 
    }
    return dataftr;
  }
}
