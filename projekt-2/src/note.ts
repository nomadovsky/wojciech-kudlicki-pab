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

  createNote(title: string, content: string, tags?: string[]): Note {
    const date = new Date(Date.now());
    this.createDate = date.toISOString();
    this.id = Date.now();
    return new Note(title, content, this.createDate);
  }
}
