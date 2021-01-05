export class Book {
  constructor(
    public id: number,
    public name: string,
    public seen: boolean,
    public publicationDate: number,
    public description: string,
    public genre: string,
    public author: string,
    public editor: string
  ) {}
}
