export class TypeIntervention {
  public id: number;
  public intervention: string;
  public cout: number;

  constructor(id: number, intervention: string, cout: number) {
    this.id = id;
    this.intervention = intervention;
    this.cout = cout;
  }
}
