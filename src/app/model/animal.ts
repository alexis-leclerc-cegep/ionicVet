export class Animal {
  public id: number;
  public nom: string;
  public idType: number;
  public idClient: number;
  public dateNaissance: Date;

  constructor(id: number, nom: string, idType: number, idClient: number, dateNaissance: Date) {
    this.id = id;
    this.nom = nom;
    this.idType = idType;
    this.idClient = idClient;
    this.dateNaissance = dateNaissance;
  }
}
