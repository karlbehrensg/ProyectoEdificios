export class PersonVisit {
  constructor(
    public rut: String,
    public name: String,
    public lastName: String,
    public patent: String
  ){
    if(this.patent == "") {
      this.patent = null
    }
  }

}