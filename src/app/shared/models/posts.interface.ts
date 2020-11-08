import { UserPost } from './user.interface';

export interface Post {
  id: number;
  image: string;
  caption: string;
  user: UserPost;
}
