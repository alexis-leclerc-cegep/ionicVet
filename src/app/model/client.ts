/*
 * Auteur : Alexis Leclerc
 * Version : 0.1
 * Date : 2022-09-30
 * Usage : Classe Client
 */

export class Client {
    public id: number;
    public prenom: string;
    public nom: string;
    public telephone: string;
    public geolocalisation: string;

    constructor(id: number, prenom: string, nom: string, telephone: string, geolocalisation: string){
        this.id = id;
        this.prenom = prenom;
        this.nom = nom;
        this.telephone = telephone;
        this.geolocalisation = geolocalisation;
    }
}
