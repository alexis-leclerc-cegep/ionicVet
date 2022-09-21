//Description de l'objet client
//Auteur : Alexis Leclerc
//21 septembre 2019

export class Client {
    public id : number;
    public prenom : string;
    public nom : string;
    public telephone : string;
    public latitude : number;
    public longitude : number;

    constructor(id : number, prenom : string, nom : string, telephone : string, latitude : number, longitude : number){
        this.id = id;
        this.prenom = prenom;
        this.nom = nom;
        this.telephone = telephone;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}