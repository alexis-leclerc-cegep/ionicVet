/*
 * Auteur : Alexis Leclerc
 * Version : 0.1
 * Date : 2022-09-30
 * Usage : Classe Animal
 */
export class Animal {
  public id: number;
  public nom: string;
  public idTypeanimal: number;
  public idClient: number;
  public dateNaissance: Date;

  constructor(id: number, nom: string, idTypeanimal: number, idClient: number, dateNaissance: Date) {
    this.id = id;
    this.nom = nom;
    this.idTypeanimal = idTypeanimal;
    this.idClient = idClient;
    this.dateNaissance = dateNaissance;
  }
}
