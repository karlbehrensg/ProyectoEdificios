import { Component, OnInit } from '@angular/core';
import { VisitService } from 'src/app/services/visit.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

export interface VisitInterface {
  date: Date;
  person: PersonInterface;
  depto: DeptoInterface;
}

export interface PersonInterface {
  rut: string; 
  name: string;
}

export interface DeptoInterface {
  num: string; 
  name: string;
}

@Component({
  selector: 'app-list-visits',
  templateUrl: './list-visits.component.html',
  styleUrls: ['./list-visits.component.css'],
  providers: [VisitService]
})
export class ListVisitsComponent implements OnInit {

  public displayedColumns: string[] = ['fecha', 'rut', 'nombre', 'departamento', 'numero'];
  public dataSource: MatTableDataSource<VisitInterface>;
  public loading: Boolean = true;
  public toppings = new FormControl();
  public toppingList: string[] = ['Nombre', 'Rut', 'Departamento'];

  constructor(
    private _visitService: VisitService,
  ) { }

  ngOnInit() {
    this.toppings.setValue(['Nombre', 'Rut', 'Departamento']);
    this._visitService.getListVisit().subscribe(
      response => {
        this.loading = false
        this.dataSource = new MatTableDataSource(response.visits);
      },
      error => {
        console.log(error)
        this.loading = false
      },
      () => {
        this.dataSource.filterPredicate = (data, filter) => {
          const dataStr = data.date + data.person.rut + data.person.name + data.depto.num + data.depto.name;
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

  selectChecked(data: String[], visit: VisitInterface): String {

    var dataftr = ''

    for (let index = 0; index < data.length; index++) {
      
      switch(data[index]) { 
        case 'Rut': { 
          dataftr += visit.person.rut
          break; 
        } 
        case "Nombre": { 
          dataftr += visit.person.name
          break; 
        }
       case "Departamento": { 
          dataftr += visit.depto.num
          break; 
        } 
      } 
    }
    return dataftr;
  }

}
