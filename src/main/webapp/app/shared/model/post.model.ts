import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { IHashtag } from 'app/shared/model/hashtag.model';

export interface IPost {
  id?: number;
  text?: string;
  createdAt?: string;
  user?: IUser | null;
  hashtags?: IHashtag[] | null;
}

export const defaultValue: Readonly<IPost> = {};
