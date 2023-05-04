import { IPost } from 'app/shared/model/post.model';

export interface IHashtag {
  id?: number;
  name?: string;
  posts?: IPost[] | null;
}

export const defaultValue: Readonly<IHashtag> = {};
