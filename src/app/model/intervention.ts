export class Intervention {
  public id: number;
  public dateIntervention: Date;
  public idAnimal: number;
  public idTypeIntervention: number;

  constructor(id: number,  idTypeIntervention: number, idAnimal: number, dateIntervention: Date) {
    this.id = id;
    this.idTypeIntervention = idTypeIntervention;
    this.idAnimal = idAnimal;
    this.dateIntervention = dateIntervention;
  }
}
