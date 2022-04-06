import { Tag } from "./tag";

export interface Note {
  title: string;
  content: string;
  author: string;
  createDate?: string;
  tags?: Tag[];
  id?: number;
  isPublic: boolean;
}
