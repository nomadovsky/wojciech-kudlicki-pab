export class Note {
  title: string;
  content: string;
  createDate?: string;
  tags?: string[];
  id?: number;

  constructor(
    title: string,
    content: string,
    createDate?: string,
    tags?: string[],
    id?: number
  ) {
    this.title = title;
    this.content = content;
    this.tags = tags;
    this.createDate = createDate;
    this.id = id;
  }
}
