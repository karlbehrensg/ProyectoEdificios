import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

export interface DeptoInterface {
  num: string
}

export interface PersonInterface {
  name: string;
  email: string;
  dep: DeptoInterface;
  rut: string;
  lastName: string;
  phone: string;
}

@Component({
  selector: 'app-list-person-build',
  templateUrl: './list-person-build.component.html',
  styleUrls: ['./list-person-build.component.css'],
  providers: [PersonService]
})
export class ListPersonBuildComponent implements OnInit {

  public displayedColumns: string[] = ['rut', 'email', 'nombre', 'apellido', 'departamento'];
  public dataSource: MatTableDataSource<PersonInterface>;
  public loading: Boolean = true;
  public toppings = new FormControl();
  public toppingList: string[] = ['Rut', 'Email', 'Nombre', 'Apellido', 'Departamento'];
  
  constructor(
    private _personService: PersonService
  ) { }

  ngOnInit() {
    this.toppings.setValue(['Rut', 'Email', 'Nombre', 'Apellido', 'Departamento']);
    this._personService.getPersons().subscribe(
      response => {
        this.loading = false
        this.dataSource = new MatTableDataSource(response.persons);
      },
      error => {
        console.log(error)
        this.loading = false
      },
      () => {
        this.dataSource.filterPredicate = (data, filter) => {
          const dataStr = data.name.toLowerCase() + data.email.toLowerCase() + data.rut.toLowerCase() + data.lastName.toLowerCase() + data.phone.toLowerCase() + data.dep.num.toLowerCase();
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

  selectChecked(data: String[], person: PersonInterface): String {

    var dataftr = ''

    for (let index = 0; index < data.length; index++) {
      
      switch(data[index]) { 
        case 'Rut': { 
          dataftr += person.rut.toLowerCase()
          break; 
        } 
        case "Email": { 
          dataftr += person.email.toLowerCase()
          break; 
        } 
        case "Nombre": { 
          dataftr += person.name.toLowerCase()
          break; 
        }
        case "Apellido": { 
          dataftr += person.lastName.toLowerCase()
          break; 
        }
       case "Departamento": { 
          dataftr += person.dep.num.toLowerCase()
          break; 
        } 
      } 
    }
    return dataftr;
  }

}
