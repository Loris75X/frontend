export class Film {

  constructor(
    public id: number,
    public name: string,
    public seen: boolean,
    public publicationDate: number,
    public description: string,
    public genre: string,
    public director: string
  ){ }
  
}
