import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DeptoStateInterface {
  state: Boolean;
  dep: DeptoInterface;
  person: PersonInterface
}

export interface DeptoInterface {
  num: String;
}

export interface PersonInterface {
  name: string;
  email: string;
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

  public displayedColumns: string[] = ['rut', 'email', 'nombre', 'apellido', 'departamento', 'function'];
  public dataSource: MatTableDataSource<DeptoStateInterface>;
  public loading: Boolean = true;
  public toppings = new FormControl();
  public toppingList: string[] = ['Rut', 'Email', 'Nombre', 'Apellido', 'Departamento'];
  public durationInSeconds = 5;

  constructor(
    private _personService: PersonService,
    private _snackBar: MatSnackBar
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
          const dataStr = data.person.name.toLowerCase() + data.person.email.toLowerCase() + data.person.rut.toLowerCase() + data.person.lastName.toLowerCase() + data.person.phone.toLowerCase() + data.dep.num.toLowerCase();
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

  selectChecked(data: String[], person: DeptoStateInterface): String {

    var dataftr = ''

    for (let index = 0; index < data.length; index++) {
      
      switch(data[index]) { 
        case 'Rut': { 
          dataftr += person.person.rut.toLowerCase()
          break; 
        } 
        case "Email": { 
          dataftr += person.person.email.toLowerCase()
          break; 
        } 
        case "Nombre": { 
          dataftr += person.person.name.toLowerCase()
          break; 
        }
        case "Apellido": { 
          dataftr += person.person.lastName.toLowerCase()
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

  desactiveDep(id: String) {
    this._personService.desactivePersonDep(id).subscribe(
      response => {
        this._snackBar.open('Desactivado', 'OK', {
          duration: this.durationInSeconds * 1000,
        });
        this._personService.getPersons().subscribe(
          response => {
            this.dataSource = new MatTableDataSource(response.persons);
          }
        )
      },
      error => {
        this._snackBar.open('Error al desactivar', 'OK', {
          duration: this.durationInSeconds * 1000,
        });
      }
    )
  }

}
